<template>
    <div style="margin-top:24px;padding-bottom:24px">
        <el-card style="margin-top:24px" shadow="hover">
            <el-table :data="columns" header-align="center">
                <el-table-column label="序号" width="" align="center" type="index"></el-table-column>
                <el-table-column prop="cardName" label="持卡人姓名" width="" align="center"></el-table-column>
                <el-table-column prop="bankName" label="银行名称" width="" align="center"></el-table-column>
                <el-table-column prop="cardNo" label="银行卡号" width="" align="center"></el-table-column>
                <el-table-column prop="idNo" label="身份证号码" width="" align="center"></el-table-column>
                <el-table-column prop="phoneNumber" label="手机号码" width="" align="center"></el-table-column>
                <el-table-column prop="bankCode" label="银行编码" width="" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="" align="center"></el-table-column>

            </el-table>
        </el-card>

    </div>
</template>

<script>
import { baofooBindCards } from '../../../api/index';
export default {
    props: {
        idCard: {
            type: String,
            default: ''
        },
        userId: {
            type: String,
            default: ''
        },
    },
    created() {
        this._baofooBindCardList()
    },
    methods: {
        _baofooBindCardList() {
            baofooBindCards({ idCard: this.idCard || '', userId: this.userId }).then(res => {
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

    },
    data() {
        return {
            merchant: process.env.VUE_APP_MERCHANT,
            baseUrl: process.env.VUE_APP_BASE_URL,
            columns: [],
        };
    }
};
</script>

<style scoped></style>