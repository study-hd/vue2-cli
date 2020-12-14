<template>
    <el-submenu :index="subMenuList.key">
        <template slot="title">
            <i :class="subMenuList.icon"></i>
            <span slot="title">{{ subMenuList.title }}</span>
        </template>
        <el-menu-item v-for="(item, index) in subMenuList.children" :index="item.key" :key="index">
            <!-- 此处图标可以自定义 -->
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
            <SubMenu v-if="item.children" :subMenuList="item.children"></SubMenu>
        </el-menu-item>
    </el-submenu>
</template>

<script>
import SubMenu from "@/components/menu/SubMenu";

export default {
    name: "SubMenu",
    props: {
        subMenuList: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        SubMenu,
    },
};
</script>

<style scoped></style>
