
// 是否启用 mock
const mock = true 

// 解析执行的 npm script 指令
function getNpmScriptName() {
  // process.argv 是 Node.js 进程的命令行参数数组
  const args = process.argv;
  
  // 情况1：npm run dev 时，参数中会包含 "dev"（不同环境可能略有差异）
  // 优先从 npm_lifecycle_event 环境变量获取（最可靠）
  const scriptName = process.env.npm_lifecycle_event;
  if (scriptName) {
    return scriptName;
  }

  // 情况2：兼容 yarn/pnpm 或参数异常的情况，从 argv 中解析
  for (let i = 0; i < args.length; i++) {
    if (args[i].includes('run')) {
      // 找到 "run" 后，下一个参数就是脚本名（如 npm run dev -> args 包含 "run", "dev"）
      return args[i + 1] || '';
    }
  }
  
  // 兜底：未识别到指令
  return '';
}

// 获取当前执行的脚本名称
const currentScript = getNpmScriptName();
console.log('当前执行的 npm script 指令：', currentScript);
module.exports = {
  // publicPath: '/',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    open: true,
    port: 9528,
    proxy: {
      '/api': {
        target: `${process.env.VUE_APP_BASE_URL}`,
        // target: `http://boss.dowsure.com/v3/api`, 
        pathRewrite: {
          '/api': ''
        },
        changeOrigin: true
      },
    },


  },
    // 根据脚本指令定制配置
  configureWebpack: {
    // 示例：不同指令设置不同的环境变量
    plugins: [
      // dev指令启用mock
      new (require('webpack').DefinePlugin)({
        'process.env.VUE_APP_MOCK': currentScript === 'dev' && mock
      })
    ]
  },
}
