<template>
    <div  v-loading="loading">
        <div style="display:flex;align-items:center;margin-bottom:50px" vif>
            <el-select
                v-model="type"
                placeholder="请选择产品类型"
                size="medium"
                style="margin-left:30px"
                @change="getLender"
            >
                <el-option label="境内-信贷产品" value="境内信贷"></el-option>
                 <el-option label="境内自营" value="境内自营"></el-option>
                <el-option label="API锁定产品" value="API锁定"></el-option>
                <el-option label="境外自营" value="境外自营"></el-option>
                <el-option label="境外合作" value="境外合作"></el-option>
               
            </el-select>
            <el-select
                v-model="value"
                placeholder="请选择资金方"
                size="medium"
                style="margin-left:30px"
                @change="getData"
            >
                <el-option label="全部" value=" "></el-option>
                <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.lenderName"
                    :value="item.id"
                ></el-option>
            </el-select>
            <el-date-picker
                style="margin-left:30px"
                v-model="dates"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                 value-format="yyyy-MM-dd"
                @change="getData"
            ></el-date-picker>
        </div>
       
        <div style="display:block;margin-bottom:30px;width:340px" v-if="type=='境内信贷' &&!loading">
            <div class="box">
                <div class="content1">{{$t('home_xxssl')}}</div>
                <div
                    v-if="type=='境内信贷'&& value.toString()==' '"
                    class="content1 fff"
                >{{pageData.leadsCount }}</div>
                <div v-else class="content1 fff">-</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xzczhl')}}</div>
                <div
                    v-if="type=='境内信贷'&& value.toString()==' '"
                    class="content1 fff"
                >{{(pageData.registerUserRate*100).toFixed(2) }}%</div>
                <div v-else class="content1 fff">-</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xzszc')}}</div>
                <div
                    v-if="type=='境内信贷'&& (value.toString()==' '|| value==23)"
                    class="content1 fff"
                >{{pageData.registerUserCount }}</div>
                <div v-else class="content1 fff">-</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xljzc')}}</div>
                <div
                    v-if="type=='境内信贷'&& (value.toString()==' '|| value==23)"
                    class="content1 fff"
                >{{pageData.totalRegisterUserCount }}</div>
                <div v-else class="content1 fff">-</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xjjl')}}</div>
                <div
                    v-if="type=='境内信贷'&& value.toString()==' '"
                    class="content1 fff"
                >{{(pageData.incomingRate*100).toFixed(2) }}%</div>
                <div v-else class="content1 fff">-</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xxzjj')}}</div>
                <div
                    v-if="type=='境内信贷'&&  (value.toString()==' '|| value==23)"
                    class="content1 fff"
                >{{pageData.incomingUserCount }}</div>
                <div v-else class="content1 fff">-</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xljjj')}}</div>
                <div
                    v-if="type=='境内信贷'&&  (value.toString()==' '|| value==23)"
                    class="content1 fff"
                >{{pageData.totalIncomingUserCount }}</div>
                <div v-else class="content1 fff">-</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xxzsxyhs')}}</div>
                <div class="content1 fff">{{pageData.creditUserCount }}</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xljsxyh')}}</div>
                <div class="content1 fff">{{pageData.totalCreditUserCount }}</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xsxtgl')}}</div>
                <div
                    v-if="type=='境内信贷'&& (value.toString()==' '|| value==23)"
                    class="content1 fff"
                >{{(pageData.creditRate*100).toFixed(2) }}%</div>
                <div v-else class="content1 fff">-</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('common_sxje')}}({{b}})</div>
                <div class="content1 fff">{{pageData.creditAmount }}</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xpjsx')}}({{b}})</div>
                <div class="content1 fff">{{pageData.creditAmountAvg }}</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xtkl')}}</div>
                <div class="content1 fff">{{(pageData.withdrawalAmountRate *100).toFixed(2) }}%</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xslzb')}}</div>
                <div class="content1 fff">{{(pageData.withdrawalCountRate *100).toFixed(2) }}%</div>
            </div>

            <div class="box">
                <div class="content1">{{$t('home_fkje')}}({{b}})</div>
                <div class="content1 fff">{{pageData.loanAmount }}</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xfkyhs')}}</div>
                <div class="content1 fff">{{pageData.loanUserCount }}</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xpjfkje')}}({{b}})</div>
                <div class="content1 fff">{{pageData.loanAmountAvg }}</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xxdl')}}</div>
                <div class="content1 fff">{{(pageData.seriesLoanRate*100).toFixed(2) }}%</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xpjzj')}}</div>
                <div class="content1 fff">{{pageData.averageFundingDays }}</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xhkje')}}({{b}})</div>
                <div class="content1 fff">{{pageData.repaymentAmount }}</div>
            </div>
            <div class="box">
                <div class="content1">{{$t('home_xzdje')}}({{b}})</div>
                <div class="content1 fff">{{pageData.loanBalance }}</div>
            </div>
        </div>
        <div style="display:block;margin-bottom:30px;width:340px" v-else>
            <div class="box">
                <div class="content1">{{$t('home_fkje')}}({{b}})</div>
                <div class="content1 fff">{{pageData.loanAmount }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { boardCategorical, lenderType } from '../../api/index';
export default {
    data() {
        return {
            pageData: {},
            dates: [],
            value: ' ',
            type: '境内信贷',
            options: [],
            loading:true,
            b:''
        };
    },
    created() {
        this.getLender('境内信贷');
    },
    methods: {
        
        getData() {
            this.b=this.type=='境内信贷'||this.type=='境内自营'||this.type=='境外合作'? this.$t('common_wy'):this.type=='API锁定'?this.$t('common_wy'): this.$t('common_wmy')
            this.loading=true
            let star =this.dates&& this.dates[0] ? this.dates[0] + ' 00:00:00' : '';
            let end = this.dates&&this.dates[1] ? this.dates[1] + ' 23:59:59' : '';
            boardCategorical(star, end, this.type, this.value).then((res) => {
                this.pageData = res.data;
                this.loading=false
            });
        },
        getLender(val) {
            lenderType(val).then((res) => {
                this.options = res.data;
                this.value = ' ';
                this.getData();
            });
        }
    }
};
</script>

<style lang="less" scoped>
.fff {
    background-color: #fff !important;
}
.box {
    width: 100%;
    height: 40px;
    display: flex;
    border-left: 1px solid #e9e9e9;
    border-top: 1px solid #e9e9e9;
    .content1 {
        width: 170px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #fafafa;
        border-right: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        font-size: 13px;
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
        font-size: 13px;
    }
}
</style>