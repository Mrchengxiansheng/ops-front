<template>
  <div class="swp">
    <div class="swp-header">
      <span class="swp-header_left">{{this.now +1 }} / {{imgs.length}}</span>
      <span class="swp-header_right" @click="goArticle">返回</span>
    </div>
    <div class="swp-main" ref="swpmain">
      <div class="img_card" v-for="item in sortedImgs" :key="item.id">
        <img :src="imgBaseUrl + item.img_url" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgId: Number,
    imgs: Array
  },
  data() {
    return {
      imgBaseUrl: "http://localhost:3000",
      sortedImgs: [],
      touchStart: 0,
      distance: 0,
      pre: 0,
      now: 0,
      next: 0,
      clientWidth: 0,
      count: 0,
      left: true,
      right: false
    };
  },
  created() {
    this.sortData();
    this.count = this.imgs.length;
  },
  mounted() {
    this.initData();
    this.slide();
  },
  methods: {
    sortData() {
      let imgIndex = 0;
      for (let i = 0; i < this.imgs.length; i++) {
        if (this.imgs[i].img_id === this.imgId) {
          imgIndex = i;
          break;
        }
      }
      this.sortedImgs = this.sortedImgs.concat(this.imgs.slice(imgIndex));
      this.sortedImgs = this.sortedImgs.concat(this.imgs.slice(0, imgIndex));
    },
    initData() {
      this.clientWidth = document.documentElement.clientWidth;
      const imgCard = document.querySelectorAll(".img_card");
      if (this.count === 1) {
        this.now = 0;
        imgCard[this.now].style.transform = "translateX(0px)";
      } else if (this.count === 2) {
        this.now = 0;
        this.next = 1;
        imgCard[this.now].style.transform = "translateX(0px)";
        imgCard[this.next].style.transform =
          "translateX(" + this.clientWidth + "px)";
      } else {
        this.pre = imgCard.length - 1;
        this.now = 0;
        this.next = 1;
        imgCard[this.pre].style.transform =
          "translateX(" + -this.clientWidth + "px)";
        imgCard[this.now].style.transform = "translateX(0px)";
        imgCard[this.next].style.transform =
          "translateX(" + this.clientWidth + "px)";
      }
    },
    slide() {
      const swpmain = this.$refs.swpmain;
      const imgCard = document.querySelectorAll(".img_card");
      swpmain.addEventListener("touchstart", e => {
        if (this.count === 1) {
          e.preventDefault();
          return;
        }
        this.touchStart = e.targetTouches[0].clientX;
      });
      swpmain.addEventListener("touchmove", e => {
        if (this.count === 1) {
          e.preventDefault();
          return;
        }
        this.distance = e.targetTouches[0].clientX - this.touchStart;
        if (this.count === 2) {
          if (this.now > this.next && this.right) {
            //   this.right=!this.right;
            if (this.distance > 0) {
              imgCard[this.now].style.transform =
                "translateX(" + this.distance + "px)";
              imgCard[this.pre].style.transform =
                "translateX(" + (-this.clientWidth + this.distance) + "px)";
            }
          }
          if (this.pre >= this.now && this.left) {
            if (this.distance < 0) {
              imgCard[this.now].style.transform =
                "translateX(" + this.distance + "px)";
              imgCard[this.next].style.transform =
                "translateX(" + (this.clientWidth + this.distance) + "px)";
            }
          }
        } else {
          if (this.distance > 0) {
            imgCard[this.now].style.transform =
              "translateX(" + this.distance + "px)";
            imgCard[this.pre].style.transform =
              "translateX(" + (-this.clientWidth + this.distance) + "px)";
          }
          if (this.distance < 0) {
            imgCard[this.now].style.transform =
              "translateX(" + this.distance + "px)";
            imgCard[this.next].style.transform =
              "translateX(" + (this.clientWidth + this.distance) + "px)";
          }
        }
      });
      swpmain.addEventListener("touchend", e => {
        if (this.count === 1) {
          e.preventDefault();
          return;
        }
        if (this.count === 2) {
          if (this.now > this.next && this.right) {
            if (Math.abs(this.distance) > 50) {
              if (this.distance > 0) {
                this.showNext(imgCard);
                this.left = true;
                this.right = false;
              }
            } else if (this.distance < 50 && this.distance > 0) {
              imgCard[this.now].style.transform = "translateX(0px)";
              imgCard[this.pre].style.transform =
                "translateX(" + -this.clientWidth + "px)";
            }
          }
          if (this.pre >= this.now && this.left) {
            if (Math.abs(this.distance) > 50) {
              if (this.distance < 0) {
                this.showPre(imgCard);
                this.right = true;
                this.left = false;
              }
            } else if (this.distance > -50 && this.distance < 0) {
              imgCard[this.now].style.transform = "translateX(0px)";
              imgCard[this.nex].style.transform =
                "translateX(" + this.clientWidth + "px)";
            }
          }
        } else if (Math.abs(this.distance) > 50) {
          if (this.distance > 0) {
            this.showNext(imgCard);
            this.left = true;
            this.right = false;
          }
          if (this.distance < 0) {
            this.showPre(imgCard);
            this.right = true;
            this.left = false;
          }
        } else if (this.distance < 50 && this.distance > 0) {
          imgCard[this.now].style.transform = "translateX(0px)";
          imgCard[this.pre].style.transform =
            "translateX(" + -this.clientWidth + "px)";
        } else if (this.distance > -50 && this.distance < 0) {
          imgCard[this.now].style.transform = "translateX(0px)";
          imgCard[this.nex].style.transform =
            "translateX(" + this.clientWidth + "px)";
        }
      });
    },
    //往左走
    showPre(imgCard) {
      //   imgCard[this.pre].style.transition = "none";
      imgCard[this.pre].style.transform =
        "translateX(" + this.clientWidth * 2 + "px)";
      this.pre = this.now;
      this.now = this.next;
      this.next++;
      if (this.next > imgCard.length - 1) {
        this.next = 0;
      }
      this.setTransformLeft(imgCard);
    },
    // 往右走
    showNext(imgCard) {
      //   imgCard[this.next].style.transition = "none";
      imgCard[this.next].style.transform =
        "translateX(" + 2 * this.clientWidth + "px)";
      this.next = this.now;
      this.now = this.pre;
      this.pre--;
      if (this.pre < 0) {
        this.pre = imgCard.length - 1;
      }
      this.setTransformRight(imgCard);
    },
    // 变换函数
    setTransformLeft(imgCard) {
      imgCard[this.pre].style.transform =
        "translateX(" + -this.clientWidth + "px)";
      imgCard[this.now].style.transform = "translateX(0px)";
      imgCard[this.next].style.transform =
        "translateX(" + this.clientWidth + "px)";
    },
    setTransformRight(imgCard) {
      imgCard[this.pre].style.transform =
        "translateX(" + -this.clientWidth + "px)";
      imgCard[this.now].style.transform = "translateX(0px)";
      imgCard[this.next].style.transform =
        "translateX(" + this.clientWidth + "px)";
    },
    goArticle() {
      this.$emit("change");
    }
  }
};
</script>

<style scoped lang="less">
.swp {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  .swp-header {
    background-color: #000;
    height: 0.5rem;
    line-height: 0.5rem;
    .swp-header_left {
      color: #fff;
      height: 0.3rem;
      float: left;
      margin-left: 0.3rem;
    }
    .swp-header_right {
      color: #fff;
      height: 0.3rem;
      float: right;
      margin-right: 0.3rem;
    }
  }
  .swp-main {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    overflow: hidden;
    position: relative;
    text-align: center;
    .img_card {
      width: 100%;
      height: calc(100%-0.5rem);
      position: absolute;
      top: 0;
      transform: translateX(200%);
      img {
        width: 100%;
      }
    }
  }
}
</style>
