<template>
    <div class="index">
        <el-container>
            <el-header>
                <Header @isCollapse="toggleCollapse"></Header>
            </el-header>
        </el-container>
        <el-container>
            <el-aside width="auto">
                <Menu :collapse="isCollapse"></Menu>
            </el-aside>
            <el-main>
                <!-- :include="whiteList" :exclude="blackList" :max="amount"-->
                <keep-alive>
                    <transition><router-view></router-view></transition>
                </keep-alive>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";

export default {
    name: "Index",
    components: {
        Header,
        Menu,
    },
    data() {
        return {
            isCollapse: false,
        };
    },
    methods: {
        toggleCollapse(value) {
            this.isCollapse = value;
        },
    },
};
</script>

<style lang="scss" scoped>
.index {
    width: 100%;
    height: 100%;
    .el-header {
        padding: 0;
        display: flex;
        align-items: center;
    }
}
</style>
