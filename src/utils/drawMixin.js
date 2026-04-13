// 屏幕适配 mixin 函数
import { bus } from "../components/common/bus"
// * 默认缩放值
const scale = {
  width: '1',
  height: '1',
}

// * 设计稿尺寸（px）
const baseWidth = 1704
const baseHeight = 1357
// 
// * 需保持的比例（默认1.77778）
const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))

export default {
  data() {
    return {
      // * 定时函数
      drawTiming: null,
      contentHeight: 0,
      contentWidth: 0,
    }
  },
  watch: {
    // * 监听屏幕宽度变化
    isCollapse: {
      handler(newv, oldv) {
        console.log('缩放页面');
        setTimeout(() => {
          this.resize()
        }, 300)
      }
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    }
  },
  mounted() {

    // this.$nextTick(() => {
    // bus.$on('collapse-content', (msg) => {
    //   console.log(msg, 'mg\esgsggg');
    // })
    this.contentWidth = document.querySelector('.content').scrollWidth
    this.contentHeight = document.querySelector('.content').scrollHeight
    // })

    this.calcRate()
    // document.querySelector('.content').addEventListener('resize', this.resize)
    window.addEventListener('resize', this.resize)

  },
  beforeDestroy() {
    // document.querySelector('.content').removeEventListener('resize', this.resize)
    window.removeEventListener('resize', this.resize)

  },
  methods: {

    calcRate() {
      const appRef = this.$refs["appRef"]
      if (!appRef) return
      // 当前宽高比
      const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))
      if (appRef) {
        if (currentRate > baseProportion) {
          // 表示更宽
          scale.width = ((window.innerHeight * baseProportion) / baseWidth).toFixed(5)
          scale.height = (window.innerHeight / baseHeight).toFixed(5)
          // appRef.style.transform = `scale(${scale.width}, ${scale.height})`
        } else {
          // 表示更高
          scale.height = ((window.innerWidth / baseProportion) / baseHeight).toFixed(5)
          scale.width = (window.innerWidth / baseWidth).toFixed(5)
          // appRef.style.transform = `scale(${scale.width}, ${scale.height})`
        }
      }
    },
    resize() {
      clearTimeout(this.drawTiming)
      this.drawTiming = setTimeout(() => {
        this.calcRate()
      }, 200)
    }
  },
}
