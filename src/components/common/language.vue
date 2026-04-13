<template>
    <el-dropdown @command="handleCommand" class="user-name">
        <span class="el-dropdown-link drop-title">
            <img src="../../../public/img/en.png" style="height:25px;" v-if="this.command == 'EN'" />
            <img src="../../../public/img/cn.png" style="height:25px;" v-if="this.command == 'CN'" />
            <span>{{ command }}</span>
            <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="CN" class="drop-item"><img src="../../../public/img/cn.png"
                    style="height:25px;" /><span>CN</span></el-dropdown-item>
            <el-dropdown-item command="EN" class="drop-item"><img src="../../../public/img/en.png"
                    style="height:25px;margin-top: 6px;" /><span>EN</span></el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { changeList } from '../../utils/lan'
export default {
    data() {
        return {
            command: '',
            menuList: []
        }
    },
    activated() {

    },
    mounted() {
        if (sessionStorage.getItem('locale') === 'en') {
            this.command = 'EN'
            this.$i18n.locale = 'en'
            sessionStorage.setItem('locale', 'en')
        } else {
            this.command = 'CN'
            this.$i18n.locale = 'zh'
            sessionStorage.setItem('locale', 'zh')
        }
    },
    methods: {
        handleCommand(command) {
            this.command = command
            if (command === 'EN') {
                sessionStorage.setItem('locale', 'en')
                this.$i18n.locale = 'en'
                this.changeMenuList()
                window.location.reload()
            } else {
                sessionStorage.setItem('locale', 'zh')
                this.$i18n.locale = 'zh'
                this.changeMenuList()
                window.location.reload()

            }
        },
        changeMenuList() {
            this.menuList = JSON.parse(localStorage.getItem('menuList'))
            this.mapTree(this.menuList)
        },
        mapTree(data) {
            if (this.command == 'EN') {
                data.forEach(items => {    //
                    if (items.name) {
                        changeList.forEach(ele => {
                            if (items.name == ele.cn) {
                                items.name = ele.en
                            }
                        })
                    }
                    if (items.childrenPage.length === 0) {
                        localStorage.setItem('menuList', JSON.stringify(this.menuList))
                        this.$store.dispatch("setTopTitleName", this.menuList);
                        return false
                    }
                    if (items.childrenPage.length > 0) {
                        this.mapTree(items.childrenPage)
                    }
                })
            } else {
                data.forEach(items => {    //
                    if (items.name) {
                        changeList.forEach(ele => {
                            if (items.name == ele.en) {
                                items.name = ele.cn
                            }
                        })
                    }
                    if (items.childrenPage.length === 0) {
                        localStorage.setItem('menuList', JSON.stringify(this.menuList))
                        this.$store.dispatch("setTopTitleName", this.menuList);
                        return false
                    }
                    if (items.childrenPage.length > 0) {
                        this.mapTree(items.childrenPage)
                    }
                })
            }

        },
    }
}
</script>
<style scoped>
.user-name {
    cursor: pointer;
}

.drop-title {
    color: #ffffff;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 52px;
    background: #121212;
    border-radius: 50px;
    margin-top: 16px;
}

.drop-title img {
    display: inline-block;
}

.drop-title span {
    display: inline-block;
    margin: 0px 6px;
}

.drop-title i {
    display: inline-block;
    font-size: 20px;
    color: #F40064;
}

.drop-item {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.drop-item img {
    display: inline-block;
    margin-right: 10px;
}

.drop-item span {
    display: inline-block;
}
</style>