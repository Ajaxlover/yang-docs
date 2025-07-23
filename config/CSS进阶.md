---
title: CSS进阶
description: 现代CSS高级技术与最佳实践
---

# CSS进阶

## 1. CSS架构与组织

### 1.1 CSS架构方法论

#### BEM (Block Element Modifier)

BEM是一种命名约定，用于创建可重用和可维护的CSS代码。

```css
/* Block */
.card {}

/* Element */
.card__title {}
.card__image {}
.card__content {}

/* Modifier */
.card--featured {}
.card--horizontal {}
```

**优点：**
- 提高代码可读性和可维护性
- 减少CSS选择器的嵌套
- 创建模块化和可重用的组件

#### OOCSS (Object Oriented CSS)

OOCSS强调将结构与皮肤分离，以及将容器与内容分离。

```css
/* 结构 */
.btn {
  display: inline-block;
  padding: 0.5em 1em;
  border-radius: 4px;
}

/* 皮肤 */
.btn-primary {
  background-color: #0066cc;
  color: white;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
}
```

#### SMACSS (Scalable and Modular Architecture for CSS)

SMACSS将CSS规则分为五个类别：基础、布局、模块、状态和主题。

```css
/* 基础规则 */
body, h1, h2, p {
  margin: 0;
  padding: 0;
}

/* 布局规则 */
.l-header {}
.l-sidebar {}

/* 模块规则 */
.nav {}
.nav-item {}

/* 状态规则 */
.is-active {}
.is-hidden {}

/* 主题规则 */
.theme-dark {}
.theme-light {}
```

### 1.2 CSS文件组织

#### 按功能组织

```
styles/
  ├── base/
  │   ├── reset.css
  │   ├── typography.css
  │   └── variables.css
  ├── components/
  │   ├── buttons.css
  │   ├── cards.css
  │   └── forms.css
  ├── layout/
  │   ├── header.css
  │   ├── footer.css
  │   └── grid.css
  ├── pages/
  │   ├── home.css
  │   └── about.css
  └── main.css
```

#### 使用CSS预处理器

**Sass示例：**

```scss
// _variables.scss
$primary-color: #0066cc;
$secondary-color: #f5f5f5;
$border-radius: 4px;

// _mixins.scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// components/_button.scss
@import '../variables';
@import '../mixins';

.button {
  padding: 0.5em 1em;
  border-radius: $border-radius;
  
  &--primary {
    background-color: $primary-color;
    color: white;
  }
  
  &--centered {
    @include flex-center;
  }
}
```

### 1.3 CSS变量（自定义属性）

```css
:root {
  /* 颜色 */
  --color-primary: #0066cc;
  --color-secondary: #f5f5f5;
  --color-text: #333;
  --color-text-light: #767676;
  
  /* 字体 */
  --font-family-base: 'Segoe UI', Roboto, sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.5;
  
  /* 间距 */
  --spacing-unit: 8px;
  --spacing-small: calc(var(--spacing-unit) * 1);
  --spacing-medium: calc(var(--spacing-unit) * 2);
  --spacing-large: calc(var(--spacing-unit) * 3);
  
  /* 边框 */
  --border-radius: 4px;
  --border-width: 1px;
  
  /* 过渡 */
  --transition-fast: 0.2s ease;
  --transition-medium: 0.3s ease;
}

.button {
  background-color: var(--color-primary);
  padding: var(--spacing-small) var(--spacing-medium);
  border-radius: var(--border-radius);
  font-family: var(--font-family-base);
  transition: all var(--transition-fast);
}

/* 暗色主题 */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #4d9fff;
    --color-secondary: #2a2a2a;
    --color-text: #f5f5f5;
    --color-text-light: #aaaaaa;
  }
}
```

## 2. 高级选择器

### 2.1 属性选择器

```css
/* 具有特定属性的元素 */
[disabled] {
  opacity: 0.5;
}

/* 属性值完全匹配 */
[type="submit"] {
  background-color: #0066cc;
}

/* 属性值开头匹配 */
[href^="https"] {
  color: green;
}

/* 属性值结尾匹配 */
[href$=".pdf"] {
  background-image: url('pdf-icon.svg');
}

/* 属性值包含匹配 */
[class*="col-"] {
  padding: 0 15px;
}

/* 属性值空格分隔匹配 */
[class~="card"] {
  border: 1px solid #ddd;
}

/* 属性值连字符分隔匹配 */
[lang|="en"] {
  font-family: 'Times New Roman', serif;
}
```

### 2.2 伪类选择器

#### 结构性伪类

```css
/* 第一个子元素 */
:first-child {}

/* 最后一个子元素 */
:last-child {}

/* 唯一的子元素 */
:only-child {}

/* 第n个子元素 */
:nth-child(3) {}
:nth-child(odd) {}
:nth-child(even) {}
:nth-child(3n+1) {}

/* 第n个特定类型的元素 */
p:nth-of-type(2) {}

/* 空元素 */
:empty {}

/* 否定选择器 */
:not(.active) {}
```

#### 用户操作伪类

```css
/* 鼠标悬停 */
:hover {}

/* 鼠标点击 */
:active {}

/* 键盘焦点 */
:focus {}

/* 焦点可见 */
:focus-visible {}

/* 焦点在元素内 */
:focus-within {}

/* 已访问链接 */
:visited {}

/* 选中的文本 */
::selection {
  background-color: #ffff00;
  color: #000000;
}
```

#### 表单相关伪类

```css
/* 必填字段 */
:required {}

/* 可选字段 */
:optional {}

/* 有效输入 */
:valid {}

/* 无效输入 */
:invalid {}

/* 范围内的值 */
:in-range {}

/* 范围外的值 */
:out-of-range {}

/* 已启用元素 */
:enabled {}

/* 已禁用元素 */
:disabled {}

/* 已选中元素（复选框、单选框） */
:checked {}

/* 默认选中元素 */
:default {}

/* 占位符显示时 */
:placeholder-shown {}
```

### 2.3 伪元素

```css
/* 第一行 */
::first-line {
  font-weight: bold;
}

/* 第一个字母 */
::first-letter {
  font-size: 2em;
  float: left;
  margin-right: 0.1em;
}

/* 前置内容 */
.card::before {
  content: "★";
  color: gold;
  margin-right: 5px;
}

/* 后置内容 */
.external-link::after {
  content: " ↗";
  font-size: 0.8em;
}

/* 占位符样式 */
input::placeholder {
  color: #999;
  font-style: italic;
}

/* 高亮文本 */
::selection {
  background-color: #ffff00;
  color: #000000;
}

/* 列表标记 */
::marker {
  color: red;
  font-size: 1.2em;
}

/* 文件选择按钮 */
::file-selector-button {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 5px 10px;
}
```

### 2.4 组合选择器

```css
/* 后代选择器 */
.container p {}

/* 子元素选择器 */
.container > p {}

/* 相邻兄弟选择器 */
h2 + p {}

/* 通用兄弟选择器 */
h2 ~ p {}

/* 复合选择器 */
a.button:hover {}

/* 多重选择器 */
h1, h2, h3 {}

/* 复杂组合 */
.sidebar > ul > li:not(:last-child) {}
```

## 3. 响应式设计进阶

### 3.1 现代响应式布局技术

#### 媒体查询

```css
/* 基本媒体查询 */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

/* 多条件媒体查询 */
@media (min-width: 768px) and (max-width: 1199px) {
  .container {
    width: 970px;
  }
}

/* 基于屏幕方向 */
@media (orientation: landscape) {
  .hero {
    height: 70vh;
  }
}

/* 基于显示类型 */
@media screen {
  body {
    font-size: 16px;
  }
}

@media print {
  body {
    font-size: 12pt;
  }
  .no-print {
    display: none;
  }
}

/* 高分辨率屏幕 */
@media (min-resolution: 2dppx) {
  .logo {
    background-image: url('logo@2x.png');
  }
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #121212;
    color: #f5f5f5;
  }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

#### 容器查询

```css
/* 定义一个容器上下文 */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* 基于容器宽度的样式 */
@container card (min-width: 400px) {
  .card {
    display: flex;
  }
  
  .card__image {
    width: 40%;
  }
  
  .card__content {
    width: 60%;
  }
}

/* 嵌套容器查询 */
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

@container sidebar (min-width: 300px) {
  .widget {
    padding: 20px;
  }
}
```

### 3.2 响应式排版

```css
/* 流体排版 */
html {
  font-size: 16px;
}

@media (min-width: 768px) {
  html {
    font-size: calc(16px + 0.5vw);
  }
}

/* 使用clamp()实现响应式字体大小 */
h1 {
  font-size: clamp(2rem, 5vw + 1rem, 4rem);
}

p {
  font-size: clamp(1rem, 1vw + 0.75rem, 1.5rem);
}

/* 响应式行高 */
body {
  line-height: clamp(1.5, 1.5 + 0.2vw, 1.8);
}

/* 响应式字间距 */
h1 {
  letter-spacing: clamp(0.5px, 0.1vw, 1.5px);
}
```

### 3.3 视口单位与函数

```css
/* 视口单位 */
.hero {
  height: 100vh;  /* 视口高度 */
  width: 100vw;   /* 视口宽度 */
  padding: 5vmin; /* 视口较小尺寸的百分比 */
}

/* 小型视口单位 */
.text {
  font-size: 5svh;  /* 小型视口高度 */
  margin: 2svw;     /* 小型视口宽度 */
}

/* 大型视口单位 */
.banner {
  height: 50lvh;    /* 大型视口高度 */
  width: 80lvw;     /* 大型视口宽度 */
}

/* 动态视口单位 */
.content {
  height: 80dvh;    /* 动态视口高度 */
  width: 90dvw;     /* 动态视口宽度 */
}

/* CSS函数 */
.responsive-element {
  /* min()函数 - 取较小值 */
  width: min(90%, 1200px);
  
  /* max()函数 - 取较大值 */
  padding: max(2vw, 20px);
  
  /* clamp()函数 - 在范围内取值 */
  font-size: clamp(1rem, 2vw + 0.5rem, 2rem);
  
  /* calc()函数 - 计算值 */
  margin: calc(2rem + 3vw);
}
```

### 3.4 响应式图片

```css
/* 基本响应式图片 */
img {
  max-width: 100%;
  height: auto;
}

/* 使用object-fit属性 */
.cover-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
}

.contain-image {
  width: 100%;
  height: 300px;
  object-fit: contain;
}
```

```html
<!-- 使用srcset属性 -->
<img 
  src="image-800w.jpg" 
  srcset="image-400w.jpg 400w, image-800w.jpg 800w, image-1200w.jpg 1200w" 
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="响应式图片示例"
>

<!-- 使用picture元素 -->
<picture>
  <source media="(max-width: 600px)" srcset="image-small.jpg">
  <source media="(max-width: 1000px)" srcset="image-medium.jpg">
  <source media="(min-width: 1001px)" srcset="image-large.jpg">
  <img src="image-fallback.jpg" alt="响应式图片示例">
</picture>
```

## 4. 现代布局技术

### 4.1 Flexbox布局

```css
/* 基本Flex容器 */
.container {
  display: flex;
  flex-direction: row; /* row | row-reverse | column | column-reverse */
  flex-wrap: wrap;     /* nowrap | wrap | wrap-reverse */
  justify-content: space-between; /* flex-start | flex-end | center | space-between | space-around | space-evenly */
  align-items: center; /* flex-start | flex-end | center | baseline | stretch */
  align-content: stretch; /* flex-start | flex-end | center | space-between | space-around | stretch */
  gap: 20px;           /* 行列间距 */
  row-gap: 10px;       /* 行间距 */
  column-gap: 20px;    /* 列间距 */
}

/* Flex项目 */
.item {
  flex-grow: 1;        /* 默认0，定义项目放大比例 */
  flex-shrink: 0;      /* 默认1，定义项目缩小比例 */
  flex-basis: 200px;   /* 默认auto，定义项目初始大小 */
  flex: 1 0 200px;     /* 简写：grow shrink basis */
  align-self: center;  /* 覆盖容器的align-items */
  order: 2;            /* 定义项目排列顺序，默认0 */
}

/* 常见Flex布局模式 */

/* 等分列 */
.equal-columns {
  display: flex;
}

.equal-columns > * {
  flex: 1;
}

/* 粘性页脚 */
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

/* 圣杯布局 */
.holy-grail {
  display: flex;
  flex-wrap: wrap;
}

.holy-grail__header,
.holy-grail__footer {
  width: 100%;
}

.holy-grail__main {
  flex: 1;
}

.holy-grail__nav {
  flex: 0 0 200px;
  order: -1;
}

.holy-grail__ads {
  flex: 0 0 200px;
}

@media (max-width: 768px) {
  .holy-grail__main,
  .holy-grail__nav,
  .holy-grail__ads {
    flex: 1 0 100%;
  }
}
```

### 4.2 Grid布局

```css
/* 基本Grid容器 */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列等宽 */
  grid-template-rows: auto 200px auto;   /* 3行，第二行固定高度 */
  gap: 20px;                             /* 行列间距 */
  row-gap: 10px;                         /* 行间距 */
  column-gap: 20px;                      /* 列间距 */
  justify-items: center;                 /* 水平对齐项目 */
  align-items: center;                   /* 垂直对齐项目 */
  justify-content: space-between;        /* 水平对齐整个网格 */
  align-content: space-between;          /* 垂直对齐整个网格 */
}

/* Grid项目 */
.item {
  grid-column: 1 / 3;                   /* 从第1列线到第3列线 */
  grid-row: 2 / 4;                       /* 从第2行线到第4行线 */
  /* 简写 */
  grid-area: 2 / 1 / 4 / 3;              /* 行开始/列开始/行结束/列结束 */
  justify-self: center;                  /* 单个项目水平对齐 */
  align-self: center;                    /* 单个项目垂直对齐 */
}

/* 命名网格区域 */
.named-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }

/* 响应式网格 */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* 网格布局模式 */

/* RAM (Repeat, Auto, Minmax) 技术 */
.ram-grid {
  display: grid;
  /* 自动填充，每列最小250px，最大1fr */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* 叠加网格 */
.overlap-grid {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
}

.overlap-item1 {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  z-index: 1;
}

.overlap-item2 {
  grid-column: 2 / 4;
  grid-row: 2 / 4;
  z-index: 2;
}

/* 瀑布流布局 */
.masonry-grid {
  columns: 3;
  column-gap: 20px;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
}
```

### 4.3 多列布局

```css
.multi-column {
  column-count: 3;             /* 列数 */
  column-width: 200px;          /* 列宽 */
  column-gap: 30px;             /* 列间距 */
  column-rule: 1px solid #ddd;  /* 列分隔线 */
}

/* 跨越所有列 */
.multi-column h2 {
  column-span: all;
  margin-bottom: 1em;
}

/* 避免内部元素断开 */
.multi-column p {
  break-inside: avoid;
}
```

### 4.4 定位技术

```css
/* 相对定位 */
.relative {
  position: relative;
  top: 20px;
  left: 20px;
}

/* 绝对定位 */
.absolute {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* 固定定位 */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

/* 粘性定位 */
.sticky {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
}

/* 居中定位技术 */

/* 绝对定位居中 */
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Flexbox居中 */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Grid居中 */
.grid-center {
  display: grid;
  place-items: center;
}
```

## 5. 动画与过渡

### 5.1 CSS过渡

```css
.button {
  background-color: #0066cc;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  
  /* 单个属性过渡 */
  transition: background-color 0.3s ease;
  
  /* 多个属性过渡 */
  transition: 
    background-color 0.3s ease,
    transform 0.2s ease-out,
    box-shadow 0.3s ease-in-out;
  
  /* 所有属性过渡 */
  transition: all 0.3s ease;
}

.button:hover {
  background-color: #0052a3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 过渡延迟 */
.card {
  transition: transform 0.3s ease 0.1s;
}

/* 过渡时间函数 */
.ease-example { transition-timing-function: ease; }
.linear-example { transition-timing-function: linear; }
.ease-in-example { transition-timing-function: ease-in; }
.ease-out-example { transition-timing-function: ease-out; }
.ease-in-out-example { transition-timing-function: ease-in-out; }

/* 自定义贝塞尔曲线 */
.custom-timing { transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55); }

/* 阶跃函数 */
.steps-timing { transition-timing-function: steps(5, end); }
```

### 5.2 CSS动画

```css
/* 基本关键帧动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 1s ease forwards;
}

/* 多关键帧动画 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.pulse {
  animation: pulse 2s infinite;
}

/* 动画属性 */
.animated-element {
  animation-name: slideIn;              /* 动画名称 */
  animation-duration: 1s;               /* 动画持续时间 */
  animation-timing-function: ease-out;  /* 动画时间函数 */
  animation-delay: 0.5s;                /* 动画延迟 */
  animation-iteration-count: 3;         /* 动画重复次数 */
  animation-direction: alternate;       /* 动画方向 */
  animation-fill-mode: forwards;        /* 动画填充模式 */
  animation-play-state: running;        /* 动画播放状态 */
  
  /* 简写 */
  animation: slideIn 1s ease-out 0.5s 3 alternate forwards;
}

/* 多个动画 */
.multi-animated {
  animation: 
    slideIn 1s ease-out,
    fadeIn 2s ease;
}

/* 常用动画示例 */

/* 淡入 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 淡出 */
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* 滑入 */
@keyframes slideIn {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* 缩放 */
@keyframes scale {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

/* 旋转 */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 抖动 */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

/* 弹跳 */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
}
```

### 5.3 变换 (Transform)

```css
/* 2D变换 */
.transform-2d {
  /* 平移 */
  transform: translateX(20px);
  transform: translateY(-10px);
  transform: translate(20px, -10px);
  
  /* 缩放 */
  transform: scaleX(1.5);
  transform: scaleY(0.8);
  transform: scale(1.5, 0.8);
  transform: scale(1.2);
  
  /* 旋转 */
  transform: rotate(45deg);
  
  /* 倾斜 */
  transform: skewX(15deg);
  transform: skewY(10deg);
  transform: skew(15deg, 10deg);
  
  /* 组合变换（从右到左应用） */
  transform: translate(20px, 20px) rotate(45deg) scale(1.5);
}

/* 3D变换 */
.transform-3d {
  /* 3D平移 */
  transform: translateZ(50px);
  transform: translate3d(20px, 30px, 50px);
  
  /* 3D缩放 */
  transform: scaleZ(2);
  transform: scale3d(1.2, 1.2, 1.5);
  
  /* 3D旋转 */
  transform: rotateX(45deg);
  transform: rotateY(45deg);
  transform: rotateZ(45deg);
  transform: rotate3d(1, 1, 1, 45deg);
  
  /* 透视 */
  transform: perspective(500px) rotateY(45deg);
}

/* 变换原点 */
.transform-origin {
  transform-origin: top left;
  transform-origin: center;
  transform-origin: 50px 50px;
  transform-origin: 50% 50% 0;
}

/* 3D空间 */
.container-3d {
  perspective: 1000px;
  perspective-origin: center;
}

.child-3d {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
```

### 5.4 滚动动画

```css
/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 滚动捕捉 */
.scroll-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.scroll-section {
  scroll-snap-align: start;
  height: 100vh;
}

/* 滚动边距 */
.scroll-margin {
  scroll-margin-top: 100px;
}

/* 滚动内边距 */
.scroll-padding {
  scroll-padding-top: 100px;
}
```

### 5.5 动画性能优化

```css
/* 使用transform和opacity进行动画 */
.optimized {
  transform: translateX(0);
  opacity: 1;
  transition: transform 0.3s, opacity 0.3s;
}

.optimized:hover {
  transform: translateX(20px);
  opacity: 0.8;
}

/* 使用will-change提示浏览器 */
.will-animate {
  will-change: transform, opacity;
}

/* 使用硬件加速 */
.hardware-accelerated {
  transform: translateZ(0);
  /* 或 */
  transform: translate3d(0, 0, 0);
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 6. 高级视觉效果

### 6.1 渐变

```css
/* 线性渐变 */
.linear-gradient {
  /* 从上到下 */
  background: linear-gradient(#e66465, #9198e5);
  
  /* 指定角度 */
  background: linear-gradient(45deg, #e66465, #9198e5);
  
  /* 使用to关键字 */
  background: linear-gradient(to right, #e66465, #9198e5);
  background: linear-gradient(to bottom right, #e66465, #9198e5);
  
  /* 多色渐变 */
  background: linear-gradient(#e66465, #9198e5, #00d4ff);
  
  /* 带色标的渐变 */
  background: linear-gradient(#e66465 0%, #9198e5 50%, #00d4ff 100%);
  
  /* 重复渐变 */
  background: repeating-linear-gradient(
    45deg,
    #e66465,
    #e66465 10px,
    #9198e5 10px,
    #9198e5 20px
  );
}

/* 径向渐变 */
.radial-gradient {
  /* 基本径向渐变 */
  background: radial-gradient(#e66465, #9198e5);
  
  /* 指定形状 */
  background: radial-gradient(circle, #e66465, #9198e5);
  background: radial-gradient(ellipse, #e66465, #9198e5);
  
  /* 指定大小 */
  background: radial-gradient(circle closest-side, #e66465, #9198e5);
  background: radial-gradient(circle farthest-corner, #e66465, #9198e5);
  
  /* 指定位置 */
  background: radial-gradient(circle at top left, #e66465, #9198e5);
  background: radial-gradient(circle at 20% 30%, #e66465, #9198e5);
  
  /* 重复渐变 */
  background: repeating-radial-gradient(
    circle,
    #e66465,
    #e66465 10px,
    #9198e5 10px,
    #9198e5 20px
  );
}

/* 圆锥渐变 */
.conic-gradient {
  /* 基本圆锥渐变 */
  background: conic-gradient(#e66465, #9198e5);
  
  /* 指定起始角度 */
  background: conic-gradient(from 45deg, #e66465, #9198e5);
  
  /* 指定中心点 */
  background: conic-gradient(at 50% 75%, #e66465, #9198e5);
  
  /* 带色标的渐变 */
  background: conic-gradient(
    #e66465 0deg,
    #9198e5 180deg,
    #00d4ff 360deg
  );
  
  /* 创建饼图 */
  background: conic-gradient(
    #e66465 0deg 90deg,
    #9198e5 90deg 180deg,
    #00d4ff 180deg 270deg,
    #ff7a00 270deg 360deg
  );
  
  /* 重复圆锥渐变 */
  background: repeating-conic-gradient(
    #e66465 0deg 15deg,
    #9198e5 15deg 30deg
  );
}
```

### 6.2 混合模式

```css
/* 背景混合模式 */
.bg-blend {
  background-image: url('texture.jpg');
  background-color: #0066cc;
  background-blend-mode: multiply;
}

/* 元素混合模式 */
.element-blend {
  mix-blend-mode: screen;
}

/* 混合模式值 */
.multiply { mix-blend-mode: multiply; }
.screen { mix-blend-mode: screen; }
.overlay { mix-blend-mode: overlay; }
.darken { mix-blend-mode: darken; }
.lighten { mix-blend-mode: lighten; }
.color-dodge { mix-blend-mode: color-dodge; }
.color-burn { mix-blend-mode: color-burn; }
.hard-light { mix-blend-mode: hard-light; }
.soft-light { mix-blend-mode: soft-light; }
.difference { mix-blend-mode: difference; }
.exclusion { mix-blend-mode: exclusion; }
.hue { mix-blend-mode: hue; }
.saturation { mix-blend-mode: saturation; }
.color { mix-blend-mode: color; }
.luminosity { mix-blend-mode: luminosity; }
```

### 6.3 滤镜

```css
/* 基本滤镜 */
.filter-example {
  /* 模糊 */
  filter: blur(5px);
  
  /* 亮度 */
  filter: brightness(1.5);
  
  /* 对比度 */
  filter: contrast(200%);
  
  /* 灰度 */
  filter: grayscale(100%);
  
  /* 色相旋转 */
  filter: hue-rotate(90deg);
  
  /* 反转 */
  filter: invert(100%);
  
  /* 不透明度 */
  filter: opacity(50%);
  
  /* 饱和度 */
  filter: saturate(200%);
  
  /* 褐色 */
  filter: sepia(100%);
  
  /* 阴影 */
  filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3));
  
  /* 组合滤镜 */
  filter: contrast(150%) brightness(110%) sepia(30%);
}

/* 背景滤镜 */
.backdrop-filter-example {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
}

/* 常见滤镜效果 */

/* 黑白照片 */
.black-white {
  filter: grayscale(100%);
}

/* 复古照片 */
.vintage {
  filter: sepia(80%) contrast(110%) brightness(110%) saturate(130%);
}

/* 霓虹效果 */
.neon {
  filter: brightness(150%) contrast(150%) saturate(150%) drop-shadow(0 0 10px currentColor);
}

/* 毛玻璃效果 */
.frosted-glass {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px) saturate(180%);
}
```

### 6.4 遮罩

```css
/* 基本遮罩 */
.mask-image {
  /* 使用图片作为遮罩 */
  mask-image: url('mask.svg');
  mask-size: cover;
  mask-position: center;
  mask-repeat: no-repeat;
  
  /* 使用渐变作为遮罩 */
  mask-image: linear-gradient(to right, transparent, black);
  
  /* 使用多个遮罩 */
  mask-image: 
    linear-gradient(to right, transparent, black),
    url('mask.svg');
  mask-composite: intersect; /* source-over | source-in | source-out | source-atop | destination-over | destination-in | destination-out | destination-atop | lighter | copy | xor | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity */
}

/* 遮罩边框 */
.mask-border {
  mask-border-source: url('border-mask.png');
  mask-border-slice: 27;
  mask-border-width: 27px;
  mask-border-outset: 0;
  mask-border-repeat: stretch;
}
```

### 6.5 裁剪路径

```css
/* 基本形状裁剪 */
.clip-path {
  /* 圆形 */
  clip-path: circle(50% at center);
  
  /* 椭圆 */
  clip-path: ellipse(50% 40% at center);
  
  /* 矩形 */
  clip-path: inset(10% 20% 10% 20% round 10px);
  
  /* 多边形 */
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

/* 动画裁剪路径 */
.clip-path-animation {
  clip-path: circle(0% at center);
  transition: clip-path 0.5s ease;
}

.clip-path-animation:hover {
  clip-path: circle(100% at center);
}

/* 创意形状 */

/* 六边形 */
.hexagon {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

/* 星形 */
.star {
  clip-path: polygon(
    50% 0%, 61% 35%, 98% 35%, 68% 57%,
    79% 91%, 50% 70%, 21% 91%, 32% 57%,
    2% 35%, 39% 35%
  );
}

/* 对话框 */
.speech-bubble {
  clip-path: polygon(
    0% 0%, 100% 0%, 100% 75%,
    75% 75%, 75% 100%, 50% 75%,
    0% 75%
  );
}
```

## 7. 响应式图像与媒体

### 7.1 响应式图像技术

```css
/* 基本响应式图像 */
img {
  max-width: 100%;
  height: auto;
}

/* 保持宽高比 */
.aspect-ratio {
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
}

/* 使用object-fit属性 */
.object-fit-cover {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
}

.object-fit-contain {
  width: 100%;
  height: 300px;
  object-fit: contain;
}

.object-fit-fill {
  width: 100%;
  height: 300px;
  object-fit: fill;
}

.object-fit-scale-down {
  width: 100%;
  height: 300px;
  object-fit: scale-down;
}

.object-fit-none {
  width: 100%;
  height: 300px;
  object-fit: none;
}
```

```html
<!-- 使用srcset属性 -->
<img 
  src="image-800w.jpg" 
  srcset="image-400w.jpg 400w, image-800w.jpg 800w, image-1200w.jpg 1200w" 
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="响应式图片示例"
>

<!-- 使用picture元素 -->
<picture>
  <source media="(max-width: 600px)" srcset="image-small.jpg">
  <source media="(max-width: 1000px)" srcset="image-medium.jpg">
  <source media="(min-width: 1001px)" srcset="image-large.jpg">
  <img src="image-fallback.jpg" alt="响应式图片示例">
</picture>

<!-- 使用picture元素提供不同格式 -->
<picture>
  <source type="image/webp" srcset="image.webp">
  <source type="image/jpeg" srcset="image.jpg">
  <img src="image.jpg" alt="响应式图片示例">
</picture>

<!-- 使用picture元素提供不同的艺术指导 -->
<picture>
  <source media="(max-width: 600px)" srcset="portrait.jpg">
  <source media="(min-width: 601px)" srcset="landscape.jpg">
  <img src="landscape.jpg" alt="响应式图片示例">
</picture>
```

### 7.2 背景图像技术

```css
/* 响应式背景图像 */
.responsive-bg {
  background-image: url('large.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (max-width: 768px) {
  .responsive-bg {
    background-image: url('medium.jpg');
  }
}

@media (max-width: 480px) {
  .responsive-bg {
    background-image: url('small.jpg');
  }
}

/* 多重背景 */
.multiple-bg {
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('texture.png'),
    url('main-bg.jpg');
  background-size: 
    cover,
    100px 100px,
    cover;
  background-position: 
    center,
    top left,
    center;
  background-repeat: 
    no-repeat,
    repeat,
    no-repeat;
}

/* 背景尺寸技术 */
.bg-size-cover {
  background-size: cover;
}

.bg-size-contain {
  background-size: contain;
}

.bg-size-custom {
  background-size: 50% auto;
}

/* 背景位置技术 */
.bg-position {
  background-position: center top;
  background-position: right 20px bottom 10px;
  background-position: 25% 75%;
}

/* 背景附着 */
.bg-attachment {
  background-attachment: fixed;
  background-attachment: local;
  background-attachment: scroll;
}
```

### 7.3 视频与音频

```css
/* 响应式视频 */
video {
  max-width: 100%;
  height: auto;
}

/* 视频容器 */
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9宽高比 */
  height: 0;
  overflow: hidden;
}

.video-container iframe,
.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 视频背景 */
.video-background {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
}

.video-background video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translateX(-50%) translateY(-50%);
  z-index: -1;
}

.video-background .content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  padding: 20px;
}
```

```html
<!-- 响应式视频嵌入 -->
<div class="video-container">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
</div>

<!-- HTML5视频 -->
<video controls preload="metadata" poster="poster.jpg">
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  <p>您的浏览器不支持HTML5视频。</p>
</video>

<!-- 视频背景 -->
<div class="video-background">
  <video autoplay muted loop playsinline>
    <source src="background.webm" type="video/webm">
    <source src="background.mp4" type="video/mp4">
  </video>
  <div class="content">
    <h1>视频背景示例</h1>
    <p>这是覆盖在视频上的内容</p>
  </div>
</div>

<!-- 响应式音频 -->
<audio controls>
  <source src="audio.ogg" type="audio/ogg">
  <source src="audio.mp3" type="audio/mpeg">
  您的浏览器不支持HTML5音频。
</audio>
```

## 8. 表单与输入样式

### 8.1 现代表单样式

```css
/* 基本表单样式 */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* 禁用状态 */
.form-control:disabled,
.form-control[readonly] {
  background-color: #e9ecef;
  opacity: 1;
}

/* 表单验证状态 */
.form-control.is-valid {
  border-color: #28a745;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.form-control.is-invalid {
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

/* 表单反馈信息 */
.valid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #28a745;
}

.invalid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}

.form-control.is-valid ~ .valid-feedback,
.was-validated .form-control:valid ~ .valid-feedback {
  display: block;
}

.form-control.is-invalid ~ .invalid-feedback,
.was-validated .form-control:invalid ~ .invalid-feedback {
  display: block;
}
```

### 8.2 自定义表单控件

自定义表单控件是现代网站设计中的重要组成部分，它们可以提供更好的用户体验和品牌一致性。

```css
/* 自定义复选框 */
.custom-checkbox {
  position: relative;
  padding-left: 2rem;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.25rem;
  width: 1.25rem;
  background-color: #eee;
  border-radius: 0.25rem;
  transition: all 0.2s ease-in-out;
}

.custom-checkbox:hover input ~ .checkmark {
  background-color: #ccc;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #2196F3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 0.45rem;
  top: 0.25rem;
  width: 0.25rem;
  height: 0.5rem;
  border: solid white;
  border-width: 0 0.15rem 0.15rem 0;
  transform: rotate(45deg);
}

/* 自定义单选按钮 */
.custom-radio {
  position: relative;
  padding-left: 2rem;
  cursor: pointer;
  user-select: none;
}

.custom-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.radio-mark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.25rem;
  width: 1.25rem;
  background-color: #eee;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
}

.custom-radio:hover input ~ .radio-mark {
  background-color: #ccc;
}

.custom-radio input:checked ~ .radio-mark {
  background-color: #2196F3;
}

.radio-mark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-radio input:checked ~ .radio-mark:after {
  display: block;
}

.custom-radio .radio-mark:after {
  top: 0.4rem;
  left: 0.4rem;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: white;
}

/* 自定义开关 */
.switch {
  position: relative;
  display: inline-block;
  width: 3.75rem;
  height: 2.125rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 2.125rem;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.625rem;
  width: 1.625rem;
  left: 0.25rem;
  bottom: 0.25rem;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  transform: translateX(1.625rem);
}
```

### 8.3 范围滑块与文件上传

```css
/* 自定义范围滑块 */
.custom-range {
  width: 100%;
  height: 1.5rem;
  padding: 0;
  background-color: transparent;
  appearance: none;
}

.custom-range:focus {
  outline: none;
}

.custom-range::-webkit-slider-thumb {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #2196F3;
  border: 0;
  border-radius: 50%;
  transition: background-color .15s ease-in-out, border-color .15s ease-in-out;
  margin-top: -0.5rem;
}

.custom-range::-webkit-slider-runnable-track {
  width: 100%;
  height: 0.25rem;
  color: transparent;
  cursor: pointer;
  background-color: #dee2e6;
  border-color: transparent;
  border-radius: 1rem;
}

.custom-range::-moz-range-thumb {
  width: 1.25rem;
  height: 1.25rem;
  background-color: #2196F3;
  border: 0;
  border-radius: 50%;
  transition: background-color .15s ease-in-out, border-color .15s ease-in-out;
}

.custom-range::-moz-range-track {
  width: 100%;
  height: 0.25rem;
  color: transparent;
  cursor: pointer;
  background-color: #dee2e6;
  border-color: transparent;
  border-radius: 1rem;
}

/* 自定义文件上传 */
.custom-file {
  position: relative;
  display: inline-block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  margin-bottom: 0;
}

.custom-file-input {
  position: relative;
  z-index: 2;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  margin: 0;
  opacity: 0;
}

.custom-file-label {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-file-input:focus ~ .custom-file-label {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.custom-file-label::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: block;
  height: calc(1.5em + 0.75rem);
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  color: #495057;
  content: "Browse";
  background-color: #e9ecef;
  border-left: inherit;
  border-radius: 0 0.25rem 0.25rem 0;
}
```

## 9. CSS预处理器与后处理器

### 9.1 Sass/SCSS基础

Sass是一种CSS预处理器，它扩展了CSS的功能，使样式表更加模块化和可维护。

```scss
// 变量定义
$primary-color: #3498db;
$secondary-color: #2ecc71;
$font-stack: 'Helvetica', 'Arial', sans-serif;
$base-spacing: 1rem;

// 嵌套规则
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: $base-spacing;
  
  .header {
    background-color: $primary-color;
    color: white;
    padding: $base-spacing;
    
    h1 {
      font-family: $font-stack;
      margin: 0;
    }
  }
  
  .content {
    padding: $base-spacing;
    
    p {
      line-height: 1.6;
      margin-bottom: $base-spacing;
    }
  }
}

// 混合器（Mixins）
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin box-shadow($x: 0, $y: 2px, $blur: 4px, $color: rgba(0,0,0,.3)) {
  box-shadow: $x $y $blur $color;
}

.card {
  @include flex-center;
  @include box-shadow(0, 3px, 10px, rgba(0,0,0,.2));
  background-color: white;
  border-radius: 4px;
  padding: $base-spacing;
}

// 继承/扩展
%button-base {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-primary {
  @extend %button-base;
  background-color: $primary-color;
  color: white;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.button-secondary {
  @extend %button-base;
  background-color: $secondary-color;
  color: white;
  
  &:hover {
    background-color: darken($secondary-color, 10%);
  }
}

// 函数
@function calculate-width($col, $total: 12) {
  @return percentage($col / $total);
}

.col-4 {
  width: calculate-width(4);
}

.col-6 {
  width: calculate-width(6);
}

// 条件语句
@mixin text-color($bg-color) {
  @if (lightness($bg-color) > 50%) {
    color: #333;
  } @else {
    color: #fff;
  }
}

.dark-bg {
  background-color: #333;
  @include text-color(#333);
}

.light-bg {
  background-color: #f8f9fa;
  @include text-color(#f8f9fa);
}

// 循环
@for $i from 1 through 4 {
  .m-#{$i} {
    margin: $i * 0.25rem;
  }
  
  .p-#{$i} {
    padding: $i * 0.25rem;
  }
}
```

### 9.2 Less与Stylus

Less和Stylus是另外两种流行的CSS预处理器，它们也提供了变量、嵌套、混合等功能。

**Less示例：**

```less
// 变量定义
@primary-color: #3498db;
@secondary-color: #2ecc71;
@font-stack: 'Helvetica', 'Arial', sans-serif;
@base-spacing: 1rem;

// 嵌套规则
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: @base-spacing;
  
  .header {
    background-color: @primary-color;
    color: white;
    padding: @base-spacing;
    
    h1 {
      font-family: @font-stack;
      margin: 0;
    }
  }
}

// 混合器
.box-shadow(@x: 0; @y: 2px; @blur: 4px; @color: rgba(0,0,0,.3)) {
  box-shadow: @x @y @blur @color;
}

.card {
  .box-shadow(0, 3px, 10px, rgba(0,0,0,.2));
  background-color: white;
  border-radius: 4px;
  padding: @base-spacing;
}

// 函数
.calculate-width(@col, @total: 12) {
  width: percentage(@col / @total);
}

.col-4 {
  .calculate-width(4);
}
```

**Stylus示例：**

```stylus
// 变量定义
primary-color = #3498db
secondary-color = #2ecc71
font-stack = 'Helvetica', 'Arial', sans-serif
base-spacing = 1rem

// 嵌套规则 (注意Stylus可以省略大括号和分号)
.container
  max-width 1200px
  margin 0 auto
  padding base-spacing
  
  .header
    background-color primary-color
    color white
    padding base-spacing
    
    h1
      font-family font-stack
      margin 0

// 混合器
box-shadow(x = 0, y = 2px, blur = 4px, color = rgba(0,0,0,.3))
  box-shadow x y blur color

.card
  box-shadow(0, 3px, 10px, rgba(0,0,0,.2))
  background-color white
  border-radius 4px
  padding base-spacing

// 函数
calculate-width(col, total = 12)
  width (col / total * 100)%

.col-4
  calculate-width(4)
```

### 9.3 PostCSS与插件生态系统

PostCSS是一个用JavaScript转换CSS的工具，它通过插件系统提供了强大的功能。

```js
// postcss.config.js 示例
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')({ stage: 1 }),
    require('cssnano')({ preset: 'default' }),
    require('postcss-nested'),
    require('postcss-custom-properties'),
    require('postcss-import'),
  ]
};
```

**常用PostCSS插件：**

1. **Autoprefixer** - 自动添加浏览器前缀
2. **PostCSS Preset Env** - 使用未来的CSS特性
3. **cssnano** - 优化和压缩CSS
4. **postcss-nested** - 支持CSS嵌套
5. **postcss-import** - 支持@import规则
6. **postcss-custom-properties** - 支持CSS变量

## 10. CSS架构与性能优化

### 10.1 CSS性能优化策略

优化CSS性能可以显著提高网站加载速度和用户体验。

**选择器优化：**

```css
/* 避免使用通配符选择器 */
/* 不推荐 */
* {
  margin: 0;
  padding: 0;
}

/* 推荐 */
body, h1, h2, h3, p, ul, ol {
  margin: 0;
  padding: 0;
}

/* 避免过度嵌套 */
/* 不推荐 */
.header .navigation ul li a {
  color: blue;
}

/* 推荐 */
.nav-link {
  color: blue;
}

/* 避免使用后代选择器 */
/* 不推荐 */
.sidebar div {
  background-color: #f0f0f0;
}

/* 推荐 */
.sidebar-item {
  background-color: #f0f0f0;
}
```

**减少重排和重绘：**

```css
/* 使用transform和opacity进行动画，而不是改变布局属性 */
/* 不推荐 */
@keyframes move-bad {
  from { left: 0; top: 0; }
  to { left: 100px; top: 100px; }
}

/* 推荐 */
@keyframes move-good {
  from { transform: translate(0, 0); }
  to { transform: translate(100px, 100px); }
}

/* 使用will-change提示浏览器 */
.animated-element {
  will-change: transform;
}
```

**减少文件大小：**

```css
/* 使用简写属性 */
/* 不推荐 */
.element {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
}

/* 推荐 */
.element {
  margin: 10px 20px;
}

/* 避免重复声明 */
/* 不推荐 */
.button {
  background: #f00;
}
.button.danger {
  background: #f00;
}

/* 推荐 */
.button, .button.danger {
  background: #f00;
}
```

### 10.2 关键CSS与非关键CSS

将关键CSS内联到HTML中，可以减少渲染阻塞时间。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>优化CSS加载</title>
  <style>
    /* 关键CSS - 内联到HTML中 */
    body {
      font-family: sans-serif;
      margin: 0;
      padding: 0;
    }
    .header {
      background-color: #333;
      color: white;
      padding: 1rem;
    }
    .hero {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
  
  <!-- 非关键CSS - 异步加载 -->
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>
<body>
  <!-- 页面内容 -->
</body>
</html>
```

### 10.3 CSS代码分割与按需加载

```html
<!-- 基础样式 - 所有页面都需要 -->
<link rel="stylesheet" href="base.css">

<!-- 条件加载特定页面的CSS -->
<script>
  // 根据页面类型加载不同的CSS
  if (document.body.classList.contains('product-page')) {
    loadCSS('product.css');
  } else if (document.body.classList.contains('blog-page')) {
    loadCSS('blog.css');
  }
  
  function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
</script>
```

### 10.4 CSS调试与性能分析

**使用浏览器开发工具：**

1. **Chrome DevTools Coverage** - 分析未使用的CSS
2. **Performance面板** - 分析渲染性能
3. **Lighthouse** - 获取性能优化建议

**CSS调试技巧：**

```css
/* 使用outline调试布局问题 */
* {
  outline: 1px solid red;
}

/* 使用:empty伪类查找空元素 */
:empty {
  outline: 5px solid yellow;
}

/* 使用属性选择器查找内联样式 */
[style] {
  outline: 5px solid purple;
}
```

## 11. CSS与可访问性

### 11.1 可访问性基础

```css
/* 确保足够的颜色对比度 */
.accessible-text {
  color: #333;
  background-color: #fff;
}

/* 提供焦点状态 */
.button:focus {
  outline: 2px solid #4a90e2;
  outline-offset: 2px;
}

/* 支持减少动画 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* 支持高对比度模式 */
@media (forced-colors: active) {
  .button {
    border: 1px solid ButtonText;
  }
}
```

### 11.2 ARIA与CSS

```css
/* 使用属性选择器与ARIA状态结合 */
[aria-hidden="true"] {
  display: none;
}

[aria-expanded="true"] .dropdown {
  display: block;
}

[aria-expanded="false"] .dropdown {
  display: none;
}

/* 使用:focus-visible提供更好的键盘焦点样式 */
.button:focus-visible {
  outline: 2px solid #4a90e2;
  outline-offset: 2px;
}

/* 隐藏元素但保持屏幕阅读器可访问 */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## 12. CSS与现代Web标准

### 12.1 CSS Houdini

CSS Houdini是一组低级API，允许开发者扩展CSS引擎的功能。

```js
// 使用Paint API创建自定义背景
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('my-paint-worklet.js');
}
```

```css
/* 在CSS中使用自定义绘制函数 */
.custom-background {
  background-image: paint(myGradient);
}
```

```js
// my-paint-worklet.js
registerPaint('myGradient', class {
  paint(ctx, size, properties) {
    const gradient = ctx.createLinearGradient(0, 0, size.width, size.height);
    gradient.addColorStop(0, 'blue');
    gradient.addColorStop(1, 'red');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size.width, size.height);
  }
});
```

### 12.2 CSS变量与计算

```css
/* 定义全局CSS变量 */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --spacing-unit: 8px;
  --max-width: 1200px;
  --border-radius: 4px;
}

/* 使用CSS变量 */
.button {
  background-color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 3);
  border-radius: var(--border-radius);
}

/* 在媒体查询中修改变量 */
@media (max-width: 768px) {
  :root {
    --spacing-unit: 4px;
  }
}

/* 使用JavaScript动态修改CSS变量 */
<script>
  // 根据用户偏好设置主题颜色
  function setTheme(isDark) {
    if (isDark) {
      document.documentElement.style.setProperty('--primary-color', '#2980b9');
      document.documentElement.style.setProperty('--text-color', '#f5f5f5');
      document.documentElement.style.setProperty('--bg-color', '#333');
    } else {
      document.documentElement.style.setProperty('--primary-color', '#3498db');
      document.documentElement.style.setProperty('--text-color', '#333');
      document.documentElement.style.setProperty('--bg-color', '#fff');
    }
  }
  
  // 检测用户偏好
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark);
</script>
```

### 12.3 CSS逻辑属性

```css
/* 使用物理属性（方向特定） */
.box-physical {
  margin-left: 1rem;
  margin-right: 2rem;
  padding-top: 1rem;
  border-bottom: 1px solid #ccc;
}

/* 使用逻辑属性（与书写模式无关） */
.box-logical {
  margin-inline-start: 1rem;
  margin-inline-end: 2rem;
  padding-block-start: 1rem;
  border-block-end: 1px solid #ccc;
}

/* 设置书写模式 */
.rtl-text {
  direction: rtl;
}

.vertical-text {
  writing-mode: vertical-rl;
}
```

## 13. 实际项目中的CSS最佳实践

### 13.1 CSS代码审查清单

- **命名一致性**：确保类名遵循选定的命名约定（BEM、SMACSS等）
- **避免内联样式**：样式应该在CSS文件中定义
- **避免!important**：除非绝对必要
- **检查浏览器兼容性**：确保样式在所有目标浏览器中正常工作
- **检查响应式设计**：确保在所有目标设备上正常工作
- **检查可访问性**：确保足够的颜色对比度和键盘可访问性
- **检查性能**：避免过度嵌套和复杂选择器

### 13.2 CSS文档与注释

```css
/**
 * 组件: 按钮
 * 描述: 提供基本的按钮样式和变体
 * 用法: 添加.btn类和修饰符类(.btn--primary, .btn--secondary等)
 */

/* 基础按钮样式 */
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

/* 主要按钮变体 */
.btn--primary {
  background-color: var(--primary-color, #3498db);
  color: white;
}

/* 次要按钮变体 */
.btn--secondary {
  background-color: var(--secondary-color, #2ecc71);
  color: white;
}

/* 禁用状态 */
.btn:disabled,
.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 悬停和焦点状态 */
.btn:hover:not(:disabled),
.btn:focus:not(:disabled) {
  transform: translateY(-1px);
}

.btn--primary:hover:not(:disabled),
.btn--primary:focus:not(:disabled) {
  background-color: var(--primary-color-dark, #2980b9);
}

.btn--secondary:hover:not(:disabled),
.btn--secondary:focus:not(:disabled) {
  background-color: var(--secondary-color-dark, #27ae60);
}
```

### 13.3 CSS与设计系统集成

```css
/**
 * 设计系统: 颜色系统
 */
:root {
  /* 主色调 */
  --color-primary-50: #e3f2fd;
  --color-primary-100: #bbdefb;
  --color-primary-200: #90caf9;
  --color-primary-300: #64b5f6;
  --color-primary-400: #42a5f5;
  --color-primary-500: #2196f3; /* 基础主色 */
  --color-primary-600: #1e88e5;
  --color-primary-700: #1976d2;
  --color-primary-800: #1565c0;
  --color-primary-900: #0d47a1;
  
  /* 中性色调 */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #eeeeee;
  --color-neutral-300: #e0e0e0;
  --color-neutral-400: #bdbdbd;
  --color-neutral-500: #9e9e9e;
  --color-neutral-600: #757575;
  --color-neutral-700: #616161;
  --color-neutral-800: #424242;
  --color-neutral-900: #212121;
  
  /* 语义色调 */
  --color-success: #4caf50;
  --color-warning: #ff9800;
  --color-error: #f44336;
  --color-info: #2196f3;
}

/**
 * 设计系统: 排版
 */
:root {
  /* 字体家族 */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --font-family-heading: var(--font-family-base);
  --font-family-mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  
  /* 字体大小 */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-md: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  
  /* 行高 */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* 字重 */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}

/**
 * 设计系统: 间距
 */
:root {
  --spacing-0: 0;
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-5: 1.25rem;  /* 20px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
  --spacing-10: 2.5rem;  /* 40px */
  --spacing-12: 3rem;    /* 48px */
  --spacing-16: 4rem;    /* 64px */
  --spacing-20: 5rem;    /* 80px */
  --spacing-24: 6rem;    /* 96px */
  --spacing-32: 8rem;    /* 128px */
}

/**
 * 设计系统: 阴影
 */
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}

/**
 * 设计系统: 圆角
 */
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;  /* 2px */
  --radius-md: 0.25rem;   /* 4px */
  --radius-lg: 0.5rem;    /* 8px */
  --radius-xl: 0.75rem;   /* 12px */
  --radius-2xl: 1rem;     /* 16px */
  --radius-full: 9999px;
}

/**
 * 设计系统: 断点
 */
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

## 14. 工作中常用CSS代码段

### 14.1 布局相关代码段

**水平垂直居中（多种方案）：**

```css
/* 方案1: Flexbox居中 */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 方案2: Grid居中 */
.grid-center {
  display: grid;
  place-items: center;
}

/* 方案3: 绝对定位居中 */
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 方案4: 表格单元格居中 */
.table-center {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
```

**清除浮动：**

```css
/* 现代清除浮动方法 */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* 或者使用overflow */
.clear-float {
  overflow: hidden;
}
```

**等高列布局：**

```css
/* Flexbox等高列 */
.equal-height-container {
  display: flex;
}

.equal-height-item {
  flex: 1;
}

/* Grid等高列 */
.grid-equal-height {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

**粘性页脚：**

```css
/* Flexbox粘性页脚 */
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.footer {
  margin-top: auto;
}

/* Grid粘性页脚 */
.grid-page {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
```

### 14.2 文本处理代码段

**文本溢出处理：**

```css
/* 单行文本省略 */
.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 多行文本省略 */
.text-ellipsis-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 兼容性更好的多行省略 */
.text-ellipsis-fallback {
  overflow: hidden;
  position: relative;
  line-height: 1.4em;
  max-height: 4.2em; /* 3行的高度 */
}

.text-ellipsis-fallback::after {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  padding-left: 0.5em;
}
```

**文本选择控制：**

```css
/* 禁止文本选择 */
.no-select {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 允许全部选择 */
.select-all {
  user-select: all;
}

/* 只允许选择文本 */
.select-text {
  user-select: text;
}
```

**文本装饰效果：**

```css
/* 打字机效果 */
.typewriter {
  overflow: hidden;
  border-right: 0.15em solid orange;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: orange; }
}

/* 文本渐变色 */
.gradient-text {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* 文本阴影效果 */
.text-shadow-3d {
  color: #fff;
  text-shadow: 
    1px 1px 0 #ccc,
    2px 2px 0 #c9c9c9,
    3px 3px 0 #bbb,
    4px 4px 0 #b9b9b9,
    5px 5px 0 #aaa,
    6px 6px 1px rgba(0,0,0,.1),
    0 0 5px rgba(0,0,0,.1),
    0 1px 3px rgba(0,0,0,.3),
    0 3px 5px rgba(0,0,0,.2),
    0 5px 10px rgba(0,0,0,.25);
}
```

### 14.3 图片处理代码段

**响应式图片：**

```css
/* 基础响应式图片 */
.responsive-img {
  max-width: 100%;
  height: auto;
}

/* 保持宽高比的容器 */
.aspect-ratio-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
}

.aspect-ratio-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 使用CSS aspect-ratio属性（现代浏览器） */
.modern-aspect-ratio {
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
}
```

**图片效果：**

```css
/* 图片悬停效果 */
.image-hover-zoom {
  overflow: hidden;
}

.image-hover-zoom img {
  transition: transform 0.3s ease;
}

.image-hover-zoom:hover img {
  transform: scale(1.1);
}

/* 图片滤镜效果 */
.image-filter {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.image-filter:hover {
  filter: grayscale(0%);
}

/* 图片遮罩效果 */
.image-overlay {
  position: relative;
  overflow: hidden;
}

.image-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-overlay:hover::after {
  opacity: 1;
}
```

### 14.4 按钮和交互元素

**现代按钮样式：**

```css
/* 基础按钮 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

/* 主要按钮 */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

/* 波纹效果按钮 */
.btn-ripple {
  position: relative;
  overflow: hidden;
}

.btn-ripple::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-ripple:active::before {
  width: 300px;
  height: 300px;
}

/* 加载状态按钮 */
.btn-loading {
  position: relative;
  color: transparent;
}

.btn-loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

**开关切换按钮：**

```css
/* 现代开关样式 */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #2196F3;
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}
```

### 14.5 卡片和容器样式

**现代卡片设计：**

```css
/* 基础卡片 */
.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* 玻璃态效果卡片 */
.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
}

/* 渐变边框卡片 */
.gradient-border-card {
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 2rem;
}

.gradient-border-card::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 2px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  border-radius: inherit;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}
```

**模态框和弹窗：**

```css
/* 模态框背景 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* 模态框内容 */
.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  transform: scale(0.7);
  transition: transform 0.3s ease;
}

.modal-overlay.active .modal-content {
  transform: scale(1);
}

/* 抽屉式侧边栏 */
.drawer {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 1000;
}

.drawer.open {
  left: 0;
}

.drawer-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
}

.drawer-backdrop.active {
  opacity: 1;
  visibility: visible;
}
```

### 14.6 加载和状态指示器

**加载动画：**

```css
/* 旋转加载器 */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* 脉冲加载器 */
.pulse-loader {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #3498db;
  animation: pulse 1.5s ease-in-out infinite;
}

.pulse-loader:nth-child(2) { animation-delay: 0.1s; }
.pulse-loader:nth-child(3) { animation-delay: 0.2s; }

@keyframes pulse {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 1;
  }
  40% {
    transform: scale(1);
    opacity: 0.5;
  }
}

/* 骨架屏加载 */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 1em;
  margin-bottom: 0.5em;
  border-radius: 4px;
}

.skeleton-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
```

**进度条：**

```css
/* 现代进度条 */
.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
  position: relative;
}

/* 动画进度条 */
.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 圆形进度条 */
.circular-progress {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: conic-gradient(#3498db 0deg, #e0e0e0 0deg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.circular-progress::before {
  content: '';
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: white;
}

.circular-progress-text {
  position: absolute;
  font-weight: bold;
  color: #333;
}
```

### 14.7 实用工具类

**间距工具类：**

```css
/* 外边距工具类 */
.m-0 { margin: 0; }
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-3 { margin: 0.75rem; }
.m-4 { margin: 1rem; }
.m-5 { margin: 1.25rem; }

.mt-0 { margin-top: 0; }
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1rem; }

.mb-0 { margin-bottom: 0; }
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }

/* 内边距工具类 */
.p-0 { padding: 0; }
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
.p-5 { padding: 1.25rem; }

.px-0 { padding-left: 0; padding-right: 0; }
.px-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }

.py-0 { padding-top: 0; padding-bottom: 0; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
```

**显示和隐藏工具类：**

```css
/* 显示工具类 */
.d-none { display: none; }
.d-block { display: block; }
.d-inline { display: inline; }
.d-inline-block { display: inline-block; }
.d-flex { display: flex; }
.d-grid { display: grid; }

/* 响应式显示 */
@media (max-width: 768px) {
  .d-md-none { display: none; }
  .d-md-block { display: block; }
  .d-md-flex { display: flex; }
}

@media (max-width: 576px) {
  .d-sm-none { display: none; }
  .d-sm-block { display: block; }
  .d-sm-flex { display: flex; }
}

/* 可见性工具类 */
.visible { visibility: visible; }
.invisible { visibility: hidden; }

/* 透明度工具类 */
.opacity-0 { opacity: 0; }
.opacity-25 { opacity: 0.25; }
.opacity-50 { opacity: 0.5; }
.opacity-75 { opacity: 0.75; }
.opacity-100 { opacity: 1; }
```

**文本工具类：**

```css
/* 文本对齐 */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }

/* 文本变换 */
.text-lowercase { text-transform: lowercase; }
.text-uppercase { text-transform: uppercase; }
.text-capitalize { text-transform: capitalize; }

/* 字体粗细 */
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }

/* 文本颜色 */
.text-primary { color: #3498db; }
.text-secondary { color: #2ecc71; }
.text-success { color: #27ae60; }
.text-danger { color: #e74c3c; }
.text-warning { color: #f39c12; }
.text-info { color: #3498db; }
.text-muted { color: #6c757d; }
```

### 14.8 调试和开发工具

**CSS调试边框：**

```css
/* 调试所有元素边框 */
.debug * {
  outline: 1px solid red;
}

/* 调试特定元素类型 */
.debug-layout div {
  outline: 2px solid blue;
}

.debug-layout span {
  outline: 1px solid green;
}

.debug-layout p {
  outline: 1px solid orange;
}

/* 显示元素信息 */
.debug-info::before {
  content: attr(class);
  position: absolute;
  top: -20px;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  font-size: 12px;
  border-radius: 3px;
  z-index: 1000;
}
```

**性能优化类：**

```css
/* GPU加速 */
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
}

/* 减少重绘 */
.no-repaint {
  will-change: transform, opacity;
}

/* 优化滚动 */
.smooth-scroll {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* 字体渲染优化 */
.optimized-text {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

这些代码段涵盖了日常开发中最常遇到的场景，可以直接复制使用或根据需要进行调整。它们都经过实际项目验证，具有良好的浏览器兼容性和性能表现。

## 15. 总结与资源

### 14.1 CSS学习路径

1. **基础**：选择器、盒模型、布局基础、排版、颜色
2. **中级**：Flexbox、Grid、响应式设计、过渡与动画
3. **高级**：CSS架构、预处理器、性能优化、现代CSS特性
4. **专业**：CSS Houdini、设计系统、可访问性、国际化

### 14.2 推荐资源

- **文档**：[MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- **交互式学习**：[CSS Grid Garden](https://cssgridgarden.com/)、[Flexbox Froggy](https://flexboxfroggy.com/)
- **CSS参考**：[CSS-Tricks](https://css-tricks.com/)、[Smashing Magazine](https://www.smashingmagazine.com/)
- **工具**：[Can I Use](https://caniuse.com/)、[CSS Validator](https://jigsaw.w3.org/css-validator/)
- **框架与库**：[Tailwind CSS](https://tailwindcss.com/)、[Bootstrap](https://getbootstrap.com/)、[Styled Components](https://styled-components.com/)

### 14.3 CSS未来展望

- **容器查询**：基于容器大小而非视口大小的响应式设计
- **嵌套**：原生CSS嵌套支持
- **层叠层**：更精细地控制样式优先级
- **颜色函数**：更强大的颜色操作
- **范围媒体查询**：在两个断点之间应用样式
- **子网格**：更灵活的网格布局

通过掌握这些CSS进阶知识，你将能够创建更加现代、高效和可维护的样式表，提升网站的用户体验和性能。