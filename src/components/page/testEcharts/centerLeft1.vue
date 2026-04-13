<template>
  <div class="top-flex-qq">
    <div class="bg-color-black-cr">

      <div class="bottom-data-xx">
        <div class="item-box-xx " v-for="(item, index) in numberData" :key="index">

          <p class="text-xxx">
            {{ item.text }}
            <span v-if="item.text != '下滑风险评分'" class=" colorYellow">(万元)</span>
          </p>
          <div class="d-flex light-xxx" v-if="item.text != '下滑风险评分'">
            {{ item.number }}
          </div>
          <div class=" light-xxx" style="color: gray;" v-if="item.text == '下滑风险评分' && item.number == 'NA'">
            {{ item.number }}
          </div>
          <div class="light-xxx" v-else-if="item.text == '下滑风险评分' && item.number > 20 && allData.platform == 'AMAZON'">
            低风险
          </div>
          <div class="light-xxx" style="color:  #cbcb38"
            v-else-if="item.text == '下滑风险评分' && item.number < 20 && item.number > -150 && allData.platform == 'AMAZON'">
            中低风险
          </div>
          <div class=" light-xxx" style="color: #e13434;"
            v-else-if="item.text == '下滑风险评分' && item.number <= -150 && allData.platform == 'AMAZON'">
            中高风险
          </div>

        </div>
      </div>
      <div style=" width: 100%;">
        <centerRight2Chart1 />

      </div>
    </div>
    <dv-border-box-12 style="border: none; width: 270px;">
      <div class="top-right">
        <div class="top-right-top" v-if="allData">
          <!-- <div></div> -->
          <div class="platform-title">{{ allData.platform }}</div>
          <el-tag type="success" v-if="allData.sellerStatus == 'NORMAL'">正常</el-tag>
          <el-tag type="info" v-if="allData.sellerStatus == 'BLOCKED' || allData.sellerStatus == 'DEACTIVATED'">
            封店</el-tag>
          <el-tag v-if="allData.sellerStatus == 'PENDING'">挂起</el-tag>
          <el-tag type="danger" v-if="allData.sellerStatus == 'AT_RISK'">有风险</el-tag>
          <el-tag type="warning" v-if="allData.sellerStatus == 'ABNORMAL'">不正常</el-tag>

        </div>
        <el-descriptions :column="1">
          <el-descriptions-item label="店铺主营类目">{{ allData.primaryProductCategory || 'NA' }}</el-descriptions-item>
          <el-descriptions-item label="经营时长">{{ allData.amazonTenure || 'NA' }}</el-descriptions-item>
          <el-descriptions-item label="店铺客单价">{{ customerUP || 'NA' }}</el-descriptions-item>
          <el-descriptions-item label="店铺UCS额度">{{ ucsAmount || 'NA' }}</el-descriptions-item>
          <el-descriptions-item label="销售额年同比">{{ saleRate || 'NA' }}%</el-descriptions-item>
          <el-descriptions-item label="回款额年同比">{{ backRate || 'NA' }}%</el-descriptions-item>
          <el-descriptions-item label="店铺公司名称">NA</el-descriptions-item>
          <el-descriptions-item label="店铺公司地址">NA</el-descriptions-item>

        </el-descriptions>
      </div>
    </dv-border-box-12>
  </div>
</template>

<script>
import { getUsc } from '@/api/index'
import centerRight2Chart1 from '@/components/echart/centerRight/centerRightChart'
export default {
  props: {
    allData: {
      type: Object,
      default: () => ({})
    },
    riskData: {
      type: [Number, String],
      default: ''
    }
  },
  watch: {
    allData: {
      handler(newData) {
        this.allData = newData
        this.customerUP = this.allData.ttmOrders != 'NA' ? (Number(this.allData.year1SalesValue) / Number(this.allData.ttmOrders)).toFixed(2) : 'NA'
        let years = Math.floor(this.allData.amazonTenure / 365)
        if (years == 0 || years < 2) {
          this.saleRate = '0'
          this.backRate = '0'

        } else {
          this.saleRate = ((Number(this.allData.year1SalesValue) / Number(this.allData.year2SalesValue)) * 100).toFixed(2)
          this.backRate = ((Number(this.allData.year1DisbursementsValue) / Number(this.allData.year2DisbursementsValue)) * 100).toFixed(2)

        }
        let yearBack = (Number(this.allData.year1DisbursementsValue) / 10000)
        let yearSale = (Number(this.allData.year1SalesValue) / 10000)
        if (this.allData.platform == 'AMAZON') {


          let newNumber = [
            {
              number: yearBack.toFixed(2),
              text: '年回款额'
            },
            {
              number: yearSale.toFixed(2),
              text: '年销售额'
            },
            {
              number: this.riskData,
              text: '下滑风险评分'
            }
          ]
          this.numberData = [...newNumber]
        } else {

          let newNumber = [
            {
              number: yearBack.toFixed(2),
              text: '年回款额'
            },
            {
              number: yearSale.toFixed(2),
              text: '年销售额'
            },
            {
              number: 'NA',
              text: '下滑风险评分'
            }
          ]
          this.numberData = [...newNumber]
        }


      },
      deep: true, // 深度监听
      immediate: true // 监听到后，立即执行handler方法
    },
    riskData: {
      handler(newData) {
        this.riskData = newData
      },
      deep: true, // 深度监听
      immediate: true // 监听到后，立即执行handler方法
    }

  },
  data() {
    return {
      ucsAmount: 0,
      saleRate: 0,
      backRate: 0,
      customerUP: 0,
      numberData: [
        {
          number: (Number(this.allData.year1DisbursementsValue) / 10000).toFixed(2),
          text: '年回款额'
        },
        {
          number: (Number(this.allData.year1SalesValue) / 10000).toFixed(2),
          text: '年销售额'
        },
        {
          number: this.riskData,
          text: '下滑风险评分'
        }
      ]
    }
  },
  components: {
    centerRight2Chart1
  },
  mounted() {
    this.getUscShow()
  },
  methods: {
    getUscShow() {
      getUsc(
        {
          // offerId: "amzn1.lending.offer.us.4cl1lhg858t1du3f23wv"
          offerId: this.$route.query.offerId,
        }
      ).then(res => {
        this.ucsAmount = res.data.ucsAmount
      })
    },
  }
}
</script>

<style lang="scss" scoped>
$box-width: 300px;
$box-height: 410px;

.top-flex-qq {
  display: flex;
  padding: 20px;
  // grid-template-columns: 65% 30%;
  justify-content: space-evenly;
  padding-top: 20px;
  min-width: 650px;

  .bg-color-black-cr {
    // height: $box-height - 30px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 50px;
    width: 60%;
    min-width: 370px;

    .bottom-data-xx {
      width: 100%;
      display: flex;

      justify-content: space-between;

      .item-box-xx {
        display: flex;
        flex-direction: column;

        &>div {
          padding-right: 5px;
        }

        font-size: 16px;
        // float: right;
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

        .text-xxx {
          color: #c3cbde;
          font-size: 12px;
        }

        p {
          text-align: left;
        }

        .light-xxx {
          color: #3de3c6;
          font-size: 18px;
          font-weight: 600;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .top-right {
    padding: 20px;
    min-width: 230px;

    .top-right-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      .platform-title {
        font-size: 16px;
        color: antiquewhite;
      }
    }

    ::v-deep .el-descriptions__body {
      background: transparent;
      color: #cfdbf2;
    }

    ::v-deep .el-descriptions--small {
      font-size: 12px !important;
    }

    ::v-deep .el-descriptions__body table td,
    .el-descriptions__body table th {
      line-height: 2;
    }
  }


  ::v-deep .dv-border-box-10 .border {
    border: none !important;
  }

}
</style>
