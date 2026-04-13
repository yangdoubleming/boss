<template>
    <div id="out-put">
        <el-table :data="tableData" style="width: 100%">
            <template v-for="(column, index) in columns">

                <el-table-column v-if="!column.notRedner" :key="column.id" :prop="column.prop" :label="column.label"
                    :show-overflow-tooltip="column.overFlow || false" :width="column.width || 'auto'"
                    :align="column.align">
                    <template slot-scope="scope">

                        <template v-if="column.operates">

                            <template v-for="(btn, index) in column.operates">
                                <el-button :key="index" size="mini" v-if="$showBtn(btn.code)"
                                    :style="{ display: scope.row.hiddenBtn && scope.row.hiddenBtn.includes(btn.text) ? 'none' : '' }"
                                    :type="btn.type || 'text'"
                                    @click="handlePopConfirm(btn.event, scope.row, scope.$index, btn.text)">{{ btn.text
                                    }}
                                </el-button>
                            </template>

                        </template>

                        <template v-else>

                            <template v-if="column.type === 'dateFromNode'">
                                {{ scope.row[column.prop].replace('T', ' ').replace('Z', ' ').split('.')[0] }}
                            </template>

                            <template v-else-if="column.type === 'file_path'">
                                {{ '/' + scope.row[column.prop] }}
                            </template>

                            <template v-else>
                                {{ scope.row[column.prop] }}
                            </template>

                        </template>

                    </template>
                </el-table-column>
                <template v-else>
                    <slot :name="column.prop"></slot>
                </template>
            </template>
            <slot></slot>
        </el-table>

        <div style="padding-bottom:24px;background-color:#fff">
            <el-row v-if="showPagination" type="flex" justify="end" class="pagination-wrap">
                <el-pagination background layout="prev, pager, next" :current-page.sync="currentPage" :total="totalSize"
                    @current-change="onPageChange" />
            </el-row>
        </div>

        <el-dialog title="确认操作" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>确定要进行{{currentAction}}操作吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'NewTable',
    props: {
        columns: Array,
        tableData: Array,
        totalSize: Number,
        showPagination: {
            type: Boolean,
            default: true
        },
        current: {
            type: Number,
            default: 1
        },
    },
    data() {
        return {
            currentPage: 1,
            currentAction: '',
            dialogVisible: false,
            confirmCache: {
                event1: null,
                row: null,
                $index: null,
                text: null,
            }
        };
    },
    watch: {
        current(newV, oldV) {
            this.currentPage = newV;
			console.log(newV,oldV)
        }
    },
    methods: {
        handlePopConfirm(event1, row, $index, text) {
            this.confirmCache = { event1, row, $index, text }
            this.currentAction = text
            this.dialogVisible = true
        },
        handleClose() {
            this.dialogVisible = false
        },
        dialogConfirm() {
            const confirmCache = this.confirmCache
            this.actionCallback(confirmCache.event1, confirmCache.row, confirmCache.$index, confirmCache.text)
            this.dialogVisible = false
        },
        actionCallback(event, row, index, text) {
            this.$emit(event, row, index, text);
        },
        onPageChange(page) {
            this.$emit('page-change', page);
        },
    }
};
</script>

<style lang='less'  scoped>
.pagination-wrap {
    box-sizing: border-box;
    padding-right: 15px;
    padding-top: 30px;
}
</style>