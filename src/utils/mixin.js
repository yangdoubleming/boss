import tablePage from '../components/common/tablePage.vue';
// import XForm from '../components/common/XForm.vue'
import XTable from '../components/common/Xtable.vue';
export const tableMixin = {
    data() {
        return {
            currentPage: 1, //页码
            totalSize: 0, //数据总条数
            tableData: [],
            exportData: [],
            isExporting: false
        };
    },
    components: {
        tablePage,
        XTable
    },
    created() {
        if (this.miI == 1) {

        } else { 
      this._getList();
        }
      
    },

    methods: {
        handleConditionalQuery() {
            this._getListFirstPage();
        },
        //重置
        handleConditionalReset() {
            this.filterOptions.forEach((item) => {
                item.value = '';
            });
            this._getListFirstPage();
        },
        //查询
        handleColumnsFilter(val) {
            // this.columns.forEach(item => {
            //     if (item.label === Object.keys(val)[0]) {
            //         item.filtersVal = Object.values(val)[0]
            //     }
            // })
            this.currentPage = 1;
            this._getList();
        },
        handlePageChange(page) {
            this.currentPage = page;
            this._getList();
        },
        //     formatJson(filterVal, jsonData) {
        //       return jsonData.map(v => filterVal.map(j => {
        //         return v[j]
        //       }))
        //     },
        _getListFirstPage() {
            this.currentPage = 1;

            this._getList();
        }
    }
};
