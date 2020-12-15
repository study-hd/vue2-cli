<template>
    <div class="about">
        <h1>This is an about page</h1>
        <img alt="Vue logo" src="../assets/logo.png" />
        <el-button @click="collapse = !collapse"></el-button>
    </div>
</template>

<script>
export default {
    name: "About",
    data() {
        return {
            collapse: false,
        };
    },
};
</script>

<style lang="scss" scoped></style>
