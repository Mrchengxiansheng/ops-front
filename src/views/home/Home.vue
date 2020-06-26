<template>
  <div class="ops-home">
    <OutsideHeader></OutsideHeader>
    <InsideHeader></InsideHeader>
    <div class="ops-home-main">
      <div class="ops-home-main-left">
        <div class="ops-img-card" v-for="item in imgCard" :key="item.id">
          <div @click="goToArticle(item.article_id)">
            <div class="ops-img-card__top">
              <div
                class="img-scale"
                :style="{ backgroundImage: `url(${imgBaseUrl}${item.imgs[0].img_url})` }"
              ></div>
            </div>
            <div class="ops-img-card__mid">
              <span>{{ item.title }}</span>
            </div>
          </div>
          <div class="ops-img-card__bottom">
            <div class="ops-img-card__bottom_user">
              <img :src="avatar" alt />
              <span>一只小笨猪</span>
            </div>
            <div class="ops-img-card__bottom_like">点赞</div>
          </div>
        </div>
        <div class="more" v-if="showState">
          <span>加载中···</span>
        </div>
        <div class="more" v-if="!hasMore">
          <span>没有更多了</span>
        </div>
      </div>
      <div class="ops-home-main-right">
        <div class="ops-home-main-right__header">
          <h3 class="ops-home-main-right__title">热门话题</h3>
          <span class="ops-home-main-right__more">更多</span>
        </div>
        <div class="ops-home-main-right__body">
          <div class="ops-home-main-right__topic" v-for="item in topic" :key="item.id">
            <img :src="item.topicAvatarImg" alt />
            <span>{{ item.topicAvatarName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import OutsideHeader from "@/components/OutsideHeader.vue";
import InsideHeader from "@/views/home/childComponents/InsideHeader.vue";
import avatar from "../../assets/images/avatar30046.png";
import axios from "axios";

export default {
  name: "home",
  components: {
    OutsideHeader,
    InsideHeader
  },
  data() {
    return {
      avatar: avatar,
      showState: false, //是否显示加载动画
      hasMore: true, //加载的动画
      offset: 0,
      imgBaseUrl: "http://localhost:3000",
      imgCard: [],
      topic: [
        {
          id: 1,
          topicAvatarImg: avatar,
          topicAvatarName: "垃圾1"
        },
        {
          id: 2,
          topicAvatarImg: avatar,
          topicAvatarName: "垃圾2"
        },
        {
          id: 3,
          topicAvatarImg: avatar,
          topicAvatarName: "垃圾3"
        }
      ],
      LoginFlag: false
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.bindSrcoll();
  },
  methods: {
    async getData() {
      await axios({
        method: "get",
        url: "http://localhost:3000/",
        params: {
          offset: this.offset
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.hasMore) {
          this.offset += 10;
          this.imgCard = this.imgCard.concat(res.data.articleDataPart);
          this.showState = false;
        } else {
          this.hasMore = false;
          this.showState = false;
        }
      });
    },
    goToArticle(article_id) {
      this.$router.push({ name: "article", params: { id: article_id } });
    },
    getMoreData() {
      //可滚动容器的高度
      let innerHeight = document.querySelector("#app").clientHeight;
      //屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight;
      //可滚动容器超出当前窗口显示范围的高度
      let scrollTop = document.documentElement.scrollTop;
      //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。

      if (
        this.hasMore &&
        !this.showState &&
        innerHeight === outerHeight + scrollTop
      ) {
        //加载更多操作
        this.showState = true;
        this.getData();
      }
    },
    bindSrcoll() {
      this.unScroll();
      window.addEventListener("scroll", this.getMoreData);
    },
    unScroll() {
      window.removeEventListener("scroll", this.getMoreData);
    },
    beforeDestroy() {
      this.unScroll();
    }
  }
};
</script>

<style scoped lang="less">
.ops-home {
  padding-top: 150px;
  background-color: #fafafa;
  .ops-home-main {
    width: 1170px;
    margin: 0 auto;
    display: flex;
    .ops-home-main-left {
      width: 800px;
      .ops-img-card {
        display: inline-block;
        border-radius: 10px;
        width: 250px;
        color: #515151;
        font-size: 14px;
        margin: 0 25px 25px 0;
        background-color: #fff;
        .ops-img-card__top {
          height: 180px;
          .img-scale {
            width: 250px;
            height: 180px;
            background-size: cover;
            background-repeat: no-repeat;
          }
        }
        .ops-img-card__mid {
          height: 30px;
          line-height: 30px;
          padding-left: 20px;
        }
        .ops-img-card__bottom {
          height: 40px;
          line-height: 40px;
          display: flex;
          .ops-img-card__bottom_user {
            padding-left: 20px;
            flex-grow: 1;
            img {
              vertical-align: middle;
              width: 24px;
              height: 24px;
            }
            span {
              margin-left: 10px;
            }
          }
          .ops-img-card__bottom_like {
            margin-right: 10px;
          }
        }
      }
      .ops-img-card:nth-child(3n) {
        margin-right: 0;
      }
      .more {
        text-align: center;
        margin: 20px 0 30px;
      }
    }
    .ops-home-main-right {
      width: 300px;
      height: 275px;
      margin-left: 70px;
      background-color: #fff;
      border-radius: 10px;
      .ops-home-main-right__header {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        display: flex;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
        .ops-home-main-right__title {
          flex-grow: 1;
        }
      }
      .ops-home-main-right__body {
        padding: 20px;
        .ops-home-main-right__topic {
          margin-top: 20px;
          img {
            width: 48px;
            height: 48px;
            vertical-align: middle;
            border-radius: 10px;
          }
          span {
            margin-left: 10px;
          }
        }
        .ops-home-main-right__topic:first-child {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
