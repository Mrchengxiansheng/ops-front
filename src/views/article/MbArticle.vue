<template>
  <div class="mobile-article-page">
    <MbHeader :isHome="hearder.isHome" :hearderTitle="hearder.title" :isPublish="hearder.isPublish"></MbHeader>
    <div class="artticle-page-main">
      <div class="article-author-info">
        <div class="author__info">
          <img :src="author.avatar" alt />
          <span class="author__info_name">{{ author.name }}</span>
          <span class="author__info_level">Lv.{{ author.level }}</span>
        </div>
        <div class="author__like">
          <span>关注</span>
        </div>
      </div>
      <div class="article-title">
        <span class="title__source">{{ article.sourceMode }}</span>
        <span class="title__topic_name">{{ article.title }}</span>
      </div>
      <div class="article-time">
        <span class="line-left"></span>
        <span class="publish-time">文章发表：{{ article.publishDate }}</span>
        <span class="line-right"></span>
      </div>
      <div class="article-img">
        <div class="img__describe">
          <span>{{ article.describe }}</span>
        </div>
        <img
          v-for="item in article.imgSrc"
          :key="item.id"
          class="img-cards"
          @click="showBigImg(item.img_id)"
          :src="imgBaseUrl + item.img_url"
          alt
        />
        <div class="img-topic">
          <span>#{{ article.selectorMode.topicName }}</span>
        </div>
        <div class="img-copyright">
          <span>作者授权-署名-非商用转载</span>
        </div>
        <div class="img-view">
          <span>{{ article.viewNumber }}</span>
          <span>{{ article.commentNumber }}</span>
          <span>{{ article.likeNumber }}</span>
          <span>{{ article.favoriteNumber }}</span>
        </div>
      </div>
    </div>
    <ImgShow @change="changeImgShow" v-if="isShow" :imgs="article.imgSrc" :imgId="imgId"></ImgShow>
  </div>
</template>

<script>
import MbHeader from "../../components/MbHeader.vue";
import ImgShow from "./childComponents/ImgShow.vue";
import imgSrc from "../../assets/logo.png";
import axios from "axios";
export default {
  components: {
    MbHeader,
    ImgShow
  },
  data() {
    return {
      imgBaseUrl: "http://localhost:3000",
      isShow: false,
      imgId: 0,
      hearder: {
        isHome: false,
        title: "详情",
        isPublish: false
      },
      article: {
        sourceMode: "同人创作",
        title:
          "元旦快乐贵金属了将公开了钢结构卡啦啦啦啦啦啦啦啦啦啦了元旦快乐贵金属了将公开了钢结构卡啦啦啦啦啦啦啦啦啦啦了",
        belongTo: {
          plateName: "图区",
          plateImg: imgSrc
        },
        viewNumber: 2545,
        commentNumber: 333,
        likeNumber: 33,
        favoriteNumber: 334,
        publishDate: "01-02",
        describe:
          "收到甲方开具的说服力元旦快乐贵金属了将公开了钢结构卡啦啦啦啦啦啦啦啦啦啦了",
        imgSrc: [],
        selectorMode: {
          topicName: "同人绘画",
          topicImg: imgSrc
        }
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
  methods: {
    async getData() {
      await axios({
        method: "get",
        url: "http://localhost:3000" + this.$route.path
      }).then(res => {
        this.article.title = res.data.title;
        this.article.describe = res.data.describe;
        this.article.imgSrc = res.data.imgs;
      });
    },
    showBigImg(id) {
      this.isShow = true;
      this.imgId = id;
    },
    changeImgShow() {
      this.isShow = false;
    }
  }
};
</script>

<style scoped lang="less">
.mobile-article-page {
  width: 100%;
  height: 100%;
  background-color: #f2f4f5;
  position: relative;
  margin: auto;
  overflow: hidden;
  font-size: 0.14rem;
  .artticle-page-main {
    margin-top: 0.5rem;
    padding: 0.15rem 0.1rem 0 0.1rem;
    background-color: #fff;
    .article-author-info {
      padding: 0 0.05rem 0.05rem 0.05rem;
      display: flex;
      line-height: 0.3rem;
      .author__info {
        flex: 1;

        img {
          vertical-align: middle;
          border-radius: 50%;
          width: 0.2rem;
          height: 0.2rem;
          margin-right: 0.1rem;
        }
        .author__info_name {
          font-size: 0.12rem;
          color: #ccc;
          margin-right: 0.05rem;
        }
        .author__info_level {
          background-color: #00c3ff;
          color: #fff;
          font-size: 0.12rem;
        }
      }
      .author__like {
        width: 20%;
        background-color: #00c3ff;
        border-radius: 0.4rem;
        text-align: center;
        span {
          font-size: 0.12rem;
          color: #fff;
        }
      }
    }
    .article-title {
      padding: 0 0.05rem 0.05rem 0.05rem;
      line-height: 0.3rem;
      margin-bottom: 0.05rem;
      .title__source {
        margin-right: 0.05rem;
        background-color: #00c3ff;
        color: #fff;
        padding: 0.02rem 0.05rem;
        font-size: 0.12rem;
      }
      .title__topic_name {
        font-size: 0.16rem;
        font-weight: 600;
      }
    }
    .article-time {
      line-height: 0.2rem;
      position: relative;
      text-align: center;
      font-size: 0.12rem;
      color: #ccc;
      margin-bottom: 0.05rem;
      .line-left,
      .line-right {
        display: inline-block;
        width: 0.4rem;
        margin-bottom: 0.03rem;
        border-top: 2px solid #ccc;
      }
      .line-left {
        margin-right: 0.05rem;
      }
      .line-right {
        margin-left: 0.05rem;
      }
    }
    .article-img {
      padding: 0.05rem;
      .img__describe {
        margin-bottom: 0.2rem;
        font-size: 0.14rem;
        font-weight: 500;
        max-height: 0.42rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      .img-cards {
        width: 100%;
        margin-bottom: 0.1rem;
      }
      .img-topic {
        margin-bottom: 0.2rem;
        span {
          display: inline-block;
          padding: 0.03rem 0.06rem;
          border-radius: 0.1rem;
          background-color: #ccc;
          color: #00c3ff;
          font-size: 0.12rem;
        }
      }
      .img-copyright {
        padding-bottom: 0.15rem;
        margin-bottom: 0.1rem;
        text-align: center;
        border-bottom: 1px solid #ccc;
        span {
          display: inline-block;
          padding: 0.03rem 0.06rem;
          color: #ccc;
          font-size: 0.12rem;
        }
      }
      .img-view {
        padding-bottom: 0.15rem;
        margin-bottom: 0.1rem;
        text-align: center;
        border-bottom: 1px solid #ccc;
        display: flex;
        span {
          padding: 0.03rem 0.06rem;
          color: #ccc;
          font-size: 0.12rem;
          flex: 1;
        }
      }
    }
  }
}
</style>
