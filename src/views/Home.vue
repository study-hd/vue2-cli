<template>
    <div class="home">
        <el-button @click="$router.push({ path: '/404' })">to 404</el-button>
        <el-button @click="$router.push({ path: '/error' })">to error</el-button>

        <el-button @click="show = !show">click me</el-button>
        <transition name="el-zoom-in-center">
            <div v-show="show" class="transition-box">.el-zoom-in-center</div>
        </transition>

        <transition name="el-zoom-in-top">
            <div v-show="show" class="transition-box">.el-zoom-in-top</div>
        </transition>

        <transition name="el-zoom-in-bottom">
            <div v-show="show" class="transition-box">.el-zoom-in-bottom</div>
        </transition>
        <transition name="el-zoom-in-left">
            <div v-show="show" class="transition-box">.el-zoom-in-left</div>
        </transition>
        <transition name="el-zoom-in-right">
            <div v-show="show" class="transition-box">.el-zoom-in-right</div>
        </transition>
        <el-collapse-transition>
            <div v-show="show">
                <div class="transition-box">el-collapse-transition</div>
                <div class="transition-box">el-collapse-transition</div>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            imgSrc: [require("@/assets/logo.png"), require("@/assets/logo.png")],
            isCollapse: false,
            show: false,
        };
    },
    methods: {
        toggleCollapse() {
            this.isCollapse = !this.isCollapse;
        },
    },
};
</script>

<style lang="scss" scoped>
.transition-box {
    margin-right: 20px;
    margin-bottom: 20px;
    width: 200px;
    height: 100px;
    background-color: aqua;
}
</style>
