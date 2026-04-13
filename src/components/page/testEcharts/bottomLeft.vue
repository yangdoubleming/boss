<template>
  <div id="bottomLeft">
    <div class="bg-color-black-cc">
      <div style="width: 70%;">
        <!-- 圆环图 -->
        <CenterLeft1Chart :cdata=allPieDta.cdata />
      </div>
      <div class="right-box">
        <!-- <dv-border-box-2 style="height: 100px;">
          <el-popover placement="top-start" title="标题" width="200" trigger="hover">
            <CenterLeft1Chart />
            <div slot="reference" class="right-top">
              <div class="top-one"> learn more >></div>
              <div class="top-two">非亚马逊数据</div>
            </div>
          </el-popover>

        </dv-border-box-2> -->

        <div class="show-data">
          <div class="item-box " v-for="(item, index) in numberData" :key="index">
            <div class="item-title">
              {{ item.text }}
            </div>
            <div style=" font-weight: 600;" class="d-flex">
              {{ item.number }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CenterLeft1Chart from '@/components/echart/centerLeft/centerLeft1Chart/chart'
export default {
  props: {
    allPieDta: {
      type: Object,
      default: () => ({})
    },
    allData: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    allPieDta: {
      handler(newData) {
        this.allPieDta = newData
        let newNumberData = [
          {
            number: this.allPieDta && this.allPieDta.newestReserve ? this.allPieDta.newestReserve.amount : 'NA',
            text: '店铺保证金值'
          },
          {
            number: this.allPieDta && this.allPieDta.profit ? this.allPieDta.profit.amount : 'NA',
            text: '毛利'
          },
          {
            number: this.allPieDta && this.allPieDta.profitRate ? (this.allPieDta.profitRate.amount) * 100 + '%' : 'NA',
            text: '毛利率'
          },
          {
            number: this.allPieDta && this.allPieDta.totalExpenses ? this.allPieDta.totalExpenses.amount : 'NA',
            text: '支出'
          },
          {
            number: this.allPieDta && this.allPieDta.income ? this.allPieDta.income[0].amount : 'NA',
            text: '收入'
          },
          {
            number: this.allData && this.allData.returnRate ? this.allData.returnRate + '%' : 'NA',
            text: '回款率'
          },
        ]
        this.numberData = [...newNumberData]
      },
      deep: true, // 深度监听
      immediate: true // 监听到后，立即执行handler方法
    },
    allData: {
      handler(newData) {
        this.allData = newData
        let newNumberData = [
          {
            number: this.allPieDta && this.allPieDta.newestReserve ? this.allPieDta.newestReserve.amount : 'NA',
            text: '店铺保证金值'
          },
          {
            number: this.allPieDta && this.allPieDta.profit ? this.allPieDta.profit.amount : 'NA',
            text: '毛利'
          },
          {
            number: this.allPieDta && this.allPieDta.profitRate ? (this.allPieDta.profitRate.amount) * 100 + '%' : 'NA',
            text: '毛利率'
          },
          {
            number: this.allPieDta && this.allPieDta.totalExpenses ? this.allPieDta.totalExpenses.amount : 'NA',
            text: '支出'
          },
          {
            number: this.allPieDta && this.allPieDta.income ? this.allPieDta.income[0].amount : 'NA',
            text: '收入'
          },
          {
            number: this.allData && this.allData.returnRate ? this.allData.returnRate + '%' : 'NA',
            text: '回款率'
          },
        ]
        this.numberData = [...newNumberData]
      },
      deep: true, // 深度监听
      immediate: true // 监听到后，立即执行handler方法
    }
  },
  data() {
    return {
      // 店铺期初预留金
      beginPrice: 0,
      // 店铺期末预留金
      endPrice: 0,
      numberData: [
        {
          number: this.allPieDta && this.allPieDta.newestReserve ? this.allPieDta.newestReserve.amount : 'NA',
          text: '店铺保证金值'
        },
        {
          number: this.allPieDta && this.allPieDta.profit ? this.allPieDta.profit.amount : 'NA',
          text: '毛利'
        },
        {
          number: this.allPieDta && this.allPieDta.profitRate ? this.allPieDta.profitRate.amount : 'NA',
          text: '毛利率'
        },
        {
          number: this.allPieDta && this.allPieDta.totalExpenses ? this.allPieDta.totalExpenses.amount : 'NA',
          text: '支出'
        },
        {
          number: this.allPieDta && this.allPieDta.income ? this.allPieDta.income[0].amount : 'NA',
          text: '收入'
        },
        {
          number: this.allData && this.allData.returnRate ? this.allData.returnRate + '%' : 'NA',
          text: '回款率'
        },
        // {
        //   number: this.beginPrice || 'NA',
        //   text: '店铺期初预留金$'
        // }
      ]
    }
  },
  components: {
    CenterLeft1Chart
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
$box-height: 520px;
$box-width: 100%;

#bottomLeft {
  padding: 10px 16px;
  // height: $box-height;
  width: $box-width;
  border-radius: 5px;

  .bg-color-black-cc {
    // height: $box-height - 35px;
    border-radius: 10px;
    display: flex;

    .right-box {
      width: 25%;

      .right-top {
        width: 100%;
        height: 100px;
        padding: 12px 0 0 12px;

        .top-one {
          color: #ccc;
          font-family: "Source Han Sans CN";
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }

        .top-two {
          padding: 9px;
          border-radius: 8px;
          // background: #F9F9F9;
          width: fit-content;
          margin-top: 10px;
          color: #b1b9ca;
          border: 1px solid #ccc;
        }
      }

      .show-data {
        .item-box {
          padding: 6px;
          color: #37c1ab;
          font-size: 18px;
          display: flex;
          flex-direction: column;


          .item-title {
            font-size: 14px;
            color: #c3cbde;
            margin-bottom: 3px;
          }
        }
      }
    }
  }

  .text {
    color: #c3cbde;
  }

  .chart-box {
    margin-top: 16px;
    width: 170px;
    height: 170px;

    .active-ring-name {
      padding-top: 10px;
    }
  }
}
</style>
