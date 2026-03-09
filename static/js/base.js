        $(function() {
            // 年份
            $('#current-year').text(new Date().getFullYear());

            // 外部链接安全
            $('a[href^="http"]').attr({ target: '_blank', rel: 'noopener noreferrer' });

            // 垂直进度条
            var $win = $(window);
            var $doc = $(document);
            var $fill = $('#scroll-progress-fill');
            function updateProgress() {
                var winH = $win.height();
                var docH = $doc.height();
                var scrollTop = $win.scrollTop();
                var percent = (scrollTop / (docH - winH)) * 100;
                percent = Math.min(100, Math.max(0, percent));
                $fill.css('height', percent + '%');
            }
            $win.on('scroll', function() { requestAnimationFrame(updateProgress); });
            updateProgress();

            // 微信复制功能
            var $copyBtn = $('.copy-wechat-btn');
            var $toast = $('#wechat-toast');
            var wechatId = $copyBtn.data('wechat') || 'Boxing-88888';

            // 事件委托：在document级别监听按钮点击和触摸事件，确保即使事件冒泡被阻止也能触发
            function handleCopyButtonClick(event) {
                console.log('事件委托：复制按钮被点击');
                event.stopPropagation(); // 阻止事件冒泡，避免可能的冲突

                // 对于touch事件，阻止默认行为以防止触发两次
                if (event.type === 'touchend') {
                    event.preventDefault();
                }

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(wechatId).then(function() {
                        showToast('微信号已复制');
                    }).catch(function(err) {
                        console.error('复制失败:', err);
                        fallbackCopy(wechatId);
                    });
                } else {
                    fallbackCopy(wechatId);
                }
            }

            // 同时监听click和touchend事件
            $(document).on('click', '.copy-wechat-btn', handleCopyButtonClick);
            $(document).on('touchend', '.copy-wechat-btn', handleCopyButtonClick);

            // 保留按钮存在性检查，但不绑定额外事件（事件委托已足够）
            if (!$copyBtn.length) {
                console.warn('复制微信号按钮未找到');
            }
            if (!$toast.length) {
                console.warn('Toast提示元素未找到');
            }

            function showToast(message) {
                $toast.find('span').text(message);
                $toast.addClass('show');
                setTimeout(function() {
                    $toast.removeClass('show');
                }, 2000);
            }

            function fallbackCopy(text) {
                var textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    // @ts-ignore - document.execCommand is deprecated but needed for fallback support
                    var successful = document.execCommand('copy');
                    if (successful) {
                        showToast('微信号已复制');
                    } else {
                        showToast('复制失败，请手动复制');
                    }
                } catch (err) {
                    console.error('复制失败:', err);
                    showToast('复制失败，请手动复制');
                }
                document.body.removeChild(textArea);
            }

            // 调试：点击左侧个人信息框后检查按钮状态
            $('.left-sidebar').on('click', function(event) {
                console.log('左侧边栏被点击', event.target);
                var btn = document.querySelector('.copy-wechat-btn');
                if (btn) {
                    console.log('=== 按钮状态检查 ===');
                    console.log('按钮display:', window.getComputedStyle(btn).display);
                    console.log('按钮pointer-events:', window.getComputedStyle(btn).pointerEvents);
                    console.log('按钮z-index:', window.getComputedStyle(btn).zIndex);
                    console.log('按钮是否可见:', btn.offsetParent !== null);
                    console.log('按钮opacity:', window.getComputedStyle(btn).opacity);
                    console.log('按钮visibility:', window.getComputedStyle(btn).visibility);
                    console.log('按钮position:', window.getComputedStyle(btn).position);

                    // 检查按钮是否被其他元素覆盖
                    var rect = btn.getBoundingClientRect();
                    var centerX = rect.left + rect.width / 2;
                    var centerY = rect.top + rect.height / 2;
                    var elementAtCenter = document.elementFromPoint(centerX, centerY);
                    console.log('按钮中心点元素:', elementAtCenter);
                    console.log('按钮中心点元素是否是按钮本身:', elementAtCenter === btn);

                    // 检查按钮父元素链
                    var parent = btn.parentElement;
                    var parentChain = [];
                    while (parent) {
                        parentChain.push(parent.tagName + (parent.className ? '.' + parent.className : ''));
                        parent = parent.parentElement;
                    }
                    console.log('按钮父元素链:', parentChain.join(' > '));

                    // 检查按钮是否有覆盖层
                    var overlayingElements = [];
                    var elements = document.elementsFromPoint(centerX, centerY);
                    for (var i = 0; i < elements.length; i++) {
                        if (elements[i] === btn) break;
                        overlayingElements.push(elements[i].tagName + (elements[i].className ? '.' + elements[i].className : ''));
                    }
                    console.log('覆盖按钮的元素:', overlayingElements.length > 0 ? overlayingElements : '无');

                    console.log('=== 检查结束 ===');
                }
            });

            // 移动端无进度条，但保留函数
        });

        /* 检测移动端设备与深色模式，仅在移动端执行适配逻辑 */
        (function() {
            // 检测是否为移动端
            function isMobileDevice() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    (window.innerWidth <= 900 && window.innerHeight <= 1024);
            }

            // 检测是否开启深色模式
            function isDarkMode() {
                return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            }

            // 仅在移动端且深色模式下执行适配
            if (isMobileDevice() && isDarkMode()) {
                console.log('检测到移动端深色模式，执行样式锁定适配');

                // 在html标签上添加深色模式标识类，供CSS使用
                document.documentElement.classList.add('dark-mode-detected');

                // 强制设置meta viewport，防止浏览器缩放导致样式错乱（可选）
                var metaViewport = document.querySelector('meta[name="viewport"]');
                if (metaViewport) {
                    var content = metaViewport.getAttribute('content');
                    if (content.indexOf('maximum-scale') === -1) {
                        metaViewport.setAttribute('content', content + ', maximum-scale=1.0');
                    }
                }

                // 监听深色模式变化，如果用户切换模式，重新锁定样式
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
                    if (e.matches) {
                        document.documentElement.classList.add('dark-mode-detected');
                        console.log('深色模式已开启，重新锁定样式');
                    } else {
                        document.documentElement.classList.remove('dark-mode-detected');
                        console.log('深色模式已关闭，移除锁定');
                    }
                });
            }
        })();

/* ========== 全浏览器移动端深色模式兼容性优化 ========== */
/* 新增代码开始 - 仅新增，不修改原有JS业务逻辑 */

/* 移动端设备检测：仅在移动端执行深色模式适配逻辑 */
(function() {
    'use strict';

    // 检测是否为移动端设备
    function isMobileDevice() {
        // 用户代理检测
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        var isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(userAgent);

        // 屏幕尺寸检测
        var isSmallScreen = window.innerWidth <= 768;
        var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // 综合判断：用户代理是移动端或（小屏幕且支持触摸）
        return isMobileUA || (isSmallScreen && isTouchDevice);
    }

    // 全兼容深色模式检测：覆盖不支持标准媒体查询的老旧浏览器
    function isDarkMode() {
        // 标准媒体查询检测
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true;
        }

        // 兜底检测：检查系统主题色（仅作为备用）
        try {
            // 某些浏览器支持非标准接口
            if (window.__theme && window.__theme === 'dark') {
                return true;
            }
            if (window.systemTheme && window.systemTheme === 'dark') {
                return true;
            }
        } catch (e) {
            // 忽略错误
        }

        // 最后尝试检测背景色亮度（启发式检测）
        var computedStyle = window.getComputedStyle(document.documentElement);
        var bgColor = computedStyle.backgroundColor || computedStyle.background;
        // 简单判断是否为深色背景（粗略实现）
        if (bgColor && (bgColor.indexOf('rgb(0,') !== -1 || bgColor.indexOf('rgba(0,') !== -1 ||
            bgColor.indexOf('#000') !== -1 || bgColor.indexOf('rgb(10,') !== -1 ||
            bgColor.indexOf('rgb(16,') !== -1)) {
            return true;
        }

        return false;
    }

    // 仅在移动端执行深色模式适配
    if (isMobileDevice()) {
        console.log('移动端设备检测通过，执行深色模式兼容性优化');

        // 初始化检测
        function initDarkModeAdaptation() {
            var isDark = isDarkMode();
            var htmlEl = document.documentElement;

            if (isDark) {
                // 添加深色模式标识类
                if (!htmlEl.classList.contains('dark-mode-detected')) {
                    htmlEl.classList.add('dark-mode-detected');
                }
                console.log('深色模式检测通过，已添加优化样式类');

                // 强化meta viewport锁定，防止浏览器缩放导致样式错乱
                var metaViewport = document.querySelector('meta[name="viewport"]');
                if (metaViewport) {
                    var content = metaViewport.getAttribute('content');
                    if (content && content.indexOf('maximum-scale') === -1 && content.indexOf('user-scalable') === -1) {
                        metaViewport.setAttribute('content', content + ', maximum-scale=1.0, user-scalable=no');
                    }
                }
            } else {
                // 移除深色模式标识类
                htmlEl.classList.remove('dark-mode-detected');
                console.log('浅色模式，已移除优化样式类');
            }
        }

        // 页面加载完成后执行初始化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initDarkModeAdaptation);
        } else {
            initDarkModeAdaptation();
        }

        // 监听深色模式变化（仅当浏览器支持时）
        if (window.matchMedia) {
            var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            darkModeMediaQuery.addEventListener('change', function(e) {
                if (isMobileDevice()) {
                    if (e.matches) {
                        document.documentElement.classList.add('dark-mode-detected');
                        console.log('深色模式已开启，重新锁定样式');
                    } else {
                        document.documentElement.classList.remove('dark-mode-detected');
                        console.log('深色模式已关闭，移除锁定');
                    }
                }
            });
        }

        // 监听窗口大小变化，防止设备旋转后检测失效
        var resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (!isMobileDevice()) {
                    // 如果旋转后变为PC端，移除深色模式类
                    document.documentElement.classList.remove('dark-mode-detected');
                } else {
                    // 重新检测深色模式
                    initDarkModeAdaptation();
                }
            }, 250);
        });
    } else {
        console.log('非移动端设备，跳过深色模式兼容性优化');
    }
})();

/* 新增代码结束 */
