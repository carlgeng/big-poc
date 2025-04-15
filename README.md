# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 医疗需求与创新平台

一个基于React和Node.js的医疗创新平台，用于收集临床需求、征集创新方案、进行评选投票，并通过区块链技术确保数据透明可信。

## 技术栈

- **前端**: React, React Router, Tailwind CSS, Chart.js
- **后端**: Node.js, Express
- **测试**: Vitest, React Testing Library
- **开发工具**: Vite, ESLint, MSW

## 安装与运行

### 前端

1. 进入前端目录：
   ```bash
   cd frontend

安装依赖：
bash

npm install

创建 .env 文件并配置：
plaintext

VITE_API_URL=http://localhost:8080

运行开发服务器：
bash

npm run dev

访问 http://localhost:3000

后端
进入后端目录：
bash

cd backend

安装依赖：
bash

npm install

运行服务器：
bash

npm start

后端服务运行在 http://localhost:8080

测试
运行测试：
bash

npm run test

功能特性
用户认证（登录、注册、个人资料管理）

临床需求管理（提交、编辑、查看、投票）

创新方案管理（提交、编辑、查看）

评选投票系统

区块链数据验证（模拟）

年度报告与活动管理

管理员功能（用户管理）

默认账户
管理员账户
邮箱: admin@example.com

密码: admin123

注意事项
区块链功能为模拟实现，生产环境需替换为真实区块链接口（如Ethereum、Hyperledger）。

确保前后端端口一致（默认前端3000，后端8080）。

生产部署需要配置HTTPS和环境变量。

贡献
欢迎提交Issue或Pull Request！
许可证
MIT

### 9. Modifications to Existing Code

#### Update `src/services/auth.js`
```javascript
import api from './api';
import { setStoredToken, removeStoredToken } from './storage';

export const login = async (email, password, rememberMe) => {
  const response = await api.post('/login', { email, password });
  if (rememberMe) {
    setStoredToken(response.token, true);
  } else {
    setStoredToken(response.token, false);
  }
  return response;
};

export const register = async (userData) => {
  const response = await api.post('/register', userData);
  setStoredToken(response.token);
  return response;
};

export const logout = async () => {
  removeStoredToken();
};

export const getProfile = async () => {
  return await api.get('/profile');
};

Update src/services/storage.js
javascript

export const getStoredToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const setStoredToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
};

export const removeStoredToken = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};

Update src/utils/constants.js
javascript

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const CATEGORIES = {
  surgery: '外科手术',
  diagnosis: '诊断',
  treatment: '治疗',
  nursing: '护理',
  rehabilitation: '康复',
  prevention: '预防',
  monitoring: '监测',
  other: '其他',
};

export const PRIORITIES = {
  high: '高',
  medium: '中',
  low: '低',
};

export const STATUSES = {
  draft: '草稿',

区块链技术细节

医疗数据安全

更详细的注释

