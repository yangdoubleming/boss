<template>
    <div>
        <div class="all">
            <!--         企业基本信息 L1  -->
            <el-card>
                <h2 style="text-align: center;margin-bottom: 30px">企业数字化尽调报告</h2>
                <div class="title">企业基本信息</div>
                <div v-if="companyInfo">
                    <div class="row">
                        <div class="left"><span class="name">企业名称：</span><span class="msg">{{ companyInfo.cname || '-'
                                }}</span></div>
                        <div class="right"><span class="name">法人代表：</span><span class="msg">{{ companyInfo.operName ||
                            '-' }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">企业信用代码：</span><span class="msg">{{ companyInfo.creditCode
                            || '-' }}</span></div>
                        <div class="right"><span class="name">公司状态：</span><span class="msg">{{ companyInfo.regStatus ||
                            '-' }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">成立日期：</span><span class="msg">{{ companyInfo.startDate ||
                            '-' }}</span></div>
                        <div class="right"><span class="name">营业期限：</span><span class="msg">{{ companyInfo.timeLimit ||
                            '-' }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">注册资本：</span><span class="msg">{{ companyInfo.registCapi ||
                            '-' }}</span></div>
                        <div class="right"><span class="name">省份：</span><span class="msg">{{ companyInfo.province || '-'
                                }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">实缴资本：</span><span class="msg">{{ companyInfo.paidinCapi ||
                            '-' }}</span></div>
                        <div class="right"><span class="name">城市：</span><span class="msg">{{ companyInfo.city || '-'
                                }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">人员规模：</span><span class="msg">{{ companyInfo.staffSize ||
                            '-' }}</span></div>
                        <div class="right"><span class="name">参保人数：</span><span class="msg">{{ companyInfo.insuredNum ||
                            '-' }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">公司性质：</span><span class="msg">{{ companyInfo.econKind ||
                            '-' }}</span></div>
                        <div class="right"><span class="name">行业：</span><span class="msg">{{ companyInfo.industry || '-'
                                }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">注册地址：</span><span class="msg">{{ companyInfo.registAddress
                            || '-' }}</span></div>
                        <div class="right"><span class="name">地址：</span><span class="msg">{{ companyInfo.address || '-'
                                }}</span></div>
                    </div>
                    <div class="row">
                        <div class="allRow">
                            <div class="allRow-name">经营范围：</div>
                            <div style="margin-top: 20px">{{ companyInfo.scope || '-' }}</div>
                        </div>
                    </div>
                </div>
            </el-card>
            <!--         企业股东信息 L1   -->
            <el-card style="margin-top: 20px">
                <div class="title">企业股东信息</div>
                <table style="margin-top: 25px" v-if="beneficiaryInfoList">
                    <thead>
                        <tr>
                            <th>股东</th>
                            <th>认缴金额</th>
                            <th>认缴出资日期</th>
                            <th>持股比例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in beneficiaryInfoList" :key="index">
                            <td>{{ item.name || '-' }}</td>
                            <td>{{ item.amomonR || '-' }}</td>
                            <td>{{ item.timeR || '-' }}</td>
                            <td>{{ item.percent || '-' }}</td>
                        </tr>
                    </tbody>
                </table>
            </el-card>
            <!--         经营水平评估 L1   -->
            <el-card style="margin-top: 20px">
                <div class="title">
                    经营水平评估
                    <div class="shopLevel" v-if="$route.query.lenderId == 74">
                        <span class="shopLevel-name">店铺评分：</span>
                        <span class="shopLevel-msg">{{ shopLevelObj.ratingScore }}</span>
                        <span class="shopLevel-name">店铺评级：</span>
                        <span class="shopLevel-msg">{{ shopLevelObj.ratingLevel }}</span>
                    </div>
                </div>
                <div v-if="salesValueInfo">
                    <div class="title2">电商平台销售指标</div>
                    <div>
                        <div class="row">
                            <div class="left"><span class="name">过去1季度销售额：</span><span class="msg">{{
                                addThousandSeparators(salesValueInfo.quarter1SalesValue) || '-'
                                    }}</span></div>
                            <div class="right"><span class="name">过去第2季度销售额：</span><span class="msg">{{
                                addThousandSeparators(salesValueInfo.quarter2SalesValue) || '-' }}</span></div>
                        </div>
                        <div class="row">
                            <div class="left"><span class="name">过去3季度销售额：</span><span class="msg">{{
                                addThousandSeparators(salesValueInfo.quarter3SalesValue) || '-'
                                    }}</span></div>
                            <div class="right"><span class="name">过去第4季度销售额：</span><span class="msg">{{
                                addThousandSeparators(salesValueInfo.quarter4SalesValue) || '-' }}</span></div>
                        </div>
                    </div>
                </div>

                <div v-if="disValueInfo">
                    <div class="title2">电商平台回款指标</div>
                    <div>
                        <div class="row">
                            <div class="left"><span class="name">过去1季度回款额：</span><span class="msg">{{
                                addThousandSeparators(disValueInfo.quarter1DisbursementsValue) || '-'
                                    }}</span></div>
                            <div class="right"><span class="name">过去2季度回款额：</span><span class="msg">{{
                                addThousandSeparators(disValueInfo.quarter2DisbursementsValue) || '-' }}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="left"><span class="name">过去3季度回款额 ：</span><span class="msg">{{
                                addThousandSeparators(disValueInfo.quarter3DisbursementsValue) || '-'
                                    }}</span></div>
                            <div class="right"><span class="name">过去4季度回款额：</span><span class="msg">{{
                                addThousandSeparators(disValueInfo.quarter4DisbursementsValue) || '-' }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="operationInfo">
                    <div class="title2">电商平台产品运营指标</div>
                    <div>
                        <div class="row">
                            <div class="left"><span class="name">近12月卖家警告次数：</span><span class="msg">{{
                                operationInfo.ttmSellerWarnings || '-'
                                    }}</span></div>
                            <div class="right"><span class="name">近12月退款总订单数：</span><span class="msg">{{
                                operationInfo.ttmReturns || '-' }}</span></div>
                        </div>
                        <div class="row">
                            <div class="left"><span class="name">FBA库存价值 ：</span><span class="msg">{{
                                operationInfo.latestFbaInventoryValue || '-'
                                    }}</span></div>
                            <div class="right"><span class="name"></span><span class="msg"></span></div>
                        </div>
                    </div>
                </div>

                <div v-if="tendencyInfo">
                    <div class="title2">电商平台运营趋势指标</div>
                    <div>
                        <div class="row">
                            <div class="left"><span class="name">销售同比增长率 ：</span><span class="msg">{{
                                tendencyInfo.quarter1DisRate || '-'
                                    }}</span></div>
                            <div class="right"><span class="name">销售近1季度环比增长率：</span><span class="msg">{{
                                tendencyInfo.quarter1DisRate || '-' }}</span></div>
                        </div>
                        <div class="row">
                            <div class="left"><span class="name">回款同比增长率 ：</span><span class="msg">{{
                                tendencyInfo.year1DisRate || '-'
                                    }}</span></div>
                            <div class="right"><span class="name">回款近1季度环比增长率：</span><span class="msg">{{
                                tendencyInfo.year1SalesRate || '-' }}</span></div>
                        </div>
                    </div>
                </div>

                <div v-if="faFbaInfo">
                    <div class="title2">电商仓储物流能力指标</div>
                    <div>
                        <div class="row">
                            <div class="left"><span class="name">最新FBA库存价值：</span><span class="msg">{{
                                faFbaInfo.last3MonthFbaInventoryValue || '-'
                                    }}</span></div>
                            <div class="right"><span class="name">过3个月库存平均价值：</span><span class="msg">{{
                                faFbaInfo.last13WeekFbaRate || '-' }}</span></div>
                        </div>
                        <div class="row">
                            <div class="left"><span class="name">过去13周库存发货比例：</span><span class="msg">{{
                                faFbaInfo.latestFbaInventoryValue || '-'
                                    }}</span></div>
                            <div class="right"><span class="name">过去3个月库存备货率：</span><span class="msg">{{ faFbaInfo.rate
                                || '-' }}</span></div>
                        </div>
                    </div>
                </div>

            </el-card>
            <!--        风险筛选预警 L1   -->
            <el-card style="margin-top: 20px">
                <div class="title">风险筛选预警</div>
                <div class="title2">工商风险</div>
                <div>
                    <div class="row">
                        <div class="left"><span class="name">近6个月被列入经营异常名录原因：</span><span class="msg">{{
                            manageInfoCleaning.month6Reason || '-'
                                }}</span></div>
                        <div class="right"><span class="name">近12个月被列入经营异常名录原因：</span><span class="msg">{{
                            manageInfoCleaning.month12Reason || '-' }}</span></div>
                    </div>
                </div>
                <div class="title2">欺诈风险</div>
                <div>
                    <div class="row">
                        <div class="left"><span class="name">企业当前经营异常 ：</span><span class="msg">{{
                            riskInfo.isCompanyRisk || '-'
                                }}</span></div>
                        <div class="right"><span class="name">企业当前命中限制高消费：</span><span class="msg">{{
                            riskInfo.isConsumption || '-' }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">企业近12个月命中限制高消费 ：</span><span class="msg">{{
                            riskInfo.isMonth12Consumption || '-'
                                }}</span></div>
                        <div class="right"><span class="name">企业当前命中失信被执行人：</span><span class="msg">{{
                            riskInfo.isExecute || '-' }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">企业近12个命中失信被执行人 ：</span><span class="msg">{{
                            riskInfo.isMonth12Execute || '-'
                                }}</span></div>
                        <div class="right"><span class="name"></span><span class="msg"></span></div>
                    </div>
                </div>
                <div class="title2">司法风险</div>
                <div>
                    <div class="row">
                        <div class="left"><span class="name">企业当前作为被告立案 ：</span><span class="msg">{{
                            judiciaryRisk.isDefendant || '-'
                                }}</span></div>
                        <div class="right"><span class="name">企业近12个月作为被告立案次数大于2：</span><span class="msg">{{
                            judiciaryRisk.isDefendant2 || '-' }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">企业近12个月涉及案由为借贷相关的案件 ：</span><span class="msg">{{
                            judiciaryRisk.isDefendantLoan || '-'
                                }}</span></div>
                        <div class="right"><span class="name">企业当前处于被执行状态：</span><span class="msg">{{
                            judiciaryRisk.isCompanyExecute || '-' }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">企业近12月有过被执行次数 ：</span><span class="msg">{{
                            judiciaryRisk.isCompanyMonth12Execute || '-'
                                }}</span></div>
                        <div class="right"><span class="name">企业当前处于司法拍卖状态：</span><span class="msg">{{
                            judiciaryRisk.isAuction }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">近6个月企业当前处于司法拍卖状态 ：</span><span class="msg">{{
                            judiciaryRisk.isMonth6Auction || '-'
                                }}</span></div>
                        <div class="right"><span class="name"></span><span class="msg"></span></div>
                    </div>
                </div>
                <div class="title2">关联风险</div>
                <div>
                    <div class="row">
                        <div class="left"><span class="name">借款人命中关联借款企业限制高消费对象 ：</span><span class="msg">{{
                            relevanceRisk.isConsumption || '-'
                                }}</span></div>
                        <div class="right"><span class="name">法人代表人命中关联借款企业限制高消费对象：</span><span class="msg">{{
                            relevanceRisk.isLegalpersonConsumption || '-' }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">股东命中关联借款企业限制高消费对象 ：</span><span class="msg">{{
                            relevanceRisk.isStockholderConsumption || '-'
                                }}</span></div>
                        <div class="right"><span class="name">借款人命中关联借款企业被执行人：</span><span class="msg">{{
                            relevanceRisk.isCompanyExecute || '-' }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">法人代表人命中关联借款企业被执行人 ：</span><span class="msg">{{
                            relevanceRisk.isLegalpersonExecute || '-'
                                }}</span></div>
                        <div class="right"><span class="name">股东命中关联借款企业被执行人：</span><span class="msg">{{
                            relevanceRisk.isStockholderExecute || '-' }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">借款人命中关联借款企业失信被执行人 ：</span><span class="msg">{{
                            relevanceRisk.isCompanyBExecute || '-'
                                }}</span></div>
                        <div class="right"><span class="name">法人代表东命中关联借款企业失信被执行人：</span><span class="msg">{{
                            relevanceRisk.isLegalpersonBExecute || '-' }}</span></div>
                    </div>
                    <div class="row">
                        <div class="left"><span class="name">股东命中关联借款企业失信被执行人 ：</span><span class="msg">{{
                            relevanceRisk.isStockholderBExecute || '-'
                                }}</span></div>
                        <div class="right"><span class="name"></span><span class="msg"></span></div>
                    </div>
                </div>
                <div class="title2">股权风险</div>
                <div>
                    <div class="row">
                        <div class="left"><span class="name">借款企业当前股权被冻结：</span><span class="msg">{{
                            stockrightRist.isStockrightFrozen || '-'
                                }}</span></div>
                        <div class="right"><span class="name">借款企业近12月有被股权冻结记录：</span><span class="msg">{{
                            stockrightRist.isMonth12StockrightFrozen || '-' }}</span></div>
                    </div>
                </div>

            </el-card>
            <!--         风险详情 L1  -->
            <el-card style="margin-top: 20px">
                <div class="title">风险详情</div>
                <!--     工商风险 l2 -->
                <div v-if="manageInfoVOList">
                    <div class="title2">工商风险</div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>移入原因</th>
                                <th>移入日期</th>
                                <th>移除原因</th>
                                <th>移出日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in manageInfoVOList" :key="index">
                                <td>{{ index }}</td>
                                <td>{{ item.putReason || '-' }}</td>
                                <td>{{ item.putDate || '-' }}</td>
                                <td>{{ item.removeReason || '-' }}</td>
                                <td>{{ item.removeDate || '-' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--     欺诈风险 l2 -->
                <div class="title2">欺诈风险</div>
                <div v-if="consumeInfoVOList">
                    <div class="title3">限制高消费</div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>立案日期</th>
                                <th>案号</th>
                                <th>被限制对象</th>
                                <th>申请执行人</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in consumeInfoVOList" :key="index">
                                <td>{{ index }}</td>
                                <td>{{ item.filingDate || '-' }}</td>
                                <td>{{ item.caseNo || '-' }}</td>
                                <td>{{ item.restrictedConsumerName || '-' }}</td>
                                <td>{{ item.execName || '-' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="cxecuteInfoList">
                    <div class="title3">失信被执行人</div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>执行法院</th>
                                <th>名称</th>
                                <th>失信被执行人行为具体情形</th>
                                <th>案号</th>
                                <th>身份证号码/组织机构代码</th>
                                <th>被执行人的履行情况</th>
                                <th>立案日期</th>
                                <th>执行依据文号</th>
                                <th>做出执行依据单位</th>
                                <th>生效法律文书确定的义务</th>
                                <th>发布日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in cxecuteInfoList" :key="index">
                                <td>{{ index }}</td>
                                <td>{{ item.courtName || '-' }}</td>
                                <td>{{ item.iname || '-' }}</td>
                                <td>{{ item.disruptTypeName || '-' }}</td>
                                <td>{{ item.caseCode || '-' }}</td>
                                <td>{{ item.cardNum || '-' }}</td>
                                <td>{{ item.performance || '-' }}</td>
                                <td>{{ item.regDate || '-' }}</td>
                                <td>{{ item.gistId || '-' }}</td>
                                <td>{{ item.gistUnit || '-' }}</td>
                                <td>{{ item.duty || '-' }}</td>
                                <td>{{ item.publishDate || '-' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--     司法风险 l2 -->
                <div class="title2">司法风险</div>
                <div v-if="loanCourtInfoVOList">
                    <div class="title3">作为被告的立案信息</div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>案号</th>
                                <th>立案日期</th>
                                <th>开庭日期</th>
                                <th>结束日期</th>
                                <th>案件类型</th>
                                <th>案件状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in loanCourtInfoVOList" :key="index">
                                <td>{{ index }}</td>
                                <td>{{ item.caseNo || '-' }}</td>
                                <td>{{ item.filingDate || '-' }}</td>
                                <td>{{ item.startDate || '-' }}</td>
                                <td>{{ item.closeDate || '-' }}</td>
                                <td>{{ item.caseType || '-' }}</td>
                                <td>{{ item.caseStatus || '-' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="courtInfoVOList">
                    <div class="title3">立案案由为借贷的信息</div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>发布日期</th>
                                <th>裁判日期</th>
                                <th>案件名称</th>
                                <th>案件金额</th>
                                <th>案号</th>
                                <th>案由</th>
                                <th>原告</th>
                                <th>被告</th>
                                <th>裁判结果</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in courtInfoVOList" :key="index">
                                <td>{{ index }}</td>
                                <td>{{ item.publicDate || '-' }}</td>
                                <td>{{ item.judgeDate || '-' }}</td>
                                <td>{{ item.caseName || '-' }}</td>
                                <td>{{ item.caseAmount || '-' }}</td>
                                <td>{{ item.caseNo || '-' }}</td>
                                <td>{{ item.caseReason || '-' }}</td>
                                <td>{{ item.plaintiff || '-' }}</td>
                                <td>{{ item.defendant || '-' }}</td>
                                <td>{{ item.judgeResult || '-' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="judiciaryInfoVOList">
                    <div class="title3">司法拍卖相关信息</div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>公告日期</th>
                                <th>拍卖公告/拍卖名称</th>
                                <th>拍品介绍</th>
                                <th>起拍价</th>
                                <th>评估价</th>
                                <th>阶段</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in judiciaryInfoVOList" :key="index">
                                <td>{{ index }}</td>
                                <td>{{ item.publicDate || '-' }}</td>
                                <td>{{ item.auctionNotice || '-' }}</td>
                                <td>{{ item.description || '-' }}</td>
                                <td>{{ item.startPrice || '-' }}</td>
                                <td>{{ item.estPrice || '-' }}</td>
                                <td>{{ item.jieduan || '-' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--     股权风险 l2  -->
                <div v-if="stockrightInfoVOList">
                    <div class="title2">股权风险</div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>案号</th>
                                <th>被执行人</th>
                                <th>股权份额</th>
                                <th>冻结股权份额的企业</th>
                                <th>冻结开始日期</th>
                                <th>冻结结束日期</th>
                                <th>冻结状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in stockrightInfoVOList" :key="index">
                                <td>{{ index }}</td>
                                <td>{{ item.caseNo || '-' }}</td>
                                <td>{{ item.executedBy || '-' }}</td>
                                <td>{{ item.relatedCompany || '-' }}</td>
                                <td>{{ item.equityAmount || '-' }}</td>
                                <td>{{ item.freezeStartDate || '-' }}</td>
                                <td>{{ item.freezeEndDate || '-' }}</td>
                                <td>{{ item.status || '-' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--     关联风险 l2 -->
                <div class="title2">关联风险</div>
                <div v-if="consumeInfoVOBList">
                    <div class="title3">关联借款企业限制高消费对象</div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>立案日期</th>
                                <th>案号</th>
                                <th>被限制对象</th>
                                <th>关联对象</th>
                                <th>申请执行人</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in consumeInfoVOBList" :key="index">
                                <td>{{ index }}</td>
                                <td>{{ item.filingDate || '-' }}</td>
                                <td>{{ item.caseNo || '-' }}</td>
                                <td>{{ item.restrictedConsumerName || '-' }}</td>
                                <td>{{ item.associatedConsumerName || '-' }}</td>
                                <td>{{ item.execName || '-' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="gexecuteInfoVOList">
                    <div class="title3">关联借款企业失信被执行人</div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>姓名</th>
                                <th>职务</th>
                                <th>所有公司数量</th>
                                <th>主要人员标签</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in gexecuteInfoVOList" :key="index">
                                <td>{{ index }}</td>
                                <td>{{ item.name || '-' }}</td>
                                <td>{{ item.job || '-' }}</td>
                                <td>{{ item.companyNum || '-' }}</td>
                                <td>{{ item.tag || '-' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </el-card>
        </div>

        <div class="upLoad-btn">
            <el-button class="downloadPdf" type="primary" @click="downloadPdf">下载 PDF</el-button>
        </div>
    </div>
</template>

<script>
import { getDigitalReport, calculateShopLevel } from '@/api';
import moment from 'moment';
export default {
    name: 'App',
    props: {
        loanNumber: {
            type: String,
            required: true
        },
        bcName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            html2pdf: null,
            //企业基本信息
            companyInfo: {},
            //股东信息
            beneficiaryInfoList: [],
            // 股权风险
            stockrightInfoVOList: [],
            //关联借款企业失信被执行人
            gexecuteInfoVOList: [],
            //关联借款企业限制高消费对象
            consumeInfoVOBList: [],
            //司法拍卖相关信息
            judiciaryInfoVOList: [],
            //立案案由为借贷的信息
            courtInfoVOList: [],
            //作为被告的立案信息
            loanCourtInfoVOList: [],
            //工商风险
            manageInfoVOList: [],
            // 被执行人
            cxecuteInfoList: [],
            // 欺诈风险 限制高消费
            consumeInfoVOList: [],
            // 预警-工商风险
            manageInfoCleaning: [],
            // 预警-欺诈风险
            riskInfo: [],
            // 预警-司法风险
            judiciaryRisk: [],
            // 预警-关联风险
            relevanceRisk: [],
            // 预警-股权风险
            stockrightRist: [],
            // 季度回款
            disValueInfo: {},
            //季度销售额
            salesValueInfo: {},
            //物流能力指标
            faFbaInfo: {},
            //运营指标
            operationInfo: {},
            //趋势指标
            tendencyInfo: {},
            shopLevelObj: {
                ratingScore: '',
                ratingLevel: ''
            }
        };
    },
    methods: {
        getData() {
            getDigitalReport({ name: this.bcName, applicationCode: this.loanNumber }).then(res => {
                this.companyInfo = res.data.companyInfo;
                this.beneficiaryInfoList = res.data.beneficiaryInfoList;
                this.gexecuteInfoVOList = res.data.gexecuteInfoVOList;
                this.stockrightInfoVOList = res.data.stockrightInfoVOList;
                this.consumeInfoVOBList = res.data.consumeInfoVOBList;
                this.judiciaryInfoVOList = res.data.judiciaryInfoVOList;
                this.courtInfoVOList = res.data.courtInfoVOList;
                this.loanCourtInfoVOList = res.data.loanCourtInfoVOList;
                this.manageInfoVOList = res.data.manageInfoVOList;
                this.cxecuteInfoList = res.data.cxecuteInfoList;
                this.consumeInfoVOList = res.data.consumeInfoVOList;
                this.manageInfoCleaning = res.data.manageInfoCleaning
                this.riskInfo = res.data.riskInfo;
                this.judiciaryRisk = res.data.judiciaryRisk;
                this.relevanceRisk = res.data.relevanceRisk;
                this.stockrightRist = res.data.stockrightRist
                this.disValueInfo = res.data.disValueInfo
                this.salesValueInfo = res.data.salesValueInfo;
                this.faFbaInfo = res.data.faFbaInfo;
                this.operationInfo = res.data.operationInfo;
                this.tendencyInfo = res.data.tendencyInfo;

            });
        },
        getCalculateShopLevel() {
            calculateShopLevel({ applicationCode: this.loanNumber }).then(res => {
                this.shopLevelObj.ratingScore = res.data.ratingScore || '-'
                this.shopLevelObj.ratingLevel = res.data.ratingLevel || '-'
            });
        },
        downloadPdf() {
            const defaultName = "--";
            const bcName = this.bcName || defaultName;
            const Date = moment().format('YYYYMMDD');
            if (!this.html2pdf) {
                console.error('html2pdf.js is not loaded yet!');
                return;
            }

            const element = document.querySelector('.all');
            const opt = {
                margin: 0.2,
                filename: `${bcName}数字尽调报告${Date}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            this.html2pdf().set(opt).from(element).save();
        },
        loadHtml2Pdf() {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = () => {
                this.html2pdf = window.html2pdf;
            };
            script.onerror = () => {
            };
            document.body.appendChild(script);
        },
        addThousandSeparators(num) {
            if (num == null) {
                return '-'
            }
            return Number(num).toLocaleString();
        }
    },
    mounted() {
        this.loadHtml2Pdf();
        // 拦截
        if (this.$route.query.lenderId == 57 || this.$route.query.lenderId == 15 || this.$route.query.lenderId == 74 || this.$route.query.lenderId == 79) {
            this.getData();
        }
        if (this.$route.query.lenderId == 74) {
            this.getCalculateShopLevel();
        }
    }
};
</script>

<style lang="less" scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}

.row {
    display: flex;
    margin-top: 30px;

    .left {
        flex: 1;
        padding-left: 45px;
        display: flex;
        justify-content: space-between;
    }

    .right {
        flex: 1;
        padding-left: 45px;
        display: flex;
        justify-content: space-between;
    }
}

.title {
    font-size: 20px;
    font-weight: bold;
    padding: 5px 0 25px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.shopLevel {
    margin-left: 100px;
    color: red;

    .shopLevel-name {
        font-weight: bold;
        margin-right: 10px;
        font-size: 14px;
        margin-left: 50px;
    }

    .shopLevel-msg {
        font-size: 14px;
    }
}

.title2 {
    font-size: 18px;
    font-weight: bold;
    padding: 25px 0 10px;
}

.title3 {
    font-size: 16px;
    font-weight: bold;
    padding: 0 0 25px;
}

.name {
    width: 40%;
}

.msg {
    width: 60%;
    text-align: center;
}

.allRow {
    padding: 0 45px;
}

.upLoad-btn {
    position: fixed;
    right: 100px;
    bottom: 40px;
}
</style>