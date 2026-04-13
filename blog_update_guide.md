# Hugo 博客网站更新、修改与上传教程

这份文档用于说明以后如何在本地修改博客内容，并同步到 GitHub Pages。

---

## 一、项目目录

你的本地项目目录示例：

```text
D:\my-blog
```

常用的重要文件和文件夹：

```text
hugo.toml                         # 全局配置
content/                          # 页面与文章内容
content/posts/                    # 博客文章
content/project-details/          # 项目详情页
assets/css/extended/custom.css    # 自定义样式
layouts/shortcodes/               # 自定义组件
static/                           # 静态资源，如头像、图片
.github/workflows/hugo.yaml       # GitHub Actions 自动部署
```

---

## 二、日常更新网站的标准流程

以后你每次改完内容，基本都按这套流程：

```powershell
cd D:\my-blog
git add .
git commit -m "update site"
git push
```

推送后 GitHub 会自动触发 Actions 构建和部署。

线上地址：

```text
https://awwbugbug.github.io/
```

---

## 三、常见修改场景

### 1. 修改网站标题、导航、首页模式、社交链接

改这个文件：

```text
hugo.toml
```

适合修改的内容：

- 网站标题
- 顶部菜单
- GitHub / 邮箱链接
- 默认主题模式
- profileMode 首页配置
- baseURL

改完后本地预览：

```powershell
hugo server
```

浏览器打开：

```text
http://localhost:1313
```

---

### 2. 写新博客文章

在项目目录执行：

```powershell
hugo new posts/文章名.md
```

例如：

```powershell
hugo new posts/my-second-post.md
```

然后打开生成的文件：

```text
content/posts/my-second-post.md
```

把里面的：

```md
draft: true
```

改成：

```md
draft: false
```

否则文章不会显示在网站中。

一个基础文章模板如下：

```md
---
title: "文章标题"
date: 2026-04-12T16:00:00+08:00
draft: false
tags: ["tag1", "tag2"]
categories: ["notes"]
summary: "这篇文章的简要说明。"
---

这里写正文内容。
```

---

### 3. 修改 About 页面

改这个文件：

```text
content/about.md
```

---

### 4. 修改 Projects 页面

改这个文件：

```text
content/projects.md
```

如果是改项目卡片结构，还要看这个文件：

```text
layouts/shortcodes/project-card.html
```

---

### 5. 修改项目详情页

改这个目录下对应的 markdown 文件：

```text
content/project-details/
```

例如：

```text
content/project-details/telegram-bot.md
content/project-details/unity-game.md
content/project-details/blog-site.md
```

---

### 6. 修改样式和外观

改这个文件：

```text
assets/css/extended/custom.css
```

适合修改的内容：

- 首页留白
- 字体大小
- 按钮样式
- 卡片样式
- Projects 页面布局
- 页脚风格
- 深色 / 浅色模式适配

改完后用下面命令本地预览：

```powershell
hugo server
```

---

### 7. 更换头像或图片

把图片放到：

```text
static/
```

例如头像：

```text
static/avatar.jpg
```

如果要在页面中引用：

```md
![avatar](/avatar.jpg)
```

或者在配置里写：

```toml
imageUrl = "/avatar.jpg"
```

注意：

- 文件名大小写尽量保持一致
- 图片路径前面一般写 `/`

---

## 四、本地预览方法

每次改完都建议先本地预览。

在项目目录执行：

```powershell
cd D:\my-blog
hugo server
```

浏览器打开：

```text
http://localhost:1313
```

如果只是修改了内容或样式，保存后页面通常会自动刷新。

停止本地预览：

```text
Ctrl + C
```

---

## 五、上传到 GitHub 的完整步骤

每次更新后执行：

```powershell
cd D:\my-blog
git add .
git commit -m "update site"
git push
```

说明：

- `git add .`：把修改加入暂存区
- `git commit -m "update site"`：生成一次提交记录
- `git push`：把代码上传到 GitHub

上传后 GitHub 会自动部署。

---

## 六、如何检查部署是否成功

### 方法 1：看 GitHub Actions

进入仓库：

```text
https://github.com/awwbugbug/awwbugbug.github.io
```

打开顶部：

```text
Actions
```

看 `Deploy Hugo site to Pages` 是否绿色成功。

### 方法 2：看线上网站

打开：

```text
https://awwbugbug.github.io/
```

如果刚 push 完，可能要等 1 到 5 分钟。

---

## 七、最常见问题

### 1. 新文章没显示

优先检查：

```md
draft: false
```

如果还是没显示，再检查：

- 文件是不是放在 `content/posts/`
- front matter 格式是否正确
- 是否保存了文件

---

### 2. 图片不显示

检查：

- 图片是否真的放在 `static/`
- 路径是否写成了 `/文件名`
- 文件名大小写是否一致

例如：

```text
static/avatar.jpg
```

页面引用：

```text
/avatar.jpg
```

---

### 3. 本地正常，线上不正常

先检查：

- 是否已经 `git push`
- GitHub Actions 是否失败
- `baseURL` 是否正确
- 浏览器是否缓存了旧页面

当前正确的 `baseURL` 应为：

```toml
baseURL = 'https://awwbugbug.github.io/'
```

---

### 4. CSS 改了但看起来没变化

检查：

- 是否保存了 `custom.css`
- `hugo server` 是否在运行
- 浏览器是否缓存了旧样式

可以强制刷新页面：

```text
Ctrl + F5
```

---

### 5. Git 提示没有可提交内容

说明你可能没改文件，或者改完没保存。

可先执行：

```powershell
git status
```

看 Git 是否识别到文件变化。

---

## 八、推荐的日常工作习惯

### 写文章时
优先改：

```text
content/posts/
```

### 改页面内容时
优先改：

```text
content/
```

### 改视觉样式时
优先改：

```text
assets/css/extended/custom.css
```

### 改网站整体配置时
优先改：

```text
hugo.toml
```

---

## 九、推荐的更新流程

每次按这个顺序来：

### 内容更新
1. 改 markdown 文件
2. `hugo server` 本地预览
3. 检查没问题
4. `git add .`
5. `git commit -m "update content"`
6. `git push`

### 样式更新
1. 改 `custom.css`
2. 本地预览检查深色/浅色模式
3. 确认没问题
4. `git add .`
5. `git commit -m "update styles"`
6. `git push`

### 配置更新
1. 改 `hugo.toml`
2. 本地预览
3. 检查页面是否正常
4. `git add .`
5. `git commit -m "update config"`
6. `git push`

---

## 十、常用命令速查

### 新建文章
```powershell
hugo new posts/文件名.md
```

### 本地预览
```powershell
hugo server
```

### 查看 Git 状态
```powershell
git status
```

### 提交并上传
```powershell
git add .
git commit -m "update site"
git push
```

---

## 十一、以后可以继续扩展的方向

后面你还可以继续做：

- 增加更多正式文章
- 完善 Projects 页面内容
- 增加项目截图
- 接入自定义域名
- 增加评论系统
- 增加文章标签和分类体系
- 做更精细的首页样式

---

## 十二、你当前最常用的文件

以后最常改的大概率就是这几个：

```text
hugo.toml
assets/css/extended/custom.css
content/about.md
content/projects.md
content/posts/
content/project-details/
static/avatar.jpg
```

---

## 十三、最简更新版本

如果你只记一套最短流程，记这个就够了：

```powershell
cd D:\my-blog
hugo server
```

本地检查没问题后：

```powershell
git add .
git commit -m "update site"
git push
```

然后等待 GitHub 自动部署。

---

文档结束。
