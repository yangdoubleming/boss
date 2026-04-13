<template>
    <div v-loading="loading">
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
                市场管理 /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <div style="display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:15px">
            <el-button style="float:right" type="primary" icon="el-icon-document-copy" @click="_add">新增渠道</el-button>
        </div>
        <table-page @filter-item-change='changeSource' :tableData="tableData" :tableOperate="tableOperate"
            :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize" @quote="toDetail"
            @download="downloadCode" :detailTable="true" @conditional-query="handleColumnsFilter" :current="currentPage"
            @conditional-reset="handleConditionalReset" @page-change="handlePageChange">
        </table-page>
        <el-dialog width="25%" custom-class="source-dialog" title="新增渠道" :visible.sync="dialogFormVisible"
            :with-header="false" @close="closeDia">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                <el-form-item v-show="false" label="渠道编码" prop="code">
                    <el-input v-model="ruleForm.channelCode" placeholder="请输入渠道名称"></el-input>
                </el-form-item>
                <el-form-item label="渠道名称" prop="merchantName">
                    <el-input v-model="ruleForm.merchantName"></el-input>
                </el-form-item>
                <el-form-item label="一级来源" prop="oneSource">
                    <el-select @change="getFirstLevel" v-model="ruleForm.oneSource" placeholder="请选择一级来源">
                        <el-option v-for="item in addFirstLevel" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级来源" prop="twoSource">
                    <el-select @change="getThreeLevel" v-model="ruleForm.twoSource" placeholder="请选择二级来源">
                        <el-option v-for="item in addSecondLevel" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级来源" prop="threeSource">
                    <el-select @change="getFourLevel" v-model="ruleForm.threeSource" placeholder="请选择三级来源">
                        <el-option v-for="item in addThreeLevel" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="四级来源" prop="fourSource">
                    <el-select v-model="ruleForm.fourSource" placeholder="请选择四级来源">
                        <el-option v-for="item in addFourLevel" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="PC地址" prop="pcUrl">
                    <el-select v-model="ruleForm.pcUrl" placeholder="请选择PC地址">
                        <el-option v-for="item in pcUrl" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="小程序地址" prop="miniUrl">
                    <el-select v-model="ruleForm.miniUrl" placeholder="请选择小程序地址">
                        <el-option v-for="item in miniUrl" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否发送抢单" prop="isSend">
                    <el-select v-model="ruleForm.isSend" placeholder="请选择是否发送抢单">
                        <el-option value="0" label="是"></el-option>
                        <el-option value="1" label="否"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-btn">
                <el-button type="primary" @click="closeDia" style="width: 120px;">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" style="width: 120px;">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog width="25%" custom-class="source-dialog" title="修改渠道" :visible.sync="dialogFormVisibleEdit"
            :with-header="false" @close="closeDia">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                <el-form-item label="渠道名称" prop="merchantName">
                    <el-input v-model="ruleForm.merchantName" placeholder="请输入渠道名称"></el-input>
                </el-form-item>
                <el-form-item label="一级来源" prop="oneSource">
                    <el-select @change="getFirstLevel" v-model="ruleForm.oneSource" placeholder="请选择一级来源">
                        <el-option v-for="item in addFirstLevel" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级来源" prop="twoSource">
                    <el-select @change="getThreeLevel" v-model="ruleForm.twoSource" placeholder="请选择二级来源">
                        <el-option v-for="item in addSecondLevel" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级来源" prop="threeSource">
                    <el-select @change="getFourLevel" v-model="ruleForm.threeSource" placeholder="请选择三级来源">
                        <el-option v-for="item in addThreeLevel" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="四级来源" prop="fourSource">
                    <el-select v-model="ruleForm.fourSource" placeholder="请选择四级来源">
                        <el-option v-for="item in addFourLevel" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="PC地址" prop="pcUrl">
                    <el-select v-model="ruleForm.pcUrl" placeholder="请选择PC地址">
                        <el-option v-for="item in pcUrl" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="小程序地址" prop="miniUrl">
                    <el-select v-model="ruleForm.miniUrl" placeholder="请选择小程序地址">
                        <el-option v-for="item in miniUrl" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否发送抢单" prop="isSend">
                    <el-select v-model="ruleForm.isSend" placeholder="请选择是否发送抢单">
                        <el-option value="0" label="是"></el-option>
                        <el-option value="1" label="否"></el-option>

                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-btn">
                <el-button type="primary" @click="closeDia" style="width: 120px;">取 消</el-button>
                <el-button type="primary" @click="EditForm('ruleForm')" style="width: 120px;">确 定</el-button>
            </div>
        </el-dialog>
        <div id="qrcode" ref="qrcode" v-show="false"></div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { levelList, levelByInfo, addNewSource, loanMiniUrl, loanPCUrl, allSource, loanList, updateNewSource } from '../../../api/statistics';
export default {
    name: 'channel-admin',
    mixins: [tableMixin],
    components: {
        tablePage,
        QRCode
    },
    data() {
        return {

            loading: false,
            dialogFormVisible: false,
            dialogFormVisibleEdit: false,
            tableOperate: [],
            ruleForm: {
                createBossName: '', //boss登录账号 前端获取
                merchantName: '',
                pcUrl: '',
                miniUrl: '',
                oneSource: '',
                twoSource: '',
                threeSource: '',
                fourSource: '',
                isSend: '0'
            },
            rules: {
                channelCode: [
                    { required: true, message: '请输入渠道码', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                ],
                merchantName: [
                    { required: true, message: '请输入渠道名称', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                isSend: [
                    { required: true, message: '请选择是否发送抢单', trigger: 'blur' },
                ],
            },
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '渠道名称',
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '渠道编码',
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '级别',
                    filterable: true,
                    options: [],
                    level: 1
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '父级来源',
                    filterable: true,
                    options: [],
                    level: 2
                },

            ],
            columns: [
                {
                    label: '渠道名称',
                    prop: 'merchantName',
                },
                {
                    label: '渠道编码',
                    prop: 'channelCode',
                },
                {
                    label: 'PC链接',
                    prop: 'pcUrl',
                },
                {
                    label: '小程序链接',
                    prop: 'miniUrl',
                },
                {
                    label: '是否推送',
                    prop: 'isSend'
                },
                {
                    label: '创建人',
                    prop: 'createBossName',
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '200',
                    operates: [
                        {
                            event: 'quote',
                            text: this.$t('loan_detail_xg'),
                            type: 'primary'
                        }, {
                            event: 'download',
                            text: '下载小程序二维码',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            currentPage: 1,
            addLevelAll: [],
            addFirstLevel: [],
            addSecondLevel: [],
            addThreeLevel: [],
            addFourLevel: [],
            miniUrl: [],
            pcUrl: [],
            allSourceList: []
        };
    },
    activated() { },
    created() {
        this.ruleForm.createBossName = localStorage['userName']
        // 获取列表
        // this._getList();
        this.getLevel()
        this.getFirstLevel()
        this.getAllUrl()
        this.allSource()
    },
    methods: {
        // 条件查询获取所有级别
        getLevel() {
            if (!this.ruleForm.oneSource) {
                levelList().then(res => {
                    let option = []
                    res.data.forEach((item, index) => {
                        let obj = {}
                        obj.label = item;
                        obj.value = Number(index) + 1
                        // item = obj
                        option.push(obj)
                    });
                    this.filterOptions[2].options = option
                })
            }
        },
        //条件查询切换条件
        changeSource(val, prop) {
            if (prop.level == 1) {
                this.filterOptions[3].options = []
                this.filterOptions[3].value = ''
                if (val == 1) {
                    this.filterOptions[3].options = []
                }
                else {
                    levelByInfo({ level: val - 1 }).then(res => {
                        let option = []
                        res.data.forEach((item) => {
                            let obj = {}
                            obj.label = item.name;
                            obj.value = item.id
                            // item = obj
                            option.push(obj)
                        });
                        this.filterOptions[3].options = option;
                    })
                }
            }

        },
        //新增弹窗获取所有数据
        allSource() {
            this.allSourceList = []

            allSource().then(res => {
                this.allSourceList = res.data

                // this.allSourceList = Object.fromEntries(tempList)
            })
        },
        //新增弹窗获取一级来源
        getFirstLevel(val) {
            if (!this.ruleForm.oneSource) { //刚进来
                levelByInfo({ level: 1, pid: 0 }).then(res => {
                    res.data.forEach(item => {
                        let obj = {}
                        obj.label = item.name;
                        obj.value = item.id
                        this.addFirstLevel.push(obj)
                    })
                })
            } else {
                this.addSecondLevel = []
                this.ruleForm.twoSource = ''
                this.addThreeLevel = []
                this.ruleForm.threeSource = ''
                this.addFourLevel = []
                this.ruleForm.fourSource = ''
                levelByInfo({ level: 2, pid: val }).then(res => {
                    if (res.data.length) {
                        res.data.forEach(item => {
                            let obj = {}
                            obj.label = item.name;
                            obj.value = item.id
                            this.addSecondLevel.push(obj)
                        })
                    }
                })
            }
        },
        //新增弹窗获取三级来源
        getThreeLevel(val) {
            this.addThreeLevel = []
            this.ruleForm.threeSource = ''
            levelByInfo({ level: 3, pid: val }).then(res => {
                if (res.data.length) {
                    res.data.forEach(item => {
                        let obj = {}
                        obj.label = item.name;
                        obj.value = item.id
                        this.addThreeLevel.push(obj)
                    })
                }
            })
        },
        //新增弹窗获取四级来源
        getFourLevel(val) {
            this.addFourLevel = []
            this.ruleForm.fourSource = ''
            levelByInfo({ level: 4, pid: val }).then(res => {
                if (res.data.length) {
                    res.data.forEach(item => {
                        let obj = {}
                        obj.label = item.name;
                        obj.value = item.id
                        this.addFourLevel.push(obj)
                    })
                } else {
                    this.addFourLevel = []
                    this.ruleForm.fourSource = ''
                }

            })
        },
        //新增时获取网页地址
        getAllUrl() {
            this.pcUrl = []
            this.miniUrl = []
            loanPCUrl().then(res => {
                res.data.forEach(item => {
                    let obj = {}
                    obj.label = item;
                    obj.value = item
                    this.pcUrl.push(obj)
                })

            })
            loanMiniUrl().then(res => {
                res.data.forEach(item => {
                    let obj = {}
                    obj.label = item;
                    obj.value = item
                    this.miniUrl.push(obj)
                })

            })
        },
        //生成二维码
        productCode(miniUrl) {
            this.$nextTick(() => {
                let div = document.createElement('div');// 创建一个div,用来生成二维码
                let qrcode = new QRCode(div, { // 第一个入参是组件id
                    text: miniUrl, // 生成二维码的文本
                    width: 300,
                    height: 300,
                    colorDark: '#000000', // 二维码色
                    colorLight: '#ffffff', // 背景色
                    correctLevel: QRCode.CorrectLevel.H // 容错等级，H是heigh，最高，所以二维码看起来很密
                })
                let logo = new Image();
                logo.crossOrigin = 'Anonymous';
                logo.src = require("@/assets/mofond-center.png") // 填入你本地log图片
                // 生成log图
                logo.onload = () => {
                    let container = this.$refs.qrcode;
                    // 获取页面上的div,可以使用document.querySelector()等等方法,不类推了
                    if (container.innerHTML != "") {
                        // 获取页面div , 有则清空已存在的
                        container.innerHTML = ""
                    }
                    let qrImg = qrcode._el.getElementsByTagName('img')[0]; // 获取二维码
                    let canvas = qrcode._el.getElementsByTagName('canvas')[0]; // 获取canvas
                    let ctx = canvas.getContext("2d");
                    ctx.drawImage(logo, 300 * 0.5 - 55, 300 * 0.5 - 55, 100, 100); // 写入log
                    qrImg.src = canvas.toDataURL();
                    container.appendChild(qrcode._el);
                    console.log(this.$refs.qrcode, 'this.$refs.qrcode');
                    this.$nextTick(() => {
                        var canvasData = this.$refs.qrcode.children[0].children[1]
                        var a = document.createElement("a");
                        var event = new MouseEvent("click"); // 创建一个单击事件
                        a.href = canvasData.src;
                        a.download = "drcQrcode";
                        a.dispatchEvent(event); // 触发a的单击事件
                    })

                }

            })

        },
        //下载二维码
        downloadCode(row) {
            this.productCode(row.miniUrl)
        },
        _add() {
            this.dialogFormVisible = true;
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.ruleForm.createBossName = localStorage['userName']
                    addNewSource(this.ruleForm).then(res => {
                        this.$message.success('提交成功')
                        // 获取列表
                        this._getList()
                        // 数据还原
                        this.backData()
                        this.loading = false
                    }).catch(err => {
                        this.loading = false
                    })

                }
            });
        },
        // 数据还原
        backData() {
            this.dialogFormVisibleEdit = false
            this.dialogFormVisible = false
            this.currentPage = 1
            this.ruleForm = {
                createBossName: '', //boss登录账号 前端获取
                merchantName: '',
                pcUrl: '',
                miniUrl: '',
                oneSource: '',
                twoSource: '',
                threeSource: '',
                fourSource: '',
                isSend: '0'
            }
            this.addSecondLevel = []
            this.addThreeLevel = []
            this.addFourLevel = []
        },
        // 获取列表
        _getList() {
            this.loading = true
            loanList({
                current: this.currentPage,
                size: 10,
                name: this.filterOptions[0].value,
                channelCode: this.filterOptions[1].value,
                level: this.filterOptions[2].value,
                pid: this.filterOptions[3].value,
            }).then(res => {
                this.loading = false
                res.data.records.forEach(item => {
                    if (item.isSend == 1) {
                        item.isSend = '否'
                    } else {
                        item.isSend = '是'
                    }
                })
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            }).catch(err => {
                this.loading = false
            });
        },
        //修改查询父级
        searchByParent(item) {
            if (item.oneSource == 0) {
                item.oneSource = ""
            }
            if (item.twoSource == 0) {
                item.twoSource = ""
            }
            if (item.threeSource == 0) {
                item.threeSource = ""
            }
            if (item.fourSource == 0) {
                item.fourSource = ""
            }
            let addSecondLevelTemp = this.allSourceList.filter(it => it.level == 2 && it.pid == item.oneSource)
            addSecondLevelTemp.forEach(item => {
                let obj = {}
                obj.label = item.name;
                obj.value = item.id
                this.addSecondLevel.push(obj)
            })
            let addThreeLevelTemp = this.allSourceList.filter(it => it.level == 3 && it.pid == item.twoSource)
            addThreeLevelTemp.forEach(item => {
                let obj = {}
                obj.label = item.name;
                obj.value = item.id
                this.addThreeLevel.push(obj)
            })
            let addFourLevelTemp = this.allSourceList.filter(it => it.level == 4 && it.pid == item.threeSource)
            addFourLevelTemp.forEach(item => {
                let obj = {}
                obj.label = item.name;
                obj.value = item.id
                this.addFourLevel.push(obj)
            })

        },
        toDetail(item) {
            this.ruleForm = Object.assign(this.ruleForm, item)
            // this.ruleForm.isSend == '是' ? this.ruleForm.isSend = 0 : this.ruleForm.isSend = 1
            console.log(this.ruleForm);
            this.searchByParent(this.ruleForm)
            this.dialogFormVisibleEdit = true
        },
        //修改确定
        EditForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.ruleForm.createBossName = localStorage['userName']
                    this.ruleForm.pcUrl && this.ruleForm.pcUrl.includes('code') ? this.ruleForm.pcUrl = this.ruleForm.pcUrl : this.ruleForm.pcUrl = this.ruleForm.pcUrl + '&code=' + this.ruleForm.channelCode
                    this.ruleForm.miniUrl && this.ruleForm.miniUrl.includes('code') ? this.ruleForm.miniUrl = this.ruleForm.miniUrl : this.ruleForm.miniUrl = this.ruleForm.miniUrl + '&code=' + this.ruleForm.channelCode
                    if (this.ruleForm.isSend == '是') {
                        this.ruleForm.isSend = 0
                    } else if (this.ruleForm.isSend == '否') {
                        this.ruleForm.isSend = 1
                    }
                    let updateForm = {
                        merchantName: this.ruleForm.merchantName,
                        channelCode: this.ruleForm.channelCode,
                        id: this.ruleForm.id,
                        miniUrl: this.ruleForm.miniUrl,
                        pcUrl: this.ruleForm.pcUrl,
                        oneSource: this.ruleForm.oneSource,
                        twoSource: this.ruleForm.twoSource,
                        threeSource: this.ruleForm.threeSource,
                        fourSource: this.ruleForm.fourSource,
                        isSend: this.ruleForm.isSend,
                    }
                    updateNewSource(updateForm).then(res => {
                        this.$message.success('修改成功')
                        // 获取列表
                        this._getList()
                        // 数据还原
                        this.backData()
                        this.loading = false
                    }).catch(err => {
                        this.loading = false
                    })
                }
            });
        },
        closeDia() {
            // 数据还原
            this.backData()
        }
    }
};
</script>
<style lang='less' scoped>
.source-dialog {
    /deep/ .el-select {
        width: 100%;
    }

    /deep/ .el-form--inline .el-form-item {
        margin-right: -10px
    }

    .dialog-btn {
        display: flex;
        justify-content: center;
        gap: 35px;
    }

    /deep/.el-dialog__body {
        padding: 30px 20px 0 !important;
    }
}

/deep/ .source-dialog .el-select {
    width: 100%;
}

/deep/ .source-dialog .el-dialog__body {
    padding: 30px 20px 0 !important;
}
</style>