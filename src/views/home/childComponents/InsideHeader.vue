<template>
  <div class="inside-header">
    <div class="inside-header__nav">
      <div class="inside-header__left">
        <ul class="clearfix">
          <li
            :class="{ active: item.id === switchNavFlag, li_corsor: item.id === showCursor }"
            @click="switchNav(item.id)"
            @mouseenter="enterCursor(item.id)"
            @mouseleave="leaveCursor"
            v-for="item in navMessage"
            :key="item.id"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="inside-header__right">
        <div class="inside-header__button">
          <span @click="newArticle">发布帖子</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      switchNavFlag: 1,
      showCursor: 1,
      navMessage: [
        {
          id: 1,
          name: "最新评论"
        },
        {
          id: 2,
          name: "最新回复"
        },
        {
          id: 3,
          name: "热门"
        },
        {
          id: 4,
          name: "精华"
        }
      ]
    };
  },
  methods: {
    switchNav(id) {
      this.switchNavFlag = id;
    },
    enterCursor(id) {
      this.showCursor = id;
    },
    leaveCursor() {
      this.showCursor = 0;
    },
    newArticle() {
      this.$router.push({ path: '/articleCreate' });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.inside-header {
  width: 100%;
  height: 62px;
  position: fixed;
  top: 62px;
  background-color: #fff;
  .inside-header__nav {
    width: 1000px;
    height: 62px;
    padding: 0 85px;
    margin: 0 auto;
    .inside-header__left {
      display: inline-block;
      li {
        float: left;
        line-height: 62px;
        margin-left: 20px;
        color: #000;
        position: relative;
      }
      li:first-child {
        margin-left: 0;
      }
      .li_corsor {
        cursor: pointer;
        color: #ff0000;
      }
      .active {
        cursor: pointer;
        color: #4cc3ff;
        font-weight: 600;
      }
      .active::after {
        content: " ";
        width: 100%;
        height: 3px;
        position: absolute;
        bottom: 0px;
        background-color: #4cc3ff;
        left: 0;
      }
    }
    .inside-header__right {
      float: right;
      .inside-header__button {
        height: 40px;
        line-height: 40px;
        border-radius: 10px;
        padding: 0 10px;
        margin-top: 11px;
        background-color: #ffe14c;
        font-weight: 400;
      }
    }
  }
}
</style>
