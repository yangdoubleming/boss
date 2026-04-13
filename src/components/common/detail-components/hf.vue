<template>
    <div v-loading="isOver">
        <el-card>
            <el-collapse v-model="activeNames">
<!--                <el-collapse-item title="司法信息" name="1">-->
<!--                    <el-descriptions class="margin-top" :column="2" border style="width: 500px"-->
<!--                        :labelStyle="{ 'background': '#fff', 'color': '#333', 'font-weight': '500', 'font-size': '14px' }"-->
<!--                        :contentStyle="{ 'background': '#fff', 'color': '#333', 'font-size': '14px' }">-->
<!--                        <el-descriptions-item>-->
<!--                            <template slot="label">司法类目</template>-->
<!--                            司法归类-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">涉案数量</template>-->
<!--                            风险预警-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">执行公开</template>-->
<!--                            司法类-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">{{ hfdata.execute || 0 }}</template>-->
<!--                            {{ hfdata.execute ? '异常' : '未见异常' }}-->
<!--                        </el-descriptions-item>-->

<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">失信被执行人</template>-->
<!--                            司法类-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">{{ hfdata.untrustworthy || 0 }}</template>-->
<!--                            {{ hfdata.untrustworthy ? '异常' : '未见异常' }}-->
<!--                        </el-descriptions-item>-->

<!--                        &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">限制高消费</template>-->
<!--                            司法类-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">{{ hfdata.limitHighConsumption || 0 }}</template>-->
<!--                            {{ hfdata.limitHighConsumption ? '异常' : '未见异常' }}-->
<!--                        </el-descriptions-item>-->
<!--                        &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">限制出入境</template>-->
<!--                            司法类-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">{{ hfdata.limitEntryAndExit || 0 }}</template>-->
<!--                            {{ hfdata.limitEntryAndExit ? '异常' : '未见异常' }}-->
<!--                        </el-descriptions-item>-->
<!--                        &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">民商事裁判文书</template>-->
<!--                            司法类-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">{{ hfdata.referee || 0 }}</template>-->
<!--                            {{ hfdata.referee ? '异常' : '未见异常' }}-->
<!--                        </el-descriptions-item>-->
<!--                        &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">民商事审判流程</template>-->
<!--                            司法类-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">{{ hfdata.judgment || 0 }}</template>-->
<!--                            {{ hfdata.judgment ? '异常' : '未见异常' }}-->
<!--                        </el-descriptions-item>-->
<!--                        &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">罪犯及嫌疑人</template>-->
<!--                            司法类-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">{{ hfdata.criminals || 0 }}</template>-->
<!--                            {{ hfdata.criminals ? '异常' : '未见异常' }}-->
<!--                        </el-descriptions-item>-->
<!--                        &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">终本案件</template>-->
<!--                            司法类-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">{{ hfdata.finalCase || 0 }}</template>-->
<!--                            {{ hfdata.finalCase ? '异常' : '未见异常' }}-->
<!--                        </el-descriptions-item>-->
<!--                        &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">行政违法</template>-->
<!--                            行政类-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">{{ hfdata.illegal || 0 }}</template>-->
<!--                            {{ hfdata.illegal ? '异常' : '未见异常' }}-->
<!--                        </el-descriptions-item>-->

<!--                        &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">欠税</template>-->
<!--                            行政类-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">{{ hfdata.taxDebt || 0 }}</template>-->
<!--                            {{ hfdata.taxDebt ? '异常' : '未见异常' }}-->
<!--                        </el-descriptions-item>-->
<!--                        &lt;!&ndash; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">纳税非正常户</template>-->
<!--                            行政类-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">{{ hfdata.taxAnomaly || 0 }}</template>-->
<!--                            {{ hfdata.taxAnomaly ? '异常' : '未见异常' }}-->
<!--                        </el-descriptions-item>-->
<!--                    </el-descriptions>-->
<!--                </el-collapse-item>-->
<!--                <el-collapse-item title="百融" name="2">-->
<!--                    <el-button type="primary" @click="getAllData"> 获取数据</el-button>-->
<!--                    <div style="margin-top: 5px; margin-bottom: 10px; margin-top: 10px; font-size: 14px">报告状态: {{-->
<!--                        reportStatus }}-->
<!--                    </div>-->
<!--                    <div style="margin-top: 5px; margin-bottom: 10px; margin-top: 10px; font-size: 14px"-->
<!--                        v-if="temp.length">-->
<!--                        报告生成日期：-->
<!--                        {{-->
<!--                            temp[0].createTime }}-->
<!--                    </div>-->
<!--                    <div style="margin-top: 5px; margin-bottom: 10px; margin-top: 10px; font-size: 14px; color: red">-->
<!--                        准入建议: {{ suggestion }}-->
<!--                    </div>-->
<!--                    <el-table :data="riskBaiRongTable" border style="width: 50%;font-size: 14px">-->
<!--                        <el-table-column prop="name" label="风控指标"> </el-table-column>-->
<!--                        <el-table-column prop="score" label="数值"> </el-table-column>-->
<!--                        <el-table-column prop="desc" label="说明"> </el-table-column>-->
<!--                    </el-table>-->
<!--                    <div style="margin-top: 10px; margin-bottom: 20px; margin-top: 20px">评分报告</div>-->
<!--                    <el-table :data="baiRongTable" border style="width: 50%;font-size: 14px">-->
<!--                        <el-table-column prop="apiType" label="风控指标"> </el-table-column>-->
<!--                        <el-table-column prop="score" label="分数"> </el-table-column>-->
<!--                        &lt;!&ndash; <el-table-column prop="rawValue" label="风险建议"> </el-table-column> &ndash;&gt;-->
<!--                        <el-table-column prop="desc" label="说明"> </el-table-column>-->
<!--                    </el-table>-->
<!--                </el-collapse-item>-->
<!--                <el-collapse-item title="百维与企查查" name="6">-->
<!--                    <div style="display: flex; gap: 20px;">-->
<!--                        <div style="font-size: 16px ; font-weight: 600;">百维: </div>-->
<!--                        <div> 结果: {{ baiWei.result }} </div>-->
<!--                        <div>-->
<!--                            信用评分: {{ baiWei.score }}-->
<!--                        </div>-->
<!--                        <el-button type="primary" @click="getBW" v-show="isBw">获取数据/200元</el-button>-->
<!--                    </div>-->

<!--                    <el-table style="width: 40%;" :data="baiWei.bWD">-->
<!--                        <el-table-column label="原因码" prop="reasonCode">-->


<!--                        </el-table-column>-->
<!--                        <el-table-column label="原因描述" prop="reasonMsg">-->

<!--                        </el-table-column>-->

<!--                    </el-table>-->

<!--                    <div-->
<!--                        style="font-size: 16px ; font-weight: 600;margin-top: 20px; margin-bottom: 10px; display: flex; gap: 30px;">-->
<!--                        企查查:-->
<!--                        <el-button type="primary" @click="getQCC" v-show="isQCC">获取数据</el-button>-->
<!--                    </div>-->
<!--                    <div style="width: 60%;">-->
<!--                        <el-descriptions :column="2" border v-if="Object.keys(qiChaCha).length">-->
<!--                            <el-descriptions-item label="企业名称">{{ qiChaCha.name }}</el-descriptions-item>-->
<!--                            <el-descriptions-item :label="$t('loan_detail_tyshxydm')">{{ qiChaCha.creditCode-->
<!--                                }}</el-descriptions-item>-->
<!--                            <el-descriptions-item label="法定代表人">{{ qiChaCha.operName }}</el-descriptions-item>-->
<!--                            <el-descriptions-item label="登记状态">{{ qiChaCha.status }}</el-descriptions-item>-->
<!--                            <el-descriptions-item label="成立日期">{{ qiChaCha.startDate }}</el-descriptions-item>-->
<!--                            <el-descriptions-item label="注册地址">{{ qiChaCha.address }}</el-descriptions-item>-->
<!--                        </el-descriptions>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.shiXin">-->
<!--                        <div class="qichacha">-->
<!--                            <div> 失信被执行人总条数：{{-->
<!--                                qiChaCha.shiXin.totalCount }}条-->
<!--                            </div>-->
<!--                            <div>-->
<!--                                涉案总金额:{{ qiChaCha.shiXin.totalAmount }}万元-->
<!--                            </div>-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="shiXin" @click="closeContent('shiXin')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('shiXin')"></i>-->
<!--                        </div>-->
<!--                        <div style="width: 80%;" id="shiXin">-->
<!--                            <el-table :data="qiChaCha.shiXin.dataList">-->
<!--                                <el-table-column prop="caseNo" label="案号"> </el-table-column>-->
<!--                                <el-table-column prop="executeCourt" label="执行法院"> </el-table-column>-->
<!--                                <el-table-column prop="executeNo" label=" 执行依据文号"> </el-table-column>-->
<!--                                <el-table-column prop="amount" label=" 涉案金额(元)"> </el-table-column>-->
<!--                                <el-table-column prop="executeStatus" label="履行情况"> </el-table-column>-->
<!--                                <el-table-column prop="actionRemark" label=" 失信行为"> </el-table-column>-->
<!--                                <el-table-column prop="registerDate" label=" 立案日期"> </el-table-column>-->
<!--                                <el-table-column prop="publicDate" label=" 发布日期"> </el-table-column>-->

<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.zhiXing">-->
<!--                        <div class="qichacha">-->
<!--                            <div>被执行人总条数：{{-->
<!--                                qiChaCha.zhiXing.totalCount }}条</div>-->
<!--                            <div>-->
<!--                                涉案总金额:{{ qiChaCha.zhiXing.totalAmount }}万元-->
<!--                            </div>-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="zhiXing"-->
<!--                                @click="closeContent('zhiXing')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('zhiXing')"></i>-->
<!--                        </div>-->
<!--                        <div style="width: 80%;" id="zhiXing">-->
<!--                            <el-table :data="qiChaCha.zhiXing.dataList">-->
<!--                                <el-table-column prop="caseNo" label="案号"> </el-table-column>-->
<!--                                <el-table-column prop="biaoDi" label="执行标的（元）"></el-table-column>-->
<!--                                <el-table-column prop="executeCourt" label="执行法院"> </el-table-column>-->
<!--                                <el-table-column prop="registerDate" label=" 立案日期"> </el-table-column>-->
<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.adminPenalty">-->
<!--                        <div class="qichacha">-->
<!--                            <div>-->
<!--                                行政处罚总条数：{{-->
<!--                                    qiChaCha.adminPenalty.totalCount }}条-->
<!--                            </div>-->
<!--                            <div>-->
<!--                                罚款总金额:{{ qiChaCha.adminPenalty.totalAmount }}万元-->
<!--                            </div>-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="adminPenalty"-->
<!--                                @click="closeContent('adminPenalty')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('adminPenalty')"></i>-->
<!--                        </div>-->
<!--                        <div style="width: 80%;" id="adminPenalty">-->
<!--                            <el-table :data="qiChaCha.adminPenalty.dataList">-->
<!--                                <el-table-column prop="docNo" label="决定文书号"> </el-table-column>-->
<!--                                <el-table-column prop="punishReason" label="违法事实"></el-table-column>-->
<!--                                <el-table-column prop="punishResult" label="处罚结果"> </el-table-column>-->
<!--                                <el-table-column prop="punishAmt" label="处罚金额（元）"> </el-table-column>-->
<!--                                <el-table-column prop="punishOffice" label="处罚单位"> </el-table-column>-->
<!--                                <el-table-column prop="punishDate" label="处罚日期"> </el-table-column>-->
<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.exception">-->
<!--                        <div class="qichacha">经营异常总条数：{{-->
<!--                            qiChaCha.exception.totalCount }}条-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="exception"-->
<!--                                @click="closeContent('exception')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('exception')"></i>-->
<!--                        </div>-->
<!--                        <div style="width: 80%;" id="exception">-->
<!--                            <el-table :data="qiChaCha.exception.dataList">-->
<!--                                <el-table-column prop="addDate" label="列入日期"> </el-table-column>-->
<!--                                <el-table-column prop="addOffice" label="作出决定机关(列入)"></el-table-column>-->
<!--                                <el-table-column prop="addReason" label="列入经营异常名录原因"> </el-table-column>-->
<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.chattelMortgage">-->
<!--                        <div class="qichacha">动产抵押总条数：{{-->
<!--                            qiChaCha.chattelMortgage.totalCount }}条-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="chattelMortgage"-->
<!--                                @click="closeContent('chattelMortgage')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('chattelMortgage')"></i>-->
<!--                        </div>-->
<!--                        <div style="width: 80%;" id="chattelMortgage">-->
<!--                            <el-table :data="qiChaCha.chattelMortgage.dataList">-->
<!--                                <el-table-column prop="registerNo" label="登记编号"> </el-table-column>-->
<!--                                <el-table-column prop="status" label="状态"></el-table-column>-->
<!--                                <el-table-column prop="registerDate" label="登记日期"> </el-table-column>-->
<!--                                <el-table-column prop="secureClaimsAmount" label="被担保主债权数额"> </el-table-column>-->
<!--                                <el-table-column prop="pledger" label="抵押人"> </el-table-column>-->
<!--                                <el-table-column prop="pledgee" label="抵押权人"> </el-table-column>-->
<!--                                <el-table-column prop="debtTerm" label="债务人履行债务的期限"> </el-table-column>-->
<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.liquidation">-->
<!--                        清算组负责人:{{ qiChaCha.liquidation.leader }}-->
<!--                        清算组成员:{{ qiChaCha.liquidation.member }}-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.equityPledge">-->
<!--                        <div class="qichacha">股权出质总条数： {{-->
<!--                            qiChaCha.equityPledge.totalCount }}条-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="equityPledge"-->
<!--                                @click="closeContent('equityPledge')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('equityPledge')"></i>-->
<!--                        </div>-->
<!--                        <div style="width: 80%;" id="equityPledge">-->
<!--                            <el-table :data="qiChaCha.equityPledge.dataList">-->
<!--                                <el-table-column prop="registerNo" label="登记编号"> </el-table-column>-->
<!--                                <el-table-column label="质权人" prop="pledgeeList"></el-table-column>-->
<!--                                <el-table-column prop=" pledgorList" label="出质人"> </el-table-column>-->
<!--                                <el-table-column prop="relatedCompany" label=" 出质股权标的企业"> </el-table-column>-->
<!--                                <el-table-column prop="pledgedAmount" label=" 出质股权数额"> </el-table-column>-->
<!--                                <el-table-column prop="registerDate" label=" 登记日期"> </el-table-column>-->
<!--                                <el-table-column prop="status" label=" 状态"> </el-table-column>-->
<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.seriousIllegal">-->
<!--                        <div class="qichacha">严重违法总条数：{{-->
<!--                            qiChaCha.seriousIllegal.totalCount }}条-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="seriousIllegal"-->
<!--                                @click="closeContent('seriousIllegal')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('seriousIllegal')"></i>-->

<!--                        </div>-->
<!--                        <div style="width: 80%;" id="seriousIllegal">-->
<!--                            <el-table :data="qiChaCha.seriousIllegal.dataList">-->
<!--                                <el-table-column prop="addDate" label="列入日期"> </el-table-column>-->
<!--                                <el-table-column prop="addOffice" label="作出决定机关(列入)"></el-table-column>-->
<!--                                <el-table-column prop="addReason" label="原因"> </el-table-column>-->
<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.equityFreeze">-->
<!--                        <div class="qichacha">股权冻结总条数：{{-->
<!--                            qiChaCha.equityFreeze.totalCount }}条-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="equityFreeze"-->
<!--                                @click="closeContent('equityFreeze')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('equityFreeze')"></i>-->
<!--                        </div>-->
<!--                        <div style="width: 80%;" id="equityFreeze">-->
<!--                            <el-table :data="qiChaCha.equityFreeze.dataList">-->
<!--                                <el-table-column prop="docNo" label="执行通知书文号"> </el-table-column>-->
<!--                                <el-table-column prop="beExecuted" label="被执行人"></el-table-column>-->
<!--                                <el-table-column prop="freezeCompany" label="冻结股权标的企业"></el-table-column>-->
<!--                                <el-table-column prop="fquityAmount" label="股权数额"></el-table-column>-->
<!--                                <el-table-column prop="executeCourt" label="执行法院"> </el-table-column>-->
<!--                                <el-table-column prop="status" label="类型 | 状态"> </el-table-column>-->
<!--                                <el-table-column prop="freezeStartDate" label="冻结开始日期"> </el-table-column>-->
<!--                                <el-table-column prop="freezeEndDate" label="冻结结束日期"> </el-table-column>-->

<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.judicialSale">-->
<!--                        <div class="qichacha">司法拍卖总条数：{{-->
<!--                            qiChaCha.judicialSale.totalCount }}条-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="judicialSale"-->
<!--                                @click="closeContent('judicialSale')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('judicialSale')"></i>-->
<!--                        </div>-->
<!--                        <div style="width: 80%;" id="judicialSale">-->
<!--                            <el-table :data="qiChaCha.judicialSale.dataList">-->
<!--                                <el-table-column prop="name" label="标题"> </el-table-column>-->
<!--                                <el-table-column prop="caseNo" label="案号"></el-table-column>-->
<!--                                <el-table-column prop="auctionTime" label="拍卖时间"></el-table-column>-->
<!--                                <el-table-column prop="executeGov" label="处置单位"></el-table-column>-->
<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.bankruptcy">-->
<!--                        <div class="qichacha">破产重整总条数：{{-->
<!--                            qiChaCha.bankruptcy.totalCount }}条-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="bankruptcy"-->
<!--                                @click="closeContent('bankruptcy')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('bankruptcy')"></i>-->
<!--                        </div>-->
<!--                        <div style="width: 80%;" id="bankruptcy">-->
<!--                            <el-table :data="qiChaCha.bankruptcy.dataList">-->
<!--                                <el-table-column prop="publicDate" label="公开日期"> </el-table-column>-->
<!--                                <el-table-column prop="caseNo" label="案号"></el-table-column>-->
<!--                                <el-table-column prop="applicantList" label="申请人"></el-table-column>-->
<!--                                <el-table-column prop="respondentList" label="被申请人"></el-table-column>-->
<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.sumptuary">-->
<!--                        <div class="qichacha">-->
<!--                            <div>-->
<!--                                限制高消费总条数：{{-->
<!--                                    qiChaCha.sumptuary.totalCount }}条-->
<!--                            </div>-->
<!--                            <div>-->
<!--                                涉案总金额:{{ qiChaCha.sumptuary.totalAmount }}（万元）-->
<!--                            </div>-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="sumptuary"-->
<!--                                @click="closeContent('sumptuary')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('sumptuary')"></i>-->
<!--                        </div>-->
<!--                        <div style="width: 80%;" id="sumptuary">-->
<!--                            <el-table :data="qiChaCha.sumptuary.dataList">-->
<!--                                <el-table-column prop="caseNo" label="案号"></el-table-column>-->
<!--                                <el-table-column prop="companyName" label="限消令对象"> </el-table-column>-->
<!--                                <el-table-column prop="relatedName" label="关联对象"></el-table-column>-->
<!--                                <el-table-column prop="applicant" label="申请人"></el-table-column>-->
<!--                                <el-table-column prop="amount" label="涉案金额(元)"></el-table-column>-->
<!--                                <el-table-column prop="registerDate" label="立案日期"></el-table-column>-->
<!--                                <el-table-column prop="publicDate" label="发布日期"></el-table-column>-->
<!--                                <el-table-column prop="executeCourt" label="执行法院"></el-table-column>-->
<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.envPunishment">-->
<!--                        <div class="qichacha">-->
<!--                            <div>-->
<!--                                环保处罚总条数：{{-->
<!--                                    qiChaCha.envPunishment.totalCount }}条-->
<!--                            </div>-->
<!--                            <div>-->
<!--                                罚款总金额:{{ qiChaCha.envPunishment.totalAmount }}（万元）-->
<!--                            </div>-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="envPunishment"-->
<!--                                @click="closeContent('envPunishment')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('envPunishment')"></i>-->
<!--                        </div>-->
<!--                        <div style="width: 80%;" id="envPunishment">-->
<!--                            <el-table :data="qiChaCha.envPunishment.dataList">-->
<!--                                <el-table-column prop="docNo" label="决定文书号"></el-table-column>-->
<!--                                <el-table-column prop="punishReason" label="违法事实"> </el-table-column>-->
<!--                                <el-table-column prop="punishResult" label="处罚结果"></el-table-column>-->
<!--                                <el-table-column prop="punishAmt" label="处罚金额（元）"></el-table-column>-->
<!--                                <el-table-column prop="punishOffice" label="处罚单位"></el-table-column>-->
<!--                                <el-table-column prop="punishDate" label="处罚日期"></el-table-column>-->
<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.taxOweNotice">-->
<!--                        <div class="qichacha">-->
<!--                            <div>-->
<!--                                欠税公告总条数：{{-->
<!--                                    qiChaCha.taxOweNotice.totalCount }}条-->
<!--                            </div>-->
<!--                            <div>-->
<!--                                罚款总金额:{{ qiChaCha.taxOweNotice.totalAmount }}（万元）-->
<!--                            </div>-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="taxOweNotice"-->
<!--                                @click="closeContent('taxOweNotice')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('taxOweNotice')"></i>-->
<!--                        </div>-->
<!--                        <div style="width: 80%;" id="taxOweNotice">-->
<!--                            <el-table :data="qiChaCha.taxOweNotice.dataList">-->
<!--                                <el-table-column prop="title" label="欠税税种"></el-table-column>-->
<!--                                <el-table-column prop="amount" label="欠税余额（元）"> </el-table-column>-->
<!--                                <el-table-column prop="newAmount" label="当前新发生的欠税金额（元）"></el-table-column>-->
<!--                                <el-table-column prop="publishDate" label="PublishDate"></el-table-column>-->
<!--                                <el-table-column prop="punishOffice" label="处罚单位"></el-table-column>-->
<!--                                <el-table-column prop="publishOffice" label="发布单位"></el-table-column>-->
<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="qiChaCha.taxIllegal">-->
<!--                        <div class="qichacha">税收违法总条数：{{-->
<!--                            qiChaCha.taxIllegal.totalCount }}条-->
<!--                            <i class="el-icon-arrow-right" size="20" v-if="taxIllegal"-->
<!--                                @click="closeContent('taxIllegal')"></i>-->
<!--                            <i class="el-icon-arrow-up" v-else @click="openContent('taxIllegal')"></i>-->
<!--                        </div>-->
<!--                        <div style="width: 80%;" id="taxIllegal">-->
<!--                            <el-table :data="qiChaCha.taxIllegal.dataList">-->
<!--                                <el-table-column prop="publishDate" label="发布日期"></el-table-column>-->
<!--                                <el-table-column prop="caseNature" label="案件性质"> </el-table-column>-->
<!--                                <el-table-column prop="taxGov" label="所属税务机关"></el-table-column>-->
<!--                                <el-table-column prop="illegalContent" label="主要违法事实"></el-table-column>-->
<!--                                <el-table-column prop="punishContent" label="法律依据及处理处罚情况"></el-table-column>-->
<!--                            </el-table>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </el-collapse-item>-->

                <!-- <el-collapse-item title="多头借贷信息" name="2">
                    <el-descriptions class="margin-top" :column="2" border style="width: 830px"
                        labelStyle="background:#fff;color:#333;font-weight:500;font-size:14px"
                        contentStyle="background:#fff;color:#333;width:70px;font-size:14px">
                         ---------------------------------- -->
                <!-- <el-descriptions-item>
                            <template slot="label">统计项目</template>
                            命中数
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">统计项目</template>
                            命中数
                        </el-descriptions-item> -->

                <!-- <el-descriptions-item>
                            <template slot="label">近 30 天所有行业下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanAll30day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 90 天所有行业下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanAll90day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 180 天所有行业下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanAll180day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 1 年所有行业下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanAll365day }}
                        </el-descriptions-item>

                        <el-descriptions-item>
                            <template slot="label">近 30 天银行业下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanBank30day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 90 天银行业下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanBank90day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 180 天银行业下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanBank180day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 1 年银行业下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanBank365day }}
                        </el-descriptions-item>

                        <el-descriptions-item>
                            <template slot="label">近 30 天非银行金融行业下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanImbank30day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 90 天非银行金融行业下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanImbank90day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 180 天非银行金融行业下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanImbank180day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 1 年非银行金融行业下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanImbank365day }}
                        </el-descriptions-item>

                        <el-descriptions-item>
                            <template slot="label">近 30 天助贷服务平台下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanLoanassistplat30day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 90 天助贷服务平台下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanLoanassistplat90day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 180 天助贷服务平台下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanLoanassistplat180day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 1 年助贷服务平台下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanLoanassistplat365day }}
                        </el-descriptions-item>

                        <el-descriptions-item>
                            <template slot="label">近 30 天互联网头部机构下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanTopnet30day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 90 天互联网头部机构下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanTopnet90day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 180 天互联网头部机构下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanTopnet180day }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">近 1 年互联网头部机构下申贷事件中出现的机构数</template>
                            {{ zbx.mcntPartnerV4LoanTopnet365day }}
                        </el-descriptions-item>
                    </el-descriptions> -->
                <!-- </el-collapse-item> -->
                <el-collapse-item title="征信信息" name="3">
                    <!-- <div style="margin-top: 10px; margin-bottom: 30px; margin-top: 50px">征信信息</div> -->
                    <div style="margin-bottom: 10px; margin-top: 10px; font-size: 14px">报告状态: {{
                        zx.reportStatus }}
                    </div>
                    <div style="margin-top: 5px; margin-bottom: 10px; margin-top: 10px; font-size: 14px">报告生成日期： {{
                        zx.reportDate }}
                    </div>
<!--                    <div v-if="zx.reportStatus && zx.reportStatus !== '00' && zx.reportStatus !== ''"-->
<!--                        style="margin-top: 5px; margin-bottom: 10px; margin-top: 10px; font-size: 14px; color: red">-->
<!--                        准入建议: {{ zx.result }}-->
<!--                    </div>-->
<!--                    <el-descriptions class="margin-top" :column="3" border style="width: 830px"-->
<!--                        :labelStyle="{ 'background': '#fff', 'color': '#333', 'font-weight': '500', 'font-size': '14px' }"-->
<!--                        :contentStyle="{ 'background': '#fff', 'color': '#333', 'width': '200px', 'font-size': '14px' }">-->
<!--                        <el-descriptions-item>-->
<!--                            <template slot="label">基本情况</template>-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->
<!--                            <template slot="label">风控指标</template>-->
<!--                            是否命中-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->
<!--                            <template slot="label">风控指标</template>-->
<!--                            是否命中-->
<!--                        </el-descriptions-item>-->
<!--                        &lt;!&ndash; v-if=" &ndash;&gt;-->
<!--                        <el-descriptions-item v-for="obj in filteredList" :key="obj.code">-->

<!--                            <template slot="label"> {{ obj.name }}</template>-->
<!--                            {{ obj.result }}-->
<!--                        </el-descriptions-item>-->
<!--                    </el-descriptions>-->
<!--     --------------------------------------------结合新版征信 20250626-------------------------------------     -->
                    <table   class="new_credit_table">
                        <tbody>
                       <!--     基本情况    -->
                        <tr>
                            <td class="first_col">基本情况</td>
                            <td class="second_col">婚姻状况</td><td  class="third_col">{{maritalStatus}}</td>
                            <td class="fourth_col">学历</td><td class="fifth_col">{{educationLevel}}</td>
                        </tr>
                       <!--     信贷交易账户信息    -->
                        <tr>
                            <td class="first_col" rowspan="2">信贷交易账户信息</td>
                            <td class="second_col">个人住房贷款账户数</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001A && rulesData.B001.B001A.A1">{{rulesData.B001.B001A.A1}}</td><td v-else>-</td>
                            <td class="fourth_col">其他类贷款账户数</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001A && rulesData.B001.B001A.A3">{{rulesData.B001.B001A.A3}}</td><td v-else>-</td>
                        </tr>
                        <tr>
                            <td class="second_col">贷记卡账户数</td><td  class="third_col"  v-if="rulesData && rulesData.B001 && rulesData.B001.B001A && rulesData.B001.B001A.A4">{{rulesData.B001.B001A.A4}}</td><td v-else>-</td>
                            <td class="fourth_col">所有贷款、贷记卡、准贷记卡总帐户数</td><td class="fifth_col"  v-if="rulesData && rulesData.B001 && rulesData.B001.B001A && rulesData.B001.B001A.A8">{{rulesData.B001.B001A.A8}}</td><td v-else>-</td>
                        </tr>
                       <!--     历史逾期信息    -->
                        <tr>
                            <td class="first_col" rowspan="8">历史逾期信息</td>
                            <td class="second_col">非循环贷账户账户数</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001D && rulesData.B001.B001D.D1">{{rulesData.B001.B001D.D1}}</td><td v-else>-</td>
                            <td class="fourth_col">非循环贷账户最长逾期月数</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001D && rulesData.B001.B001D.D4">{{rulesData.B001.B001D.D4}}</td><td v-else>-</td>
                        </tr>
                        <tr>
                            <td class="second_col">非循环贷帐户单月最高逾期总额</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001D && rulesData.B001.B001D.D3">{{rulesData.B001.B001D.D3}}</td><td v-else>-</td>
                            <td class="fourth_col"></td><td class="fifth_col"></td>
                        </tr>
                        <tr>
                            <td class="second_col">循环贷账户账户数</td><td  class="third_col"  v-if="rulesData && rulesData.B001 && rulesData.B001.B001D && rulesData.B001.B001D.D9">{{rulesData.B001.B001D.D9}}</td><td v-else>-</td>
                            <td class="fourth_col">循环贷账户最长逾期月数</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001D && rulesData.B001.B001D.D12">{{rulesData.B001.B001D.D12}}</td><td v-else>-</td>
                        </tr>
                        <tr>
                            <td class="second_col">循环贷账户单月最高逾期总额</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001D && rulesData.B001.B001D.D11">{{rulesData.B001.B001D.D11}}</td><td v-else>-</td>
                            <td class="fourth_col"></td><td class="fifth_col"></td>
                        </tr>
                        <tr>
                            <td class="second_col">贷记卡账户账户数</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001D && rulesData.B001.B001D.D13">{{rulesData.B001.B001D.D13}}</td><td v-else>-</td>
                            <td class="fourth_col">贷记卡账户单月逾期总额</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001D && rulesData.B001.B001D.D15">{{rulesData.B001.B001D.D15}}</td><td v-else>-</td>
                        </tr>
                        <tr>
                            <td class="second_col">贷记卡账户最长逾期月数</td><td  class="third_col"   v-if="rulesData && rulesData.B001 && rulesData.B001.B001D && rulesData.B001.B001D.D16">{{rulesData.B001.B001D.D16}}</td><td v-else>-</td>
                            <td class="fourth_col"></td><td class="fifth_col"></td>
                        </tr>
                        <tr>
                            <td class="second_col">所有逾期账户最长逾期/透支月数最大值</td><td  class="third_col"  v-if="rulesData && rulesData.B001 && rulesData.B001.B001D && rulesData.B001.B001D.D21">{{rulesData.B001.B001D.D21}}</td><td v-else>-</td>
                            <td class="fourth_col">所有逾期账户数总和</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001D && rulesData.B001.B001D.D22">{{rulesData.B001.B001D.D22}}</td><td v-else>-</td>
                        </tr>
                        <tr>
                            <td class="second_col">所有逾期账户最大逾期月份数</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001D && rulesData.B001.B001D.D25">{{rulesData.B001.B001D.D25}}</td><td v-else>-</td>
                            <td class="fourth_col"></td><td class="fifth_col"></td>
                        </tr>
                       <!--     当前逾期信息    -->
                       <tr>
                           <td class="first_col" rowspan="6">当前逾期信息</td>
                           <td class="second_col">当前一共逾期期数</td><td  class="third_col">{{totalOverdue}}</td>
                           <td class="fourth_col">当前一共逾期总额</td><td class="fifth_col">{{totalOverdueNum}}</td>
                       </tr>
                       <tr>
                           <td class="second_col">当前贷记卡逾期机构数</td><td  class="third_col"  v-if="rulesData && rulesData.C001 && rulesData.C001.C001G && rulesData.C001.C001G.G12">{{rulesData.C001.C001G.G12}}</td><td v-else>-</td>
                           <td class="fourth_col">近24月贷记卡最大逾期期数</td><td class="fifth_col" v-if="rulesData && rulesData.C001 && rulesData.C001.C001G && rulesData.C001.C001G.G18">{{rulesData.C001.C001G.G18}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">最近24个月贷记卡最大连续逾期月份数</td><td  class="third_col" v-if="rulesData && rulesData.C001 && rulesData.C001.C001G && rulesData.C001.C001G.G18">{{rulesData.C001.C001G.G18}}</td><td v-else>-</td>
                           <td class="fourth_col"></td><td class="fifth_col"></td>
                       </tr>
                       <tr>
                           <td class="second_col">当前所有贷款账户最大逾期期数</td><td  class="third_col"  v-if="rulesData && rulesData.C001 && rulesData.C001.C001F && rulesData.C001.C001F.F18">{{rulesData.C001.C001F.F18}}</td><td v-else>-</td>
                           <td class="fourth_col">当前所有贷款账户最大逾期金额</td><td class="fifth_col" v-if="rulesData && rulesData.C001 && rulesData.C001.C001F && rulesData.C001.C001F.F19">{{rulesData?rulesData.C001.C001F.F19:'-'}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">当前贷款最大逾期期数对应的最大逾期金额</td><td  class="third_col" v-if="rulesData && rulesData.C001 && rulesData.C001.C001F && rulesData.C001.C001F.F20">{{rulesData.C001.C001F.F20}}</td><td v-else>-</td>
                           <td class="fourth_col">当前贷款逾期账户数总和</td><td class="fifth_col" v-if="rulesData && rulesData.C001 && rulesData.C001.C001F && rulesData.C001.C001F.F21">{{rulesData.C001.C001F.F21}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">当前贷款机构数量</td><td  class="third_col" v-if="rulesData && rulesData.C001 && rulesData.C001.C001F && rulesData.C001.C001F.F23">{{rulesData.C001.C001F.F23}}</td><td v-else>-</td>
                           <td class="fourth_col">当前贷款逾期机构数</td><td class="fifth_col" v-if="rulesData && rulesData.C001 && rulesData.C001.C001F && rulesData.C001.C001F.F24">{{rulesData.C001.C001F.F24}}</td><td v-else>-</td>
                       </tr>
                       <!--     信贷信息汇总    -->
                       <tr>
                           <td class="first_col" rowspan="11">信贷信息汇总</td>
                           <td class="second_col">贷记卡发卡机构数</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E1">{{rulesData.B001.B001E.E1}}</td><td v-else>-</td>
                           <td class="fourth_col">贷记卡授信总额</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E3">{{rulesData.B001.B001E.E3}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">贷记卡单家机构最高授信额</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E4">{{rulesData.B001.B001E.E4}}</td><td v-else>-</td>
                           <td class="fourth_col">贷记卡单家机构最低授信额</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E5">{{rulesData.B001.B001E.E5}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">贷记卡已用额度</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E6">{{rulesData?rulesData.B001.B001E.E6:'-'}}</td><td v-else>-</td>
                           <td class="fourth_col">贷记卡最近6个月平均使用额度</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E7">{{rulesData?rulesData.B001.B001E.E7:'-'}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">贷记卡账户使用率（已用额度/授信总额）</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001H && rulesData.B001.B001H.H5">{{rulesData.B001.B001H.H5}}</td><td v-else>-</td>
                           <td class="fourth_col"></td><td class="fifth_col"></td>
                       </tr>
                       <tr>
                           <td class="second_col">非循环贷账户管理机构数</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001H && rulesData.B001.B001H.H15">{{rulesData.B001.B001H.H15}}</td><td v-else>-</td>
                           <td class="fourth_col">非循环贷账户账户数</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E16">{{rulesData.B001.B001E.E16}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">非循环贷账户授信总额</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E17">{{rulesData?rulesData.B001.B001E.E17:'-'}}</td><td v-else>-</td>
                           <td class="fourth_col">非循环贷账户余额</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E18">{{rulesData?rulesData.B001.B001E.E18:'-'}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">非循环贷账户6月平均应还款</td><td  class="third_col"  v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E19">{{rulesData?rulesData.B001.B001E.E19:'-'}}</td><td v-else>-</td>
                           <td class="fourth_col">非循环贷账户使用率（已用额度/授信总额）</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001H && rulesData.B001.B001H.H2">{{rulesData?rulesData.B001.B001H.H2:'-'}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">循环贷账户管理机构数</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E25">{{rulesData?rulesData.B001.B001E.E25:'-'}}</td><td v-else>-</td>
                           <td class="fourth_col">循环贷账户账户数</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E26">{{rulesData?rulesData.B001.B001E.E26:'-'}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">循环贷账户授信总额</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E27">{{rulesData?rulesData.B001.B001E.E27:'-'}}</td><td v-else>-</td>
                           <td class="fourth_col">循环贷账户余额</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E28">{{rulesData?rulesData.B001.B001E.E28:'-'}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">循环贷账户6月平均应还款</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E29">{{rulesData?rulesData.B001.B001E.E29:'-'}}</td><td v-else>-</td>
                           <td class="fourth_col">循环贷账户使用率（已用额度/授信总额）</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001H && rulesData.B001.B001H.H4">{{rulesData?rulesData.B001.B001H.H4:'-'}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">相关还款责任总账户数</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E30">{{rulesData?rulesData.B001.B001E.E30:'-'}}</td><td v-else>-</td>
                           <td class="fourth_col">相关还款责任总担保余额</td><td class="fifth_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001E && rulesData.B001.B001E.E32">{{rulesData?rulesData.B001.B001E.E32:'-'}}</td><td v-else>-</td>
                       </tr>
                       <!--     查询记录    -->
                       <tr>
                           <td class="first_col" rowspan="4">查询记录</td>
                           <td class="second_col">近1月内的查询机构数-贷款审批</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001G && rulesData.B001.B001G.G1">{{rulesData?rulesData.B001.B001G.G1:'-'}}</td><td v-else>-</td>
                           <td class="fourth_col">近1月内的查询机构数-贷记卡审批</td><td class="fifth_col"   v-if="rulesData && rulesData.B001 && rulesData.B001.B001G && rulesData.B001.B001G.G2">{{rulesData?rulesData.B001.B001G.G2:'-'}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">近1月内的查询次数-贷款审批</td><td  class="third_col"  v-if="rulesData && rulesData.B001 && rulesData.B001.B001G && rulesData.B001.B001G.G3">{{rulesData?rulesData.B001.B001G.G3:'-'}}</td><td v-else>-</td>
                           <td class="fourth_col">近1月内的查询次数-贷记卡审批</td><td class="fifth_col"  v-if="rulesData && rulesData.B001 && rulesData.B001.B001G && rulesData.B001.B001G.G4">{{rulesData?rulesData.B001.B001G.G4:'-'}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">近3月查询次数贷款审批</td><td  class="third_col"  v-if="rulesData && rulesData.F001 && rulesData.F001.F001A && rulesData.F001.F001A.A9">{{rulesData?rulesData.F001.F001A.A9:'-'}}</td><td v-else>-</td>
                           <td class="fourth_col">近3月查询机构数贷款审批</td><td class="fifth_col" v-if="rulesData && rulesData.F001 && rulesData.F001.F001A && rulesData.F001.F001A.A15">{{rulesData?rulesData.F001.F001A.A15:'-'}}</td><td v-else>-</td>
                       </tr>
                       <tr>
                           <td class="second_col">近1月内的查询次数-本人查询</td><td  class="third_col" v-if="rulesData && rulesData.B001 && rulesData.B001.B001G && rulesData.B001.B001G.G5">{{rulesData?rulesData.B001.B001G.G5:'-'}}</td><td v-else>-</td>
                           <td class="fourth_col"></td><td class="fifth_col"></td>
                       </tr>


                        </tbody>
                    </table>
                </el-collapse-item>
<!--                <el-collapse-item title="征信评分卡" name="4">-->
<!--                    &lt;!&ndash; <div style="margin-top: 10px; margin-bottom: 30px; margin-top: 50px">征信评分卡</div> &ndash;&gt;-->
<!--                    &lt;!&ndash; <div style="margin-top: 5px; margin-bottom: 10px; margin-top: 10px; font-size: 14px">报告状态: {{ zx.reportStatus }}</div>-->
<!--            <div style="margin-top: 5px; margin-bottom: 10px; margin-top: 10px; font-size: 14px">报告生成日期： {{ zx.reportDate }}</div> &ndash;&gt;-->
<!--                    <div style="margin-top: 5px; margin-bottom: 10px; margin-top: 10px; font-size: 14px">评分: {{-->
<!--                        zxScoreCardDatas.totalScore }}</div>-->
<!--                    <div v-if="zx.reportStatus && zx.reportStatus !== '00' && zx.reportStatus !== ''"-->
<!--                        style="margin-top: 5px; margin-bottom: 10px; margin-top: 10px; font-size: 14px; color: red">-->
<!--                        准入建议: {{ zxScoreCardDatas.result }}-->
<!--                    </div>-->
<!--                    <el-table :data="zxScoreCardDatas.ruleVOs" border style="width: 50%;font-size: 14px">-->
<!--                        <el-table-column prop="name" label="评分指标" style="width: 25%"> </el-table-column>-->
<!--                        <el-table-column prop="socre" label="得分" style="width: 10%"> </el-table-column>-->
<!--                        <el-table-column prop="rawValue" label="实际值" style="width: 15%"> </el-table-column>-->
<!--                    </el-table>-->
<!--                </el-collapse-item>-->
<!--                <el-collapse-item title="征信其他字段" name="5">-->
<!--                    &lt;!&ndash; <div style="margin-top: 10px; margin-bottom: 30px; margin-top: 50px">征信其他字段</div> &ndash;&gt;-->
<!--                    <el-descriptions class="margin-top" :column="2" border style="width: 830px"-->
<!--                        :labelStyle="{ 'background': '#fff', 'color': '#333', 'font-weight': '420', 'font-size': '14px' }"-->
<!--                        :contentStyle="{ 'background': '#fff', 'color': '#333', 'width': '160px', 'font-size': '14px' }">-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">指标名称</template>-->
<!--                            具体值-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">指标名称</template>-->
<!--                            具体值-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">近6个月信用卡和贷款审批查询次数</template>-->
<!--                            {{ zxScoreCardDatas.queryTotal }}-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">最大信用卡额度</template>-->
<!--                            {{ zxScoreCardDatas.maxCreditLine }}-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">平均信用卡额度</template>-->
<!--                            {{ zxScoreCardDatas.avgCreditLine }}-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">信用卡额度使用率</template>-->
<!--                            {{ zxScoreCardDatas.quotaUtilizationRate }}-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">信用卡和贷款额度使用率</template>-->
<!--                            {{ zxScoreCardDatas.debitAndLoanQuotaUtilizationRate }}-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">信用卡最近两年逾期月份数</template>-->
<!--                            {{ zxScoreCardDatas.debitOverdueMonths }}-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">信用卡最近两年最高逾期金额</template>-->
<!--                            {{ zxScoreCardDatas.debitOverdueMaxAmount }}-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">贷款最近两年逾期月份数</template>-->
<!--                            {{ zxScoreCardDatas.loanOverdueMonths }}-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">贷款最近两年最高逾期金额</template>-->
<!--                            {{ zxScoreCardDatas.loanOverdueMaxAmount }}-->
<!--                        </el-descriptions-item>-->
<!--                        <el-descriptions-item>-->

<!--                            <template slot="label">近3个月信用卡和贷款审批查询次数</template>-->
<!--                            {{ zxScoreCardDatas.queryLatest3MTotal }}-->
<!--                        </el-descriptions-item>-->
<!--                    </el-descriptions>-->
<!--                </el-collapse-item>-->
                <el-collapse-item title="浦发风控模型" name="6" v-if="['55', '9'].includes($route.query.lenderId)">
                    <div style="width: 100%;overflow: hidden;margin-bottom: 15px;"><el-button type="primary"
                            @click="dialogVisible = true" style="width: 100px;float: left;">修改</el-button>
                    </div>
                    <el-descriptions class="margin-top" :column="1" border style="width: 830px"
                        :labelStyle="{ 'background': '#fff', 'color': '#333', 'font-weight': '420', 'font-size': '14px' }"
                        :contentStyle="{ 'background': '#fff', 'color': '#333', 'width': '160px', 'font-size': '14px' }">
                        <el-descriptions-item>
                            <template slot="label">评分等级</template>
                            {{ ruleForm.modelScoreLevel ? ruleForm.modelScoreLevel : '-' }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">结果评分</template>
                            {{ ruleForm.modelScore ? ruleForm.modelScore : '0' }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">授信额度</template>
                            {{ ruleForm.creditAmount ? ruleForm.creditAmount : '0' }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">调整后的授信额度</template>
                            {{ ruleForm.modelCreditAmount ? ruleForm.modelCreditAmount : '0' }}
                        </el-descriptions-item>
                    </el-descriptions>
                </el-collapse-item>
            </el-collapse>
        </el-card>
        <el-dialog title="" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div style="width: 80%;">
                    <el-form-item label="评分等级" prop="modelScoreLevel">
                        <el-select v-model="ruleForm.modelScoreLevel" style="width: 100%;" placeholder="请选择">
                            <el-option v-for="item in options" :key="item" :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="修改原因" prop="reason">
                        <el-input v-model="ruleForm.reason" type="textarea" :rows="2"></el-input>
                    </el-form-item>
                    <div style="width: 100%;overflow: hidden;margin-bottom: 15px;"><el-button type="primary"
                            @click="submitForm('ruleForm')" style="width: 120px;float: right;">修改</el-button>
                    </div>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {
    getHf,
    getZBX,
    zxAccessRule,
    zxScoreCard,
    getBaiRong,
    getAll,
    getBW,
    getQCC,
    checkBW,
    checkQCC,
    getPfRiskModelDetail,
    updatePfRiskModel,
    getHrzxData
} from '../../../api/index';
export default {
    props: {
        businessLicense: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isBw: true,
            isQCC: true,
            baiWei: {},
            equityPledge: true,
            shiXin: true,
            zhiXing: true,
            adminPenalty: true,
            exception: true,
            chattelMortgage: true,
            liquidation: true,
            seriousIllegal: true,
            equityFreeze: true,
            judicialSale: true,
            bankruptcy: true,
            sumptuary: true,
            envPunishment: true,
            taxOweNotice: true,
            taxIllegal: true,
            qiChaCha: {},
            isOver: false,
            reportStatus: '',
            suggestion: '',
            activeNames: ['1', '2', '3', '4', '5', '6'],
            hfdata: {},
            zbx: {
                mcntPartnerV4LoanAll30day: 0,
                mcntPartnerV4LoanAll90day: 0,
                mcntPartnerV4LoanAll180day: 0,
                mcntPartnerV4LoanAll365day: 0,
                mcntPartnerV4LoanBank30day: 0,
                mcntPartnerV4LoanBank90day: 0,
                mcntPartnerV4LoanBank180day: 0,
                mcntPartnerV4LoanBank365day: 0,
                mcntPartnerV4LoanImbank30day: 0,
                mcntPartnerV4LoanImbank90day: 0,
                mcntPartnerV4LoanImbank180day: 0,
                mcntPartnerV4LoanImbank365day: 0,
                mcntPartnerV4LoanLoanassistplat30day: 0,
                mcntPartnerV4LoanLoanassistplat90day: 0,
                mcntPartnerV4LoanLoanassistplat180day: 0,
                mcntPartnerV4LoanLoanassistplat365day: 0,
                mcntPartnerV4LoanTopnet30day: 0,
                mcntPartnerV4LoanTopnet90day: 0,
                mcntPartnerV4LoanTopnet180day: 0,
                mcntPartnerV4LoanTopnet365day: 0
            },
            zx: {
                accessInfoVOS: [],
                reportDate: '',
                reportStatus: '',
                result: ''
            },
            zxScoreCardDatas: {
                ruleVOs: [],
                reportDate: '',
                reportStatus: '',
                totalScore: '',
                queryTotal: '',
                maxCreditLine: '',
                avgCreditLine: '',
                quotaUtilizationRate: '',
                result: '',
                baseScore: '',
                debitAndLoanQuotaUtilizationRate: '',
                debitOverdueMonths: '',
                debitOverdueMaxAmount: '',
                loanOverdueMonths: '',
                loanOverdueMaxAmount: ''
            },
            // baiRong: {
            baiRongTable: [],
            temp: [],
            riskBaiRongTable: [
                { name: '欺诈团伙等级', desc: '取值为3-10，数值越大风险越高,6-7级表示有一定的风险，需要重点关注;8级及以上风险较高，建议拒绝' },
                {
                    name: '欺诈团伙群组规模', desc: '团伙规模越小，风险越大'
                }
            ],
            apiTypeList: {
                'ApplyEvaluate': '借贷意向验证3.0',
                'ApplyLoanStr': '借贷意向验证',
                'FraudRelation_g': '团伙欺诈排查（通用版)',
                'SpecialList_c': '特殊名单验证',
                'scoreafysbase': '融御云商分-基础款',
                'scorepdl': '信用风险识别-线上小额现金贷',
                'scorerevoloan': '信用风险识别-信用卡（类信用卡）',
                'scoreylbase': '融安云联分-基础款',
                'scoreyxbase': '融安云信分-基础款',
            },
            ruleForm: {
                id: '',
                modelScoreLevel: '',
                modelScore: '',
                creditAmount: '',
                reason: '',
                modelCreditAmount:''
            },
            rules: {
                modelScoreLevel: [
                    { required: true, message: '请输入评分等级', trigger: 'blur' },
                ],
                reason: [
                    { required: true, message: '请输入修改原因', trigger: 'blur' },
                ],
            },
            dialogVisible: false,
            options:[
                'A',
                'B',
                'C',
                'D',
                'E',
            ],
            originModelScoreLevel:"",
            rulesData:null,
        //     新版征信信息映射
            //婚姻状况
            A001A_A1:{
                "10":"未婚",
                "20":"已婚",
                "30":"丧偶",
                "40":"离婚",
                "91":"单身",
                "99":"未知",
            },
            //学历
            A001A_A2:{
                '10':'研究生',
                '20':'本科',
                '30':'大专',
                '40':'中专、职高、技校',
                '60':'高中',
                '90':'其他',
                '91':'初中及以下',
                '99':'未知'
            },

        };
    },
    computed: {
        maritalStatus() {
            if(this.rulesData){
                const status = this.rulesData.A001.A001A.A1;
                return this.A001A_A1[status] || '-';
            } else  return '-'
        },
        educationLevel() {
            if(this.rulesData){
                const level = this.rulesData.A001.A001A.A2;
                return this.A001A_A2[level] || '-';
            } else  return '-'
        },
        totalOverdue() {
            const E4 =Number(this.getSafeValue(this.rulesData, 'C001', 'C001E', 'E4') || 0);
            const D4 =Number(this.getSafeValue(this.rulesData, 'C001', 'C001D', 'D4') || 0);
            const C4 = Number(this.getSafeValue(this.rulesData, 'C001', 'C001C', 'C4') || 0);
            return E4 + D4 + C4;
        },
        totalOverdueNum() {
            const E5 =Number(this.getSafeValue(this.rulesData, 'C001', 'C001E', 'E5') || 0);
            const D5 =Number(this.getSafeValue(this.rulesData, 'C001', 'C001D', 'D5') || 0);
            const C5 = Number(this.getSafeValue(this.rulesData, 'C001', 'C001C', 'C5') || 0);
            return E5 + D5 + C5;
        },
        filteredList() {
            if (this.zx.accessInfoVOS && this.zx.accessInfoVOS.length > 0) {
                return this.zx.accessInfoVOS.filter((item) => item.result == '命中');
            }
        }
    },
    mounted() {
        // if (this.$route.query.lenderId == 9 || this.$route.query.lenderId == 57 || this.$route.query.lenderId == 55 || this.$route.query.lenderId == 59) {
        //     this.isOver = true
        //     getAll({ id: localStorage.getItem('bCardId'), cell: localStorage.getItem('bPhoneNumber'), name: localStorage.getItem('bName') }).then(res => {
        //         this.getBaiRong()
        //     }).catch(err => {
        //         this.isOver = false
        //     })
        // }
        // getHf(this.$route.query.loanNumber).then((res) => {
        //     this.hfdata = res.data;
        // });
        // getZBX(this.businessLicense).then((res) => {
        //     if (res.data) {
        //         Object.keys(res.data).forEach((key) => {
        //             res.data[key] = Number(res.data[key]) < 0 ? '未查询到' : res.data[key];
        //         });
        //         this.zbx = res.data;
        //     }
        // });
        this.getNewCredit()

        zxScoreCard({
            applicationCode: this.$route.query.loanNumber
        }).then((res) => {
            if (res.data) {
                this.zxScoreCardDatas = res.data;
                if (this.zxScoreCardDatas.totalScore) {
                    this.zxScoreCardDatas.totalScore = Number(this.zxScoreCardDatas.totalScore) + Number(this.zxScoreCardDatas.baseScore);
                    if (Number(this.zxScoreCardDatas.totalScore) > Number(this.zxScoreCardDatas.baseScore)) {
                        this.zxScoreCardDatas.result = '准入';
                    } else {
                        this.zxScoreCardDatas.result = '不准入';
                    }
                }
            }
        });
        // this.checkBW()
        // this.checkQCC()
        // 根据申请单号获取浦发风控模型详情
        this.getPfRiskModelDetail()
    },
    created() {
        // this.getNewCredit()
    },
    methods: {

        async   getNewCredit(){
         const code =   this.$route.query.loanNumber
         await   getHrzxData({applicationCode:code}).then((res) => {
             if(res.data) {
                 let data = res.data.data.rules||null;
                 this.rulesData = data
             }
            })
            zxAccessRule({
                applicationCode: this.$route.query.loanNumber
            }).then((res) => {
                if (res.data) {
                    this.zx = res.data;
                    if(this.rulesData==null){
                        this.zx.reportStatus = '暂无征信报告数据';
                    }
                    else if (this.zx.reportStatus === '00') {
                        this.zx.reportStatus = '暂无征信报告数据';
                    } else if (this.zx.reportStatus === '01') {
                        this.zx.reportStatus = '正常报告';
                    } else if (this.zx.reportStatus === '02') {
                        this.zx.reportStatus = '白户';
                    } else if (this.zx.reportStatus === '03') {
                        this.zx.reportStatus = '正常报告(只有被查询人信息跟查询记录)';
                    }

                    if (this.zx.result == true) {
                        this.zx.result = '准入';
                    } else if (this.zx.result == false) {
                        this.zx.result = '不准入';
                    }

                    if (this.zx.accessInfoVOS && this.zx.accessInfoVOS.length > 0) {
                        this.zx.accessInfoVOS.forEach((item) => {
                            if (item.result == true) {
                                item.result = '命中';
                            } else if (item.result == false) {
                                item.result = '未命中';
                            }
                        });
                    }
                }
            });
        },
        getSafeValue(obj, ...keys) {
            let current = obj;
            for (let key of keys) {
                if (current === null || current === undefined || typeof current !== 'object') {
                    return undefined;
                }
                current = current[key];
            }
            return current;
        },
        handleClose() {
            this.dialogVisible = false
            this.ruleForm.modelScoreLevel = this.originModelScoreLevel
            this.ruleForm.reason = ''
        },
        // 根据申请单号获取浦发风控模型详情
        getPfRiskModelDetail() {
            if (['55', '9'].includes(this.$route.query.lenderId)) {
                getPfRiskModelDetail({
                    applicationCode: this.$route.query.loanNumber
                }).then(res => {
                    this.ruleForm = Object.assign(this.ruleForm, res.data)
                    this.originModelScoreLevel = res.data.modelScoreLevel || ''
                    this.handleClose()
                    console.log("🚀 ~ getPfRiskModelDetail ~ res:", res)
                })
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loadingDia = true
                    updatePfRiskModel({
                        id: this.ruleForm.id,
                        applicationCode: this.$route.query.loanNumber,
                        modelScoreLevel: this.ruleForm.modelScoreLevel,
                        reason: this.ruleForm.reason,
                    }).then(res => {
                        this.loadingDia = false
                        // 根据申请单号获取浦发风控模型详情
                        this.getPfRiskModelDetail()
                    })
                } else {
                    return false;
                }
            });
        },
        closeContent(name) {
            this[name] = false
            if (this.$refs[name]) {
                this.$refs[name].$el.style.display = 'none'
            } else {

                let dow = document.getElementById(name)
                dow.style.display = 'none'
            }

        },
        //打开抽屉
        openContent(name) {
            this[name] = true
            if (this.$refs[name]) {
                this.$refs[name].$el.style.display = 'block'
            } else {
                let dow = document.getElementById(name)
                dow.style.display = 'block'
            }
        },
        getAllData() {
            getAll({ id: localStorage.getItem('bCardId'), cell: localStorage.getItem('bPhoneNumber'), name: localStorage.getItem('bName') }).then(res => {
                this.isOver = true
                this.getBaiRong()
            }).catch(err => {
                this.isOver = false
            })

        },
        getBaiRong() {
            getBaiRong({ idCard: localStorage.getItem('bCardId'), phone: localStorage.getItem('bPhoneNumber'), name: localStorage.getItem('bName') }).then(res => {

                this.temp = (res.data.filter(item => item.apiType == 'FraudRelation_g'))
                if (this.temp[0].responseCode == '00' || this.temp[0].responseCode == '100002') {
                    this.reportStatus = '正常报告'
                } else {
                    this.reportStatus = '异常报告'
                }
                if (this.temp[0].frgGroupNum == 'a') {
                    this.temp[0].frgGroupNum = '1-50人'
                } else if (this.temp[0].frgGroupNum == 'b') {
                    this.temp[0].frgGroupNum = '50-100人'
                } else if (this.temp[0].frgGroupNum == 'c') {
                    this.temp[0].frgGroupNum = '100-500人'
                } else if (this.temp[0].frgGroupNum == 'd') {
                    this.temp[0].frgGroupNum = '500+人'
                }
                if (this.temp[0].frgListLevel <= 5 && this.temp[0].frgListLevel >= 3) {
                    this.suggestion = '风险较低'
                } else if (this.temp[0].frgListLevel <= 7 && this.temp[0].frgListLevel > 5) {
                    this.suggestion = '风险一般'
                } else if (this.temp[0].frgListLevel >= 8) {
                    this.suggestion = '高风险'
                } else if (this.temp[0].frgListLevel < 3) {
                    this.suggestion = '未命中'
                }
                this.$set(this.riskBaiRongTable[0], 'score', this.temp[0].frgListLevel ? this.temp[0].frgListLevel : 'NA')
                this.$set(this.riskBaiRongTable[1], 'score', this.temp[0].frgGroupNum ? this.temp[0].frgGroupNum : 'NA')
                res.data = res.data.filter(item => {
                    return item.apiType == 'scoreafysbase' || item.apiType == 'scorepdl' || item.apiType == 'scorerevoloan' || item.apiType == 'scoreylbase'
                        || item.apiType == 'scoreyxbase'
                })
                res.data.forEach(item => {
                    if (item.apiType == 'scorerevoloan' || item.apiType == 'scorepdl') {
                        item.desc = '取值范围300-1000，分数越高，代表客户偿还能力越高，违约概率越小'
                    }
                    if (item.apiType == 'scoreafysbase') {
                        item.desc = '取值范围0-100，分数越高违约概率越高'
                    }
                    if (item.apiType == 'scoreylbase' || item.apiType == 'scoreyxbase') {
                        item.desc = '取值范围300-1000，分数越高违约概率越低'
                    }
                    item.apiType = this.apiTypeList[item.apiType]
                })
                this.baiRongTable = res.data;
                this.isOver = false
            }).catch(err => {
                this.isOver = false
            })
        },
        getBW() {
            this.isOver = true
            let obj = {}
            obj.creditNo = localStorage.getItem("bcCreditcode")
            obj.name = localStorage.getItem("bName")
            obj.phone = localStorage.getItem('bPhoneNumber')
            obj.idCard = localStorage.getItem("bCardId")
            obj.companyName = localStorage.getItem("bcName")
            obj.creditAmount = this.$route.query.creditAmount * 10000
            getBW(obj).then(res => {
                res.data.bWD = res.data.reasonCode.reduce((accumulator, currentValue) => {
                    const newObj = {
                        reasonCode: currentValue,
                        reasonMsg: res.data.reasonMsg[res.data.reasonCode.indexOf(currentValue)]
                    };
                    return accumulator.concat(newObj);
                }, []);
                this.baiWei = res.data
                this.isBw = false
                this.isOver = false

            }).catch(err => {
                this.isOver = false

            })
        },
        checkBW() {
            this.isOver = true
            let obj = {}
            obj.creditNo = localStorage.getItem("bcCreditcode")
            obj.name = localStorage.getItem("bName")
            obj.phone = localStorage.getItem('bPhoneNumber')
            obj.idCard = localStorage.getItem("bCardId")
            obj.companyName = localStorage.getItem("bcName")
            obj.creditAmount = this.$route.query.creditAmount * 10000
            checkBW(obj).then(res => {
                if (res.data.reasonCode) {
                    res.data.bWD = res.data.reasonCode.reduce((accumulator, currentValue) => {
                        const newObj = {
                            reasonCode: currentValue,
                            reasonMsg: res.data.reasonMsg[res.data.reasonCode.indexOf(currentValue)]
                        };
                        return accumulator.concat(newObj);
                    }, []);
                    this.baiWei = res.data
                    this.isBw = false

                }
                this.isOver = false
            }).catch(err => {
                this.isOver = false
            })
        },
        //检查企查查
        checkQCC() {
            this.isOver = true
            getQCC({
                searchKey: localStorage.getItem("bcCreditcode")
                // searchKey: '91440300MA5FMRFK2D'
            }).then(res => {
                if (Object.keys(res.data).length) {
                    if (res.data.equityPledge) {
                        res.data.equityPledge.dataList.forEach(item => {

                            item.pledgeeList ? item.pledgeeList.join(',') : '--'
                            item.pledgorList ? item.pledgorList.join(',') : '--'

                        })
                    }
                    if (res.data.chattelMortgage) {
                        res.data.chattelMortgage.dataList.forEach(item => {
                            item.pledger ? item.pledger.join(',') : '--',
                                item.pledgee ? item.pledgee.join(',') : '--'
                        })
                    }
                    if (res.data.bankruptcy) {
                        item.applicantList ? item.applicantList.join(',') : '--',
                            item.respondentList ? item.respondentList.join(',') : '--'
                    }
                    this.qiChaCha = res.data

                    this.isQCC = false
                }
                this.isOver = false
            }).catch(err => {
                this.isOver = false
            })
        },
        getQCC() {
            this.isOver = true
            checkQCC({
                searchKey: localStorage.getItem("bcCreditcode")
                // searchKey: '91440300MA5FMRFK2D'
            }).then(res => {
                if (Object.keys(res.data).length) {
                    if (res.data.equityPledge) {
                        res.data.equityPledge.dataList.forEach(item => {

                            item.pledgeeList ? item.pledgeeList.join(',') : '--'
                            item.pledgorList ? item.pledgorList.join(',') : '--'

                        })
                    }
                    if (res.data.chattelMortgage) {
                        res.data.chattelMortgage.dataList.forEach(item => {
                            item.pledger ? item.pledger.join(',') : '--',
                                item.pledgee ? item.pledgee.join(',') : '--'
                        })
                    }
                    if (res.data.bankruptcy) {
                        item.applicantList ? item.applicantList.join(',') : '--',
                            item.respondentList ? item.respondentList.join(',') : '--'
                    }
                    this.qiChaCha = res.data
                    this.isQCC = false
                }
                this.isOver = false
            }).catch(err => {
                this.isOver = false
            })
        }
    }
};
</script>

<style lang="less">
.hf-btn {
    margin-right: 20px;
    margin-bottom: 20px;
    display: inline-block;
    padding: 8px 15px;
    border: 1px solid #fde2e2;
    border-radius: 3px;
    background-color: #fef0f0;
    font-size: 14px;
    color: #fe1964;
}

/deep/.el-button {
    // margin-left: 0 !important;
}

.qichacha {
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
    display: flex;
    gap: 30px;
    align-items: center
}
.new_credit_table{
    .first_col{
        width: 120px;
    }
    .second_col{
        width: 230px;
    }
    .third_col{
        width: 230px;
    }
    .fourth_col{
        width: 230px;
    }
    .fifth_col{
        width: 230px;
    }
    th, td {
        font-size: 14px;
        color: #333;
        border: 1px solid #ebeef5;
        padding: 8px;
        text-align: left;
    }
    th {
        background-color: #f2f2f2;
    }
}
</style>