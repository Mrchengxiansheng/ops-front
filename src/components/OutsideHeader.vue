<template>
  <div class="header">
    <!-- <
    <div class="header__inner">router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>-->
    <div class="header__inner">
      <div class="header__logo">
        <img src="../assets/images/avatar30055.png" alt />
      </div>
      <div class="header__title">图片分享</div>
      <div class="header__nav">
        <ul class="clearfix">
          <li
            :class="{ active: item.id === navFlag, preselection: item.id === navShow }"
            @click="changeNav(item.id)"
            @mouseenter="enterNav(item.id)"
            @mouseleave="leaveNav"
            v-for="item in navCategory" :key="item.id">{{ item.name }}</li>
        </ul>
      </div>
      <div class="header__right">
        <div class="header__search">
          <input type="text" />
        </div>
        <div class="header__avatarcontainer">
          <div class="header__avatar" @click="login">
            <img src="../assets/images/avatar30046.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex"
export default {
  name: "outsideHeader",
  data() {
    return {
      navCategory: [
        {
          id: 1,
          name: "图区"
        },
        {
          id: 2,
          name: "片区"
        }
      ],
      navFlag: 1,
      navShow: 1
    };
  },
  computed: {
    ...mapState(["pcLoginFlag"])
  },
  methods: {
    ...mapMutations(["pcChangeLogin"]),
    login() {
      this.pcChangeLogin();
    },
    changeNav(id) {
      this.navFlag = id;
    },
    enterNav(id) {
      this.navShow = id;
    },
    leaveNav() {
      this.navShow = 0;
    }
  }
};
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 62px;
  background-color: #dc776d;
  position: fixed;
  top: 0;
  z-index: 999;
  font-size: 0;
  .header__inner {
    width: 1170px;
    height: 62px;
    margin: 0 auto;
    color: #fff;
    line-height: 62px;
    .header__logo {
      display: inline-block;
      // width: 30px;
      height: 62px;
      vertical-align: top;
      img {
        vertical-align: middle;
        height: 30px;
        width: 30px;
      }
    }
    .header__title {
      display: inline-block;
      vertical-align: top;
      // width: 184px;
      height: 62px;
      font-weight: 600px;
      position: relative;
      margin-right: 100px;
      padding-left: 20px;
      font-size: 16px;
    }
    .header__title::before {
      content: "";
      width: 2px;
      height: 30px;
      background-color: #fff;
      position: absolute;
      left: 9px;
      top: 16px;
    }
    .header__nav {
      display: inline-block;
      li {
        float: left;
        height: 62px;
        width: 80px;
        text-align: center;
        color: #fff;
      }
      .preselection {
        cursor: pointer;
        background-color: #EEA2AD;
      }
      .active {
        font-weight: 600;
        cursor: pointer;
        background-color: #EEA2AD;
      }
    }
    .header__right {
      float: right;
      display: flex;
      height: 62px;
      .header__search {
        width: 70px;
        height: 62px;
        input {
          vertical-align: middle;
          width: 50px;
          height: 30px;
          border-radius: 30px;
          padding: 0 10px;
        }
      }
      .header__avatarcontainer {
        display: inline-block;
        width: 36px;
        padding: 13px 17px;
        .header__avatar {
          width: 36px;
          height: 36px;
          border-radius: 100%;
          img {
            width: 36px;
            height: 36px;
            border-radius: 100%;
            vertical-align: top;
          }
        }
      }
    }
  }
}
</style>