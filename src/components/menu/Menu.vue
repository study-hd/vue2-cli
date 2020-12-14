<template>
    <el-menu :default-active="defaultActive" :collapse="collapse" @select="selectMenu">
        <template v-for="(item, index) in menuList">
            <el-submenu v-if="!item.children" :index="index" :key="index">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                <el-menu-item-group>
                    <span slot="title">分组一</span>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item v-else :index="index" :key="index">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script>
export default {
    name: "Menu",
    props: {
        collapse: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            defaultActive: "",
            uniqueOpened: false,
        };
    },
    // 通过store获取菜单信息，且事实监控
    computed: {
        menuList() {
            return this.$store.getters["menu"];
        },
    },
    // watch: {
    //     menuList(newVal, oldVal) {
    //         this.menuList = newVal;
    //     },
    // },
    methods: {
        selectMenu(index, indexPath) {
            console.log("select-menu", index, indexPath);
            this.$router.push({ path: "/" });
        },
    },
};
</script>

<style scoped></style>
