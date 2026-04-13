<template>
    <div style="margin-top:24px;padding-bottom:24px">
        <el-card style="margin-top:24px" shadow="hover">
            <el-table :data="columns" header-align="center">
                <el-table-column label="序号" width="" align="center" type="index"></el-table-column>
                <el-table-column prop="contractType" label="合同标题" width="" align="center"></el-table-column>
                <el-table-column prop="isSign" label="是否签署" width="" align="center"></el-table-column>
                <el-table-column prop="signTime" label="签署时间" width="" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="_downloadContract(scope.row)">下载合同</el-button>
                        <el-button size="mini" type="danger" @click="_viewContract(scope.row)">查看合同</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>

<script>
import { fddContractList } from '../../../api/index';
export default {
    props: {
        applicationCode: {
            type: String,
            default: ''
        },
    },
    created() {
        this._fddContractList()
    },
    methods: {
        _fddContractList() {
            var applicationCode = this.applicationCode
            fddContractList({applicationCode}).then(res => {
                res.data.forEach(x => {
                    switch (x.isSign) {
                        case 'TRUE':
                            x.isSign = '已签署';
                            break;
                        case 'FALSE':
                            x.isSign = '未签署';
                            break;
                    }
                });
                this.columns = res.data;
            });
        },

        _viewContract(row) {
            if (!row.viewpdfUrl) {
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
                el.href = row.viewpdfUrl;
                document.body.appendChild(el);
                el.click();
                document.body.removeChild(el);
        },

        _downloadContract(row) {
            if (!row.downloadUrl) {
                return this.$message.warning('该合同没有下载链接');
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
                el.setAttribute('download', '文件');
                el.href = row.downloadUrl;
                document.body.appendChild(el);
                el.click();
                document.body.removeChild(el);
        }
    },
    data() {
        return {
            merchant:process.env.VUE_APP_MERCHANT,
            baseUrl: process.env.VUE_APP_BASE_URL,
            columns: [],
        };
    }
};
</script>

<style scoped>
</style>