---
title: 如何搭建一个 Next.js 博客
description: 一步步教你如何使用 Next.js 搭建一个功能完善的全栈个人博客，包含前端界面和后端 API。
date: 2026-06-27
tags: [Next.js, 教程, Web开发]
category: 技术
published: true
pinned: false
---

# 如何搭建一个 Next.js 博客

本文将介绍如何使用 Next.js 搭建一个个人博客。

## 为什么选择 Next.js？

Next.js 是一个基于 React 的全栈框架，具有以下优势：

1. **服务端渲染 (SSR)** - 更好的 SEO
2. **静态站点生成 (SSG)** - 更快的加载速度
3. **API 路由** - 内置后端 API
4. **文件路由** - 直观的路由系统

## 项目结构

```
my-blog/
├── src/
│   ├── app/          # 页面和 API 路由
│   ├── components/   # React 组件
│   ├── lib/          # 工具函数
│   └── content/      # 文章内容
├── public/           # 静态资源
└── package.json
```

## 安装和运行

```bash
# 创建项目
npx create-next-app@latest my-blog --typescript --tailwind

# 安装依赖
pnpm add next-mdx-remote gray-matter lucide-react

# 运行开发服务器
pnpm dev
```

## Markdown 文章格式

每篇文章使用 Markdown 编写，并在文件顶部添加 YAML frontmatter：

```yaml
---
title: 文章标题
description: 文章描述
date: 2026-06-27
tags: [Tag1, Tag2]
category: 技术
published: true
---
```

## 部署

### Vercel（推荐）

将代码推送到 GitHub，在 Vercel 中导入项目即可自动部署。

### 自托管服务器

```bash
# 构建
pnpm build

# 使用 PM2 运行
pm2 start pnpm --name "blog" -- start
```

## 小结

Next.js 提供了一个完整的前后端解决方案，非常适合用来搭建个人博客。
