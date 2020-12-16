<template>
    <div class="index">
        <el-container class="header">
            <el-header>
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
                <Menu :collapse="isCollapse"></Menu>
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
import Menu from "@/components/menu/Menu.vue";

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
.index {
    width: 100%;
    height: 100vh;
    overflow: auto;
    .header {
        .el-header {
            padding: 0;
            display: flex;
            align-items: center;
        }
        .logo {
            background-color: #000;
        }
    }
}
</style>
