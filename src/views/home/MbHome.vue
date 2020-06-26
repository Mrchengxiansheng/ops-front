<template>
  <div class="ops-root">
    <MbHeader :isHome="hearder.isHome" :hearderTitle="hearder.title" :isPublish="hearder.isPublish"></MbHeader>
    <!-- <PullRefresh :next="refresh"></PullRefresh> -->
    <div class="vue-pull-refresh" v-if="flag">
      <div class="refresh" v-if="!loading">
        <svg
          t="1497366759944"
          viewBox="0 0 1024 1024"
          style="width: 0.3rem; height: 0.3rem; vertical-align: middle;fill: currentColor;overflow: hidden;"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1040"
        >
          <path
            d="M921.6 563.2c-9.6-9.6-25.6-9.6-35.2 0L544 896l0-822.4c0-12.8-9.6-22.4-25.6-22.4s-25.6 9.6-25.6 22.4L492.8 896l-342.4-339.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 22.4 0 32l384 377.6c6.4 6.4 12.8 6.4 19.2 6.4 0 0 0 0 0 0 3.2 0 3.2 0 6.4 0 0 0 0 0 3.2 0 3.2 0 6.4-3.2 9.6-6.4l380.8-371.2C931.2 588.8 931.2 572.8 921.6 563.2z"
            p-id="1041"
            fill="#666666"
          />
        </svg>
        下拉刷新
      </div>
      <div class="refresh" v-else>
        <svg
          t="1497367491334"
          viewBox="0 0 1024 1024"
          class="vue-pull-refresh-loading"
          style="width: 0.3rem; height: 0.3rem;vertical-align: middle;fill: currentColor;overflow: hidden;"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1977"
        >
          <path
            d="M486.75754 135.400013 402.25163 59.310554C388.509379 46.936957 387.96346 25.139993 400.208308 11.540621 412.822131-2.468343 433.957671-4.001381 447.930113 8.579401L601.089596 146.484825C605.090636 150.087331 607.97301 154.488612 609.74682 159.253816 614.767405 170.908986 613.043155 184.73657 603.956951 194.827778L466.051527 347.987261C453.677999 361.729512 431.880966 362.275431 418.281663 350.030583 404.27263 337.416761 402.739592 316.281152 415.320374 302.308778L504.712387 203.028852C300.714847 206.912339 136.539841 373.49343 136.539841 578.419721 136.539841 785.780633 304.639089 953.87988 512 953.87988 720.609624 953.87988 887.460159 790.22062 887.460159 584.090467 887.460159 517.424512 870.092464 453.371077 837.556793 396.914498 828.144212 380.58164 833.754269 359.710766 850.087128 350.298184 866.420054 340.885671 887.29086 346.49566 896.703442 362.828587 935.174114 429.583765 955.725642 505.37934 955.725642 584.090467 955.725642 828.220806 758.019723 1022.145363 512 1022.145363 266.937086 1022.145363 68.274358 823.482635 68.274358 578.419721 68.274358 341.828486 253.439157 148.484867 486.75754 135.400013Z"
            p-id="1978"
            fill="#666666"
          />
        </svg>
        正在加载
      </div>
    </div>
    <div class="ops-main-page" ref="container">
      <div class="page-left">
        <div @click="goToArticle(item.article_id)" class="ops-img-card" v-for="item in leftImg" :key="item.id">
          <router-link to="/mb/article">
            <img class="card-img" :src="imgBaseUrl+item.imgs[0].img_url" alt />
            <div class="article-title">
              <span class="article-title__type">{{ item.title }}</span>
            </div>
          </router-link>
          <div class="article-footer">
            <div class="author__info">
              <img :src="author.avatar" alt />
              <span>{{ author.name }}</span>
            </div>
            <div class="author__like">
              <span>点赞</span>
            </div>
          </div>
        </div>
      </div>
      <div class="page-right">
        <div @click="goToArticle(item.article_id)" class="ops-img-card" v-for="item in rightImg" :key="item.id">
          <img class="card-img" :src="imgBaseUrl+item.imgs[0].img_url" alt />
          <div class="article-title">
            <span class="article-title__type">{{ item.title }}</span>
          </div>
          <div class="article-footer">
            <div class="author__info">
              <img :src="author.avatar" alt />
              <span>{{ author.name }}</span>
            </div>
            <div class="author__like">
              <span>点赞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="more" v-if="showState">
      <span>加载中···</span>
    </div>
    <div class="more" v-if="!hasMore">
      <span>没有更多了</span>
    </div>
    <div class="publish__button" @click="goPublish">十</div>
  </div>
</template>

<script>
import MbHeader from "../../components/MbHeader.vue";
import imgSrc from "../../assets/logo.png";
import axios from "axios";

export default {
  components: {
    MbHeader
  },
  data() {
    return {
      flag: false, // 表示是否达到刷新条件
      loading: false, // 表示是否正在刷新中
      touchStart: 0, // 手指触摸屏幕的起点
      distance: 0, // 手指滑动的距离
      imgBaseUrl: "http://localhost:3000",
      first: true, //是否首次请求
      hasMore: true, //加载的动画
      dropDown: true, //true表示下拉刷新 false表示下滑加载
      showState: false, //上滑加载更多
      ratio: 143, //图片在320屏幕下的占比
      ssss: true, //ceshi
      offset: 0,
      imgCard: [],
      leftImg: [],
      rightImg: [],
      leftImgHeight: 0,
      rightImgHeight: 0,
      page: {
        counter: 1,
        pageStart: 1,
        pageEnd: 1,
        total: 10
      },
      hearder: {
        isHome: true,
        title: "图区",
        isPublish: false
      },
      author: {
        name: "Mirsds",
        avatar: imgSrc,
        level: 12
      }
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.watchTouch();
  },
  methods: {
    async getData() {
      await axios({
        method: "get",
        url: "http://localhost:3000/mb",
        params: {
          offset: this.offset
        }
      }).then(res => {
        if (res.data.hasMore) {
          this.offset += 10;
          if (this.dropDown) {
            this.imgCard = res.data.articleDataPart.concat(this.imgCard);
            this.imgPreloading(res.data.articleDataPart, this.dropDown);
          } else {
            this.imgCard = this.imgCard.concat(res.data.articleDataPart);
            this.imgPreloading(res.data.articleDataPart, this.dropDown);
          }
        } else {
          this.hasMore = false;
        }
      });
    },
    watchTouch() {
      const container = this.$refs.container;
      container.addEventListener("touchstart", e => {
        // 如果loading为true就代表刷新函数正在进行，此时阻止下拉操作，返回
        if (this.loading) {
          e.preventDefault();
          return;
        }
        // 取第一个手指的触摸点作为起始点
        this.touchStart = e.targetTouches[0].clientY;
      });
      container.addEventListener("touchmove", e => {
        // 如果没有触摸起始点，返回
        const touch = e.targetTouches[0];
        this.distance = touch.clientY - this.touchStart;
        if (this.distance < 0) {
          this.dropDown = false;
        }
        if (this.dropDown) {
          if (!this.touchStart) {
            return;
          }
          if (this.loading) {
            e.preventDefault();
            return;
          }
          // const touch = e.targetTouches[0];
          const scrollTop = document.documentElement.scrollTop;
          if (scrollTop === 0) {
            if (this.distance > 0) {
              e.preventDefault();
              if (this.distance < 80) {
                container.style.overflow = "inherit";
                container.style.transform =
                  "translate3D(0px, " + this.distance + "px, 0px)";
                if (this.distance > 55) {
                  this.flag = true;
                }
              }
            }
          }
        }
      });
      container.addEventListener("touchend", e => {
        let scrollTop = document.documentElement.scrollTop;
        if (this.dropDown) {
          if (this.distance === 0) {
            return;
          }
          if (this.loading) {
            e.preventDefault();
            return;
          }
          // const scrollTop = document.documentElement.scrollTop;
          if (this.flag && this.distance > 0 && scrollTop === 0) {
            container.style.transform = "translate3D(0px, 50px, 0px)";
            this.loading = true;
            this.refresh().then(() => {
              this.flag = false;
              this.loading = false;
              container.scrollTop = 0;
              container.style.overflow = "auto";
              container.style.transform = "translate3D(0px, 0px, 0px)";
            });
            return;
          }
          // 重置变量
          this.flag = false;
          container.style.overflow = "auto";
          container.style.transform = "translate3D(0px, 0px, 0px)";
        } else {
          let clientHeight = document.documentElement.clientHeight;
          let scrollHeight = this.$el.scrollHeight;
          if (scrollTop + clientHeight >= scrollHeight - 50) {
            this.showState = true;
            this.refresh().then(() => {
              this.showState = false;
              this.dropDown = true;
            });
          }
        }
      });
    },
    async refresh() {
      await this.getData();
    },
    goPublish() {
      this.$router.push({ path: "/mb/articleCreate" });
    },
    imgPreloading(data, sign) {
      if (sign && !this.first) {
        for (let i = 0; i < data.length; i++) {
          let aImg = new Image();
          aImg.src = this.imgBaseUrl + data[i].imgs[0].img_url;
          aImg.onload = () => {
            let h =
              ((this.ratio * (document.documentElement.clientWidth / 320)) /
                aImg.width) *
              aImg.height;
            let a = this.rightImgHeight;
            this.rightImgHeight = this.leftImgHeight;
            this.leftImgHeight = a + h;
            let b = this.rightImg;
            this.rightImg = this.leftImg;
            this.leftImg = b;
            this.leftImg.unshift(data[i]);
          };
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          let aImg = new Image();
          aImg.src = this.imgBaseUrl + data[i].imgs[0].img_url;
          aImg.onload = () => {
            let h =
              ((this.ratio * (document.documentElement.clientWidth / 320)) /
                aImg.width) *
              aImg.height;
            if (i === 0 && this.first) {
              this.leftImgHeight += h;
              this.leftImg.push(data[i]);
              this.first = false;
            } else {
              if (this.leftImgHeight <= this.rightImgHeight) {
                this.leftImgHeight += h;
                this.leftImg.push(data[i]);
              } else {
                this.rightImgHeight += h;
                this.rightImg.push(data[i]);
              }
            }
          };
        }
      }
    },
    goToArticle(article_id){
      this.$router.push({name:'mbArticle', params:{id:article_id}});
      // this.$router.push({ name: "mbArticle", params: { id: article_id } });
    },
  }
};
</script>

<style scoped lang="less">
.ops-root {
  width: 100%;
  height: 100%;
  background-color: #f2f4f5;
  position: relative;
  margin: auto;
  overflow: hidden;
  font-size: 0.14rem;
  padding-top: 0.5rem;
  .vue-pull-refresh {
    padding-top: 0.1rem;
    height: 100%;
    overflow-y: auto;
    transition: 330ms;
    -webkit-overflow-scrolling: touch;
    .refresh {
      text-align: center;
      line-height: 50px;
      .vue-pull-refresh-loading {
        -webkit-animation: loadRotate 1s linear infinite;
        animation: loadRotate 1s linear infinite;
      }
      @-webkit-keyframes loadRotate {
        from {
          -webkit-transform: rotate(0deg);
        }
        to {
          -webkit-transform: rotate(360deg);
        }
      }
      @keyframes loadRotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
  .ops-main-page {
    padding: 0.15rem 0.1rem 0 0.1rem;
    background-color: #fff;
    display: flex;
    .page-left {
      flex: 1;
      width: 50%;
      padding-right: 0.05rem;
      .ops-img-card {
        box-shadow: 0 0.01rem 0.06rem 0 rgba(0, 0, 0, 0.08);
        border: 1px solid #ebeff0;
        border-radius: 0.05rem;
        margin-bottom: 0.1rem;
        .card-img {
          width: 100%;
        }
        .article-title {
          padding: 0.05rem;
          .article-title__type {
            font-size: 0.14rem;
            font-weight: 500;
            max-height: 0.42rem;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            word-break: break-all;
            -webkit-line-clamp: 2;
          }
        }
        .article-footer {
          padding: 0 0.05rem 0.05rem 0.05rem;
          display: flex;
          .author__info {
            flex: 1;
            img {
              border-radius: 50%;
              width: 0.2rem;
              height: 0.2rem;
              margin-right: 0.1rem;
            }
            span {
              font-size: 0.12rem;
              color: #ccc;
            }
          }
          .author__like {
            span {
              font-size: 0.12rem;
              color: #ccc;
            }
          }
        }
      }
    }
    .page-right {
      flex: 1;
      width: 50%;
      padding-left: 0.05rem;
      .ops-img-card {
        box-shadow: 0 0.01rem 0.05rem 0 rgba(0, 0, 0, 0.08);
        border: 1px solid #ebeff0;
        border-radius: 0.05rem;
        margin-bottom: 0.1rem;
        .card-img {
          width: 100%;
        }
        .article-title {
          padding: 0.05rem;
          .article-title__type {
            font-size: 0.14rem;
            font-weight: 500;
            max-height: 0.42rem;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            word-break: break-all;
            -webkit-line-clamp: 2;
          }
        }
        .article-footer {
          padding: 0 0.05rem 0.05rem 0.05rem;
          display: flex;
          .author__info {
            flex: 1;
            img {
              border-radius: 50%;
              width: 0.2rem;
              height: 0.2rem;
              margin-right: 0.1rem;
            }
            span {
              font-size: 0.12rem;
              color: #ccc;
            }
          }
          .author__like {
            span {
              font-size: 0.12rem;
              color: #ccc;
            }
          }
        }
      }
    }
  }
  .more {
    text-align: center;
    padding: 0.2rem 0 0.2rem;
    background-color: #fff;
  }
  .publish__button {
    position: fixed;
    bottom: 0.5rem;
    right: 0.2rem;
    width: 0.3rem;
    height: 0.3rem;
    background: #7fd4ff;
    color: #fff;
    font-size: 0.18rem;
    font-weight: 600;
    text-align: center;
    line-height: 0.3rem;
    border-radius: 50%;
    z-index: 666;
  }
}
</style>