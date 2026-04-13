<template>
    <div style="margin-top:24px;padding-bottom:24px">
        <el-card style="margin-top:24px" shadow="hover">
            <div slot="header" class="request-info">
                <span>浦发模型报告</span>
            </div>
            <div class="item-box2">
                <div class="request-item" >
                    <span class="item-label">申请单号</span>
                    <span class="item-value">{{scoringData.records[0].applicationCode?scoringData.records[0].applicationCode:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">卖家合规登记</span>
                    <span class="item-value">{{scoringData.records[0].complianceLevel?scoringData.records[0].complianceLevel:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">数据包时间</span>
                    <span class="item-value">{{scoringData.records[0].dataTime?scoringData.records[0].dataTime:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">FBA发货等级</span>
                    <span class="item-value">{{scoringData.records[0].fbaRateLevel?scoringData.records[0].fbaRateLevel:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">销售额最高货品等级</span>
                    <span class="item-value">{{scoringData.records[0].highestSaleCategoryLevel?scoringData.records[0].highestSaleCategoryLevel:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">月均销售等级</span>
                    <span class="item-value">{{scoringData.records[0].monthSaleLevel?scoringData.records[0].monthSaleLevel:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">经营需求（贷款金额）单位：元</span>
                    <span class="item-value">{{scoringData.records[0].operationDemand?scoringData.records[0].operationDemand:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">平均经营年限（按月统计）</span>
                    <span class="item-value">{{scoringData.records[0].operationPlatformDate?scoringData.records[0].operationPlatformDate:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">经营情况系数</span>
                    <span class="item-value">{{scoringData.records[0].operationRatio?scoringData.records[0].operationRatio:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">主要销售产品等级</span>
                    <span class="item-value">{{scoringData.records[0].primaryCategoryLevel?scoringData.records[0].primaryCategoryLevel:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">从取数日回推第1个季度销售额等级</span>
                    <span class="item-value">{{scoringData.records[0].quarter1SaleLevel?scoringData.records[0].quarter1SaleLevel:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">从取数日回推第2个季度销售额等级</span>
                    <span class="item-value">{{scoringData.records[0].quarter2SaleLevel?scoringData.records[0].quarter2SaleLevel:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">从取数日回推第3个季度销售额等级</span>
                    <span class="item-value">{{scoringData.records[0].quarter3SaleLevel?scoringData.records[0].quarter3SaleLevel:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">从取数日回推第4个季度销售额等级</span>
                    <span class="item-value">{{scoringData.records[0].quarter4SaleLevel?scoringData.records[0].quarter4SaleLevel:'-'}}</span>
                </div>
               <div class="request-item">
                    <span class="item-label">从取数日回推第5个季度销售额等级</span>
                    <span class="item-value">{{scoringData.records[0].quarter5SaleLevel?scoringData.records[0].quarter5SaleLevel:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">从取数日回推第6个季度销售额等级</span>
                    <span class="item-value">{{scoringData.records[0].quarter6SaleLevel?scoringData.records[0].quarter6SaleLevel:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">从取数日回推第7个季度销售额等级</span>
                    <span class="item-value">{{scoringData.records[0].quarter7SaleLevel?scoringData.records[0].quarter7SaleLevel:'-'}}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">从取数日回推第8个季度销售额等级</span>
                    <span class="item-value">{{scoringData.records[0].quarter8SaleLevel?scoringData.records[0].quarter8SaleLevel:'-'}}</span>
                </div>

                 <div class="request-item">
                    <span class="item-label">季度销量稳定性等级</span>
                    <span class="item-value">{{scoringData.records[0].quarterSaleStability?scoringData.records[0].quarterSaleStability:'-'}}</span>
                </div> 
                <div class="request-item">
                    <span class="item-label">卖家评价情况等级</span>
                    <span class="item-value">{{scoringData.records[0].queryLevel?scoringData.records[0].queryLevel:'-'}}</span>
                </div>
                 <div class="request-item">
                    <span class="item-label">FBA库存价值等级</span>
                    <span class="item-value">{{scoringData.records[0].stockValueLevel?scoringData.records[0].stockValueLevel:'-'}}</span>
                </div>
                 <div class="request-item">
                    <span class="item-label">用户ID</span>
                    <span class="item-value">{{scoringData.records[0].userId?scoringData.records[0].userId:'-'}}</span>
                </div>
                 <div class="request-item">
                    <span class="item-label">年回款等级</span>
                    <span class="item-value">{{scoringData.records[0].yearDisbursementLevel?scoringData.records[0].yearDisbursementLevel:'-'}}</span>
                </div>
                 <div class="request-item">
                    <span class="item-label">年订单等级</span>
                    <span class="item-value">{{scoringData.records[0].yearOrderLevel?scoringData.records[0].yearOrderLevel:'-'}}</span>
                </div>
            </div>
        </el-card>
       
        
    </div>
</template>

<script>
export default {
    props:{
        scoringData:{
            deep:true,
            immediate:true,
            handler(newV,oldV) {

            }
        }
    }
};
</script>

<style lang='less' scope>
 .end{
     color: rgba(0,0,0,.45);
     font-size: 14;
     text-align: center;
     margin-top: 60px;
 }
.btn-box{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
    .btn{
        height: 30px;
    }
}
.item-box2 {
    display: flex;
    flex-wrap: wrap;
    .request-item:nth-child(n + 2) {
      
    }
    .request-item {
          padding-top: 0px;
        width: 30%;
        display: flex;
         padding-bottom: 30px;
        .item-label {
            font-size: 15px;
            color: rgba(0, 0, 0, 0.65);
            display: inline-block;
            width: 550px;
            display: block;
            display: flex;
            flex-direction: column;
            // padding-right: 30px;
            padding-left: 30px;
        }
        .item-value {
            font-size: 15px;
            color: rgba(0, 0, 0, 0.65);
            display: inline-block;
            width: 330px;
        }
    }
}
</style>