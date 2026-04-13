<template>
    <div class="order" style="border-radius: 20px; background: #fff; margin-bottom: 20px">
        <filter-header
            v-if="filterOptions && filterOptions.length"
            :filterOptions="filterOptions"
            @item-change="onFilterItemChange"
            @item-cascader="onFilterItemCascader"
            @item-focus="onFilterItemFocus"
            @filter="onConditionalQuery"
            @reset="onConditionalReset"
            @create="onConditionalCreate"
            @limit="onConditionalLimit"
            @dealAll="onConditionalDealAll"
            :exportBtn="exportBtn"
            @onExport="onExportF"
            :sendEmail="sendEmail"
            @_sendEmail="_sendEmail"
            @_untie="_untie"
            :ALGVerify="ALGVerify"
            :createBtn="createBtn"
            :limitAllocation="limitAllocation"
            :deal-all-btn="dealAllBtn"
            :YuShangVerify="YuShangVerify"
            :UCSVerify="UCSVerify"
            @onALGVerify="onALGVerify"
            @onYuShangVerify="onYuShangVerify"
            @onUCSVerify="onUCSVerify"
            :hfDataExport="hfDataExport"
            @onHfDataExport="onHfDataExport"
            :hkhfDataExport="hkhfDataExport"
            :zhadaDataExport="zhadaDataExport"
            @onZhaDaDataExport="onZhaDaDataExport"
            :huiFengPiliangdaochu="huiFengPiliangdaochu"
            @onHKHfDataExport="onHKHfDataExport"
            @onExportByUser="onExportByUser"
            v-loading="loading"
        />
        <el-row type="flex" justify="start" class="order-operate">
            <el-date-picker
                v-if="isExport2"
                v-model="dates"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :clearable="true"
                @change="changeTime"
            ></el-date-picker>
            <el-select style="margin-left: 20px" @change="changeLender" placeholder="请选择资金方" v-if="isExport2" v-model="lenderId">
                <el-option label="全部" value="全部"></el-option>
                <div v-for="item in lenderOptions" :key="item.value">
                    <el-option :key="item.value" :label="item.lenderName" :value="item.id"></el-option>
                </div>
            </el-select>
            <el-select style="margin-left: 20px" @change="changeProducts" v-model="productId" placeholder="请选择产品" v-if="isExport2">
                <div v-for="item in productsOptions" :key="item.value">
                    <el-option :label="item.productName" :value="item.id"></el-option>
                    <!-- v-if="(item.productName&&item.productName.includes('浦发') && !item.productName.includes('浦发线下')) || item.productName.includes('广发')|| item.productName.includes('飞鱼')" -->
                </div>
            </el-select>
            <el-button
                :loading="isExporting"
                type="primary"
                @click="onExport"
                v-if="isExport2"
                style="margin: 0 20px"
                icon="el-icon-printer"
                >导出
            </el-button>
            <el-select @change="changeLender" v-model="lenderId" placeholder="请选择资金方" v-if="isExport">
                <el-option v-for="item in lenderOptions" :key="item.value" :label="item.lenderName" :value="item.id"></el-option>
            </el-select>
            <el-button
                :loading="isExporting"
                type="primary"
                @click="onExport"
                v-if="isExport"
                style="margin-left: 20px"
                icon="el-icon-printer"
                >导出
            </el-button>
            <el-button
                type="primary"
                @click="refreshRedis"
                v-if="isExport"
                style="margin-left: 5px; margin-right: 20px"
                icon="el-icon-refresh-right"
                :loading="isRefresh"
                >手动刷新
            </el-button>

            <el-button
                :loading="isExporting"
                type="primary"
                @click="onExport"
                v-if="isExport3"
                style="margin-left: 20px"
                icon="el-icon-printer"
                >导出
            </el-button>

            <div v-if="shuaxin">
                <el-button type="primary" @click="tohelp" icon="el-icon-refresh" style="margin-right: 10px">刷新全部用户 </el-button>
                <el-button type="primary" @click="tohelp2" style="margin-right: 10px" icon="el-icon-search">查询待还款用户 </el-button>
                <el-button type="primary" @click="onExportF" style="margin-right: 25px" :loading="isExporting" icon="el-icon-printer"
                    >导出
                </el-button>
            </div>
            <!-- <el-button type="primary" @click="onAdd" v-if="isNeedBtn('add')">添加</el-button>
            <el-button type="primary" @click="onAdd" v-if="isNeedBtn('addColumn')">新增一行</el-button>-->
        </el-row>
        <div style="background: #fff; height: 20px; width: 100%"></div>
        <div style="padding: 0 24px; background-color: #fff">
            <slot></slot>
            <x-table
                v-loading="loading"
                ref="multipleTable"
                :filterStatus="filterStatus"
                @changeSelects="changeSelects"
                @changeStatus="changeStatus"
                :applicationStatus="applicationStatus"
                :showFilterRadio="showFilterRadio"
                @cliRow="cliRow"
                @visibleChange="visibleChange"
                :seedId="seedId"
                @showImageList="showImageList"
                :isShowSelection="isShowSelection"
                :isShowIndex="isShowIndex"
                :showSelect="showSelect2"
                :columns="columns"
                @select="_select"
                :tableData="tableData"
                :defaultSelectedRows="selectedRows"
                @cliLink="cliLink"
                @changeel="changel"
                @edit="onItemEdit"
                @filter="onColumnsFilter"
                @cellChange="onCellChange"
                @handleCellFocus="handleCellFocus"
                :detailTable="detailTable"
                @clickCell="clickCell"
            />
        </div>
        <div
            style="
                padding-bottom: 24px;
                background-color: #fff;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: end;
                padding-left: 24px;
                flex-direction: row-reverse;
            "
        >
            <el-row v-if="showPagination" type="flex" justify="end" class="pagination-wrap">
                <!-- <el-button type="primary">批量操作</el-button> -->
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page.sync="currentPage"
                    :total="totalSize"
                    @current-change="onPageChange"
                />
            </el-row>
            <div v-if="showCount && shopCount" style="font-size: 18px; font-weight: 500">总计店铺数量：{{ shopCount }}</div>
        </div>
    </div>
</template>

<script>
import FilterHeader from './filterHeader.vue';
import XTable from './Xtable.vue';

export default {
    data() {
        return {
            dates: [],
            currentPage: 1,
            isSelection: true,
            lenderId: '',
            productId: ''
        };
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        filterStatus: {
            type: Array,
            default: function () {
                return [];
            }
        },
        isRefresh: {
            type: Boolean,
            default: false
        },
        showCount: {
            type: Boolean,
            default: false
        },
        shopCount: Number,
        exportBtn: {
            type: Boolean,
            default: false
        },
        createBtn: {
            type: Boolean,
            default: false
        },
        limitAllocation: {
            type: Boolean,
            default: false
        },
        dealAllBtn: {
            type: Boolean,
            default: false
        },
        detailTable: {
            type: Boolean,
            default: false
        },
        isExport2: {
            type: Boolean,
            default: false
        },

        productsOptions: {
            type: Array,
            default: function () {
                return [];
            }
        },
        lenderOptions: {
            type: Array,
            default: function () {
                return [];
            }
        },

        sendEmail: {
            type: Boolean,
            default: false
        },
        shuaxin: {
            type: Boolean,
            default: false
        },
        current: {
            type: Number,
            default: 1
        },
        applicationStatus: {
            type: String,
            default: ''
        },
        showFilterRadio: {
            type: Boolean,
            default: true
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
        seedId: '',
        showPagination: {
            type: Boolean,
            default: true
        },
        isShowSelection: {
            tyoe: Boolean,
            default: false
        },
        isShowIndex:{
            tyoe: Boolean,
            default: false
        },
        showSelect2: {
            type: Boolean,
            default: false
        },
        help: {
            type: Boolean,
            default: false
        },
        isTableHeadEdit: {
            type: Boolean,
            default: true
        },
        isExport: {
            type: Boolean,
            default: false
        },

        isExport3: {
            type: Boolean,
            default: false
        },

        formType: Number, // 表格类型，用于表头设置
        isExporting: {
            type: Boolean,
            default: false
        },
        totalSize: Number,
        filterOptions: Array,
        columns: Array,
        tableData: Array,
        tableOperate: Array,
        addSigned: {
            type: Boolean,
            default: false
        },
        selectedRows: {
            type: Array,
            default: () => []
        }
    },
    components: {
        FilterHeader,
        XTable
    },
    created() {},
    watch: {
        seedId(newv, oldv) {
            // console.log(newv);
        },
        current(newV, oldV) {
            this.currentPage = newV;
        }
    },
    methods: {
        clickCell(row) {
            this.$emit('clickCell', row);
        },
        _select(val) {
            this.$emit('select', val);
        },
        _sendEmail(type) {
            this.$emit('_sendEmail', type);
        },
        _untie() {
            this.$emit('_untie');
        },
        refreshRedis() {
            this.$emit('refreshRedis');
        },
        changeTime(val) {
            if (!val) {
                val = ['', ''];
            }
            this.$emit('changeTime', val);
        },

        changeProducts(val) {
            this.$emit('changeProducts', val);
        },
        changeLender(val) {
            this.productId = '';
            this.$emit('changeLender', val);
        },
        changeSource(val) {
            this.$emit('changeSource', val);
        },
        changeSelects(val, row, prop) {
            this.$emit('changeSelects', val, row, prop);
        },
        changeStatus(val) {
            this.$emit('changeStatus', val);
        },
        cliRow(row) {
            this.$emit('cliRow', row.collectionId);
        },
        showImageList(row) {
            this.$emit('showImageList', row);
        },
        isNeedBtn(btn) {
            return this.tableOperate.some((item) => {
                return item.type === btn;
                // return item.type === btn && this.hasPermission(item.permission);
            });
        },
        // hasPermission(permissionRoles) {
        //     const roles = JSON.parse(localStorage.getItem("btnPermission")) || []; //获取mate中的权限
        //     return roles.some((role) => {
        //         return permissionRoles.includes(role);
        //     });
        // },
        cliLink(row) {
            this.$emit('cliLink', row);
        },
        tohelp() {
            this.$emit('refreshAll', '');
        },
        tohelp2() {
            this.$emit('needReturned', '');
        },

        handleCellFocus(val, row) {
            this.$emit('handleCellFocus', val, row);
        },
        visibleChange(val, row, prop) {
            // console.log(row);
            this.$emit('visible-change', val, row, prop);
        },
        onCellChange(val, row, prop) {
            // console.log(row);
            this.$emit('cell-change', val, row, prop);
        },
        changel(val, row, prop) {
            this.$emit('changel', val, row, prop);
        },
        onFilterItemChange(val, prop) {
            this.$emit('filter-item-change', val, prop);
        },
        onFilterItemCascader(val, prop) {
            this.$emit('filter-item-cascader', val, prop);
        },
        onFilterItemFocus(val, prop) {
            this.$emit('filter-item-focus', val, prop);
        },
        onConditionalQuery() {
            this.$emit('conditional-query');
        },
        onConditionalReset() {
            this.$emit('conditional-reset');
        },
        onConditionalCreate() {
            this.$emit('conditional-create');
        },
        onConditionalLimit(){
            this.$emit('conditional-limit');
        },
        onConditionalDealAll() {
            this.$emit('conditional-deal-all');
        },
        onColumnsFilter(val) {
            this.$emit('columns-filter', val);
            console.log('列筛选', val);
        },
        onItemEdit(event, row, index, text) {
            this.$emit(event, row, index, text);
        },
        onPageChange(page) {
            this.$emit('page-change', page);
        },
        onDownload() {
            console.log('download');
        },
        onPrint() {
            console.log('print');
        },
        onExportF() {
            this.$emit('onExport');
        },
        onExport() {
            this.$emit('export');
        },
        onSetting() {
            this.$router.push({
                name: 'table-setting',
                query: {
                    formType: this.formType
                }
            });
        },
        onAdd() {
            this.$emit('add');
            console.log('add');
        },
        onALGVerify() {
            this.$emit('onALGVerify');
        },
        onYuShangVerify() {
            this.$emit('onYuShangVerify');
        },
        onUCSVerify() {
            this.$emit('onUCSVerify');
        },
        onHfDataExport() {
            this.$emit('onHfDataExport');
        },
        onZhaDaDataExport() {
            this.$emit('onZhaDaDataExport');
        },
        onHKHfDataExport() {
            this.$emit('onHKHfDataExport');
        },
        onExportByUser() {
            this.$emit('onExportByUser');
        }
    }
};
</script>

<style scoped>
.order-operate {
    margin-bottom: 10px;
    padding-left: 20px;
}

.pagination-wrap {
    box-sizing: border-box;
    padding-right: 15px;
    padding-top: 30px;
}
</style>