<template>
  <div class="three-right-box">
    <div class="right-item">
      <dv-border-box-13 ref="showOne">
        <div class="show-item">
          <div class="item-top">
            <span class="top-title">库存管理</span>
            <!-- <el-popover placement="left" title="标题" width="200" trigger="hover">
              <div>-+hhhhh</div> -->
            <span slot="reference" class="top-else">查看非平台数据(海外仓)</span>
            <!-- </el-popover> -->
          </div>
          <el-descriptions :column="2" :colon='false'>
            <el-descriptions-item label="发货类型">
              {{ sendType }}
            </el-descriptions-item>
            <el-descriptions-item label="近三月平均库存">
              {{ allData.last3MonthFbaInventoryValue || 'NA' }}
            </el-descriptions-item>
            <el-descriptions-item label="当前库存价值">
              {{ allData.latestFbaInventoryValue || 'NA' }}
            </el-descriptions-item>
            <el-descriptions-item label="FBA去化周期">
              NA
            </el-descriptions-item>
            <el-descriptions-item label="FBA发货比例">

              {{ allData.last13WeekFbaRate ? allData.last13WeekFbaRate + '%' : 'NA' }}
            </el-descriptions-item>
            <el-descriptions-item label="">

            </el-descriptions-item>
          </el-descriptions>
        </div>
      </dv-border-box-13>
    </div>
    <div>
      <dv-border-box-13 ref="showTwo">
        <div class="show-item">
          <div class="item-top">
            <span class="top-title">运营及其他</span>
            <span class="top-else">查看站外广告数据</span>
          </div>
          <el-descriptions :column="2" :colon='false'>
            <el-descriptions-item label="店铺名">
              {{ shopDetail.shopName || 'NA' }}
            </el-descriptions-item>
            <el-descriptions-item label="店铺收款账户">
              {{ shopDetail.shopAccount || 'NA' }}
            </el-descriptions-item>
            <el-descriptions-item label="广告ROI">
              {{ allPieDta && allPieDta.advertROI ? allPieDta.advertROI.amount : 'NA', }}
            </el-descriptions-item>
            <el-descriptions-item label="店铺在贷情况">
              NA
            </el-descriptions-item>
            <el-descriptions-item label="是否达到购买卖家责任险的标准">
              {{ confirmShow || 'NA' }}
            </el-descriptions-item>
            <el-descriptions-item label="">

            </el-descriptions-item>
          </el-descriptions>
        </div>
      </dv-border-box-13>
    </div>
    <div>
      <dv-border-box-13 ref="showThree">
        <div class="show-item">
          <div class="item-top">
            <span class="top-title">店铺合规</span>
            <span class="top-else">查看违规情况</span>
          </div>

          <div class="item-bottom">
            <div class="left-circle">
              <div style="font-size: 12px;">健康度评分</div>
              <div style="  font-size: 18px;
    font-weight: 600;
    color: gainsboro;">{{ shopScore || 'NA' }}</div>
            </div>
            <div class="right-show">
              <div>
                <el-radio class="shop" v-model="radio" label="1">店铺</el-radio>
                <!-- <el-radio class="industry" v-model="radio" label="2">行业</el-radio> -->
              </div>
              <div class="right-count">
                <div class="right-warn">警告次数</div>
                <div>
                  <div class="count"><span>{{ allData.ttmSellerWarnings || 'NA' }}次</span><span>--次</span></div>
                  <el-progress class="one" color="#3287e0" :stroke-width="10" :percentage="100"></el-progress>

                </div>
              </div>
              <div class="right-count">
                <div class="right-warn">警告次数率</div>
                <div>
                  <div class="count"><span>{{ allData.ttmSellerWarnings ? (Number(allData.ttmSellerWarnings) /
                    Number(allData.ttmOrders) * 100).toFixed(2) + '%' : 'NA' }}</span><span>--%</span>
                  </div>
                  <el-progress class="one" color="#3287e0" :stroke-width="10" :percentage="100"></el-progress>

                </div>
              </div>
            </div>

          </div>
        </div>
      </dv-border-box-13>
    </div>
  </div>
</template>

<script>
import { getShopDesc, getShopRecode } from '@/api/index.js';
export default {
  data() {
    return {
      shopDetail: {},
      confirmShow: null,
      sendType: '平台',
      radio: '1',
      shopScore: 0,
    }
  },

  props: {
    allData: {
      type: Object,
      default: () => ({})
    },
    allPieDta: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    allData: {
      handler(newData) {
        this.allData = newData
        if (this.allData.last13WeekFbaRate == 100) {
          this.sendType = '平台'
        } else {
          this.sendType = '平台，非平台'
        }
        let monthsSales = [
          'month12SalesValue',
          'month11SalesValue',
          'month10SalesValue',
          'month9SalesValue',
          'month8SalesValue',
          'month7SalesValue',
          'month6SalesValue',
          'month5SalesValue',
          'month4SalesValue',
          'month3SalesValue',
          'month2SalesValue',
          'month1SalesValue'
        ]
        let rateData = monthsSales.map(key => this.allData[key]);
        let isConform = rateData.some(item => {
          if (item > 7000) {
            return true
          }
        })
        isConform ? this.confirmShow = '是' : this.confirmShow = '否'

      },
      deep: true, // 深度监听
      immediate: true // 监听到后，立即执行handler方法
    },
    allPieDta: {
      handler(newData) {
        this.allPieDta = newData

      },
      deep: true, // 深度监听
      immediate: true // 监听到后，立即执行handler方法
    }
  },
  mounted() {
    this.getData()
    this.getShopRecode()
  },
  methods: {
    getData() {
      getShopDesc({
        // offerId: "amzn1.lending.offer.be.PQpibQ80miEfxwh67tJSPn4TsBPHS/L+"
        offerId: this.$route.query.offerId,

      }).then(res => {
        this.shopDetail = res.data
      })
    },
    getShopRecode() {
      getShopRecode({
        // offerId: "amzn1.lending.offer.us.4cl1lhg858t1du3f23wv"
        offerId: this.$route.query.offerId,
      }).then(res => {
        this.shopScore = res.data.shopScore
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.three-right-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .right-item {
    height: 32%;
    overflow: hidden;
  }

  .show-item {
    padding: 24px;

    ::v-deep .el-descriptions-item__container {
      padding-right: 10%;
      justify-content: space-between;
    }

    ::v-deep .el-descriptions__body {
      background: transparent;
    }

    ::v-deep .el-descriptions-item__label:not(.is-bordered-label) {
      color: #bbbec6;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      // line-height: 140%;
      letter-spacing: 0.07px
    }

    .item-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 10px;

      .top-title {
        color: var(--Neutral-Black-Black-700, #fff);
        text-align: center;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        letter-spacing: 0.1px;
      }

      .top-else {
        color: #fff;
        text-align: right;
        font-family: "Source Han Sans CN";
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        text-decoration-line: underline;
      }
    }

    .item-bottom {
      display: flex;
      justify-content: space-between;

      .right-show {
        ::v-deep .one .el-progress-bar__outer {
          width: 140px;
          background: #FFA591;
        }

        ::v-deep .el-progress__text {
          display: none;
        }

        ::v-deep .el-progress-bar__inner {
          border-radius: 0;
        }

        .shop {
          ::v-deep .el-radio__inner {

            border-radius: 100%;
            width: 14px;
            height: 14px;
            background-color: #3287e0;
            cursor: pointer;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border: none;
          }

          ::v-deep .el-radio__label {
            color: #fff;
          }
        }

        .industry {
          ::v-deep .el-radio__inner {

            border-radius: 100%;
            width: 14px;
            height: 14px;
            background-color: #FFA591;
            cursor: pointer;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border: none;
          }

          ::v-deep .el-radio__label {
            color: #fff;
          }
        }

        .right-count {
          display: flex;
          align-items: flex-end;

          .right-warn {
            width: 75px;
            margin-right: 4px;
            overflow: hidden;
            color: var(--Secondary-Text, #d9dde6);
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: Poppins;
            font-size: 14px;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
            letter-spacing: 0.309px;
          }

          .count {
            display: flex;
            justify-content: space-between;
          }
        }
      }

      .left-circle {
        width: 65px;
        height: 65px;
        border: 6px solid #bcc5d9;
        border-radius: 5px;
        padding: 10px;
        font-size: 14px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }


}
</style>
