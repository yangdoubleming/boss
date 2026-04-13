<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img
                    src="../../../../public/img/favicon.png"
                    style="width:17px;height:17px;margin-right:5px"
                    alt
                />豆沙包 /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{$route.meta.title}}</span>
        </div>

        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">贷款金额（万人民币）</span>
                                    <span class="grid-num2">{{pageData.loanAmountSum.toFixed(2) }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">授信金额（万人民币）</span>
                                    <span
                                        class="grid-num2"
                                    >{{pageData.creditAmountSum.toFixed(2) }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">贷款笔数</span>
                                    <span class="grid-num2">{{pageData.loanNumberSum }}笔</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">用户注册数</span>
                                    <span class="grid-num2">{{pageData.userCount }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">进件数</span>
                                    <span class="grid-num2">{{pageData.applicationCount }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">授信数</span>
                                    <span class="grid-num2">{{pageData.creditCount}}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-row :gutter="24" class="mgb20">
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">授信数/进件数比例</span>
                                    <span class="grid-num2">{{(pageData.creditApp*100).toFixed(2) }}%</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">放款数/进件数比例</span>
                                    <span class="grid-num2">{{(pageData.loanApp*100).toFixed(2) }}%</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">平均放款额（万人民币）</span>
                                    <span class="grid-num2">{{pageData.loanAmountAvg.toFixed(2) }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                  <el-row :gutter="24" class="mgb20">
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">在贷余额（万人民币）</span>
                                    <span class="grid-num2">{{pageData.loanBalance.toFixed(2)  }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">提前结清数</span>
                                    <span class="grid-num2">{{pageData.prepaymentCount  }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">提前结清数/放款数比例</span>
                                    <span class="grid-num2">{{(pageData.prepaymentLoan *100).toFixed(2)}}%</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-row :gutter="24" class="mgb20">
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">平均年化利率</span>
                                    <span class="grid-num2">{{pageData.loanAprAvg}}%</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">续贷数</span>
                                    <span class="grid-num2">{{pageData.seriesLoanCount   }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                    
                </el-row>

            </el-col>
        </el-row>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { adminDataBlock } from '../../../api/index';
export default {
    name: 'administrators-dataBlock',
    components: {
        tablePage
    },
    data() {
        return {
            wid: 8,
            pageData: {
                loanAmountSum:0,
                loanAmountAvg:0,
                creditAmountSum:0
            }
        };
    },
    created() {
        adminDataBlock().then((res) => {
            this.pageData = res.data;
        });

        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os';
        var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
        var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';
        var bIsAndroid = sUserAgent.match(/android/i) == 'android';
        var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
        var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            this.wid = 24;
        } else {
            this.wid = 8;
        }
    },
    methods: {}
};
</script>

<style lang='less'>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 360px;
    height: 178px;
    display: block;
}
.clearfix {
    font-size: 18px;
    // padding-left: 18px;
    padding-bottom: 20px;
}
/deep/.el-form-item .form-margin .el-form-item--small .form-margin {
    margin-right: 30px !important;
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
    font-size: 20px;
}
.grid-num2 {
    font-size: 20px;
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
</style>