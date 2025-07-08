# 🔐 RAGFlow 主应用登录集成指南

## 📋 概述

本指南详细说明如何在主应用中集成RAGFlow微应用，并实现登录信息的无缝传递，让用户无需重复登录即可使用RAGFlow功能。

## 🎯 实现方案

### 核心思路
主应用在加载RAGFlow微应用时，将当前用户的认证信息通过qiankun的props传递给微应用，微应用接收后自动设置登录状态。

### 认证信息格式
```typescript
interface AuthInfo {
  authorization: string;  // Authorization header 值，格式: "Bearer token"
  token: string;         // 访问令牌
  userInfo: {           // 用户基本信息
    avatar?: string;    // 用户头像URL
    name: string;       // 用户姓名
    email: string;      // 用户邮箱
  };
}
```

## 🚀 主应用集成步骤

### 步骤1: 安装qiankun
```bash
npm install qiankun
# 或
yarn add qiankun
```

### 步骤2: 注册RAGFlow微应用
```javascript
import { registerMicroApps, start } from 'qiankun';

// 注册微应用
registerMicroApps([
  {
    name: 'ragflow',
    entry: 'http://localhost:2080/umi.js',  // RAGFlow服务地址
    container: '#ragflow-container',   // 容器ID
    activeRule: '/ragflow',           // 激活路由
    props: {
      routerBase: '/ragflow',
      parentApp: 'your-main-app-name'
    }
  }
]);

// 启动qiankun
start();
```

### 步骤3: 传递认证信息
```javascript
import { loadMicroApp } from 'qiankun';

// 获取当前用户认证信息的函数（需要根据你的实际情况实现）
function getCurrentUserAuth() {
  // 从你的认证系统获取用户信息
  return {
    authorization: `Bearer ${localStorage.getItem('access_token')}`,
    token: localStorage.getItem('access_token'),
    userInfo: {
      avatar: localStorage.getItem('user_avatar'),
      name: localStorage.getItem('user_name'),
      email: localStorage.getItem('user_email')
    }
  };
}

// 加载微应用并传递认证信息
function loadRAGFlowWithAuth() {
  const authInfo = getCurrentUserAuth();
  
  const microApp = loadMicroApp({
    name: 'ragflow',
    entry: 'http://localhost:2080/umi.js',
    container: '#ragflow-container',
    props: {
      routerBase: '/ragflow',
      parentApp: 'your-main-app-name',
      authInfo: authInfo  // 关键：传递认证信息
    }
  });
  
  return microApp;
}
```

### 步骤4: Vue 3 集成示例
```vue
<template>
  <div>
    <div id="ragflow-container" style="height: 100vh;"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { loadMicroApp } from 'qiankun';

let microApp = null;

// 获取认证信息
const getAuthInfo = () => {
  return {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    token: localStorage.getItem('token'),
    userInfo: {
      avatar: localStorage.getItem('avatar'),
      name: localStorage.getItem('username'),
      email: localStorage.getItem('email')
    }
  };
};

onMounted(async () => {
  try {
    const authInfo = getAuthInfo();
    
         microApp = loadMicroApp({
       name: 'ragflow',
       entry: 'http://localhost:2080/umi.js',
       container: '#ragflow-container',
       props: {
         routerBase: '/ragflow',
         parentApp: 'vue-main-app',
         authInfo: authInfo
       }
     });
    
    await microApp.mountPromise;
    console.log('RAGFlow微应用加载成功');
  } catch (error) {
    console.error('微应用加载失败:', error);
  }
});

onUnmounted(async () => {
  if (microApp) {
    await microApp.unmount();
    microApp = null;
  }
});
</script>
```

### 步骤5: React 集成示例
```jsx
import React, { useEffect, useRef } from 'react';
import { loadMicroApp } from 'qiankun';

const RAGFlowContainer = () => {
  const containerRef = useRef(null);
  const microAppRef = useRef(null);

  // 获取认证信息
  const getAuthInfo = () => {
    return {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      token: localStorage.getItem('token'),
      userInfo: {
        avatar: localStorage.getItem('avatar'),
        name: localStorage.getItem('username'),
        email: localStorage.getItem('email')
      }
    };
  };

  useEffect(() => {
    const loadMicroApp = async () => {
      try {
        const authInfo = getAuthInfo();
        
                 microAppRef.current = loadMicroApp({
           name: 'ragflow',
           entry: 'http://localhost:2080/umi.js',
           container: containerRef.current,
           props: {
             routerBase: '/ragflow',
             parentApp: 'react-main-app',
             authInfo: authInfo
           }
         });
        
        await microAppRef.current.mountPromise;
        console.log('RAGFlow微应用加载成功');
      } catch (error) {
        console.error('微应用加载失败:', error);
      }
    };

    loadMicroApp();

    return () => {
      if (microAppRef.current) {
        microAppRef.current.unmount();
      }
    };
  }, []);

  return <div ref={containerRef} style={{ height: '100vh' }} />;
};

export default RAGFlowContainer;
```

## 🔧 认证信息转换

如果你的主应用认证信息格式与RAGFlow不同，可以使用转换函数：

```javascript
// 转换函数示例
function convertAuthInfo(mainAppAuth) {
  return {
    authorization: mainAppAuth.authHeader || `Bearer ${mainAppAuth.accessToken}`,
    token: mainAppAuth.accessToken,
    userInfo: {
      avatar: mainAppAuth.userAvatar,
      name: mainAppAuth.userName || mainAppAuth.displayName,
      email: mainAppAuth.userEmail
    }
  };
}

// 使用转换函数
const authInfo = convertAuthInfo(getCurrentUserAuth());
```

## 🧪 测试方法

### 1. 使用提供的测试页面
打开 `auth-integration-test.html` 进行完整的集成测试：

```bash
# 启动RAGFlow开发服务器
npm run dev

# 在浏览器中打开测试页面
open auth-integration-test.html
```

### 2. 测试步骤
1. 点击"模拟主应用登录"获取认证信息
2. 点击"传递认证信息并加载微应用"
3. 观察微应用是否跳过登录页面直接进入主界面
4. 使用"测试微应用登录状态"验证登录是否成功

### 3. 验证成功标志
- ✅ 微应用加载后直接显示主界面，无登录页面
- ✅ 右上角显示用户信息而非登录按钮
- ✅ 可以正常访问需要登录的功能（如知识库等）

## 🚨 注意事项

### 1. 安全性
- 确保认证信息传递过程中的安全性
- 建议使用HTTPS协议传输敏感信息
- 定期刷新token，避免token过期

### 2. 错误处理
```javascript
// 添加错误处理
const loadMicroAppWithAuth = async () => {
  try {
    const authInfo = getAuthInfo();
    
    // 验证认证信息完整性
    if (!authInfo.token || !authInfo.userInfo.email) {
      throw new Error('认证信息不完整');
    }
    
         const microApp = loadMicroApp({
       name: 'ragflow',
       entry: 'http://localhost:2080/umi.js',
       container: '#ragflow-container',
       props: {
         routerBase: '/ragflow',
         parentApp: 'main-app',
         authInfo: authInfo
       }
     });
    
    await microApp.mountPromise;
    
  } catch (error) {
    console.error('微应用加载失败:', error);
    // 处理错误，可能需要重定向到登录页面
    handleAuthError(error);
  }
};
```

### 3. 开发环境配置
- 确保RAGFlow开发服务器运行在 `http://localhost:2080`
- 检查CORS配置，确保主应用可以访问微应用
- 开发环境下可能会看到路由警告，这是正常的

## 📞 技术支持

如果在集成过程中遇到问题：

1. 检查浏览器控制台是否有错误信息
2. 确认认证信息格式是否正确
3. 验证qiankun配置是否正确
4. 使用提供的测试页面进行调试

## 🎉 完成

按照以上步骤完成集成后，用户将能够：
- 在主应用中无缝使用RAGFlow功能
- 无需重复登录即可访问所有功能
- 享受统一的用户体验

恭喜！您已成功实现RAGFlow微应用的登录集成！🎊 