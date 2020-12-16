<template>
    <div>
        <el-button @click="submitForm">login</el-button>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Login",
    methods: {
        ...mapActions("store/account", ["login"]),
        async submitForm() {
            await this.login({
                username: "admin",
                password: "admin123",
            }).then((resp) => {
                console.log(resp);
            });
            await this.$router.push({ path: "/index" });
        },
    },
};
</script>

<style scoped></style>
