<template>
    <div v-loading="loading">
        <div style="display: flex; align-items: center; margin-bottom: 50px" vif>
            <el-select v-model="type" size="medium" style="margin-left: 30px" @change="getData">
                <el-option label="全部电商平台" value></el-option>
                <el-option label="Amazon" value="Amazon"></el-option>
                <el-option label="Wayfair" value="Wayfair"></el-option>
                <el-option label="HomeDepot" value="HomeDepot"></el-option>
                <el-option label="Walmart" value="Walmart"></el-option>
                <el-option label="Overstock" value="Overstock"></el-option>
                <el-option label="Lowes" value="Lowes"></el-option>
                <el-option label="其他" value="其他"></el-option>
            </el-select>
            <el-select v-model="value" size="medium" style="margin-left: 30px" @change="getData">
                <el-option label="全部保司" value></el-option>
                <el-option
                    v-for="(item, idx) in options"
                    :key="idx"
                    :label="item.lenderName"
                    :value="item.id"
                ></el-option>
            </el-select>
            <el-date-picker
                style="margin-left: 30px"
                v-model="dates"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="getData"
                :clearable="clearable"
            ></el-date-picker>
        </div>

        <div style="display: block; margin-bottom: 30px; width: 420px">
            <div class="box" v-for="(item, idx) in tableData" :key="idx">
                <div class="content11">{{ item.name }}</div>
                <div class="content11 fff">{{ item.value }}</div>
            </div>
        </div>
        <div style="pdding-top: 20px; font-size: 12px">{{$t('insure_data_zy')}}</div>
    </div>
</template>

<script>
import { businessClass } from '../../api/insur';
export default {
    data() {
        return {
            pageData: {},
            clearable: false,
            dates: [],
            value: '',
            type: '',
            options: [
                { lenderName: '大地', id: 'DD' },
                { lenderName: '平安', id: 'PN' },
                { lenderName: '人保', id: 'RB' },
                { lenderName: '史带', id: 'ST' },
                { lenderName: '众安', id: 'ZA' }
            ],
            loading: true,
            b: ''
            // tableData: [
            //     { name: '新增订单数', value: '-' },
            //     { name: '累计订单数', value: '-' },
            //     { name: '新增保费/元', value: '-' },
            //     { name: '累计保费/元', value: '-' },
            //     { name: '新增店铺GMV/美元', value: '-' },
            //     { name: '累计店铺GMV/美元', value: '-' },
            //     { name: '新增用户数', value: '-' },
            //     { name: '累计用户数', value: '-' }
            // ]
        };
    },
    created() {
        this.getData();
    },
    computed: {
        tableData() {
            this.getData();
            return [
                { name: this.$t('insure_data_xzdds'), value: '-' },
                { name: this.$t('insure_data_ljdds'), value: '-' },
                { name: this.$t('insure_data_xzbfy'), value: '-' },
                { name: this.$t('insure_data_ljbfy'), value: '-' },
                { name: this.$t('insure_data_xzdpgmv'), value: '-' },
                { name: this.$t('insure_data_ljdpgmv'), value: '-' },
                { name: this.$t('insure_data_xzyhs'), value: '-' },
                { name: this.$t('insure_data_ljyhs'), value: '-' }
            ];
        }
    },
    methods: {
        getData() {
            this.loading = true;
            let star = this.dates && this.dates[0] ? this.dates[0] : '';
            let end = this.dates && this.dates[1] ? this.dates[1] : '';
            businessClass({
                startTime: star,
                endTime: end,
                platform: this.type,
                productCode: this.value
            }).then(res => {
                function cacalData(data) {
                    return data ? data : '-';
                }
                this.loading = false;
                this.pageData = res.data;
                this.tableData[0].value = cacalData(this.pageData.orderNum);
                this.tableData[1].value = cacalData(this.pageData.orderNumCumulative);
                this.tableData[2].value = cacalData(this.pageData.amount);
                this.tableData[3].value = cacalData(this.pageData.amountCumulative);
                this.tableData[4].value = cacalData(this.pageData.sales);
                this.tableData[5].value = cacalData(this.pageData.salesCumulative);
                this.tableData[6].value = cacalData(this.pageData.userCount);
                this.tableData[7].value = cacalData(this.pageData.userCountCumulative);
            });
        }
    }
};
</script>

<style lang="less" scoped>
.fff {
    background-color: #fff !important;
}
// el-select el-select--medium
/deep/ .el-select--medium {
    margin-left: 0 !important;
}
.box {
    width: 100%;
    height: 40px;
    display: flex;
    border-left: 1px solid #e9e9e9;
    border-top: 1px solid #e9e9e9;
    border-right: 1px solid #e9e9e9;
    .content11 {
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 10px;
        background-color: #fafafa;
        border-right: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        font-size: 14px;
        color: #333;
    }
    .content2 {
        width: 170px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #fff;
        border-right: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        // color: #b0b0b2;
        font-size: 14px;
    }
}
</style>
