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
