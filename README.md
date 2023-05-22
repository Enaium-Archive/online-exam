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

## 部分图片

![5719b15a811011a594cc33c7155c694](https://github.com/Enaium/online-exam/assets/32991121/3d0fd03b-18be-4009-b6d6-db5bbb40d605)
![fa625c5a768f02a701ea0e746afc0e1](https://github.com/Enaium/online-exam/assets/32991121/40f3e3ad-8b2c-47cb-9a3f-03c77ee73f91)
![c6dfbddb52431878b7373da39666b82](https://github.com/Enaium/online-exam/assets/32991121/f5b51a8f-a302-4884-aabb-f55478320acc)
![d3837d9703c9e905a01425a232eb546](https://github.com/Enaium/online-exam/assets/32991121/e1024576-71a2-4efe-91e2-ec01c7ff695b)
