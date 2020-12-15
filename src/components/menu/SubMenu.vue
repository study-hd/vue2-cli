<template>
    <el-submenu :index="subMenuList.key">
        <template slot="title">
            <i :class="subMenuList.icon"></i>
            <span slot="title">{{ subMenuList.title }}</span>
        </template>
        <template v-for="(item, index) in subMenuList.children">
            <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.key" :key="index">
                <!-- 此处图标可以自定义 -->
                <i :class="subMenuList.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <SubMenu v-else :subMenuList="item" :key="index"></SubMenu>
        </template>
    </el-submenu>
</template>

<script>
import SubMenu from "@/components/menu/SubMenu";

export default {
    name: "SubMenu",
    props: {
        subMenuList: {
            type: Object,
            default: () => {},
        },
    },
    components: {
        SubMenu,
    },
    created() {
        console.log(this.subMenuList);
    },
};
</script>

<style scoped></style>
