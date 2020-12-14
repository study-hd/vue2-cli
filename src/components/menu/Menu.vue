<template>
    <el-menu :default-active="defaultActive" :collapse="collapse" @select="selectMenu">
        <template v-for="(item, index) in menuList">
            <el-menu-item v-if="item.children" :index="item.key" :key="index">
                <!-- 此处图标可以自定义 -->
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <SubMenu v-else :subMenuList="item.children" :index="item.key" :key="index"></SubMenu>
        </template>
    </el-menu>
</template>

<script>
import SubMenu from "@/components/menu/SubMenu";

export default {
    name: "Menu",
    props: {
        menuList: {
            type: Array,
            default: () => [],
        },
        collapse: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        SubMenu,
    },
    data() {
        return {
            defaultActive: "",
            uniqueOpened: false,
        };
    },
    methods: {
        selectMenu(index, indexPath) {
            console.log("select-menu", index, indexPath);
            this.$router.push({ path: "/" });
        },
    },
};
</script>

<style scoped></style>
