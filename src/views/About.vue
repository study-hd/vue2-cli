<template>
    <div class="about">
        <h1>This is an about page</h1>
        <img alt="Vue logo" src="../assets/logo.png" />
        <el-button @click="collapse = !collapse"></el-button>
        <Menu :menuList="menuList" :collapse="collapse"></Menu>
    </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/menu/Menu.vue";

export default {
    name: "About",
    components: {
        Menu,
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
    data() {
        return {
            collapse: false,
        };
    },
};
</script>
