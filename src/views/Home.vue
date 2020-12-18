<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <el-button @click="$router.push({ path: '/404' })">to 404</el-button>
        <el-button @click="$router.push({ path: '/error' })">to error</el-button>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            imgSrc: [require("@/assets/logo.png"), require("@/assets/logo.png")],
            isCollapse: false,
        };
    },
    methods: {
        toggleCollapse() {
            this.isCollapse = !this.isCollapse;
        },
    },
};
</script>

<style lang="scss" scoped></style>
