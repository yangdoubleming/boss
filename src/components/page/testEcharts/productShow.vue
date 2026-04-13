<template>
    <div class="product-show">
        <div class="product-left">
            <el-table :header-cell-style="{ 'background-color': 'transparent' }" :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="商品名称" width="180">
                </el-table-column>
                <el-table-column prop="name" label="Total Sales" width="180">
                </el-table-column>
                <el-table-column prop="address" label="Percentage">
                </el-table-column>
            </el-table>
        </div>
        <div class="product-right">
            <dv-border-box-2>
                <div class="main-product">
                    <div class="main-top">
                        <div><img style="height: 20px;" src="../../../assets/amazonLogo.png" alt=""></div>
                        <div>
                            <div>核心商品</div>
                            <div>xxxx</div>
                        </div>
                    </div>
                    <div class="main-desc">
                        <el-descriptions :column="2">
                            <el-descriptions-item label="核心商品转换率">

                            </el-descriptions-item>
                            <el-descriptions-item label="核心商品转换率">

                            </el-descriptions-item>
                            <el-descriptions-item label="核心商品退货率">

                            </el-descriptions-item>
                            <el-descriptions-item label="核心商品细分类目排名">

                            </el-descriptions-item>
                            <el-descriptions-item label="Classification rank">

                            </el-descriptions-item>
                            <el-descriptions-item label="Display group rank">

                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                    <div class="customer-evaluate">
                        <el-radio v-model="radio" label="1">客户评价</el-radio>
                    </div>
                </div>
            </dv-border-box-2>
        </div>


    </div>
</template>
<script>
export default {
    data() {
        return {
            radio: 1,
            tableData: [{
                date: 'xxx',
                name: 'xxxx',
                address: 'xxxx'
            }, {
                date: 'xxx',
                name: 'xxxx',
                address: 'xxxx'
            }, {
                date: 'xxx',
                name: 'xxxx',
                address: 'xxxx'
            }, {
                date: 'xxx',
                name: 'xxxx',
                address: 'xxxx'
            }]
        }
    }
}
</script>
<style lang="scss" scoped>
.product-show {
    display: flex;
    gap: 30px;

    .product-left {
        width: 50%;

        /*最外层透明*/
        ::v-deep .el-table,
        ::v-deep .el-table__expanded-cell {
            background-color: transparent;
        }

        /* 表格内背景颜色 */
        ::v-deep .el-table th,
        ::v-deep .el-table tr,
        ::v-deep .el-table td {
            background-color: transparent;
        }

        ::v-deep .el-table th {
            background: transparent !important;
        }
    }

    .product-right {
        flex: 1;

        .main-product {
            padding: 20px;

            .main-top {
                display: flex;
                align-items: center;
                color: #ccc;
                margin-bottom: 10px;
                gap: 20px;
            }

            .main-desc {
                ::v-deep .el-descriptions__body {
                    background-color: transparent;
                }
            }
        }
    }

}
</style>