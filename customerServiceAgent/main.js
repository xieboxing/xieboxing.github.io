// 全局变量
const TOKEN_CACHE_KEY = 'page_token_cache'; // localStorage存储token的键名
let token = '';
let isLoading = false;
let loadingTextInterval = null;
let currentBotMessageElement = null; // 当前正在更新的机器人消息元素
let accumulatedResponse = ''; // 流式响应累计内容
let currentLoadingElement = null; // 当前动态加载状态元素
const API_URL = 'https://api.coze.cn/v1/workflow/stream_run'; // 固定接口地址
const WORKFLOW_ID = '7613706615358914575'; // 固定工作流ID

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

    // 初始化日志
    log('Agent已启动，若 token 使用次数超过上限，请联系大星获取新的 token');
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
    const avatar = $('<div class="avatar user-avatar"><i class="fas fa-user"></i></div>');
    const bubble = $('<div class="message-bubble user-bubble"></div>').text(content);
    messageDiv.append(avatar).append(bubble);
    $('#messagesContainer').append(messageDiv);
    scrollChatToBottom();
}

/**
 * 添加或更新机器人消息到聊天框（支持打字机效果）
 * @param {string} content - 消息内容
 * @param {boolean} isStreaming - 是否为流式更新
 */
function addBotMessage(content, isStreaming = false) {
    if (!isStreaming || !currentBotMessageElement) {
        // 新建消息
        const messageDiv = $('<div class="message bot-message"></div>');
        const avatar = $('<div class="avatar bot-avatar"><i class="fas fa-robot"></i></div>');
        const bubble = $('<div class="message-bubble bot-bubble"></div>').text(content);
        messageDiv.append(avatar).append(bubble);
        $('#messagesContainer').append(messageDiv);
        currentBotMessageElement = bubble;
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

    // 禁用输入框和按钮，防止重复提交
    isLoading = true;
    chatInput.prop('disabled', true);
    sendBtn.prop('disabled', true);

    // 添加用户消息到聊天框
    addUserMessage(userInput);
    log(`用户发送消息: ${userInput}`);

    // 清空输入框
    chatInput.val('');

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
                "token": token
            }
        };

        log(`开始调用Agent接口: ${API_URL}`);
        log(`请求Body: ${JSON.stringify(requestBody)}`);

        // 发起fetch POST请求，开启流式响应
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer pat_Zrxp5WO894lny1nXLUOAe8No1A5BsDQWgSJTYKCDUHtdPivIr1dz9CKxb3NRxif2`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
            signal: AbortSignal.timeout(60000) // 60秒超时
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
                log('流式数据接收完成');
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
                log(`接口返回数据: ${JSON.stringify(parsedData)}`);

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
            addBotMessage('访问人数过多，业务繁忙，请稍后再试-1', false);
            return;
        }
        
        let showResult = ''; // 重置累计回复变量，用于最终展示
        if(result?.state != 1){
            showResult = result?.message || '接口返回错误状态';
        }else{
            if(result.resultArr.length==1){
                showResult += result?.resultArr[0].return_text;
                if(result?.resultArr[0].return_text?.action&&Object.keys(result?.resultArr[0].return_text).length==1){
                    showResult += `${JSON.stringify(result?.resultArr[0].return_text?.action)}\n`;
                }
            }else{  
                showResult += `我整理了一下您的${result?.resultArr?.length || "n"} 个问题\n`;
                for(let i=0;i<result?.resultArr?.length;i++){
                    showResult += `\n${i + 1}. ${result?.resultArr[i].QR}\n`;
                    showResult += `${result?.resultArr[i].return_text}\n`;
                    if(result?.resultArr[i].return_text?.action&&Object.keys(result?.resultArr[i].return_text).length==1){
                        showResult += `${JSON.stringify(result?.resultArr[i].return_text?.action)}\n`;
                    }
                }
                
            }
            showResult = showResult || '业务繁忙，请稍后再试-2';
        }
        addBotMessage(showResult, true);


        log(`Agent调用完成，最终回复: ${showResult || '无返回内容'}`);
        // 无内容时给用户提示
        if (!showResult) {
            addBotMessage('业务繁忙，请稍后再试-3', false);
        }

    } catch (error) {
        // 全场景错误处理
        console.error('接口调用报错:', error);
        const errorMsg = error.name === 'TimeoutError' 
            ? '业务繁忙，请稍后再试-4' 
            : error.message || '业务繁忙，请稍后再试-5';
        log(`请求失败: ${errorMsg}`);
        addBotMessage('业务繁忙，请稍后再试-6', false);
    } finally {
        // 最终恢复状态，无论成功失败都执行
        hideLoading();
        isLoading = false;
        chatInput.prop('disabled', false);
        sendBtn.prop('disabled', false);
        log('输入框和按钮已恢复可用');
    }
}