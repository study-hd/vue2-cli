<template>
    <el-menu :default-active="defaultActive" :collapse="collapse" @select="selectMenu" popper-append-to-body>
        <!-- <div :class="collapse ? 'logo logo-collapse' : 'logo'">
            <object v-show="!collapse" :data="imgSrc[0]" width="210" height="50" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/install/" />
            <object v-show="collapse" :data="imgSrc[1]" width="55" height="50" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/install/" />
        </div> -->
        <template v-for="(item, index) in menuList">
            <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.path" :key="index">
                <!-- 此处图标可以自定义 -->
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <SubMenu v-else :subMenuList="item" :key="index"></SubMenu>
        </template>
    </el-menu>
</template>

<script>
// @ is an alias to /src
import SubMenu from "@/components/menu/SubMenu";

export default {
    name: "Menu",
    props: {
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
    // 通过store获取菜单信息，且事实监控
    computed: {
        menuList() {
            return this.$store.getters["store/user/getMenus"];
        },
    },
    mounted() {
        console.log(this.menuList);
    },
    methods: {
        selectMenu(index) {
            this.$router.push({ path: index });
        },
    },
};
</script>

<style scoped></style>
