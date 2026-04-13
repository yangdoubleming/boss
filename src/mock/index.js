import Mock from 'mockjs';
import mockConfig from './mock-config.js';
console.log(Mock);

function enableMock() {
    Object.keys(mockConfig).forEach((url) => {
        const prefix = '/api';
        const fullUrl = prefix + url;
        const config = mockConfig[url];
        const isNeedMock = config.mock;

        if (isNeedMock) {
            const wrappedHandler = function (options) {
                console.log(`%c[Mock] 请求拦截`, 'color: #67C23A; font-weight: bold', {
                    method: config.method.toUpperCase(),
                    url: url,
                    time: new Date().toLocaleTimeString()
                });
                console.log(`%c[Mock] 请求参数`, 'color: #409EFF', options);

                const response = Mock.mock(config.data);

                console.log(`%c[Mock] 响应数据`, 'color: #E6A23C', response);

                return response;
            };

            const pathOnly = fullUrl.split('?')[0];
            const regex = new RegExp(`^${pathOnly}(\\?.*)?$`);

            Mock.mock(regex, config.method, wrappedHandler);
            console.log(`%c[Mock] 已注册接口: ${url}`, 'color: #67C23A');
        } else {
            console.log(`%c[Mock] 跳过接口(不在白名单): ${url}`, 'color: #F56C6C');
        }
    });
}

function disableMock() {
    Mock.setup({ timeout: '0' });
    console.log('%c[Mock] Mock 已禁用', 'color: #F56C6C');
}

if (process.env.NODE_ENV === 'development') {
    const mockEnabled = localStorage.getItem('mockEnabled') === 'true';

    if (mockEnabled) {
        enableMock();
    } else {
        disableMock();
    }

    window.toggleMock = function (enabled) {
        localStorage.setItem('mockEnabled', enabled);
        if (enabled) {
            enableMock();
        } else {
            disableMock();
        }
        console.log(`%c[Mock] Mock 已${enabled ? '启用' : '禁用'}`, 'color: #67C23A');
    };
}
