# Prompt 收藏册 / Prompt Library

中文：27 组、71 条实用 AI 提示词，涵盖界面设计、品牌、代码审查、Agent 工作流、图像视频和学习研究。保留原文与出处，附 28 份中文译文，支持分类、全文搜索、语言对照及逐条复制。纯静态单页，无需后端。

English: A static library of 71 AI prompts in 27 collections, with original text, source links and 28 Chinese translations. Browse by category, search the full text, compare languages and copy each version independently. No backend required.

![真实页面截图 / Screenshot](./assets/screenshot.png)

## 在线体验 / Live Demo

- [Cloudflare Demo](https://xiaosang.cc/x-prompt-library/)
- [GitHub Repo](https://github.com/holynova/x-prompt-library)

<img src="./assets/qr.png" width="180" alt="扫码访问 Prompt 收藏册">

## 本地运行 / Run locally

```bash
npm ci
npm run dev
```

Open http://localhost:4312/ . The self-contained `public/index.html` can also be opened offline; automatic clipboard access depends on browser permissions, with a manual-copy fallback.

## 检查与发布 / Check & deploy

```bash
npm run check
npm run sync:portfolio -- /path/to/portfolio
# Commit and push the updated catalog + x-prompt-library/ on portfolio master.
npm run deploy:check -- /path/to/portfolio
npm run deploy -- /path/to/portfolio
```

Cloudflare Workers Static Assets · `xiaosang-portfolio` · `xiaosang.cc/x-prompt-library/`.

项目源码维护在 `main`；静态文件同步到作品集 `master` 的 `x-prompt-library/`，复用现有 Worker 手动部署。发布前核对工作区干净、分支及文件一致性。

Project source stays on `main`; the portfolio hosts matching static files on `master` under the existing Worker. Commit and push both before deploying; the script checks clean branches and matching files. Prompt text remains attributed to its original authors. The collection was checked on 2026-11-08; model names and historical troubleshooting instructions retain their original context.
