<template>
    <div id="app" >
        
        <div v-for="(item, index) in tableData" :key="index" style="display:block;margin:0 auto;margin-bottom:30px;width:680px">
            <div style="text-align:right;padding-bottom:15px">
                <el-date-picker
                v-model ="showDate"
                value-format="yyyy-MM"
                  type="month"
                  align="center"
                  @change="changeDate"
                  placeholder="选择月">
                </el-date-picker>
              </div>
            <p style="text-align:center;padding-bottom:15px">{{item.createTime}}</p>
            <div class="box" >
                <div class="content1" >节点名称</div>
                <div class="content2" >数量</div>
                <div class="content1" >各节点与上一节点转化率</div>
                <div class="content2" >总转化率</div>
            </div>
             <div class="box" >
                <div class="content1" >offer点击跳转落地页</div>
                <div class="content2" >{{item.offerJumpCount}}</div>
                <div class="content1" >-</div>
                <div class="content2" >-</div>
            </div>
            <div class="box" >
                <div class="content1" >注册offer数量</div>
                <div class="content2" >{{item.offerCount}}</div>
                <div class="content1" >{{(item.offerRate*100).toFixed(1)}}%</div>
                <div class="content2" >{{(item.offerRateSum*100).toFixed(1)}}%</div>
            </div>  
            <div class="box" >
                <div class="content1" >注册用户数量</div>
                <div class="content2" >{{item.userCount}}</div>
                <div class="content1" >-</div>
                <div class="content2" >-</div>
            </div>  
            <div class="box" >
                <div class="content1" >手机扫码</div>
                <div class="content2" >{{item.phoneCodeScanCount}}</div>
                <div class="content1" >{{(item.phoneCodeScanRate*100).toFixed(1)}}%</div>
                <div class="content2" >{{(item.phoneCodeScanRateSum*100).toFixed(1)}}%</div>
            </div>  
            <!-- <div class="box" >
                <div class="content1" >马上申请</div>
                <div class="content2" >{{item.phoneCodeScanCount}}</div>
                <div class="content1" >{{item.phoneCodeScanRate}}%</div>
                <div class="content2" >{{item.phoneCodeScanRateSum}}%</div>
            </div>   -->
            <div class="box" >
                <div class="content1" >进入授信流程</div>
                <div class="content2" >{{item.creditCount}}</div>
                <div class="content1" >{{(item.creditRate*100).toFixed(1)}}%</div>
                <div class="content2" >{{(item.creditRateSum*100).toFixed(1)}}%</div>
            </div>  
            <div class="box" >
                <div class="content1" >预申请通过</div>
                <div class="content2" >{{item.advanceApplicationCount}}</div>
                <div class="content1" >{{(item.advanceApplicationRate*100).toFixed(1)}}%</div>
                <div class="content2" >{{(item.advanceApplicationRateSum*100).toFixed(1)}}%</div>
            </div>  
             <div class="box" >
                <div class="content1" >开通二类户</div>
                <div class="content2" >{{item.iiAccountCount}}</div>
                <div class="content1" >{{(item.iiAccountRate*100).toFixed(1)}}%</div>
                <div class="content2" >{{(item.iiAccountRateSum*100).toFixed(1)}}%</div>
            </div>  
            <div class="box" >
                <div class="content1" >授信结果</div>
                <div class="content2" >{{item.creditResultCount}}</div>
                <div class="content1" >{{(item.creditResultRate*100).toFixed(1)}}%</div>
                <div class="content2" >{{(item.creditResultRateSum*100).toFixed(1)}}%</div>
            </div>  
             <div class="box" >
                <div class="content1" >签署授信合同</div>
                <div class="content2" >{{item.creditContractCount}}</div>
                <div class="content1" >{{(item.creditContractRate*100).toFixed(1)}}%</div>
                <div class="content2" >{{(item.creditContractRateSum*100).toFixed(1)}}%</div>
            </div>  
            <div class="box" >
                <div class="content1" >账户锁定</div>
                <div class="content2" >{{item.accountLockCount}}</div>
                <div class="content1" >{{(item.accountLockRate*100).toFixed(1)}}%</div>
                <div class="content2" >{{(item.accountLockRateSum*100).toFixed(1)}}%</div>
            </div>  
              <div class="box" >
                <div class="content1" >发起支用</div>
                <div class="content2" >{{item.expenditureCount}}</div>
                <div class="content1" >{{(item.expenditureRate*100).toFixed(1)}}%</div>
                <div class="content2" >{{(item.expenditureRateSum*100).toFixed(1)}}%</div>
            </div>  
             <div class="box" v-if="(Number((item.createTime).replace('-',''))<202211)">
                <div class="content1" >支付担保费</div>
                <div class="content2" >{{item.paymentGuaranteeFeeCount}}</div>
                <div class="content1" >{{(item.paymentGuaranteeFeeRate*100).toFixed(1)}}%</div>
                <div class="content2" >{{(item.paymentGuaranteeFeeRateSum*100).toFixed(1)}}%</div>
            </div>  
             <div class="box" >
                <div class="content1" >放款</div>
                <div class="content2" >{{item.loanCount}}</div>
                <div class="content1" >{{(item.loanRate*100).toFixed(1)}}%</div>
                <div class="content2" >{{(item.loanRateSum*100).toFixed(1)}}%</div>
            </div>  
        </div>
    </div>
</template>

<script>
export default {
    props: {
      totalSize:{
        type:Number,
        default:30
      },
        tableData: {
            type: Array,
            default: function () {
                return [];
            }
        },
        date: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            showDate: '',
            howWidth: 8,
        };
    },
    created() {
        this.getNowYearOfMonth()
    },
    methods: {
      handleCurrentChange(val){
        this.$emit('handleCurrentChange',val)
      },
      getNowYearOfMonth () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        this.showDate = year + "-" + month;
        },
      handleDateChange() {
        this.$emit('handleDateChange', this.showDate)
      },
      changeDate(v){
        this.$emit('handleDateChange', v)
      }
    }
};
</script>

<style lang="less" scoped>

.btm{
  width:100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
#app {
    // width: 70%;
    min-height: 100vh;
    box-sizing: border-box;
    // padding: 50px;
    .box {
        width: 100%;
        height: 40px;
        display: flex;
        border-left: 1px solid #e9e9e9;
        border-top: 1px solid #e9e9e9;
        .content1 {
            width: 170px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #fafafa;
            border-right: 1px solid #e9e9e9;
            border-bottom: 1px solid #e9e9e9;
            color: #333;
            font-size: 14px;
        }
        .content2 {
            width: 170px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #fff;
            border-right: 1px solid #e9e9e9;
            border-bottom: 1px solid #e9e9e9;
            // color: #b0b0b2;
            font-size: 14px;
        }
    }
}
</style>