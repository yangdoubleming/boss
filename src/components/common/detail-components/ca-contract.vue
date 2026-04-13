<template>
    <div style="margin-top: 24px; padding-bottom: 24px">
        <el-card style="margin-top: 24px" shadow="hover">
            <el-button size="mini" type="danger" @click="dialogFormVisible = true" style="float: right; margin-bottom: 20px"
                >生成协议</el-button
            >
            <el-table :data="columns" header-align="center">
                <el-table-column label="序号" width="" align="center" type="index"></el-table-column>
                <el-table-column prop="fileName" label="合同标题" width="" align="center"></el-table-column>
                <el-table-column prop="isSign" label="是否签署" width="" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="_viewContract(scope.row)">查看合同</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="生成协议" :visible.sync="dialogFormVisible" width="40%" v-loading="loading">
            <el-form :inline="true" :model="form" ref="form" style="padding-left: 20px" label-width="150px" label-position="left">
                <el-form-item label="协议类型" style="margin-right: 30px" prop="generateContractType">
                    <el-select v-model="form.generateContractType" placeholder="请选择协议类型" style="width: 220px">
                        <el-option label="跨商宝美元协议" value=""></el-option>
                        <el-option label="1P转3P协议" value="SA"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_generateContract" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getSignContractByResourceCode, signInfoTemplate } from '../../../api/index';
export default {
    props: {
        applicationCode: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            merchant: process.env.VUE_APP_MERCHANT,
            baseUrl: process.env.VUE_APP_BASE_URL,
            columns: [],
            dialogFormVisible: false,
            form: {
                generateContractType: ''
            },
            loading: false
        };
    },
    created() {
        this._caContractList();
    },
    methods: {
        _generateContract() {
            this.loading = true;
            signInfoTemplate({
                applicationCode: this.applicationCode,
                type: this.form.generateContractType
            })
                .then((res) => {
                    this.loading = false;
                    this.$message.success('生成成功');
                    this.dialogFormVisible = false;
                    window.open(res.data);
                })
                .catch((err) => {
                    this.loading = false;
                });
        },
        _caContractList() {
            var resourceCode = this.applicationCode;
            getSignContractByResourceCode({ resourceCode }).then((res) => {
                res.data.forEach((x) => {
                    x.isSign = '已签署';
                });
                this.columns = res.data;
            });
        },

        _viewContract(row) {
            if (!row.fullFilePath) {
                return this.$message.warning('该合同没有查看链接');
            }
            const el = document.createElement('a');
            el.style.display = 'none';
            el.setAttribute('target', '_blank');
            /**
             * download的属性是HTML5新增的属性
             * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
             * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
             * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
             */
            // el.setAttribute('download', '文件');
            el.href = row.fullFilePath;
            document.body.appendChild(el);
            el.click();
            document.body.removeChild(el);
        }
    }
};
</script>

<style scoped></style>
