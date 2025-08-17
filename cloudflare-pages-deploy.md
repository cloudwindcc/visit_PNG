# Cloudflare Pages 部署指南

## 📋 部署前准备

### 1. 安装Wrangler CLI
```bash
npm install -g wrangler
```

### 2. 登录Cloudflare
```bash
wrangler login
```

### 3. 验证项目配置
确保项目根目录包含以下文件：
- `wrangler.toml` - Cloudflare配置
- `_redirects` - 重定向规则
- `_headers` - 响应头配置
- `package.json` - 包含build命令

## 🚀 部署步骤

### 方法一：使用Wrangler CLI部署
```bash
# 构建项目
npm run build

# 部署到Cloudflare Pages
wrangler pages deploy dist --project-name=visit-png
```

### 方法二：GitHub集成部署

1. **在Cloudflare Pages创建项目**
   - 访问：https://dash.cloudflare.com
   - 进入Pages → "Create a project"
   - 选择GitHub仓库：cloudwindcc/visit_PNG

2. **配置构建设置**
   ```
   Framework preset: Vite
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```

3. **环境变量（可选）**
   ```
   NODE_VERSION: 18
   NPM_VERSION: 9
   ```

### 方法三：直接上传部署
```bash
# 构建项目
npm run build

# 压缩构建结果
cd dist && zip -r ../visit-png-build.zip .

# 上传到Cloudflare Pages
wrangler pages deploy dist --project-name=visit-png
```

## ⚙️ 配置说明

### 路由配置 (`_redirects`)
```
/attractions/*  /index.html  200
/guides/*  /index.html  200
/*  /index.html  200
```

### 缓存策略 (`_headers`)
- 静态资源：缓存1年
- HTML文件：不缓存
- 安全头：X-Frame-Options, X-Content-Type-Options等

### 构建配置
项目已配置为Vite构建，输出目录为`dist`，完全兼容Cloudflare Pages。

## ✅ 验证部署

部署完成后，访问：
- 生产环境：https://visit-png.pages.dev
- 自定义域名（需配置）：your-domain.com

## 📊 性能优化

Cloudflare Pages自动提供：
- 全球CDN加速
- HTTP/2和HTTP/3支持
- 自动HTTPS
- 边缘缓存优化
- 图片优化（可选）

## 🔄 持续部署

GitHub集成后，每次推送到main分支将自动触发重新部署。

## 📞 故障排除

如果遇到问题：
1. 检查构建日志
2. 验证文件路径
3. 检查_wrangler.toml_配置
4. 查看Cloudflare Pages文档