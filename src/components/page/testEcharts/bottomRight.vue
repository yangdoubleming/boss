<template>
  <div id="bottomRight">
    <div class="bg-color-black-im">
      <div>

        <BottomLeftChart :allData="allData" :showValue="showValue" />
        <div class="items-zz">
          <div class="item-box-zz " v-for="(item, index) in numberData" :key="index">

            <p class="text-zz">
              {{ item.text }}
              <span v-if="item.text != '下滑风险评分'" class="colorYellow">(元)</span>
            </p>
            <div class="d-flex light-zz">
              {{ item.number }}

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BottomLeftChart from '@/components/echart/bottom/bottomLeftChart/chart'
export default {
  components: {
    BottomLeftChart
  },
  props: {
    allData: {
      type: Object,
      default: () => ({})
    },
    showValue: {
      type: String,
      default: "3"
    },
  },
  watch: {
    allData: {
      handler(newData) {
        this.allData = newData
        let newNumberData = [
          {
            number: this.allData.month3Return || 0,
            text: '近三月月均回款'
          },
          {
            number: this.allData.month6Return || 0,
            text: '近半年月均回款'
          },
          {
            number: this.allData.year1Return || 0,
            text: '近一年月均回款'
          },
        ]
        this.numberData = [...newNumberData]
      },
      deep: true, // 深度监听
      immediate: true // 监听到后，立即执行handler方法
    },
    showValue: {
      handler(newData) {
        this.showValue = newData
      },
      deep: true, // 深度监听
      // immediate: true // 监听到后，立即执行handler方法
    }
  },
  data() {
    return {
      threeBack: 0,
      sixBack: 0,
      yearBack: 0,
      numberData: [
        {
          number: this.allData.month3Return || 0,
          text: '近三月月均回款'
        },
        {
          number: this.allData.month6Return || 0,
          text: '近半年月均回款'
        },
        {
          number: this.allData.year1Return || 0,
          text: '近一年月均回款'
        },
      ]
    }
  }
};
</script>

<style lang="scss" class>
$box-height: 520px;
$box-width: 100%;

#bottomRight {
  padding: 0px 16px 14px;
  // height: $box-height;
  // width: $box-width;
  border-radius: 5px;

  .bg-color-black-im {
    // height: $box-height - 30px;
    border-radius: 10px;

    .items-zz {
      display: flex;
      // gap: 30px;
      justify-content: space-around;

      .item-box-zz {
        width: 25%;
        border-right: 1px solid #ccc;
        display: flex;
        flex-direction: column;

        &>div {
          padding-right: 5px;
        }

        font-size: 16px;

        position: relative;
        color: #d3d6dd;

        .dv-digital-flop {
          width: 120px;
          height: 30px;
        }

        // 金币
        .coin {
          position: relative;
          top: 6px;
          font-size: 20px;
          color: #ffc107;
        }

        .colorYellow {
          color: yellowgreen;
        }

        p {
          text-align: left;
        }
      }
    }

    .items-zz> :last-child {
      border-right: none !important;
    }

  }

  .text-zz {
    color: #c3cbde;
    font-size: 12px;
  }

  .light-zz {
    color: #3de3c6;
    font-size: 18px;
    font-weight: 600;
  }

  //下滑线动态
  .decoration2 {
    position: absolute;
    right: 0.125rem;
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