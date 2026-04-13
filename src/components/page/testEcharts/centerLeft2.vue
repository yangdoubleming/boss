<template>
  <div>
    <div class="center-double-box">
      <div class="react-left ml-4 react-l-s">
        <span class="react-left"></span>
        <span class="text-yy">客户服务</span>
      </div>
      <!-- 三个图标 -->
      <div class="center-top-show">
        <div class="show-item">
          <div class="show-item-title">订单取消率</div>
          <div class="show-item-rate">{{ allData.cancellationRate }}%</div>
        </div>
        <div class="show-item">
          <div class="show-item-title">订单缺陷率</div>
          <div class="show-item-rate">{{ allData.defectRate }}%</div>
        </div>
        <div class="show-item">
          <div class="show-item-title">延迟配送率</div>
          <div class="show-item-rate">{{ allData.lateShipmentRate }}%</div>
        </div>
        <div class="show-item">
          <div class="show-item-title">退货率</div>
          <div class="show-item-rate">{{ allData.refundRate }}%</div>
        </div>
      </div>
      <div>
        <BottomRightChart />
      </div>
    </div>
  </div>
</template>

<script>
import BottomRightChart from "@/components/echart/bottom/bottomRightChart";
export default {
  components: {
    BottomRightChart
  },
  props: {
    allData: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    allData: {
      handler(newData) {
        this.allData = newData
      }
    }
  }
};
</script>

<style lang="scss" class>
$box-height: 520px;
$box-width: 100%;

// #bottomRight {
// padding: 14px 16px;
// width: $box-width;
// border-radius: 5px;

.center-double-box {
  padding: 30px 20px 0 20px;
  // 平行四边形

  .react-left {
    &.react-l-s {
      width: 200px;
      text-align: center;
    }

    font-size: 18px;
    width: 150px;
    height:30px;
    line-height: 30px;
    text-align: center;
    transform: skewX(45deg);
    background-color: #0f1325;

    .react-left {
      position: absolute;
      left: 25px;
      top: 0;
      height: 30px;
      width: 50px;
      background-color: #0f1325;
      // transform: skewX(-45deg);
    }

    .text-yy {
      display: inline-block;
      transform: skewX(-45deg);
      font-size: 16px;
    }
  }

  .center-top-show {
    display: flex;
    margin: 30px 0;
    width: 100%;
    gap: 10px;
    justify-content: space-between;

    .show-item {
      width: 28%;
      border-width: 1px;
      border-style: solid;
      text-align: center;
      border-radius: 8px;
      padding: 6px 0;

      .show-item-title {
        color: var(--Text-5-, #b1b9ca);
        font-family: "Source Han Sans CN";
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      .show-item-rate {
        color: #99dd79;
        font-family: "Source Han Sans CN";
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        /* 100% */
      }
    }
  }
}




// }</style>