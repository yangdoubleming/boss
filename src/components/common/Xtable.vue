<!--  -->
<template>
    <div style="background-color: #fff">
        <div v-if="filterStatus.length" style="display: flex; flex-direction: row-reverse; margin-bottom: 30px; padding-top: 4px">
            <el-radio-group v-model="status" size="medium ">
                <el-radio-button v-for="item in filterStatus" :key="item.label" :label="item.value">{{ item.label }} </el-radio-button>
            </el-radio-group>
        </div>
        <el-table
            :data="tableData"
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
            @row-click="cliRow"
            @cell-click="clickCell"
            :show-summary="showSummary"
            :summary-method="showSummary ? summaryMethod : null"
            :sum-text="sumText"
            :max-height="maxHeight"
        >
            >

            <el-table-column type="selection" width="55" align="center" v-if="isShowSelection" :selectable="selectEnable"></el-table-column>
            <el-table-column :label="$t('common_xh')" type="index" align="center" width="80" v-if="isShowIndex"> </el-table-column>

            <el-table-column type="expand" v-if="columns[0].infoTable">
                <template slot-scope="scope">
                    <el-table :data="[scope.row]" style="width: 1500px">
                        <el-table-column
                            v-for="(item, index) in infoColumns"
                            :key="index"
                            :prop="item.prop"
                            :label="item.label"
                            :width="item.width"
                        ></el-table-column>
                    </el-table>
                </template>
            </el-table-column>

            <el-table-column
                v-for="item in columns"
                :key="item.label"
                :label="item.label"
                :prop="item.prop"
                :width="item.width ? item.width : ''"
                :column-key="item.label"
                :filter-multiple="!item.fitersType"
                :filters="item.filters"
                filter-placement
                :fixed="item.fixed"
                :show-overflow-tooltip="item.label == '操作' ? false : true"
            >
                <template slot-scope="scope">
                    <template class="operate-btn" v-if="item.operates" style="display: flex">
                        <div style="display: inline-block; margin-left: 6px" v-for="(btn, index) in item.operates" :key="btn.event">
                            <div v-if="!btn.popover">
                                <el-link
                                    target="_blank"
                                    size="mini"
                                    v-if="$showBtn(btn.code)"
                                    :style="{ display: scope.row.hiddenBtn && scope.row.hiddenBtn.includes(btn.text) ? 'none' : '' }"
                                    :type="btn.type ? btn.type : ''"
                                    @click="handleRowOperate(scope.$index, scope.row, btn.event, btn.text)"
                                    >{{ btn.text }}</el-link
                                >
                            </div>

                            <!-- <el-tooltip :content="btn.text" placement="top" v-else-if="btn.text">
                                <el-button
                                    :icon="btn.icon"
                                    circle
                                    :type="btn.type ? btn.type : ''"
                                    @click="handleRowOperate(scope.$index, scope.row, btn.event, btn.text)"
                                ></el-button>
                            </el-tooltip>-->
                            <div v-else>
                                <el-popover
                                    placement="left"
                                    trigger="hover"
                                    transition
                                    v-if="index == 0"
                                    style="display: flex; align-items: center"
                                >
                                    <div v-for="btn1 in item.operates" :key="btn1.event" style="display: inline-block; margin-right: 15px">
                                        <el-link
                                            target="_blank"
                                            v-if="$showBtn(btn1.code)"
                                            size="mini"
                                            :style="{
                                                display: scope.row.hiddenBtn && scope.row.hiddenBtn.includes(btn1.text) ? 'none' : ''
                                            }"
                                            :type="btn1.type ? btn1.type : ''"
                                            @click="handleRowOperate(scope.$index, scope.row, btn1.event, btn1.text)"
                                            >{{ btn1.text }}</el-link
                                        >
                                    </div>

                                    <el-button slot="reference" type="info">{{ $t('loan_search_cz') }}</el-button>
                                </el-popover>
                            </div>

                            <div
                                v-if="scope.row.serviceRead && index == item.operates.length - 1"
                                style="
                                    height: 8px;
                                    width: 8px;
                                    border-radius: 50%;
                                    background-color: #f56c6c;
                                    margin-left: 10px;
                                    display: inline-block;
                                    margin-bottom: 15px;
                                "
                            ></div>
                        </div>
                    </template>

                    <template v-else>
                        <el-input
                            class="edit-input"
                            size="small"
                            @input="changeInput"
                            :type="item.type || ''"
                            :disabled="scope.row.disabled"
                            v-model="scope.row[item.prop]"
                            v-if="item.cellEdit === 'input'"
                        />

                        <el-switch
                            v-model="scope.row[item.prop]"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            v-else-if="item.cellEdit === 'switch'"
                            @change="changeSwitch($event, scope.row, item.prop)"
                        >
                        </el-switch>
                        <el-cascader
                            v-else-if="item.cellEdit === 'cascader'"
                            @change="changeel($event, scope.row, item.prop)"
                            :options="scope.row.serverUserList"
                            v-model="scope.row.echoUserList"
                            :props="props"
                            clearable
                        ></el-cascader>

                        <el-select
                            :placeholder="$t('loan_detail_choose')"
                            v-model="scope.row[item.prop]"
                            @change="handleCellChange($event, scope.row, item.prop)"
                            @focus="handleCellFocus($event, scope.row, item.prop)"
                            @visible-change="visibleChange($event, scope.row, item.prop)"
                            v-else-if="item.cellEdit === 'select'"
                        >
                            <el-option
                                v-for="(options, index) in item.options"
                                :key="index"
                                :label="options.label"
                                :value="options.value"
                            ></el-option>
                        </el-select>
                        <el-select
                            v-model="scope.row[item.prop]"
                            multiple
                            :placeholder="$t('loan_detail_choose')"
                            :multiple-limit="1"
                            v-else-if="item.cellEdit === 'selects'"
                            @change="changeSelects($event, scope.row, item.prop)"
                        >
                            <el-option
                                v-for="options in item.options"
                                :key="options.id"
                                :label="options.name"
                                :value="options.id"
                            ></el-option>
                        </el-select>
                        <span v-else-if="item.cellEdit === 'link'">
                            <el-switch
                                v-model="scope.row.enable"
                                active-text="启用"
                                inactive-text="禁用"
                                @change="clilLink(scope.row)"
                            ></el-switch>
                        </span>
                        <el-date-picker
                            v-model="scope.row[item.prop]"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择时间"
                            v-else-if="item.cellEdit === 'date'"
                        />
                        <el-image
                            v-else-if="item.cellEdit === 'img' && scope.row[item.prop]"
                            class="table-td-thumb"
                            :src="scope.row[item.prop]"
                            @click="onPreview(scope.row)"
                        ></el-image>
                        <el-image
                            v-else-if="item.cellEdit === 'imgs' && scope.row[item.prop]"
                            class="table-td-thumb"
                            :src="scope.row[item.prop]"
                            @click="onPreview(scope.row[item.imgs])"
                        ></el-image>
                        <div
                            :style="{ color: scope.row.colorStyle && item.prop == 'difference' ? '#fe1964' : '' }"
                            v-else-if="item.cellEdit === 'repayment'"
                            style="font-size: 14px; text-align: center; padding: 10px 0; line-height: 16px"
                        >
                            {{ scope.row[item.prop] }}
                        </div>
                        <el-link
                            v-else-if="item.cellEdit === 'button'"
                            type="primary"
                            size="mini"
                            @click="colClick(item.event, scope.row)"
                            target="_blank"
                            >{{ item.buttonLabel }}</el-link
                        >
                        <div
                            :style="{ color: item.color ? item.color : 'rgba(0,0,0,.65)' }"
                            v-else
                            style="
                                font-size: 14px;
                                text-align: center;
                                padding: 10px 0;
                                overflow: hidden;
                                line-height: 16px;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            "
                        >
                            <el-tooltip class="item" effect="dark" :content="scope.row[item.prop]" placement="top" v-if="item.showTip">
                                <div>
                                    {{ scope.row[item.prop] }}
                                </div>
                            </el-tooltip>
                            <TipSpan
                                v-else-if="item.autoTip"
                                :textValue="scope.row[item.prop]"
                                :color="scope.row.color"
                                :contentValue="scope.row.contentValue"
                                :showTip="scope.row.showToolTip"
                            ></TipSpan>
                            <div
                                v-else-if="item.cellEdit === 'click'"
                                @click="clickCell(item.clickEvent, scope.row)"
                                style="cursor: pointer"
                            >
                                {{ scope.row[item.prop] }}
                            </div>
                            <div v-else>
                                {{ scope.row[item.prop] }}
                            </div>
                        </div>
                        <slot :name="scope.row['slot']" v-if="item.prop === scope.row['slot']"></slot>
                    </template>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { infoColumns } from './detail-components/3pl';
import TipSpan from '@/components/common/TipSpan';
export default {
    components: { TipSpan },
    props: {
        isShowIndex: {
            type: Boolean,
            default: false
        },
        filterStatus: {
            type: Array,
            default: function () {
                return [];
            }
        },
        detailTable: {
            type: Boolean,
            default: false
        },
        applicationStatus: {
            type: String,
            default: ''
        },
        seedId: {
            // type: Number,
            default: null
        },
        showFilterRadio: {
            type: Boolean,
            default: false
        },

        columns: {
            type: Array,
            default: []
        },
        tableData: {
            type: Array,
            default: function () {
                return [];
            }
        },

        isShowSelection: {
            type: Boolean,
            default: false
        },
        showSelect: {
            type: Boolean,
            defauit: false
        },
        showSummary: {
            type: Boolean,
            default: false
        },
        summaryMethod: {
            type: Function,
            default: null
        },
        sumText: {
            type: String,
            default: '合计'
        },
        maxHeight: Number,
        defaultSelectedRows: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            infoColumns,
            radio1: '全部',
            showViewer: false,
            imglist: [],
            seed: '',
            status: '',
            loading: true
        };
    },
    watch: {
        tableData: {
            handler() {
                this.$nextTick(() => {
                    this.toggleRowSelection();
                });
            },
            immediate: true,
            deep: true
        },
        defaultSelectedRows() {
            this.$nextTick(() => {
                this.toggleRowSelection();
            });
        },
        status(newV, oldV) {
            this.$emit('changeStatus', newV);
        },
        applicationStatus(newV, oldV) {
            this.status = newV;
        },
        seedId(newv, oldv) {
            this.seed = newv;
            console.log(newv);
        }
    },
    mounted() {
        console.log(1212,this.isShowIndex);
        
    },
    methods: {
        
        clickCell(isClickEvent, row) {
            if (isClickEvent) {
                console.log('show');
                this.$emit('clickCell', row);
            }
        },
        colClick(event, row) {
            this.$emit(event, row);
        },
        changeSwitch(value, row, prop) {
            this.$emit('changeSwitch', value, row, prop);
        },
        selectEnable(row, rowIndex) {
            return !row.disabled;
        },
        changeInput() {
            this.$emit('changeInput');
        },
        changeSelects(value, row, prop) {
            this.$emit('changeSelects', value, row, prop);
        },
        cliRow(row) {
            this.seed = row.collectionId;
            this.$emit('cliRow', row);
        },
        clickCell(row, column, cell) {
            this.$emit('clickCell', { row, column, cell });
        },
        statusFun(status) {
            if (status) {
                return true;
            } else {
                return false;
            }
        },
        showBtn(text) {
            if (localStorage.getItem('btnPermission').indexOf(text) !== -1) {
                return true;
            } else {
                return false;
            }
        },
        onPreview(row) {
            this.$emit('showImageList', row);
        },

        clilLink(row) {
            //   console.log(row);
            //   console.log(row);
            //   console.log(row);
            this.$emit('cliLink', row);
        },
        // 列筛选条件
        handleFilterChange(filterObj) {
            this.$emit('filter', filterObj);
        },
        // 选择行
        handleSelectionChange(val) {
            this.$emit('select', val);
        },
        handleSelectRow(selection, row) {
            this.$emit('row-select', selection, row);
        },
        handleSelectAll(val) {
            this.$emit('all-select', val);
        },
        // 操作行
        handleRowOperate(index, row, event, text) {
            // console.log(text);
            // console.log(text);
            // console.log(text);

            this.$emit('edit', event, row, index, text);
            // this.$router.push('/order-detail/index')
        },
        // 操作格子
        handleCellFocus(val, row, prop) {
            this.$emit('handleCellFocus', val, row, prop);
        },
        visibleChange(val, row, prop) {
            // console.log(val, row)
            this.$emit('visibleChange', val, row, prop);
        },
        handleCellChange(val, row, prop) {
            // console.log(val, row);
            this.$emit('cellChange', val, row, prop);
        },
        changeel(val, row, prop) {
            // console.log(val, row)
            this.$emit('changeel', val, row, prop);
        },
        toggleRowSelection() {
            if (!this.$refs.multipleTable) return;
            this.$refs.multipleTable.clearSelection();
            if (!this.defaultSelectedRows || !this.defaultSelectedRows.length) return;
            this.tableData.forEach(row => {
                if (this.defaultSelectedRows.includes(row)) {
                    this.$refs.multipleTable.toggleRowSelection(row, true);
                }
            });
        },
        rowDrop() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody');
            const _this = this;
            Sortable.create(tbody, {
                onEnd({ newIndex, oldIndex }) {
                    const currRow = _this.tableData.splice(oldIndex, 1)[0];
                    _this.tableData.splice(newIndex, 0, currRow);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
//   /deep/.el-table tr:hover {
//     background: #fe1964 !important;
//   }
/deep/.el-table tr:hover > td {
    // background-color: rgb(255, 230, 234) !important;
    // color: #fff;
}

/deep/.el-table th > .cell {
    text-align: center !important;
}

/deep/.el-table .cell {
    text-align: center !important;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 60px;
    height: 60px;
}

/deep/.el-table .warning-row {
    background: oldlace !important;
}

/deep/.el-table .success-row {
    background: #f0f9eb !important;
}
</style>
