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

## 发布方式

推送到`main`分支后，[GitHub Actions](https://github.com/xiiiblue/acdl/actions)会运行测试，将`out/`中的静态文件部署到GitHub Pages。站点以`/acdl/`为基础路径，不需要单独修改`www.bluexiii.com`的DNS配置。
