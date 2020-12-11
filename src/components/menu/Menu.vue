<template>
    <el-menu :default-active="defaultActive" :collapse="collapse" @select="selectMenu">
        <template v-for="(item, index) in routerList">
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-submenu index="1">
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
            routerList: [],
        };
    },
    created() {
        this.initMenu();
    },
    methods: {
        initMenu() {
            const dataList = [
                {
                    key: "index",
                    name: "首页",
                    title: "首页",
                    path: "index",
                    fileUrl: "About",
                    icon: "el-icon-location",
                    hidden: true,
                    disabled: false,
                    auth: true,
                    noCache: false,
                },
                {
                    key: "test",
                    name: "测试",
                    title: "测试",
                    path: "test",
                    fileUrl: "test/DynamicTest",
                    icon: "el-icon-location",
                    hidden: true,
                    disabled: false,
                    auth: true,
                    noCache: false,
                    children: [
                        {
                            key: "test2",
                            name: "测试2",
                            title: "测试2",
                            path: "test2",
                            fileUrl: "test/DynamicTest2",
                            icon: "el-icon-location",
                            hidden: true,
                            disabled: false,
                            auth: true,
                            noCache: false,
                        }
                    ],
                },
            ];
            this.setRouter(this.routerList, dataList);
        },
        setRouter(routerList, dataList) {
            for (let data of dataList) {
                data.path = "/" + data.path;
                data['component'] = () => import("@/views/" + data.fileUrl)
                if (data.children && data.children.length > 0) {
                    this.setItemRouter(routerList, dataList);
                }
            }
        },
        setItemRouter(routerList, dataList) {

        },
        selectMenu(index, indexPath) {
            console.log("select-menu", index, indexPath);
            this.$router.push({ path: "/" });
        },
    },
};
</script>

<style scoped></style>
