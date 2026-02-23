### `skill.md` 内容

```markdown
---
name: personal-website-dev
description: 个人官网专属开发Skill，遵循固定目录结构，使用原生HTML/CSS/JS、Font Awesome和jQuery进行开发
---

# 背景
这是一个专门为个人官网项目定制的开发 Skill。
项目使用原生 HTML、JavaScript 和 CSS 进行开发。

# 目录结构
在编写代码时，请严格遵循以下目录结构：
```
/
├── index.html          (主页入口)
├── static/
│   ├── css/            (样式文件存放处)
│   └── js/             (脚本文件存放处)
│   └── picture/        (图片文件存放处)
└── tool/               (忽略此文件夹，不要修改里面的内容)
```

# 使用指南
当用户进行以下操作时，请使用此 Skill：
1. 创建新的 HTML 页面或组件
2. 新增/修改 CSS 样式
3. 新增/修改 JavaScript 逻辑
4. 审查代码结构
5. 生成个人官网相关的页面代码

## 具体要求

### HTML 规范
- 所有 HTML 文件必须包含标准的 DOCTYPE 声明
- 使用语义化标签 (`<header>`, `<nav>`, `<main>`, `<footer>` 等)
- 在 `<head>` 中必须引入 Font Awesome：
  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  ```
- 在 `<body>` 结束标签前引入 jQuery（如需使用）：
  ```html
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>
  ```
- 自定义 CSS 引用路径：`<link rel="stylesheet" href="static/css/[文件名].css">`
- 自定义 JS 引用路径：`<script src="static/js/[文件名].js"></script>`

### CSS 规范
- 文件存放于 `static/css/` 目录
- 使用类名命名法，建议使用 BEM 命名规范
- 可以自由使用 Font Awesome 图标类

### JavaScript 规范
- 文件存放于 `static/js/` 目录
- 可以使用 jQuery 3.5.1 语法
- 保持代码简洁，添加必要的注释

### 重要提醒
- **不要**修改或提交 `tool/` 文件夹下的任何内容
- 保持代码格式整洁，使用 2 空格或 4 空格缩进（保持一致即可）
```