<template>
    <div class="home">
        <el-container class="header">
            <el-header>
                <div :class="isCollapse ? 'logo logo-collapse' : 'logo'">
                    <object v-show="!isCollapse" :data="imgSrc[0]" width="210" height="50" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/install/" />
                    <object v-show="isCollapse" :data="imgSrc[1]" width="55" height="50" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/install/" />
                </div>
                <div class="com-pointer change-collapse">
                    <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="toggleCollapse"></i>
                </div>
                <div :class="isCollapse ? 'com-text-right info-collapse' : 'com-text-right info'">
                    <router-link to="/demo">Demo</router-link>
                </div>
            </el-header>
        </el-container>
        <el-container class="content">
            <el-aside width="auto">
                <!--      <menu-main :isCollapse="isCollapse" class="el-menu-main"></menu-main>-->
            </el-aside>
            <el-main>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "Index",
    components: {
        Menu,
    },
    data() {
        return {
            imgSrc: [require("@/assets/logo.png"), require("@/assets/logo.png")],
            isCollapse: false,
        };
    },
    // 通过store获取菜单信息，且事实监控
    computed: {
        menuList() {
            console.log(this.$store.getters["store/menus/getMenus"]);
            return Storage.getSessionItem("menus");
        },
    },
    // watch: {
    //     menuList(newVal, oldVal) {
    //         this.menuList = newVal;
    //     },
    // },
    methods: {
        toggleCollapse() {
            this.isCollapse = !this.isCollapse;
        },
    },
};
</script>

<style lang="scss" scoped>
.title {
    font-size: 16px;
}
.test-box {
    background-color: aqua;
    width: 200px;
    height: 200px;
    margin-top: 20px;
}
</style>
