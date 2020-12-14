<template>
    <div>
        <el-button @click="login">login</el-button>
    </div>
</template>

<script>
import util from "@/libs/util";

export default {
    name: "Login",
    methods: {
        login() {
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
                        },
                    ],
                },
            ];
            console.log(dataList);
            this.$store.dispatch("store/menus", {
                dataList,
            });
            console.log(this.$store.getters["store/menus/getMenu"]);
            util.cookies.set("token", "token");
            // this.$router.push({ path: "/index" });
        },
    },
};
</script>

<style scoped></style>
