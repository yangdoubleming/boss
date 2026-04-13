<template>
    <div class="content">
        <el-card>
            <el-row>
                <el-descriptions :column="1" :contentStyle="fontObj" :labelStyle="fontObj">
                    <h4 slot="title" class="base-title">豆服钱包信息:</h4>
                    <el-descriptions-item label="钱包账户">132144123421</el-descriptions-item>
                    <el-descriptions-item label="钱包余额">11213元</el-descriptions-item>
                </el-descriptions>
            </el-row>
            <el-descriptions :column="1" :contentStyle="fontObj" :labelStyle="fontObj">
                <h4 slot="title" class="base-title">绑定银行卡信息:</h4>
                <el-descriptions-item label="户名">132144123421</el-descriptions-item>
                <el-descriptions-item label="开户行">11213元</el-descriptions-item>
                <el-descriptions-item label="账号">11213元</el-descriptions-item>
                <el-descriptions-item label="银行号">11213元</el-descriptions-item>
            </el-descriptions>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fontObj: {
                'font-size': '18px',
            },
        };
    },
}
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;


    .base-title {
        padding-left: 200px;
        margin-top: 20px;
        font-size: 20px;
        font-weight: bold;
    }

    ::v-deep .el-descriptions__body {
        padding-left: 400px;
    }
}
</style>