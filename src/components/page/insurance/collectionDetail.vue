<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 保险管理 /
                补录资料 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">补录资料详情</span>
        </div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-card>
                    <el-form ref="params" :model="params" style="display: flex">
                        <el-form-item label="补录情况：" style="width: 300px">
                            <el-select v-model="params.fileStatus" :placeholder="$t('loan_detail_choose')">
                                <el-option label="补录中" value="recor"></el-option>
                                <el-option label="补录成功" value="success"></el-option>
                                <el-option label="补录失败" value="error"></el-option>
                            </el-select>
                        </el-form-item>
                        <div class="button">
                            <el-button type="primary" @click="searchData" style="margin-left: 20px">搜索</el-button>
                            <el-button @click="reset" style="border: 1px solid #409EFF; color: #409EFF">重置</el-button>
                        </div>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-card>
                    <el-table :data="detailData" style="width: 100%">
                        <el-table-column prop="fileName" label="保单/保函.pdf" align="center"> </el-table-column>
                        <!-- <el-table-column prop="fileStatus" label="补录情况" align="center"> </el-table-column> -->
                        <el-table-column prop="fileStatus" label="补录情况" align="center">
                            <template slot-scope="scope">
                                <a v-html="scope.row.fileStatus"
                                    :class="{ activeClass: scope.row.fileStatus === '补录失败' }"></a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background layout="prev, pager, next" :total="total" :page-size="params.size"
                        @current-change="currentChange" style="text-align: right; margin: 40px 20px" v-if="total > 0">
                    </el-pagination>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { detailPage } from '@/api/insur';
export default {
    data() {
        return {
            total: '',
            params: {
                current: 1,
                size: 10,
                suppleId: '',
                fileStatus: ''
            },
            special: true,
            detailData: []
        };
    },
    created() {
        this.params.suppleId = this.$route.query.id;
        this.getDetail();
    },
    methods: {
        // 点击下一页
        currentChange(index) {
            this.params.current = index;
            this.getDetail(this.params);
        },
        getDetail() {
            detailPage(this.params).then((res) => {
                console.log(res);
                if (res.code == 200) {
                    this.detailData = res.data.records;
                    this.total = res.data.total;
                    this.detailData.forEach((item) => {
                        console.log(item.fileStatus);
                        if (item.fileStatus == '补录失败') {
                            var cell = document.getElementsByTagName('cell');
                            // cell.setAttribute('className', 'activeClass');
                            console.log(cell);
                        }
                    });
                }
            });
        },
        searchData() {
            this.getDetail();
        },
        reset() {
            this.params.fileStatus = '';
        }
    }
};
</script>

<style lang='less' scoped>
.activeClass {
    color: #409EFF;
}
</style>