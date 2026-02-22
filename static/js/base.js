// script.js - jQuery版本 (基于jQuery 3.5.1)

$(function() {
    // 设置页脚当前年份
    $('#current-year').text(new Date().getFullYear());

    // 控制台欢迎语
    console.log('谢先生 · 产品经理官网 | H5深度适配 | 9年+复合经验 (jQuery版)');

    // 安全处理外部链接
    $('a[href^="http"]').attr({
        'target': '_blank',
        'rel': 'noopener noreferrer'
    });

    // 使用 IntersectionObserver 实现滚动淡入 (保留原生API，用jQuery操作样式)
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                $(entry.target).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '20px' });

    // 观察卡片元素 (技能、项目、时间线项)
    $('.skill-card, .project-card, .timeline-item').each(function() {
        var el = this;
        $(el).css({
            'opacity': '0',
            'transform': 'translateY(8px)',
            'transition': 'opacity 0.3s ease, transform 0.25s ease'
        });
        observer.observe(el);
    });

    // 触摸优化：为可点击元素添加 touchstart 监听 (仅用于触发CSS active)
    $('a, .contact-item, .skill-card, .project-card').on('touchstart', function(e) {
        // 空函数，passive模式允许浏览器优化滚动
    }, { passive: true });
});