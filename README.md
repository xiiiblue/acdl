# 蜂巢ACDL公开站点

本项目将蜂巢已经通过评审的《Agent协同研发体系》手册发布为公开网站：

https://www.bluexiii.com/acdl/

## 本地运行

```bash
npm install
npm run dev
```

访问终端输出的本地地址。运行`npm test`会静态导出完整站点，并检查首页、全部章节、元数据和GitHub Pages支持文件。

## 内容结构

- `content/`保存公开手册的Markdown源文件；
- `app/`保存首页、章节阅读页和全站样式；
- `components/`保存搜索等交互组件；
- `public/`保存站点图标和分享预览图。

站点只公开手册内容。手册中指向蜂巢私有仓库其它材料的链接会显示为普通文字，不会生成外部地址。

当前站点版本为`V1.2.0`。手册于2026-10-11同步自`hive-os`的`docs/11-手册/02-研发流程手册/`，来源提交为`f0b040b0`；15个章节及手册总览保持与来源文件一致。

## 发布方式

推送到`main`分支后，[GitHub Actions](https://github.com/xiiiblue/acdl/actions)会运行测试，将`out/`中的静态文件部署到GitHub Pages。站点以`/acdl/`为基础路径，不需要单独修改`www.bluexiii.com`的DNS配置。

## 视觉与阅读体验

2026-10-16参照蜂巢网站统一视觉：冷白背景、钴蓝强调、海军蓝概念图，使用系统字体，不加载外部字体。首页保留四阶段目录锚点，以分组目录展示12章正文和3篇附录；原有手册正文、章节地址和V1.2.0版本标识保持不变。

首页、正文和404页共用`components/SiteHeader.tsx`及`components/SiteFooter.tsx`。阅读页在桌面提供章节导航、正文与本章目录，手机通过“章节目录”按钮展开导航。统一颜色、间距、代码、表格和打印样式在`app/globals.css`中维护，不依赖蜂巢网站的运行环境或源码。

`npm run lint`检查代码规范；`npm test`构建静态站点并执行7组测试，覆盖页面结构、全部章节、本地链接、目录锚点、元数据和Pages支持文件。设计说明与浏览器复核见[设计QA报告](design-qa.md)。
