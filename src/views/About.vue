<template>
    <div class="about">
        <h1>This is an about page</h1>
        <img alt="Vue logo" src="../assets/logo.png" />
        <el-button @click="collapse = !collapse"></el-button>
        <Menu :collapse="collapse"></Menu>
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
    data() {
        return {
            collapse: false,
        };
    },
};
</script>
