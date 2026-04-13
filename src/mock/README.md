# Mock 用法

## 项目启动前 是否配置 Mock 功能

在 vue.config.js 中配置：

```js
// 启用mock
const mock = true;
// 禁用mock
const mock = false;
```

## 项目启动后 启用/禁用 Mock

在浏览器控制台中执行：

```javascript
// 启用 Mock
window.toggleMock(true);

// 禁用 Mock
window.toggleMock(false);
location.reload(); //注意：禁用 Mock 后需要刷新页面才能生效
```

状态会保存在 localStorage 中，刷新页面后仍然有效。

## 配置 Mock

在 `mock-config.js` 中添加接口配置：

```javascript
{
    '/your/path': {
        method: 'get',
        mock: true,
        data: {
            code: 200,
            msg: 'success',
            data: {}
        }
    }
}
```

-   `mock: true` 启用该接口的 mock
-   `mock: false` 或不配置则跳过该接口
