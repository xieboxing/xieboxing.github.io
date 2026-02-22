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

            if ($copyBtn.length && $toast.length) {
                $copyBtn.on('click', function() {
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
                });
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

            // 移动端无进度条，但保留函数
        });
