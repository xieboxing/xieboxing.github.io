### `skill.md` 内容

```markdown
---
name: personal-tool-dev
description: 专门用于在tool/文件夹内开发单文件HTML小工具，使用内联CSS和JavaScript。
---

# 背景
这是一个专门为开发个人小工具定制的 Skill。
所有开发工作**仅限于** `tool/` 目录，且必须采用单文件 HTML 模式（HTML/CSS/JS 写在同一个文件中）。

# 工作范围
- **仅操作目录**：`tool/`
- **忽略文件**：项目根目录的 `index.html`、`static/` 文件夹等所有非 tool/ 目录下的内容。

# 目录结构
工具文件应直接放置在 tool/ 目录下：
```
/
├── index.html          (忽略)
├── static/             (忽略)
└── tool/               (仅在此目录下开发)
    ├── index.html
    ├── tool.html
    └── ...
```

# 使用指南
当用户进行以下操作时，请使用此 Skill：
1. 在 `tool/` 目录下创建新的小工具
2. 新增/修改 `tool/` 目录下的 HTML 文件
3. 编写单文件应用逻辑

## 核心原则：单文件开发
**所有代码（HTML结构、CSS样式、JavaScript逻辑）必须写在同一个 `.html` 文件中。**
- 不允许创建单独的 `.css` 或 `.js` 文件。
- CSS 必须写在 `<style>` 标签内。
- JavaScript 必须写在 `<script>` 标签内。

## HTML 规范
- 使用标准的 HTML5 DOCTYPE 声明。
- 结构清晰，包含 `<head>` 和 `<body>`。

## CSS 规范
- 必须内联在 HTML 的 `<head>` 中的 `<style>` 标签内。
- 可以自由使用 Font Awesome 图标类（通过 CDN 引入）。

## JavaScript 规范
- 必须内联在 HTML 的 `<body>` 结束标签前的 `<script>` 标签内。
- 可以使用 jQuery 3.5.1（通过 CDN 引入）。

## 推荐的 HTML 模板
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>工具名称</title>
    <!-- 引入 Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        /* 在这里写所有的 CSS */
        body {
            /* styles */
        }
    </style>
</head>
<body>
    <!-- 在这里写 HTML 结构 -->
    <div id="app">
        <!-- content -->
    </div>

    <!-- 引入 jQuery (可选) -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>
    <script>
        // 在这里写所有的 JavaScript
        console.log('Hello Tool');
    </script>
</body>
</html>
```
```