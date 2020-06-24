<template>
  <div class="mobile-header-info">
    <div
      class="header__author"
      @click="goLogin"
      :style="{ display: isHome ? 'inline-block' : 'none'}"
    >
      <img src="../assets/logo.png" alt />
    </div>
    <div class="header__back" :class="[isHome ? 'active' : '']" @click="goback">返回</div>
    <div class="mobile-header__name">{{ hearderTitle }}</div>
    <div  class="header__publish" :class="[isPublish ? '' : 'active']" @click="goPublish">发布</div>
  </div>
</template>

<script>
export default {
  props: {
    isHome: Boolean,
    hearderTitle: String,
    isPublish: Boolean
  },
  data() {
    return {};
  },
  methods: {
    goback() {
      this.$router.push({ path: "/mb" });
    },
    goLogin() {
      this.$router.push({ path: "/mb/login" });
    },
    goPublish(){
      this.$emit("publish");
    }
  }
};
</script>

<style scoped lang="less">
.mobile-header-info {
  position: fixed;
  line-height: 0.4rem;
  width: 100%;
  background-color: #dc776d;
  z-index: 999;
  display: flex;
  top: 0;
  .header__author {
    text-align: center;
    width: 0.4rem;
    padding: 0.05rem 0.1rem;
    line-height: 0.4rem;
    img {
      width: 0.3rem;
      height: 0.3rem;
      vertical-align: middle;
      border-radius: 50%;
    }
  }
  .header__back {
    position: absolute;
    top: 0.05rem;
    left: 0.1rem;
    color: #ffffff;
  }
  .header__back.active {
    display: none;
  }
  .mobile-header__name {
    text-align: center;
    flex: 1;
    color: #ffffff;
    padding: 0.05rem 0.1rem;
    text-align: center;
  }
  .header__publish {
    position: absolute;
    color: #fff;
    top: 0.05rem;
    right: 0.1rem;
  }
  .header__publish.active {
    display: none;
  }
}
</style>