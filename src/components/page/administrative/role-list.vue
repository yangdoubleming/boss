<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />保险后台
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <div style="text-align:right">
            <el-button type="primary" icon="el-icon-user" @click="dialogFormVisible = true">新增角色</el-button>
            <el-button type="primary" icon="el-icon-edit-outline" @click="dialogFormVisible5 = true">菜单管理</el-button>
        </div>
        <table-page :tableData="tableData" :showFilterRadio="false" :filterOptions="filterOptions" :columns="columns"
            :totalSize="totalSize" @quote="showEdit" @conditional-query="handleColumnsFilter" :current="currentPage"
            @conditional-reset="handleConditionalReset" @page-change="handlePageChange" />
        <!-- ====================================================新增角色弹框========================================================= -->
        <el-dialog title="新增角色" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
            <el-form :model="form" style="padding-left:20px" label-width="60px">
                <el-form-item label="角色名">
                    <el-input v-model="form.name" autocomplete="off" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="编码">
                    <el-input v-model="form.code" autocomplete="off" style="width:200px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRoleEvent">确 定</el-button>
            </div>
        </el-dialog>
        <!-- ====================================================权限管理弹窗========================================================= -->
        <el-dialog title="权限管理" :visible.sync="dialogFormVisible2" width="30%" :close-on-click-modal="false">
            <el-tree ref="tree" :data="menuList" show-checkbox node-key="id" :props="defaultProps"
                :default-checked-keys="defaultChecked" :expand-on-click-node="true" :highlight-current="true"
                :default-expand-all="true"></el-tree>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="addAdmin">确 定</el-button>
            </div>
        </el-dialog>
        <!-- ====================================================菜单编辑========================================================= -->
        <el-dialog title="菜单管理" :visible.sync="dialogFormVisible5" width="30%" :close-on-click-modal="false">
            <el-button size="mini" @click="addNO1" style="margin-bottom:30px">新增一级菜单</el-button>
            <el-tree ref="tree" :data="menuList" node-key="id" :props="defaultProps" :expand-on-click-node="true"
                :allow-drop="allowDrop" :draggable="true">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span style="padding-left:10px">
                        <el-button type="text" size="mini" @click="() => append(data)">新增</el-button>
                        <el-button type="text" size="mini" @click="() => edit(data)">编辑</el-button>
                        <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
                    </span>
                </span>
            </el-tree>
            <div style="height:50px"></div>
        </el-dialog>
        <!-- ====================================================新增路由弹窗========================================================= -->
        <el-dialog title="新增" :visible.sync="dialogFormVisible3" width="23%" :close-on-click-modal="false">
            <el-form :model="form" style="padding-left:20px" label-width="80px">
                <el-form-item label="类型">
                    <el-radio v-model="addRouterForm.type" label="PAGE">菜单</el-radio>
                    <el-radio v-model="addRouterForm.type" label="BUTTON">二级页面或按钮</el-radio>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="addRouterForm.name" autocomplete="off" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="路径">
                    <el-input v-model="addRouterForm.path" autocomplete="off" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="icon序号">
                    <el-input v-model="addRouterForm.icon" autocomplete="off" style="width:200px"></el-input>
                    <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                        <div slot="content">
                            <img src="../../../assets/icon.jpg" alt="">
                        </div>
                        <i class="el-icon-picture-outline" style="margin-left:10px;width:18px;height:18px"></i>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="序号">
                    <el-input v-model="addRouterForm.sequence" autocomplete="off" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="code">
                    <el-input v-model="addRouterForm.code" autocomplete="off" style="width:200px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="pushRouter">确 定</el-button>
            </div>
        </el-dialog>

        <!-- ====================================================编辑路由弹窗========================================================= -->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible4" width="23%" @destroy-on-close="hiddenEditRouter" :close-on-click-modal="false">
            <el-form :model="editForm" style="padding-left:20px" label-width="80px">
                <el-form-item label="类型">
                    <el-radio v-model="editForm.type" label="PAGE">菜单</el-radio>
                    <el-radio v-model="editForm.type" label="BUTTON">二级页面或按钮</el-radio>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="editForm.name" autocomplete="off" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="路径">
                    <el-input v-model="editForm.path" autocomplete="off" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="icon序号">
                    <el-input v-model="editForm.icon" autocomplete="off" style="width:200px"></el-input>
                    <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                        <div slot="content">
                            <img src="../../../assets/icon.jpg" alt="">
                        </div>
                        <i class="el-icon-picture-outline" style="margin-left:10px;width:18px;height:18px"></i>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="序号">
                    <el-input v-model="editForm.sequence" autocomplete="off" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="code">
                    <el-input v-model="editForm.code" autocomplete="off" style="width:200px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="editRouter">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
    roleList,
    addRole,
    addPermission,
    getMenu,
    permissionList,
    permissionAllocat,
    permissionSave,
    permissionDelete,
    update
} from '../../../api/user';
export default {
    name: 'role-list',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            addRouterForm: {
                name: '',
                parentId: '',
                path: '',
                children: [],
                icon: '',
                type: 'PAGE',
                code: '',
                sequence: ''
            },
            defaultChecked: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            form: {
                name: '',
                code: ''
            },
            dialogFormVisible: false, //新增角色
            dialogFormVisible2: false, //修改角色权限弹框
            dialogFormVisible3: false, //新增路由
            dialogFormVisible4: false, //编辑路由
            dialogFormVisible5: false, //菜单管理
            chooseMenu: {
                id: ''
            },
            tableData: [],
            chooseId: '',
            filterOptions: [
                // {
                //     type: 'input',
                //     value: '',
                //     placeholder: '用户名',
                //     filterable: true,
                //     options: []
                // },
            ],
            columns: [
                {
                    label: '角色',
                    prop: 'name'
                },
                {
                    label: '最后修改时间',
                    prop: 'updateTime'
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime'
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '120',
                    operates: [
                        {
                            event: 'quote',
                            text: '权限管理',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            menuList: [],
            editForm: {}
        };
    },
    created() {
        getMenu().then((res) => {
            this.menuList = res.data;
            // this.concatBtnOrPage(this.menuList);
            this.filerMenuList(this.menuList);
        });
    },
    methods: {
        // 停止拖拽时节点可放置的位置
        allowDrop(moveNode, inNode, type) {
            return false;
            //     // 不能拖拽到级别里面
            //     console.log(moveNode);
            //     console.log(inNode);
            //     this.menuList.forEach(item=>{
            //         if(item.id==)
            //     })
            //   if (type === "inner") return;
            //   if (moveNode.nextSibling === undefined) {
            //     return type === "prev";
            //   } else if (inNode.nextSibling === undefined) {
            //     return type === "next";
            //   } else if (moveNode.nextSibling.id !== inNode.id) {
            //     return type === "prev";
            //   } else {
            //     return type === "next";
            //   }
        },
        addNO1() {
            this.chooseMenu.id = '';
            this.dialogFormVisible3 = true;
        },
        // 编辑路由提交
        editRouter() {
            update({
                // code: this.editForm.path + Math.ceil(Math.random() * 99999),
                code: this.editForm.code,
                icon: this.editForm.icon,
                id: this.editForm.id,
                path: this.editForm.path,
                type: this.editForm.type,
                name: this.editForm.name,
                sequence: this.editForm.sequence
            }).then((res) => {
                this.dialogFormVisible4 = false;
                this.$message.success('编辑成功！');
                this._getment();
            });
        },
        // 编辑弹框
        edit(node) {
            this.dialogFormVisible4 = true;
            this.editForm = JSON.parse(JSON.stringify(node));
        },
        _getment() {
            getMenu().then((res) => {
                // this.concatBtnOrPage(res.data);
                this.filerMenuList(res.data);
                this.menuList = res.data;
                // permissionList(this.chooseId).then((res) => {
                //     this.filterTreeDefaultChecked(res.data);
                //     this.$message({
                //         type: 'success',
                //         message: '操作成功!'
                //     });
                // });
            });
        },

        // concatBtnOrPage(list) {
        //     if (list && list.length)
        //         list.forEach((item) => {
        //             this.concatBtnOrPage(item.children);
        //             item.children = item.childrenButton.concat(item.childrenPage);
        //         });
        // },
        // 递归每级  将childrenButton 跟 childrenPage 合并
        filerMenuList(list) {
            if (list && list.length)
                list.forEach((item) => {
                    this.filerMenuList(item.childrenPage);
                    this.filerMenuList(item.childrenButton);
                    item.children = item.childrenButton.concat(item.childrenPage);
                    item.label = item.name;
                });
        },
        // 新增路由提交
        pushRouter() {
            this.addRouterForm.label = this.addRouterForm.name;
            this.addRouterForm.code = this.addRouterForm.code;
            // this.addRouterForm.code = this.addRouterForm.path + Math.ceil(Math.random() * 99999);
            this.addRouterForm.parentId = this.chooseMenu.id;
            this.addRouterForm.icon = this.addRouterForm.icon ? this.addRouterForm.icon : 'el-icon-eleme';
            permissionSave(this.addRouterForm).then((res) => {
                // this.chooseMenu.children.push(this.addRouterForm);
                this.dialogFormVisible3 = false;
                Object.keys(this.addRouterForm).forEach((key) => {
                    this.addRouterForm[key] = '';
                });
                this.addRouterForm.children = [];
                this.addRouterForm.type = 'PAGE';
                this.addRouterForm.id = ' ';
                this._getment();
            });
        },
        // 编辑弹框关闭后 重置表单
        hiddenEditRouter() {
            Object.keys(this.editForm).forEach((key) => {
                this.editForm[key] = '';
            });
            this.editForm.children = [];
            this.editForm.type = 'PAGE';
            this.editForm.id = ' ';
        },

        // 新增弹框
        append(data) {
            Object.keys(this.addRouterForm).forEach((key) => {
                this.addRouterForm[key] = '';
            });
            this.addRouterForm.children = [];
            this.addRouterForm.type = 'PAGE';
            this.dialogFormVisible3 = true;
            this.chooseMenu = data;
        },
        // 删除路由
        remove(node, data) {
            this.$confirm('将删除该路由, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    permissionDelete({
                        id: data.id
                    }).then((res) => {
                        this._getment();
                    });
                })
                .catch(() => { });
        },
        // 权限管理 提交
        addAdmin() {
            this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys());
            // 这个是半选中状态的父节点id
            let expandList = this.$refs.tree.getHalfCheckedKeys();
            // 这个是选中结点的id
            let idList = this.$refs.tree.getCheckedKeys();

            permissionAllocat({
                roleId: this.chooseId,
                permissionIdList: expandList.concat(idList).join(',')
            }).then((res) => {
                this.$message.success('操作成功');
                this.dialogFormVisible2 = false;
            });
        },

        // 新增角色
        addRoleEvent() {
            addRole(this.form).then((res) => {
                this.$message.success('新增成功！');
                this.dialogFormVisible = false;
                this._getList();
                this.form.name = ''
                this.form.code = ''
            });
        },
        // 树形控件 默认选中
        filterTreeDefaultChecked(data) {
            data.forEach((item) => {
                if (item.children && item.children.length) {
                    this.filterTreeDefaultChecked(item.children);
                } else {
                    this.defaultChecked.push(item.id);
                }
            });
        },
        _getList() {
            roleList(this.currentPage).then((res) => {
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        // 新增角色弹框
        showEdit(val) {
            this.chooseId = val.id;
            this.defaultChecked = [];
            permissionList(val.id).then((res) => {
                this.dialogFormVisible2 = true;
                this.filerMenuList(res.data);
                this.filterTreeDefaultChecked(res.data);
                this.$nextTick(() => {
                    this.$refs.tree.setCheckedKeys(this.defaultChecked);
                })
            });
        }
    }
};
</script>

<style>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    /* align-items: center; */

    height: 100px;
}

.grid-cont-right {
    height: 100%;
    font-size: 14px;
    color: #999;
    display: flex;
    margin-top: 24px;
    margin-left: 24px;

    flex-direction: column;
}

.grid-num {
    font-size: 16px;
}

.grid-num2 {
    font-size: 16px;
    padding-top: 12px;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
</style>