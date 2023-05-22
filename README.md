# online-exam

## 介绍

区分于传统的在线考试系统，本系统采用了前后端分离的开发模式，前端使用 Vue.js，后端使用 SpringBoot，数据库使用 MySQL，前后端通过 RESTful 风格的 API 进行交互。

## 技术栈

### 后端

- [SpringBoot](https://spring.io/projects/spring-boot)
- [Jimmer](https://github.com/babyfish-ct/jimmer)

### 前端

- [Vite+Vue3(JSX)](https://vitejs.dev/)
- [NaiveUI](https://www.naiveui.com/)
- [Pinia](https://pinia.vuejs.org/)
- [WindiCSS](https://windicss.org/)

## 项目结构

### 后端

```
src
    ├─main
    │  ├─java
    │  │  └─com
    │  │      └─example
    │  │          └─server
    │  │              ├─bll
    │  │              ├─configuration
    │  │              ├─controller
    │  │              ├─interceptor
    │  │              ├─model
    │  │              │  ├─common
    │  │              │  ├─input
    │  │              │  └─response
    │  │              └─repository
    │  └─resources
    │      ├─static
    │      └─templates
    └─test
        ├─java
        │  └─com
        │      └─example
        │          └─server
        └─resources
```

### 前端

```
src
    ├─common
    ├─components
    ├─hooks
    ├─layouts
    ├─router
    ├─store
    ├─views
    └─__generated
        ├─model
        │  ├─dto
        │  ├─entities
        │  ├─enums
        │  └─static
        └─services
```
