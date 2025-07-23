# 前端知识体系

这是一个使用 VitePress 构建的前端知识体系网站，旨在系统化整理和分享前端开发相关的知识和实践经验。

## 内容特点

- **TypeScript 指南**：从基础到高级的 TypeScript 语法和最佳实践
- **前端工程化**：详细的前端工程化落地实践方案
- **Markdown 示例**：VitePress 提供的 Markdown 扩展功能演示
- **API 示例**：VitePress 运行时 API 的使用方法

## 本地开发

```bash
# 安装依赖
npm install
# 或
pnpm install
# 或
yarn install

# 启动开发服务器
npm run docs:dev
# 或
pnpm run docs:dev
# 或
yarn docs:dev
```

访问 `http://localhost:5173` 查看网站。

## 构建

```bash
# 构建静态网站
npm run docs:build
# 或
pnpm run docs:build
# 或
yarn docs:build

# 本地预览构建结果
npm run docs:preview
# 或
pnpm run docs:preview
# 或
yarn docs:preview
```

## 项目结构

```
.
├── config/                # 文档目录
│   ├── .vitepress/       # VitePress 配置
│   │   ├── theme/        # 自定义主题
│   │   └── config.mts    # 站点配置
│   ├── public/           # 静态资源
│   ├── index.md          # 首页
│   └── *.md              # 其他文档页面
├── package.json          # 项目依赖和脚本
└── README.md             # 项目说明
```

## 贡献

欢迎提交 Issue 或 Pull Request 来完善这个知识库。

## 许可证

MIT