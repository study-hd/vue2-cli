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
            util.cookies.set("token", "token");
            this.$router.push({ path: "/index" });
        },
    },
};
</script>

<style scoped></style>
