<template>
    <div
        style="padding-top:24px;padding-left:24px;padding-right:24px; background-color: #fff;padding-bottom:6px;border-radius:20px">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item :label="item.label" v-for="item in filterOptions" :key="item.label">
                <div style="padding:0 24px">
                    <el-input v-model="item.value" :placeholder="item.placeholder" v-if="item.type === 'input'"
                        style="border-radius:8px" />
                    <el-select style="border-radius:8px" clearable v-model="item.value" :placeholder="item.placeholder"
                        :filterable="item.filterable" @focus="onItemFocus($event, item)"
                        @change="onItemChange($event, item)" v-if="item.type === 'select'">
                        <el-option v-for="options in item.options" :key="options.value" :label="options.label"
                            :value="options.value" />
                    </el-select>
                    <el-cascader :clearable="item.clearable" :placeholder="item.placeholder" v-model="item.value"
                        :options="item.options" @change="onItemCascader($event, item)"
                        v-if="item.type === 'cascader'"></el-cascader>
                    <el-date-picker style="border-radius:8px" :clearable="false" v-model="item.value" type="year"
                        :value-format='item.valueFormat ? item.valueFormat : "yyyy"' :placeholder="item.placeholder"
                        v-if="item.type === 'year'" />
                    <el-date-picker style="border-radius:8px" :clearable="false" v-model="item.value" type="date"
                        :value-format='item.valueFormat ? item.valueFormat : "yyyy-MM-dd"'
                        :placeholder="item.placeholder" v-if="item.type === 'date'" />
                    <el-date-picker style="border-radius:8px" :clearable="false" v-model="item.value" type="month"
                        :value-format='item.valueFormat ? item.valueFormat : "yyyy-MM"' :placeholder="item.placeholder"
                        v-if="item.type === 'month'" />
                    <el-date-picker style="border-radius:8px" :clearable="false" v-model="item.value" type="daterange"
                        range-separator="—" :value-format='item.valueFormat ? item.valueFormat : "yyyy-MM-dd"'
                        :start-placeholder="item.placeholderArr ? item.placeholderArr[0] : '开始时间'"
                        :end-placeholder="item.placeholderArr ? item.placeholderArr[1] : '结束时间'"
                        v-if="item.type === 'daterange'" />
                    <el-date-picker style="border-radius:8px" v-model="item.value" :clearable="false"
                        type="datetimerange" range-separator="—"
                        :value-format='item.valueFormat ? item.valueFormat : "yyyy-MM-dd HH:mm:ss"'
                        :start-placeholder="item.placeholderArr ? item.placeholderArr[0] : '开始时间'"
                        :end-placeholder="item.placeholderArr ? item.placeholderArr[1] : '结束时间'"
                        v-if="item.type === 'datetimerange'" />
                </div>
            </el-form-item>
            <el-form-item>
                <div style="padding-left:24px">
                    <el-button type="primary" @click="onFilter">{{ $t('home_cx') }}</el-button>
                    <el-button  @click="onReset">{{ $t('home_cz') }}</el-button>
                    <el-button class="create-btn" v-if="createBtn" @click="onCreate">{{ $t('home_xj') }}</el-button>
                    <el-button type="primary" class="limitAllocation" v-if="limitAllocation" @click="onLimit">额度管理-权限配置</el-button>
                    <el-button type="primary" v-if="dealAllBtn" @click="onDealAll">批量处理</el-button>
                    <el-button type="primary" @click="onExport" v-if="exportBtn">{{ $t('home_export') }}</el-button>
                    <el-button type='primary' @click='onALGVerify'
                        v-if="$showBtn('ALG_VERIFY') && ALGVerify">ALG核额计算</el-button>
                    <el-button type='primary' @click='onYuShangVerify'
                        v-if="$showBtn('YuShang_Verify') && YuShangVerify">宇商核额计算</el-button>
                    <!-- $showBtn('YUSHANG_VERIFY') && -->
                    <el-button type='primary' @click='onUCSVerify'
                        v-if="$showBtn('UCS_Verify') && UCSVerify">DCL核额计算</el-button>
                    <el-button type="primary" @click="_sendEmail('ORIGINAL')"
                        v-if="$showBtn('3pl_lkl') && sendEmail">原始数据</el-button>
                    <el-button type="primary" @click="_sendEmail('WF')"
                        v-if="$showBtn('3pl_wf') && sendEmail">WF模板</el-button>
                    <el-button type="primary" @click="_sendEmail('LKL')"
                        v-if="$showBtn('3pl_lkl') && sendEmail">拉卡拉模板</el-button>
                    <el-button type="primary" @click="onHfDataExport"
                        v-if="$showBtn('hf_data_export') && hfDataExport">汇丰（中国）模板</el-button>
                    <el-button type="primary" @click="onHKHfDataExport"
                        v-if="$showBtn('hk_hf_data_export') && hkhfDataExport">汇丰（香港）模板</el-button>
                    <el-button type="primary" @click="onZhaDaDataExport"
                               v-if="zhadaDataExport">渣打模板</el-button>
                    <el-button type="primary" @click="getphone()"
                        v-if="$showBtn('piliangdaochu') && hkhfDataExport">批量导出汇丰（香港）</el-button>
                    <el-button type="primary" @click="_untie"
                        v-if="$showBtn('hk_hf_data_export') && hkhfDataExport">批量解绑</el-button>
                    <el-button type="primary" @click="onExportByUser"
                        v-if="$showBtn('hk_hf_data_export') && hkhfDataExport">Excel导出</el-button>
                </div>
            </el-form-item>
        </el-form>
        <!-- 批量导出汇丰（香港）弹出框 -->
        <el-dialog title="" :visible.sync="dialogVisible" width="35%" top="40vh" :show-close=false>
            <span>请输入手机号</span>
            <el-input type="textarea" :rows="2" :placeholder="$t('loan_detail_qsrnr')" v-model="phonelist"
                style="margin-top: 10px;">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="goPiliangdaochu">确 定</el-button>

            </span>
        </el-dialog>
    </div>
</template>

<script>
import { calculation } from '../../api/boss1.js'
export default {
    name: 'filter-header',
    data() {
        return {
            phonelist: "",
            dialogVisible: false
        };
    },
    props: {
        exportBtn: {
            type: Boolean,
            default: false
        },
        createBtn: {
            type: Boolean,
            default: false
        },
        limitAllocation:{
            type: Boolean,
            default: false
        },
        dealAllBtn:{
            type: Boolean,
            default: false
        },
        sendEmail: {
            type: Boolean,
            default: false
        },
        ALGVerify: {
            type: Boolean,
            default: false
        },
        YuShangVerify: {
            type: Boolean,
            default: false
        },
        UCSVerify: {
            type: Boolean,
            default: false
        },
        hfDataExport: {
            type: Boolean,
            default: false
        },
        hkhfDataExport: {
            type: Boolean,
            default: false
        },
        zhadaDataExport:{
            type: Boolean,
            default: false
        },
        huiFengPiliangdaochu: {
            type: Boolean,
            default: false
        },
        filterOptions: Array
    },
    components: {},
    mounted() { },
    methods: {
        goPiliangdaochu() {

            let that = this;
            const axios = require('axios');
            console.log("this.phonelist", this.phonelist)
            console.log("this.phonelist", typeof (this.phonelist))
            var str = this.phonelist
            console.log("str", str)
            var newstr = str.split(",")
            console.log("newstr", newstr)
            this.phonelist = newstr
            axios({
                method: 'post',
                data: this.phonelist,
                responseType: 'blob',
                url: `${process.env.VUE_APP_BASE_URL}/lending/offer/lender/data/export/hkhf2`,
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(function (res) {
                var blob = new Blob([res.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                var downloadElement = document.createElement('a');
                var href = window.URL.createObjectURL(blob);
                downloadElement.href = href;
                downloadElement.download = `report.xlsx`;
                document.body.appendChild(downloadElement);
                downloadElement.click();
                document.body.removeChild(downloadElement);
                window.URL.revokeObjectURL(href);
                that.isExporting = false;
            })
                .catch((error) => {
                    this.$message.info(error.message);
                });
        },
        // handleClose(done) {
        //     this.$confirm('确认关闭？')
        //         .then(_ => {
        //             done();
        //         })
        //         .catch(_ => { });
        // },
        getphone() {
            this.dialogVisible = true
        },
        _sendEmail(type) {
            this.$emit('_sendEmail', type);
        },
        _untie() {
            this.$emit('_untie');
        },
        onExport() {
            this.$emit('onExport');
        },
        onFilter() {
            this.$emit('filter');
        },
        onReset() {
            this.$emit('reset');
        },
        onCreate(){
            this.$emit('create');
        },
        onLimit(){
            this.$emit('limit');
        },
        onDealAll(){
            this.$emit('dealAll');
        },
        onItemChange(val, prop) {
            this.$emit('item-change', val, prop);
        },
        onItemCascader(val, prop) {
            this.$emit('item-cascader', val, prop);
        },
        onItemFocus(val, prop) {
            this.$emit('item-focus', val, prop);
        },
        onALGVerify() {
            this.$emit('onALGVerify')
        },
        onYuShangVerify() {
            this.$emit('onYuShangVerify')
        },
        onUCSVerify() {
            this.$emit('onUCSVerify')
        },
        onHfDataExport() {
            this.$emit('onHfDataExport')
        },
        onHKHfDataExport() {
            this.$emit('onHKHfDataExport')
        },
        onZhaDaDataExport() {
            this.$emit('onZhaDaDataExport')
        },
        onExportByUser() {
            this.$emit('onExportByUser')
        }
    }
};
</script>

<style lang='less' scoped>
/deep/ .el-form-item .el-form-item--small {
    padding: 0 24rpx !important;
}

/deep/ .el-input--small .el-input__inner {
    width: 260px;
}
</style>