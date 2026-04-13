<template>
    <div>
        <el-card class="box-card">
            <div style="display:block;margin-bottom:30px;width:680px">
                <div class="box">
                    <div class="content1">申请单号</div>
                    <div class="content1 fff">{{pageData.applicationCode}}</div>
                    <div class="content1">数据包时间</div>
                    <div class="content1 fff">{{pageData.dataTime}}</div>
                </div>
                <div class="box">
                    <div class="content1">贷款金额(元)</div>
                    <div class="content1 fff">{{pageData.operationDemand}}</div>
                    <div class="content1">经营年限(月)</div>
                    <div class="content1 fff">{{pageData.operationPlatformDate}}</div>
                </div>
                <div class="box">
                    <div class="content1">卖家合规等级</div>
                    <div class="content1 fff">{{pageData.complianceLevel}}</div>
                    <div class="content1">FBA发货等级</div>
                    <div class="content1 fff">{{pageData.fbaRateLevel}}</div>
                </div>
                <div class="box">
                    <div class="content1">销售额最高货品等级</div>
                    <div class="content1 fff">{{pageData.highestSaleCategoryLevel}}</div>
                    <div class="content1">月均销售等级</div>
                    <div class="content1 fff">{{pageData.monthSaleLevel}}</div>
                </div>
                <div class="box">
                    <div class="content1">主要销售产品等级</div>
                    <div class="content1 fff">{{pageData.primaryCategoryLevel}}</div>
                    <div class="content1">经营情况系数</div>
                    <div class="content1 fff">{{pageData.operationRatio}}</div>
                </div>

                <div class="box">
                    <div class="content1">季度销量稳定性等级</div>
                    <div class="content1 fff">{{pageData.quarterSaleStability}}</div>
                    <div class="content1">卖家评价情况等级</div>
                    <div class="content1 fff">{{pageData.queryLevel}}</div>
                </div>
                <div class="box">
                    <div class="content1">FBA库存价值等级</div>
                    <div class="content1 fff">{{pageData.stockValueLevel}}</div>
                    <div class="content1">年回款等级</div>
                    <div class="content1 fff">{{pageData.yearDisbursementLevel}}</div>
                </div>
                <div class="box">
                    <div class="content1">年订单等级</div>
                    <div class="content1 fff">{{pageData.yearOrderLevel}}</div>
                    <div class="content1">第1个季度销售额等级</div>
                    <div class="content1 fff">{{pageData.quarter1SaleLevel}}</div>
                </div>
                <div class="box">
                    <div class="content1">第2个季度销售额等级</div>
                    <div class="content1 fff">{{pageData.quarter2SaleLevel}}</div>
                    <div class="content1">第3个季度销售额等级</div>
                    <div class="content1 fff">{{pageData.quarter3SaleLevel}}</div>
                </div>
                <div class="box">
                    <div class="content1">第4个季度销售额等级</div>
                    <div class="content1 fff">{{pageData.quarter4SaleLevel}}</div>
                    <div class="content1">第5个季度销售额等级</div>
                    <div class="content1 fff">{{pageData.quarter5SaleLevel}}</div>
                </div>
                <div class="box">
                    <div class="content1">第6个季度销售额等级</div>
                    <div class="content1 fff">{{pageData.quarter6SaleLevel}}</div>
                    <div class="content1">第7个季度销售额等级</div>
                    <div class="content1 fff">{{pageData.quarter7SaleLevel}}</div>
                </div>
                <div class="box">
                    <div class="content1">第8个季度销售额等级</div>
                    <div class="content1 fff">{{pageData.quarter8SaleLevel}}</div>
                    <div class="content1"></div>
                    <div class="content1 fff"></div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import xtable from '../../common/Xtable.vue';

export default {
    components: {
        xtable
    },
    props: {
        pageData: {
            type: Object,
            default: {}
        }
    },
    watch:{
        pageData(newV){

        },
    },
    data() {
        return {
        };
    },
   
};
</script>

<style lang='less' scope>
.fff {
    background-color: #fff !important;
}
.btm {
    width: 100%;
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
            font-size: 13px;
            color: #333;
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
            font-size: 13px;
        }
    }
}
/deep/.el-collapse-item__header {
    padding-left: 20px !important;
}
.eCharts-box {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    /* align-items: center; */

    height: 100px;
}

.grid-cont-right {
    height: 100%;
    font-size: 14px;
    color: #999;
    display: flex;
    margin-top: 24px;
    margin-left: 24px;

    flex-direction: column;
}

.grid-num {
    font-size: 18px;
}
.grid-num2 {
    font-size: 18px;
    padding-top: 12px;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>