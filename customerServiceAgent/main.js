// 全局变量
const TOKEN_CACHE_KEY = 'page_token_cache'; // localStorage存储token的键名
let token = 'ewogICJhbGciOiAiSFMyNTYiLAogICJ1aWQiOiAiMTAwMDAxIgp9.ewogICJwYXNzd29yZCI6ICJjaHVhbmd6YW9haSIsCiAgImV4cCI6ICIyMDI2LTAzLTMxIgp9.H4Zu_VEYVJHTjcBR9vcmfQWwbb3sBD2gZShF30lyW-Y';
let isLoading = false;
let loadingTextInterval = null;
let currentBotMessageElement = null; // 当前正在更新的机器人消息元素
let accumulatedResponse = ''; // 流式响应累计内容
let currentLoadingElement = null; // 当前动态加载状态元素
const API_URL = 'https://api.coze.cn/v1/workflow/stream_run'; // 固定接口地址
const WORKFLOW_ID = '7613706615358914575'; // 固定工作流ID

/* 初始化history数组，用于存储最近10轮对话 */
let history = [];

/* ===================== 聊天记录上下文管理功能 ===================== */
/**
 * 将用户消息添加到history数组（全量保留用户输入内容）
 * @param {string} content - 用户发送的消息内容
 */
function addUserMessageToHistory(content) {
    if (!content || typeof content !== 'string') return;

    // 用户消息添加到history：全量保留用户输入内容
    history.push({
        role: "user",
        content: content
    });

    // 限制history长度：超过10轮则删除最早的一轮，仅保留最近10轮
    limitHistoryLength();
}

/**
 * 将AI回复添加到history数组（仅保留前100字符，超出部分截断）
 * @param {string} content - AI回复的消息内容
 */
function addAssistantMessageToHistory(content) {
    if (!content || typeof content !== 'string') return;

    // AI回复添加到history：仅保留前100字符，超出部分截断
    const truncatedContent = content.length > 100 ? content.substring(0, 100) : content;

    history.push({
        role: "assistant",
        content: truncatedContent
    });

    // 限制history长度：超过10轮则删除最早的一轮，仅保留最近10轮
    limitHistoryLength();
}

/**
 * 限制history数组长度：超过10轮则删除最早的一轮，仅保留最近10轮
 */
function limitHistoryLength() {
    // 每轮对话包含user和assistant两条消息，10轮对话最多20条消息
    // 但按照需求，一轮对话是指一组user+assistant，所以最多10组
    // 这里按消息条数限制：每轮2条，10轮最多20条
    while (history.length > 20) {
        history.shift(); // 删除最早的一条消息
    }
}

/* ===================== Action类型交互功能 ===================== */
/**
 * 从结果项中提取action字段
 * @param {object} resultItem - resultArr中的单项
 * @returns {object|null} action对象，不存在则返回null
 */
function extractAction(resultItem) {
    if (!resultItem || typeof resultItem !== 'object') return null;

    // 优先从resultItem.action获取
    if (resultItem.action && typeof resultItem.action === 'object') {
        return resultItem.action;
    }
    // 其次从return_text.action获取
    if (resultItem.return_text && typeof resultItem.return_text === 'object' && resultItem.return_text.action) {
        return resultItem.return_text.action;
    }
    // 最后尝试直接使用resultItem.action（字符串类型）
    if (resultItem.action) {
        return typeof resultItem.action === 'string' ? { action: resultItem.action, content: resultItem.content || '', path: resultItem.path || '' } : resultItem.action;
    }
    return null;
}

/**
 * 从结果项中提取文本内容
 * @param {object} resultItem - resultArr中的单项
 * @returns {string} 文本内容
 */
function extractTextContent(resultItem) {
    if (!resultItem || typeof resultItem !== 'object') return '';

    // 优先从return_text字段获取
    if (typeof resultItem.return_text === 'string') {
        return resultItem.return_text;
    }
    // return_text可能是对象，尝试提取其文本内容
    if (typeof resultItem.return_text === 'object' && resultItem.return_text) {
        // 如果return_text是对象且有text属性
        if (resultItem.return_text.text) {
            return resultItem.return_text.text;
        }
        // 否则尝试转换为字符串
        return JSON.stringify(resultItem.return_text);
    }
    // 最后尝试其他可能的字段
    return resultItem.text || resultItem.content || resultItem.message || resultItem.answer || '';
}

/**
 * 渲染action操作方块
 * @param {object} action - action对象
 * @param {jQuery} messageElement - .bot-message元素
 */
function renderActionBlock(action, messageElement) {
    if (!action || typeof action !== 'object') return;

    const actionType = action.action;
    const content = action.content || '';
    const path = action.path || '';

    // 检查actionType是否有效
    if (!actionType || typeof actionType !== 'string') {
        return;
    }

    // 创建操作方块容器
    const actionBlock = $('<div class="action-block"></div>');
    /* 【强制修复渲染顺序】设置action方块order为2，确保在文本（order:1）下方显示 */
    actionBlock.css('order', '2');

    // 根据类型渲染不同内容
    switch(actionType) {
        case 'query':
            // query类型：展示自动查询状态
            const queryContent = content || '数据';
            actionBlock.html(`<div class="action-query">前端查询【${queryContent}】自动进行中...</div>`);
            log(`前端API查询【${queryContent}】自动进行中...`);
            break;
        case 'confirm':
            // confirm类型：并排两个按钮
            const confirmContent = content || '确认操作';
            actionBlock.html(`
                <button class="action-btn action-btn-primary confirm-main">${confirmContent}</button>
                <button class="action-btn action-btn-secondary confirm-cancel">取消</button>
            `);
            // 绑定点击事件
            actionBlock.find('.confirm-main').on('click', function() {
                const btn = $(this);
                btn.prop('disabled', true).text('已操作');
                log(`【${confirmContent}】`);
            });
            actionBlock.find('.confirm-cancel').on('click', function() {
                actionBlock.remove();
            });
            break;
        case 'human':
            // human类型：通栏主按钮
            const humanContent = content || '联系人工客服';
            actionBlock.html(`<button class="action-btn action-btn-primary action-btn-full human-btn">${humanContent}</button>`);
            actionBlock.find('.human-btn').on('click', function() {
                const btn = $(this);
                btn.prop('disabled', true).text('联系中');
                log('【人工客服联系中】');
            });
            break;
        case 'html':
            // html类型：通栏主按钮，新窗口打开链接
            // 检查path是否为空，为空则不渲染
            if (!path || path.trim() === '') {
                return;
            }
            // 检查path是否包含协议，若无则添加https
            let href = path;
            if (href && !href.match(/^https?:\/\//)) {
                href = 'https://' + href;
            }
            const htmlContent = content || '查看详情';
            actionBlock.html(`<a class="action-btn action-btn-primary action-btn-full html-link" href="${href}" target="_blank" rel="noopener noreferrer">${htmlContent}</a>`);
            break;
        default:
            // 未知类型不渲染
            return;
    }

    // 将操作方块添加到气泡容器中（放在文本正下方）
    messageElement.append(actionBlock);
}

// 页面初始化
$(document).ready(function() {
    // Token 输入框自动填充：页面加载时从localStorage读取缓存的token
    try {
        const cachedToken = localStorage.getItem(TOKEN_CACHE_KEY);
        if (cachedToken !== null && cachedToken !== '') {
            $('#tokenInput').val(cachedToken);
            token = cachedToken.trim();
            log(`Token 已从缓存填充: ***${token.slice(-4)}`);
        }
    } catch (error) {
        // localStorage可能被浏览器禁用，此处静默失败，不影响页面其他功能
        console.warn('localStorage不可用，token缓存功能将失效:', error.message);
    }

    // Token 输入框实时绑定
    $('#tokenInput').on('input', function() {
        token = $(this).val().trim();
        log(`Token 已更新: ${token ? '***' + token.slice(-4) : '空'}`);

        // 实时缓存输入内容到localStorage
        try {
            if (token) {
                localStorage.setItem(TOKEN_CACHE_KEY, token);
            } else {
                // 输入框内容清空时，同步清空localStorage中的对应缓存
                localStorage.removeItem(TOKEN_CACHE_KEY);
            }
        } catch (error) {
            // localStorage可能被浏览器禁用，此处静默失败，不影响页面其他功能
            console.warn('localStorage不可用，token缓存功能将失效:', error.message);
        }
    });

    // 发送按钮点击事件
    $('#sendBtn').on('click', sendMessage);

    // 输入框回车发送（Enter 发送，Ctrl+Enter/Shift+Enter 换行）
    $('#chatInput').on('keydown', function(e) {
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    /* ===================== 输入框字符长度限制与实时计数功能 ===================== */
    // 字符上限：100字符，统一按JS字符串length计数
    const MAX_CHARS = 100;
    const $chatInput = $('#chatInput');
    const $charCountDisplay = $('#charCountDisplay');

    /**
     * 更新字符计数显示：实时显示「当前字符数/100」，无内容时自动隐藏
     */
    function updateCharCount() {
        const text = $chatInput.val();
        const length = text.length;
        // 更新计数显示文本
        $charCountDisplay.text(`${length}/${MAX_CHARS}`);
        // 根据字符数显示/隐藏计数展示
        if (length > 0) {
            $charCountDisplay.show();
        } else {
            $charCountDisplay.hide();
        }
    }

    /**
     * 输入框内容长度校验：确保内容不超过100字符，超长时自动截断
     */
    function validateInputLength() {
        const text = $chatInput.val();
        const length = text.length;
        if (length > MAX_CHARS) {
            // 自动截断至前100个字符（保留原有光标位置？但截断后光标会移至末尾，符合预期）
            const truncated = text.substring(0, MAX_CHARS);
            $chatInput.val(truncated);
            // 截断后重新更新计数
            updateCharCount();
            // 可选：给用户一个视觉提示（如轻微抖动），但为最小化改动，暂不添加
        }
    }

    /**
     * 输入事件监听：实时更新计数，并进行长度校验
     */
    $chatInput.on('input', function() {
        // 先进行长度校验，确保内容不会超过上限（处理直接输入、删除、剪切等）
        validateInputLength();
        // 更新计数显示
        updateCharCount();
    });

    /**
     * 粘贴事件监听：在粘贴内容插入前进行截断处理，避免超长内容一次性填入
     */
    $chatInput.on('paste', function(e) {
        // 获取剪贴板文本
        const clipboardData = e.originalEvent.clipboardData || window['clipboardData'];
        if (!clipboardData) return; // 无法获取剪贴板则放行，由input事件处理
        const pastedText = clipboardData.getData('text');
        if (!pastedText) return;
        // 如果粘贴文本超过长度限制，则截断并阻止默认粘贴行为，手动插入截断后的文本
        if (pastedText.length > MAX_CHARS) {
            e.preventDefault();
            const truncated = pastedText.substring(0, MAX_CHARS);
            // 获取当前光标位置
            const start = this.selectionStart;
            const end = this.selectionEnd;
            const currentValue = $chatInput.val();
            // 插入截断后的文本（替换选区）
            const newValue = currentValue.substring(0, start) + truncated + currentValue.substring(end);
            $chatInput.val(newValue);
            // 移动光标到插入位置之后
            const newCursorPos = start + truncated.length;
            this.setSelectionRange(newCursorPos, newCursorPos);
            // 触发input事件以更新计数
            $chatInput.trigger('input');
        }
        // 如果粘贴文本未超长，则交由浏览器默认粘贴处理，input事件会随后触发
    });

    /**
     * 按键事件监听：在达到上限时，禁止输入新字符（但允许删除、退格、剪切等操作）
     */
    $chatInput.on('keydown', function(e) {
        const text = $chatInput.val();
        const length = text.length;
        // 以下按键允许即使达到上限也能执行：删除、退格、剪切、全选、光标移动等
        const allowedKeys = [
            'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
            'Home', 'End', 'Tab', 'Escape', 'Meta', 'Control', 'Alt', 'Shift'
        ];
        // 组合键：Ctrl+A, Ctrl+C, Ctrl+V（已由paste事件处理）, Ctrl+X等允许
        if (e.ctrlKey || e.metaKey) return; // 允许所有Ctrl/Cmd组合键
        if (allowedKeys.includes(e.key)) return;
        // 当内容已达上限，且按下的不是允许的按键，则阻止输入
        if (length >= MAX_CHARS && !e.key.match(/^F[1-9]|F1[0-2]$/)) { // 功能键除外
            e.preventDefault();
            // 可选：给出提示音或视觉反馈，但为最小化改动，暂不添加
        }
    });

    // 初始化：更新一次计数（初始隐藏）
    updateCharCount();

    /* ===================== 字符限制与计数功能结束 ===================== */

    // 初始化日志
    log('Agent已启动，若token超过使用次数上限/已失效，请联系大星获取新的token');

    /* ===================== 快速问题引导按钮功能（新增） ===================== */
    /**
     * 隐藏快速引导按钮组
     * 用户点击任意引导按钮或手动发送消息后调用
     */
    function hideQuickGuide() {
        $('#quickGuideContainer').addClass('hidden');
    }

    /**
     * 快速引导按钮点击事件
     * 点击后将按钮文案填入输入框并自动触发发送
     */
    $('#quickGuideContainer').on('click', '.quick-guide-btn', function() {
        const $btn = $(this);
        const text = $btn.data('text') || $btn.text();

        // 将按钮文案填入输入框
        const $chatInput = $('#chatInput');
        $chatInput.val(text);

        // 触发input事件以更新字符计数显示
        $chatInput.trigger('input');

        // 隐藏快速引导按钮组
        hideQuickGuide();

        // 自动触发发送
        sendMessage();
    });
    /* ===================== 快速引导按钮功能结束 ===================== */
});

/**
 * 输出日志到日志区和控制台
 * @param {string} message - 日志内容
 */
function log(message) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
    const logItem = $('<div class="log-item"></div>');
    logItem.append(`<span class="log-time">[${timeStr}]</span>`);
    logItem.append(`<span class="log-content">${message}</span>`);
    $('#logsContainer').append(logItem);
    scrollLogsToBottom();
    console.log(`[${timeStr}]`, message);
}

/**
 * 聊天区滚动到底部
 */
function scrollChatToBottom() {
    const container = $('#messagesContainer');
    container.scrollTop(container[0].scrollHeight);
}

/**
 * 日志区滚动到底部
 */
function scrollLogsToBottom() {
    const container = $('#logsContainer');
    container.scrollTop(container[0].scrollHeight);
}

/**
 * 添加用户消息到聊天框
 * @param {string} content - 消息内容
 */
function addUserMessage(content) {
    const messageDiv = $('<div class="message user-message"></div>');
    const avatar = $('<div class="avatar user-avatar"><span class="avatar-icon">您</span></div>');
    const bubble = $('<div class="message-bubble user-bubble"></div>').text(content);
    messageDiv.append(avatar).append(bubble);
    $('#messagesContainer').append(messageDiv);
    scrollChatToBottom();
}

/**
 * 添加或更新机器人消息到聊天框（支持打字机效果和Action操作方块）
 * @param {string} content - 消息内容
 * @param {boolean} isStreaming - 是否为流式更新
 * @param {object|null} action - action对象，用于渲染操作方块
 */
function addBotMessage(content, isStreaming = false, action = null) {
    /* 判断是否为「无文本仅action」场景：内容为空（或仅空白字符）且存在action */
    const isEmptyContent = !content || content.trim() === '';
    const hasActionOnly = isEmptyContent && action;

    if (!isStreaming || !currentBotMessageElement) {
        // 新建消息
        const messageDiv = $('<div class="message bot-message"></div>');
        const avatar = $('<div class="avatar bot-avatar"><span class="avatar-icon">AI</span></div>');
        const bubble = $('<div class="message-bubble bot-bubble"></div>').text(content);
        // 创建气泡容器：垂直排列文本和action方块
        const bubbleContainer = $('<div class="message-bubble-container"></div>');

        /* 【UI优化】无文本仅action场景：隐藏空的消息气泡，避免UI空白占位 */
        if (hasActionOnly) {
            // 为气泡添加隐藏类，不占用空间
            bubble.addClass('bubble-hidden');
        }

        /* 【强制修复渲染顺序】先插入return_text文本节点，确保文本在上 */
        bubbleContainer.append(bubble);
        messageDiv.append(avatar).append(bubbleContainer);
        $('#messagesContainer').append(messageDiv);
        currentBotMessageElement = bubble;

        // 渲染action操作方块（仅在新建消息时渲染，流式更新不重复渲染）
        if (action) {
            /* 【强制修复渲染顺序】文本节点插入完成后，再在下方插入action操作方块节点 */
            renderActionBlock(action, bubbleContainer); // 将action方块添加到气泡容器内
        }
    } else {
        // 流式更新现有消息
        currentBotMessageElement.text(content);
    }
    scrollChatToBottom();
}

/**
 * 显示加载状态
 */
function showLoading() {
    // 获取最新的用户消息元素
    const lastUserMessage = $('#messagesContainer .user-message:last');
    if (lastUserMessage.length === 0) {
        // 没有用户消息，不显示加载状态
        console.warn('没有用户消息，不显示加载状态');
        return;
    }

    // 移除之前可能存在的动态加载状态
    if (currentLoadingElement) {
        currentLoadingElement.remove();
        currentLoadingElement = null;
    }

    // 克隆模板加载容器
    const loadingTemplate = $('#loadingContainer');
    const loadingClone = loadingTemplate.clone();
    loadingClone.removeAttr('id').addClass('dynamic-loading').show();

    // 插入到最新用户消息之后
    lastUserMessage.after(loadingClone);
    currentLoadingElement = loadingClone;

    // 获取克隆容器中的文本元素
    const loadingText = loadingClone.find('.loading-text');

    let textIndex = 0;
    const texts = ['创造 AI 客服正在思考中...', '创造 AI 客服问题分析中...'];

    // 清除之前的定时器
    if (loadingTextInterval) {
        clearInterval(loadingTextInterval);
    }

    loadingText.text(texts[textIndex]);
    loadingTextInterval = setInterval(function() {
        textIndex = (textIndex + 1) % texts.length;
        loadingText.fadeOut(300, function() {
            $(this).text(texts[textIndex]).fadeIn(300);
        });
    }, 1000);

    // 滚动到底部，确保加载状态可见
    scrollChatToBottom();
}

/**
 * 隐藏加载状态
 */
function hideLoading() {
    // 隐藏模板容器（虽然本来就隐藏）
    $('#loadingContainer').hide();

    // 移除动态加载状态元素
    if (currentLoadingElement) {
        currentLoadingElement.remove();
        currentLoadingElement = null;
    }

    // 清除文本切换定时器
    if (loadingTextInterval) {
        clearInterval(loadingTextInterval);
        loadingTextInterval = null;
    }

    currentBotMessageElement = null;
    accumulatedResponse = '';
}

/**
 * 解析SSE流式响应行，提取JSON数据
 * @param {string} line - SSE单行数据
 * @returns {object|null} 解析后的JSON对象，无效行返回null
 */
function parseSSELine(line) {
    // 过滤空行和注释行
    if (!line || line.startsWith(':')) return null;
    // 匹配data: 开头的行
    const match = line.match(/^data:\s*(.*)$/);
    if (!match) return null;
    const dataStr = match[1].trim();
    // 结束标识
    if (dataStr === '[DONE]') return { done: true };
    // 解析JSON
    try {
        return JSON.parse(dataStr);
    } catch (e) {
        log(`SSE数据解析失败: ${e.message}, 原始内容: ${dataStr}`);
        return null;
    }
}

/**
 * 发送消息核心逻辑（原生fetch实现curl接口）
 */
async function sendMessage() {
    const chatInput = $('#chatInput');
    const sendBtn = $('#sendBtn');
    const userInput = chatInput.val().trim();

    // 前置校验
    if (!token) {
        log('请先填写 Agent token');
        alert('请先填写 Agent token');
        return;
    }
    if (!userInput) {
        log('聊天输入框内容为空，禁止发送');
        return;
    }
    if (isLoading) {
        log('正在处理上一条消息，请稍候');
        return;
    }

    /* 用户发送消息后，隐藏快速引导按钮组（新增） */
    $('#quickGuideContainer').addClass('hidden');

    /* ===================== 敏感词检测（用户输入） ===================== */
    // 调用judgeMessage检测用户输入是否包含敏感词
    if (typeof judgeMessage === 'function' && !judgeMessage(userInput)) {
        // 获取匹配到的敏感词列表
        const matchedWords = typeof getMatchedSensitiveWords === 'function'
            ? getMatchedSensitiveWords(userInput)
            : [];
        const sensitiveWordsStr = matchedWords.length > 0 ? `${matchedWords.join('、')}` : '';

        // 【重要】敏感词拦截：用户消息显示在聊天框，但不放入history，直接返回拦截提示
        isLoading = true;
        chatInput.prop('disabled', true);
        sendBtn.prop('disabled', true);

        // 用户消息显示在聊天框（但不加入history）
        addUserMessage(userInput);
        chatInput.val('').trigger('input');

        // 显示加载状态
        showLoading();

        // 短暂延迟后恢复输入状态
        setTimeout(function() {
            // 隐藏加载状态
            hideLoading();

            // 显示拦截提示，日志中输出具体敏感词
            log(`用户输入包含敏感词：【${sensitiveWordsStr}】，已拦截`);
            addBotMessage('我们有责任确保每一次的交流都是正向的。对于您的这个问题，我们无法提供帮助。您是否可以提供其他的问题或者方向?', false);

            isLoading = false;
            chatInput.prop('disabled', false);
            sendBtn.prop('disabled', false);
            log('输入框和按钮已恢复可用');
        }, 1500);
        return;
    }
    /* ===================== 敏感词检测结束 ===================== */

    // 禁用输入框和按钮，防止重复提交
    isLoading = true;
    chatInput.prop('disabled', true);
    sendBtn.prop('disabled', true);

    // 添加用户消息到聊天框
    addUserMessage(userInput);
    log(`用户发送消息: ${userInput}`);

    /* 用户消息添加到history：全量保留用户输入内容 */
    addUserMessageToHistory(userInput);

    // 清空输入框，并触发input事件以更新字符计数显示
    chatInput.val('').trigger('input');

    // 显示加载状态
    showLoading();

    try {
        // 构建请求参数（完全匹配curl格式）
        const requestBody = {
            workflow_id: WORKFLOW_ID,
            parameters: {
                "CONVERSATION_NAME": "Default",
                "USER_INPUT": userInput,
                "content": userInput,
                "token": token,
                /* 接口传参：将history数组添加到请求参数中 */
                "history": history
            }
        };

        // log(`开始调用Agent接口: ${API_URL}`);
        // log(`请求Body: ${JSON.stringify(requestBody)}`);

        // 发起fetch POST请求，开启流式响应
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer pat_Zrxp5WO894lny1nXLUOAe8No1A5BsDQWgSJTYKCDUHtdPivIr1dz9CKxb3NRxif2`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
            signal: AbortSignal.timeout(120000) // 120秒超时
        });

        // 接口返回非200状态码处理
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`业务繁忙，请稍后再试-7，状态码: ${response.status}, 错误信息: ${errorText}`);
        }

        // 检查是否为流式响应
        if (!response.body) {
            throw new Error('接口未返回流式响应体');
        }

        log('流式连接已建立，开始接收数据...');

        // 初始化流式读取器
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = ''; // 缓冲区，处理分块数据

        // 循环读取流式数据
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                // log('流式数据接收完成');
                break;
            }

            // 解码二进制数据，追加到缓冲区
            buffer += decoder.decode(value, { stream: true });
            // 按换行符分割行，处理SSE格式
            const lines = buffer.split('\n');
            // 保留最后一行不完整的数据到缓冲区
            buffer = lines.pop() || '';

            // 逐行解析
            for (const line of lines) {
                const parsedData = parseSSELine(line);
                if (!parsedData) continue;
                if (parsedData.done) break;

                // 打印完整返回数据到控制台和日志
                console.log('接口返回完整chunk:', parsedData);
                // log(`接口返回数据: ${JSON.stringify(parsedData)}`);

                // 提取内容（适配Coze接口常见返回字段，可根据实际返回结构调整）
                let content = '';
                if (typeof parsedData === 'object') {
                    // 优先级从高到低匹配内容字段
                    content = parsedData.content || 
                              parsedData.data || 
                              parsedData.message || 
                              parsedData.answer || 
                              '';
                }

                // 有内容则追加到回复，实现打字机效果
                if (content) {
                    accumulatedResponse += content;
                    
                }
            }
        }
        console.log('最终累计回复JSON:', JSON.parse(accumulatedResponse));

        try {
        result = JSON.parse(accumulatedResponse);
        }catch(e){
            log(`最终回复JSON解析失败: ${e.message}, 原始内容: ${accumulatedResponse}`);
            const parseErrorMsg = '访问人数过多，业务繁忙，请稍后再试-1';
            addBotMessage(parseErrorMsg, false);
            /* AI回复添加到history：仅保留前100字符 */
            addAssistantMessageToHistory(parseErrorMsg);
            return;
        }
        
        // 根据接口返回状态处理消息渲染
        if (result?.state != 1) {
            // 状态非1：显示错误消息
            const errorMessage = result?.message || '接口返回错误状态';
            addBotMessage(errorMessage, false);
            log(`Agent调用完成，错误状态: ${errorMessage}`);
            /* AI回复添加到history：仅保留前100字符 */
            addAssistantMessageToHistory(errorMessage);
        } else {
            // 状态为1：正常处理resultArr
            const resultArr = result.resultArr || [];
            let replySummary = ''; // 用于日志记录的回复摘要
            let allAssistantContent = ''; // 用于合并所有AI回复内容，添加到history

            if (resultArr.length === 1) {
                // 单个问题：直接渲染一条消息
                const item = resultArr[0];
                const content = extractTextContent(item); // 提取文本内容
                const action = extractAction(item); // 提取action字段
                /* ===================== 敏感词过滤（API返回内容） ===================== */
                // 对API返回内容进行敏感词过滤（跳过标点符号）
                const filteredContent = (typeof filterApiResponse === 'function') ? filterApiResponse(content) : content;
                /* ===================== 敏感词过滤结束 ===================== */
                addBotMessage(filteredContent, false, action);
                replySummary = filteredContent.substring(0, 100) + (filteredContent.length > 100 ? '...' : '');
                /* AI回复添加到history：仅保留前100字符 */
                addAssistantMessageToHistory(filteredContent);
            } else {
                // 多个问题：先渲染说明消息，再逐条渲染
                const count = resultArr.length;
                addBotMessage(`整理了一下您的${count}个问题`, false);
                replySummary = `整理了${count}个问题`;

                for (let i = 0; i < resultArr.length; i++) {
                    const item = resultArr[i];
                    const qr = item.QR || `问题 ${i + 1}`;
                    const content = extractTextContent(item);
                    const action = extractAction(item);
                    /* ===================== 敏感词过滤（API返回内容） ===================== */
                    // 对API返回内容进行敏感词过滤
                    const filteredContent = (typeof filterMessage === 'function') ? filterMessage(content) : content;
                    /* ===================== 敏感词过滤结束 ===================== */
                    // 组合QR和内容作为一条消息
                    const messageContent = `${i + 1}. ${qr}\n${filteredContent}`;
                    addBotMessage(messageContent, false, action);
                    /* 合并所有AI回复内容，用于添加到history */
                    allAssistantContent += (allAssistantContent ? '\n' : '') + messageContent;
                }

                /* AI回复添加到history：多个问题时，合并所有回复内容后添加，仅保留前100字符 */
                addAssistantMessageToHistory(allAssistantContent);
            }

            // 记录日志
            log(`Agent调用完成，${replySummary}`);
        }
        // 无内容时给用户提示（保留原有逻辑，但正常情况下不会触发）
        if (!result || !result.resultArr || result.resultArr.length === 0) {
            const noContentMsg = '业务繁忙，请稍后再试-3';
            addBotMessage(noContentMsg, false);
            /* AI回复添加到history：仅保留前100字符 */
            addAssistantMessageToHistory(noContentMsg);
        }

    } catch (error) {
        // 全场景错误处理
        console.error('接口调用报错:', error);
        const errorMsg = error.name === 'TimeoutError'
            ? '业务繁忙，请稍后再试-4'
            : error.message || '业务繁忙，请稍后再试-5';
        log(`请求失败: ${errorMsg}`);
        const catchErrorMsg = '业务繁忙，请稍后再试-6';
        addBotMessage(catchErrorMsg, false);
        /* AI回复添加到history：仅保留前100字符 */
        addAssistantMessageToHistory(catchErrorMsg);
    } finally {
        // 最终恢复状态，无论成功失败都执行
        hideLoading();
        isLoading = false;
        chatInput.prop('disabled', false);
        sendBtn.prop('disabled', false);
        log('输入框和按钮已恢复可用');
    }
}