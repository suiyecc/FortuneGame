# 部署指南 - 使用Vercel代理服务器

本项目现在支持通过Vercel代理服务器来解决Google Gemini API的网络访问问题。

## 🚀 部署到Vercel

### 1. 准备工作
- 确保你有GitHub账号
- 注册Vercel账号（可以用GitHub登录）
- 将代码推送到GitHub仓库

### 2. 部署步骤

1. **连接GitHub仓库**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择你的GitHub仓库 `FortuneGame`

2. **配置项目**
   - Framework Preset: 选择 "Other"
   - Root Directory: 保持默认（根目录）
   - Build Command: 留空或填写 `echo 'Static site'`
   - Output Directory: 留空或填写 `./`

3. **部署**
   - 点击 "Deploy" 按钮
   - 等待部署完成（通常1-2分钟）

### 3. 获取部署URL

部署完成后，Vercel会提供一个URL，格式类似：
```
https://fortune-game-xxx.vercel.app
```

### 4. 更新代码中的API URL

在 `script.js` 中找到以下行：
```javascript
const apiUrl = isLocal ? '/api/gemini-proxy' : 'https://your-vercel-app.vercel.app/api/gemini-proxy';
```

将 `https://your-vercel-app.vercel.app` 替换为你的实际Vercel部署URL。

## 🔧 工作原理

### 代理服务器架构
```
用户浏览器 → Vercel代理服务器 → Google Gemini API
```

### 文件结构
```
├── api/
│   └── gemini-proxy.js     # Vercel函数，代理API请求
├── vercel.json             # Vercel配置文件
├── package.json            # 项目配置
├── script.js               # 修改后的前端代码
└── ...
```

### 代理服务器功能
- **CORS处理**：解决跨域问题
- **API转发**：将前端请求转发到Google Gemini API
- **错误处理**：提供友好的错误信息
- **安全性**：API密钥在服务器端处理

## 🌐 使用方式

### 本地开发
- 本地运行时，代码会自动使用 `/api/gemini-proxy` 路径
- 需要启动本地服务器来模拟API代理

### 生产环境
- 部署到Vercel后，代码会自动使用Vercel的API端点
- 用户可以正常访问Google Gemini API功能

## 🔑 API密钥配置

用户仍然需要：
1. 获取Google Gemini API密钥
2. 在网页的AI设置中输入密钥
3. 密钥会加密存储在浏览器本地

## 📝 注意事项

1. **首次部署后**：记得更新 `script.js` 中的Vercel URL
2. **API限制**：仍然受Google Gemini API的使用限制
3. **成本**：Vercel免费版有使用限制，超出后可能需要付费
4. **安全性**：API密钥仍在前端传输，建议后续版本考虑服务器端存储

## 🎯 优势

✅ **解决网络问题**：绕过直接访问Google API的网络限制  
✅ **简单部署**：一键部署到Vercel  
✅ **自动HTTPS**：Vercel提供免费SSL证书  
✅ **全球CDN**：快速访问速度  
✅ **零配置**：无需服务器管理  

现在你的MBTI占卜游戏可以稳定地使用AI功能了！🎉