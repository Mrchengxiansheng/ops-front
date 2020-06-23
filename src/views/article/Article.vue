<template>
  <div class="article">
    <OutsideHeader></OutsideHeader>
    <div class="article-page">
      <div class="article-main">
        <div class="article-main-left">
          <div class="article-main-left_display">
            <div class="article-main-left_header">
              <div class="article-header_title">
                <span class="article-sourceMode">{{ article.sourceMode }}</span>
                <span class="article_title">{{ article.title }}</span>
              </div>
              <div class="article-header_info">
                <div class="info_belongTo">来自板块：{{ article.belongTo.plateName }}</div>
                <div class="info_like">
                  <span>{{ article.viewNumber }}</span>
                  <span>{{ article.commentNumber }}</span>
                  <span>{{ article.likeNumber }}</span>
                  <span>{{ article.favoriteNumber }}</span>
                </div>
              </div>
              <div class="article-header_publishDate">
                <p>文章发表：{{ article.publishDate}}</p>
              </div>
            </div>
            <div class="article-left_content">
              <p>{{ article.describe }}</p>
              <div v-for="item in article.imgSrc" :key="item.id">
                <img @click="goImgShow(item.img_id)" :src="imgBaseUrl+item.img_url" alt />
              </div>
              <!-- <img :src="imgBaseUrl+article.imgSrc" alt /> -->
            </div>
            <div class="article-left_footer">
              <div class="footer_selector">
                <span class="selector_mode">{{ article.selectorMode.topicName}}</span>
                <span class="selector_tip">举报</span>
              </div>
              <div class="footer_author">
                <span>规范转载（作者授权-署名-非商业使用）</span>
              </div>
              <div class="footer_user">
                <span class="like_number">{{ article.likeNumber }}</span>
                <span class="favorite_number">{{ article.favoriteNumber }}</span>
              </div>
            </div>
          </div>
          <div class="article-main-left_comment">
            <p>看帖是喜欢，评论才是真爱：</p>
            <textarea class="comment_input" placeholder="请开始你的表演..."></textarea>
            <div class="commment_toolbar">
              <span>评论</span>
            </div>
          </div>
          <div class="article-main-left_reply">
            <div class="reply-header">
              <div class="reply-header_bar">
                <ul>
                  <li>全部评论</li>
                  <li>只看楼主</li>
                </ul>
              </div>
              <div class="reply-header_sort">
                <span>排序</span>
              </div>
            </div>
            <div class="reply-body">
              <div class="reply-body-inner" v-for="item in commentator" :key="item.id">
                <div class="reply-body_left">
                  <img :src="item.avatar" alt />
                </div>
                <div class="reply-body_right">
                  <p class="commentator-header">
                    <span class="commentator_name">{{ item.name }}</span>
                    <span class="commentator_level">{{ item.level }}</span>
                  </p>
                  <p class="commentator-floor">{{ item.floor }}楼</p>
                  <div class="commentator-content">
                    <p>{{ item.content }}</p>
                    <img :src="item.commentImg" alt />
                  </div>
                  <div class="commentator-date">
                    <span>{{ item.date }}</span>
                    <span class="favorite_number">
                      <span>回复</span>
                      <span class="span_mid">|</span>
                      <span>{{ item.favoriteNumber }}</span>
                    </span>
                  </div>
                  <div v-if="item.responder">
                    <div class="respond" v-for="(respond, index) in item.responder" :key="index">
                      <div class="respond-left">
                        <img :src="respond.respondImg" alt />
                      </div>
                      <div class="respond-right">
                        <div class="respond-right_header">
                          <span>{{ respond.respondName }}</span>
                        </div>
                        <div class="respond-right_content">
                          <p>{{ respond.respondContent }}</p>
                        </div>
                        <div class="respond-right_favorite">
                          <span class="favorite_number">
                            <span>回复</span>
                            <span class="span_mid">|</span>
                            <span>{{ respond.respondFavoriteNumber }}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="reply-more">
              <span class="reply-more_btn">点击加载更多</span>
            </div>
          </div>
        </div>
        <div class="article-main-right">
          <div class="article-author">
            <div class="article-author_avatar">
              <img :src="author.avatar" alt />
            </div>
            <div class="article-author_information">
              <p>
                <span class="author_name">{{ author.name }}</span>
                <span class="author_level">{{ author.level }}</span>
              </p>
              <span class="attention">关注</span>
            </div>
          </div>
          <div class="article-hot">
            <div class="article-hot-header">
              <h5>热门话题</h5>
            </div>
            <div class="article-hot_selector">
              <ul>
                <li v-for="item in hotTopic" :key="item.id">
                  <span class="hot_label">热门</span>
                  <span class="hot_title">{{ item.title }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="article-topic">
            <div class="article-topic-header">
              <h5>所属话题</h5>
            </div>
            <div class="article-topic_selector">
              <img class="topic_img" :src="article.selectorMode.topicImg" alt />
              <span>{{ article.selectorMode.topicName }}</span>
            </div>
          </div>
          <div class="article-plate">
            <div class="article-plate-header">
              <h5>所属板块</h5>
            </div>
            <div class="article-plate_selector">
              <img class="plate_img" :src="article.belongTo.plateImg" alt />
              <span>{{ article.belongTo.plateName }}</span>
            </div>
          </div>
        </div>
        <div class="article-main_actions"></div>
      </div>
    </div>
    <ImgShow @change="changeImgShow" v-if="isShow" :imgs="article.imgSrc" :imgId="imgId"></ImgShow>
  </div>
</template>

<script>
import OutsideHeader from "@/components/OutsideHeader.vue";
import imgSrc from "../../assets/images/avatar30046.png";
import ImgShow from "./childComponents/ImgShow.vue";
import axios from "axios";

export default {
  components: {
    OutsideHeader,
    ImgShow
  },
  data() {
    return {
      imgBaseUrl: "http://localhost:3000",
      isShow: false,
      imgId: 0,
      article: {
        sourceMode: "同人创作",
        title: "元旦快乐",
        belongTo: {
          plateName: "图区",
          plateImg: imgSrc
        },
        viewNumber: 2545,
        commentNumber: 333,
        likeNumber: 33,
        favoriteNumber: 334,
        publishDate: "01-02",
        describe: "收到甲方开具的说服力",
        imgSrc: null,
        selectorMode: {
          topicName: "同人绘画",
          topicImg: imgSrc
        }
      },
      author: {
        name: "Mirsds",
        avatar: imgSrc,
        level: 12
      },
      hotTopic: [
        { id: 1, title: "科举考试地方" },
        { id: 2, title: "深刻的回复框" },
        { id: 3, title: "杀杀杀" }
      ],
      commentator: [
        {
          id: 1,
          avatar: imgSrc,
          name: "拉拉",
          level: "lv5",
          floor: "10",
          content: "看JFK就",
          commentImg: imgSrc,
          date: "01-02",
          favoriteNumber: 36,
          responder: [
            {
              respondImg: imgSrc,
              respondName: "记得付款节点",
              respondContent: "老时间老地方",
              respondFavoriteNumber: 2
            }
          ]
        },
        {
          id: 2,
          avatar: imgSrc,
          name: "拉拉",
          level: "lv5",
          floor: "10",
          content: "看JFK就",
          commentImg: imgSrc,
          date: "01-02",
          favoriteNumber: 36,
          responder: [
            {
              respondImg: imgSrc,
              respondName: "记得付款节点",
              respondContent: "老时间老地方",
              respondFavoriteNumber: 2
            }
          ]
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      // console.log(this.$route.params);
      // console.log(this.$route.path);
      await axios({
        method: "get",
        url: "http://localhost:3000" + this.$route.path
        // params: {
        //   user_id: this.$route.params
        // }
      }).then(res => {
        this.article.title = res.data.title;
        this.article.describe = res.data.describe;
        this.article.imgSrc = res.data.imgs;
      });
    },
    goImgShow(id) {
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
.article-page {
  padding-top: 150px;
  background-color: #fafafa;
  .article-main {
    width: 1170px;
    margin: 0 auto;
    display: flex;
    .article-main-left {
      width: 800px;
      .article-main-left_display {
        background-color: #fff;
        padding: 40px 50px;
        .article-main-left_header {
          .article-header_title {
            width: 100%;
            .article-sourceMode {
              color: #fff;
              font-size: 14px;
              background-color: #4cd7e8;
            }
            .article_title {
              margin-left: 10px;
              font-size: 22px;
              font-weight: 600px;
            }
          }
          .article-header_info {
            margin-top: 20px;
            height: 40px;
            padding: 0 20px;
            background-color: #f7f8fc;
            .info_belongTo {
              float: left;
              height: 40px;
              line-height: 40px;
            }
            .info_like {
              float: right;
              height: 40px;
              line-height: 40px;
              span {
                margin-right: 10px;
              }
              span:last-child {
                margin-right: 0;
              }
            }
          }
          .article-header_publishDate {
            margin-top: 10px;
            p {
              color: #ccc;
              font-size: 14px;
              text-align: center;
            }
          }
        }
        .article-left_content {
          margin-top: 10px;
          p {
            color: #333;
            margin-bottom: 30px;
          }
          img {
            max-width: 100%;
            max-height: 600px;
            margin: 10px 0;
            display: block;
          }
        }
        .article-left_footer {
          margin-top: 30px;
          .footer_selector {
            height: 40px;
            line-height: 40px;
            color: #ccc;
            font-size: 12px;
            padding: 0 10px;
            .selector_mode {
              background-color: #eee;
              border-radius: 10px;
              padding: 10px;
              color: #333;
            }
            .selector_tip {
              float: right;
            }
          }
          .footer_author {
            margin-top: 30px;
            text-align: center;
          }
          .footer_user {
            margin-top: 30px;
            border-top: 1px solid #eee;
            padding-top: 30px;
            text-align: center;
            .like_number {
              margin-right: 20px;
            }
          }
        }
      }
      .article-main-left_comment {
        margin-top: 30px;
        background-color: #fff;
        padding: 40px 50px;
        p {
          margin-bottom: 20px;
          color: #ccc;
          font-size: 12px;
        }
        .comment_input {
          width: 100%;
          height: 100px;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 10px;
        }
        .commment_toolbar {
          margin-top: 20px;
          span {
            float: right;
            width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            font-weight: 500;
            border-radius: 5px;
            background-color: #4cc3ff;
          }
        }
      }
      .article-main-left_reply {
        margin: 30px 0;
        background-color: #fff;
        padding: 40px 50px 0 50px;
        .reply-header {
          display: flex;
          .reply-header_bar {
            flex-grow: 1;
            li {
              float: left;
              width: 80px;
              height: 40px;
              line-height: 40px;
              text-align: center;
            }
          }
          .reply-header_sort {
            line-height: 40px;
          }
        }
        .reply-body {
          margin-top: 20px;
          .reply-body-inner {
            display: flex;
            margin-bottom: 30px;
            border-bottom: 1px solid #ccc;
            .reply-body_left {
              vertical-align: top;
              margin-right: 10px;
              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
            }
            .reply-body_right {
              flex-grow: 1;
              .commentator-header {
                font-size: 12px;
                .commentator_level {
                  margin-left: 5px;
                  background-color: #4cc3ff;
                  color: #fff;
                }
              }
              .commentator-floor {
                font-size: 12px;
                color: #eee;
              }
              .commentator-content {
                padding: 20px 0;
                p {
                  font-size: 12px;
                }
                img {
                  max-width: 40px;
                  max-height: 40px;
                }
              }
              .commentator-date {
                color: #eee;
                font-size: 12px;
                margin-bottom: 20px;
                .favorite_number {
                  float: right;
                  .span_mid {
                    margin: 0 10px;
                  }
                }
              }
              .respond {
                background-color: #f7f8fc;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                display: flex;
                .respond-left {
                  margin-right: 10px;
                  img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                  }
                }
                .respond-right {
                  flex-grow: 1;
                  .respond-right_header {
                    font-size: 12px;
                  }
                  .respond-right_content {
                    padding: 20px 0;
                    p {
                      font-size: 12px;
                    }
                    img {
                      max-width: 40px;
                      max-height: 40px;
                    }
                  }
                  .respond-right_favorite {
                    float: right;
                    color: #eee;
                    font-size: 12px;
                    .span_mid {
                      margin: 0 10px;
                    }
                  }
                }
              }
            }
          }
          .reply-body-inner:last-child {
            margin-bottom: 0;
          }
        }
        .reply-more {
          height: 70px;
          line-height: 70px;
          text-align: center;
          .reply-more_btn {
            color: #4cc3ff;
            padding: 10px 0;
          }
        }
      }
    }
    .article-main-right {
      width: 300px;
      margin-left: 70px;
      .article-author {
        padding: 0 20px 0 30px;
        height: 160px;
        background-color: #fff;
        display: flex;
        margin-bottom: 20px;
        border-radius: 4px;
        justify-content: center;
        align-items: center;
        .article-author_avatar {
          margin-right: 20px;
          img {
            width: 80px;
            height: 80px;
            vertical-align: top;
          }
        }
        .article-author_information {
          flex-grow: 1;
          .author_name {
            margin-right: 10px;
          }
          .author_level {
            background-color: #4cc3ff;
            color: #fff;
          }
          .attention {
            display: inline-block;
            margin-top: 10px;
            width: 80px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            text-align: center;
            border: 1px solid #4cc3ff;
            color: #4cc3ff;
            border-radius: 5px;
            font-weight: 500;
          }
        }
      }
      .article-hot {
        margin-top: 30px;
        padding: 20px;
        background-color: #fff;
        margin-bottom: 20px;
        border-radius: 4px;
        .article-hot-header {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #ccc;
        }
        .article-hot_selector {
          margin-top: 10px;
          li {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            .hot_label {
              display: inline-block;
              width: 50px;
              height: 20px;
              line-height: 20px;
              margin-right: 15px;
              color: #f00;
              border: 1px solid #f00;
              border-radius: 5px;
              text-align: center;
            }
          }
        }
      }
      .article-topic,
      .article-plate {
        margin-top: 30px;
        padding: 20px;
        background-color: #fff;
        margin-bottom: 20px;
        border-radius: 4px;
        .article-topic-header,
        .article-plate-header {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #ccc;
        }
        .article-topic_selector,
        .article-plate_selector {
          margin-top: 20px;
          img {
            width: 80px;
            height: 80px;
            vertical-align: middle;
            margin-right: 10px;
          }
          span {
          }
        }
      }
    }
    .article-main_actions {
      position: fixed;
      top: 150px;
    }
  }
}
</style>
