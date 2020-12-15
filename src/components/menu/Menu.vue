<template>
    <el-menu :default-active="defaultActive" :collapse="collapse" @select="selectMenu">
        <!-- <div :class="collapse ? 'logo logo-collapse' : 'logo'">
            <object v-show="!collapse" :data="imgSrc[0]" width="210" height="50" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/install/" />
            <object v-show="collapse" :data="imgSrc[1]" width="55" height="50" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/install/" />
        </div> -->
        <template v-for="(item, index) in menuList">
            <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.key" :key="index">
                <!-- 此处图标可以自定义 -->
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <SubMenu v-else :subMenuList="item" :index="item.key" :key="index"></SubMenu>
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
            imgSrc: [require("@/assets/logo.png"), require("@/assets/logo.png")],
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
