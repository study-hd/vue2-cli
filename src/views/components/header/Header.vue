<template>
    <div class="header">
        <transition name="el-fade-in-linear">
            <div :class="isCollapse ? 'logo logo-collapse' : 'logo'">
                <object v-show="!isCollapse" :data="imgSrc[0]" width="210" height="50" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/install/" />
                <object v-show="isCollapse" :data="imgSrc[1]" width="55" height="50" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/install/" />
            </div>
        </transition>
        <div class="com-pointer change-collapse">
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="toggleCollapse"></i>
        </div>
        <div :class="isCollapse ? 'com-text-right info-collapse' : 'com-text-right info'">
            <router-link to="/demo">Demo</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            imgSrc: [require("@/assets/logo.png"), require("@/assets/logo.png")],
            isCollapse: false,
        };
    },
    methods: {
        toggleCollapse() {
            this.isCollapse = !this.isCollapse;
            this.$emit("isCollapse", this.isCollapse);
        },
    },
};
</script>

<style lang="scss" scoped>
.title {
    font-size: 16px;
}
.test-box {
    background-color: aqua;
    width: 200px;
    height: 200px;
    margin-top: 20px;
}
.header {
    .logo {
        background-color: #000;
    }
}
</style>
