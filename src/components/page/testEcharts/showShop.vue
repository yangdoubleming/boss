<template>
    <div id="index-im" ref="appRef">
        <div class="bg">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <div v-else class="host-body">
                <div class="d-flex jc-center">
                    <dv-decoration-6 class="dv-dec-10" ref="showTop" />
                </div>

                <!-- 第二行数据 -->
                <div class="bottom-box-cc">
                    <dv-border-box-12 ref="borderOne">
                        <div class=" jc-between px-2">
                            <div class="react-left ml-4 react-l-s">
                                <span class="react-left"></span>
                                <span class="text-yy">店铺宏观评价</span>
                            </div>
                            <centerLeft1 :allData=allData :riskData="riskData" />
                        </div>

                    </dv-border-box-12>
                    <dv-border-box-12 ref="borderTwo">
                        <div class=" jc-between px-2">
                            <div class="select-box">
                                <div class="react-left ml-4 react-l-s">
                                    <span class="react-left"></span>
                                    <span class="text-yy">店铺销售/回款趋势</span>
                                </div>
                                <el-select @change="changeShowValue" v-model="showValue" placeholder="请选择">
                                    <el-option v-for="item in showOptions" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <bottomRight :allData=allData :showValue=showValue />
                        </div>
                    </dv-border-box-12>
                </div>

                <div class="body-box">
                    <!-- 第三行数据 -->
                    <div class="content-box-three">
                        <!-- 圆环图 -->
                        <div class="three-one">
                            <dv-border-box-12 ref="borderBox">
                                <div class="select-box" style="padding: 0 20px;">
                                    <div class="react-left ml-4 react-l-s">
                                        <span class="react-left"></span>
                                        <span class="text-yy">店铺收支情况</span>
                                        <el-tooltip effect="dark" content="仅SP" placement="top">
                                            <i style="transform: skewX(-40deg); margin-left: 5px;"
                                                class="el-icon-question"></i>
                                        </el-tooltip>
                                    </div>
                                    <div>
                                        <el-select @change="changeSelect" v-model="pieDate" placeholder="请选择">
                                            <el-option v-for="item in pieOptions" :key="item.value" :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <div class="small-txt">{{ allPieDta.leftTime || 'NA' }}——{{
                                            allPieDta.rightTime || 'NA' }}</div>
                                    </div>
                                </div>
                                <bottomLeft :allPieDta="allPieDta" :allData="allData" />
                            </dv-border-box-12>
                        </div>
                        <!-- 曲线图 -->
                        <div class="three-two">
                            <dv-border-box-12 ref="borderCenter">
                                <centerLeft2 :allData=allData />
                            </dv-border-box-12>
                        </div>
                        <div class="three-three">
                            <centerRight1 :allData="allData" :allPieDta="allPieDta" ref="shwoThree" />

                        </div>
                    </div>
                    <div style="width: 70%; margin-top: 20px;margin-bottom: 40px;" v-show="false">
                        <!-- 第四行商品数据 -->
                        <dv-border-box-2 style="padding: 20px;" ref="borderThree">
                            <div class="react-left ml-4 react-l-s" style="margin-top: 0;margin-bottom: 10px;">
                                <span class="react-left"></span>
                                <span class="text-yy">商品信息</span>
                            </div>
                            <productShow />
                        </dv-border-box-2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getCircle, getInfo, getRiskData } from '@/api/index.js';
import drawMixin from "../../../utils/drawMixin.js";
import { formatTime } from '../../../utils/index.js'
import centerLeft1 from './centerLeft1'
import centerLeft2 from './centerLeft2'
import centerRight1 from './centerRight1'
import center from './center'
import bottomLeft from './bottomLeft'
import bottomRight from './bottomRight'
import productShow from "./productShow.vue";
export default {
    mixins: [drawMixin],
    data() {
        return {
            colorTwo: true,
            //风险评分
            riskData: 0,
            // 饼图数据
            pieDate: '3',
            allPieDta: {},
            //大部分数据
            allData: {},
            showValue: "3",
            showOptions: [
                {
                    value: '1',
                    label: '周'
                }, {
                    value: '2',
                    label: '季'
                },
                {
                    value: '3',
                    label: '月'
                }],
            pieOptions: [{
                value: '1',
                label: '前30天'
            }, {
                value: '2',
                label: '前60天'
            }, {
                value: '3',
                label: '前90天'
            },],
            value: '',
            timing: null,
            loading: true,
            dateDay: null,
            dateYear: null,
            dateWeek: null,
            weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            decorationColor: ['#568aea', '#000000']
        }
    },
    components: {
        productShow,
        centerLeft1,
        centerLeft2,
        centerRight1,
        center,
        bottomLeft,
        bottomRight
    },
    computed: {
        isCollapse3() {
            return this.$store.state.isCollapse;
        }
    },
    watch: {
        isCollapse3() {
            setTimeout(() => {
                this.$refs.showTop.initWH()
                this.$refs.borderBox.initWH()
                this.$refs.borderOne.initWH()
                this.$refs.borderTwo.initWH()
                this.$refs.borderThree.initWH()
                this.$refs.borderCenter.initWH()
                this.$refs.shwoThree.$refs.showOne.initWH()
                this.$refs.shwoThree.$refs.showTwo.initWH()
                this.$refs.shwoThree.$refs.showThree.initWH()

            }, 300)
        }


    },
    mounted() {
        this.getCircleShow()
        this.getInfoShow()
        this.getRiskDataShow()
        this.$emit('@testRouter', this.colorTwo);
        // this.getInit()
    },
    beforeDestroy() {
    },
    methods: {
        getInit() {
            this.$refs.showTop.initWH()
            this.$refs.borderBox.initWH()
            this.$refs.borderOne.initWH()
            this.$refs.borderTwo.initWH()
            this.$refs.borderThree.initWH()
            this.$refs.borderCenter.initWH()
            this.$refs.shwoThree.$refs.showOne.initWH()
            this.$refs.shwoThree.$refs.showTwo.initWH()
            this.$refs.shwoThree.$refs.showThree.initWH()
        },
        //折线图类型选择
        changeShowValue(value) {
            this.showValue = value
        },
        //日期选择
        changeSelect(value) {
            this.pieDate = value
            this.getCircleShow()
            this.getInfoShow()
        },
        //获取饼图与其他数据
        getCircleShow() {
            this.loading = true
            getCircle({
                offerId: this.$route.query.offerId,
                flag: this.pieDate
            }).then(res => {
                this.allPieDta = res.data
                if (this.allPieDta) {
                    this.allPieDta.leftTime = this.allPieDta.leftTime.slice(0, 10);
                    this.allPieDta.rightTime = this.allPieDta.rightTime.slice(0, 10);
                    this.allPieDta.cdata = this.allPieDta.expenses.map(item => {
                        return {
                            name: item.amountDescription,
                            value: item.amount
                        };
                    })
                    this.loading = false
                } else {
                    this.allPieDta.cdata = []
                    this.loading = false
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
            })
        },
        //获取大多数信息
        getInfoShow() {
            this.loading = true
            getInfo({
                offerId: this.$route.query.offerId,
                flag: this.pieDate,
                reportType: 1
            }).then(res => {
                this.allData = res.data.offerDataSet
                //给折线图传值
                this.loading = false
            }).catch(err => {
                console.log(err);
                this.loading = false
            })
        },
        //获取风险评分
        getRiskDataShow() {
            this.loading = true
            getRiskData({
                offerId: this.$route.query.offerId,
            }).then(res => {
                this.riskData = res.data
                this.loading = false
            }).catch(err => {
                this.loading = false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
body {
    background-color: #1e1e2f !important;
}

#index-im {
    // min-width: 1200px;
    color: #d3d6dd;
    // width: 1920px;
    // height: 1080px;
    // position: absolute;
    top: 50%;
    left: 50%;
    // transform: translate(-50%, -50%);
    transform-origin: left top;
    // overflow: hidden;
    width: 100%;

    // height: 100%;

    // transform:scale(0,0) translate(0) !important;
    // transform: scale(1) translate(0%, 0%) !important;
    .bg {
        width: 100%;
        height: 100%;
        padding: 16px 16px 0 16px;
        background: rgba(30, 30, 47);
        background-size: cover;
        // background-position: center center;
    }

    .host-body {

        //标题
        .dv-dec-10 {
            width: 100%;
            height: 5px;
            margin-bottom: 20px;
        }

        // 选择框
        .select-box {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            margin-bottom: 20px;

            .small-txt {
                padding-top: 10px;
                text-align: center;
            }

            ::v-deep .el-select>.el-input {
                background: transparent;
            }

            ::v-deep .el-input--small .el-input__inner {
                background: transparent;
            }
        }

        //第一行雷达图
        // 底部数据
        .bottom-box-cc {
            margin-top: 10px;
            // display: grid;
            // grid-template-columns: 55% 42%;
            // gap: 50px;
            display: flex;
            justify-content: space-between;
            gap: 30px;
            // height: 420px;
        }

        // 第二行
        .aside-width {
            width: 40%;
        }

        .react-r-s,
        .react-l-s {
            background-color: #0f1325;
        }

        // 平行四边形
        .react-left {
            &.react-l-s {
                width: 200px;
                text-align: center;
                margin-top: 30px;
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
            }
        }

        .body-box {
            margin-top: 16px;
            display: flex;
            flex-direction: column;
            padding-bottom: 30px;

            //下方区域的布局
            .content-box-three {
                // display: grid;
                // grid-template-columns: 40% 30% 25%;
                // gap: 2%;
                display: flex;
                justify-content: space-between;

                .three-one {
                    width: 40%;
                }

                .three-two {
                    width: 30%;
                }

                .three-three {
                    width: 28%;
                }

            }

        }
    }
}
</style>
