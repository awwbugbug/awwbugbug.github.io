# Personal Site

Apple 风格的个人网站，用 [Astro](https://astro.build) 构建。输出的是纯静态 HTML，不依赖任何外部 CDN，可以部署到 Cloudflare Pages 或 GitHub Pages。

## 页面

| 网址 | 内容 | 数据文件 |
|---|---|---|
| `/` | 首页：自我介绍、各板块入口、社交链接 | `src/config.ts` |
| `/projects` | GitHub 项目（构建时自动拉取 Star、语言等信息） | `src/data/projects.json` |
| `/aigc` | AIGC 作品画廊（图片和视频，点击放大，可复制 prompt） | `src/data/aigc.json` |
| `/papers` | 论文，按年份分组（可复制 BibTeX、展开摘要） | `src/data/papers.json` |
| `/toolbox` | 常用 Skills 和 MCP（可一键复制安装命令） | `src/data/toolbox.json` |
| `/vpn` | 机场推荐（中文页面） | `src/data/vpn.json` |

**日常更新只需要改 `src/data/` 里的 JSON 文件**，页面会自动生成。名字、邮箱、社交链接、导航栏都在 `src/config.ts`。

```
src/
  config.ts          全站信息：名字、邮箱、社交链接、导航
  data/*.json        各页面的内容
  pages/*.astro      各页面的结构和样式
  layouts/Base.astro 公共框架：导航栏、页脚
  components/        Dock、页面标题、社交图标
  styles/global.css  全站样式（颜色变量在文件顶部）
  scripts/main.ts    交互：滚动淡入、筛选、复制、灯箱、Dock 放大
public/              原样发布的文件：图片、视频、PDF、favicon
  aigc/              AIGC 作品
  papers/            论文 PDF
```

## 怎么添加内容

**GitHub 项目**（`projects.json`）：最少只要写 `repo`，例如 `"repo": "你的用户名/仓库名"`。简介、语言、Star 数会在构建时从 GitHub 自动获取，你在 JSON 里写了 `description` 的话就用你写的。加上 `"featured": true` 的项目会占满一整行。

**AIGC 作品**（`aigc.json`）：
- 图片：放到 `public/aigc/`，然后写 `"image": "/aigc/文件名.webp"`。
- 视频：短视频（建议小于 20 MB）可以放 `public/aigc/`，写 `"video": "/aigc/xxx.mp4"`；长视频建议上传到 YouTube 或 B 站，写 `"embed": "嵌入地址"`：
  - YouTube：`https://www.youtube.com/embed/视频ID`
  - B 站：`https://player.bilibili.com/player.html?bvid=BV号&autoplay=0`
- `ratio` 是缩略图比例，比如 `"16/9"`、`"4/5"`。
- `image` 留空时会显示彩色占位图。

**论文**（`papers.json`）：`links` 里可以写 `pdf`、`arxiv`、`code`、`doi`，没有的项留空或删掉。PDF 放到 `public/papers/`，写 `"/papers/xxx.pdf"`。`src/config.ts` 里的 `authorName` 会在作者列表里加粗显示。

**Skills / MCP**（`toolbox.json`）：`kind` 写 `"skill"` 或 `"mcp"`；`install` 是安装命令，会显示复制按钮。

**图片建议**：转成 WebP 格式，宽度 1600–2000px，单张控制在 500 KB 以内。

## 本地开发

第一次运行先安装依赖：

```bash
npm install
```

启动本地预览（访问 http://localhost:4321，改完文件会自动刷新）：

```bash
npm run dev
```

构建正式版本（输出到 `dist/`）：

```bash
npm run build
```

## 上传到 GitHub

先在 GitHub 新建一个空仓库，然后在项目目录运行：

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

以后每次更新：`git add . && git commit -m "更新说明" && git push`。

## 部署（二选一）

### 方案 A：Cloudflare Pages（推荐）

1. [Cloudflare 控制台](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**，选择这个仓库。
2. 构建设置：
   - Framework preset：`Astro`
   - Build command：`npm run build`
   - Build output directory：`dist`
   - 环境变量：添加 `NODE_VERSION` = `24`（Astro 7 需要 Node 22.23 以上）
3. 保存并部署。以后每次 `git push` 都会自动更新。
4. 自定义域名：项目里的 **Custom domains** → **Set up a custom domain**。

### 方案 B：GitHub Pages

仓库里已经有 `.github/workflows/deploy.yml`：

1. 仓库 → **Settings** → **Pages** → Source 选 **GitHub Actions**。
2. 推送到 `main` 分支后会自动构建发布，可以在仓库的 **Actions** 标签页查看进度。
3. 网址是 `https://你的用户名.github.io/仓库名/`；如果仓库名是 `你的用户名.github.io`，网址就是 `https://你的用户名.github.io/`。子路径会被自动处理，不用改代码。

用 Cloudflare 部署的话，可以把这个 workflow 文件删掉，避免重复构建。
