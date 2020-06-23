<template>
  <div class="ops-new-article">
    <MbHeader :isHome="hearder.isHome" :hearderTitle="hearder.title" :isPublish="hearder.isPublish"></MbHeader>
    <div class="new-article-main">
      <div class="form-item-container" :class="[inputFlag ? 'active' : '']">
        <div class="form-input">
          <input
            class="input__value"
            @focus="focusChange(1)"
            @blur="blurChange(1)"
            type="text"
            placeholder="标题（必填，不得超过30字）"
          />
          <span class="input__span">{{ tilteNumber }}/30</span>
        </div>
      </div>
      <div class="form-item-container" :class="[textareaFlag ? 'active' : '']">
        <div class="form-item-container__lable">图片介绍</div>
        <div class="form-input">
          <textarea
            @focus="focusChange(2)"
            @blur="blurChange(2)"
            class="textarea__value"
            type="text"
            placeholder="请输入正文"
          ></textarea>
          <span class="textarea__span">{{ imgDecNumber }}/500</span>
        </div>
      </div>
      <div class="form-item-container form-img">
        <div class="form-item-container__lable">上传图片</div>
        <div class="form-input-imgs__add">
          <p class="img__demand">最多可同时上传50张（支持格式jpg、png、jpeg、gif，宽高尺寸推荐大于420像素）</p>
          <div class="img-cards clearfix">
            <div class="img__add">
              <img src="../../assets/logo.png" alt />
              <p>添加图片</p>
              <input
                type="file"
                accept="image/gif, image/jpg, image/png, image/jpeg"
                multiple="multiple"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="publish-agreement">
        <p>发布即同意上传协议</p>
      </div>
    </div>
  </div>
</template>

<script>
import MbHeader from "../../components/MbHeader.vue";
export default {
  components: {
    MbHeader
  },
  data() {
    return {
      hearder: {
        isHome: false,
        title: "图区",
        isPublish: true
      },
      tilteNumber: 0,
      imgDecNumber: 0,
      inputFlag: false,
      textareaFlag: false
    };
  },
  methods: {
    focusChange(id) {
      if (id === 1) {
        this.inputFlag = true;
      } else {
        this.textareaFlag = true;
      }
    },
    blurChange(id) {
      if (id === 1) {
        this.inputFlag = false;
      } else {
        this.textareaFlag = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.ops-new-article {
  width: 100%;
  height: 100%;
  position: relative;
  margin: auto;
  overflow: hidden;
  font-size: 0.14rem;
  .new-article-main {
    margin: 0.5rem 0 0.3rem;
    padding: 0.15rem 0.1rem 0 0.1rem;
    background-color: #fff;
    .form-item-container {
      margin-bottom: 0.2rem;
      border-bottom: 1px solid #ccc;
      .form-item-container__lable {
        line-height: 0.4rem;
      }
      .form-input {
        display: flex;
        position: relative;
        .input__value {
          flex: 1;
          font-size: 0.14rem;
          height: 0.3rem;
          padding: 0.05rem 0;
          color: #ccc;
        }
        .textarea__value {
          flex: 1;
          padding: 0.1rem 0;
          font-size: 0.14rem;
          height: 0.82rem;
          max-height: 0.82rem;
        }
        .input__span {
          line-height: 0.4rem;
          font-size: 0.12rem;
          color: #404040;
        }
        .textarea__span {
          position: absolute;
          bottom: 0.08rem;
          right: 0;
          font-size: 0.12rem;
          color: #404040;
        }
      }
      .form-input-imgs__add {
        .img__demand {
          line-height: 0.2rem;
          font-size: 0.12rem;
          color: #ccc;
          margin-bottom: 0.05rem;
        }
        .img-cards {
          padding: 0.1rem 0;
          .img__add {
            background-color: #f5f5f5;
            width: 0.9rem;
            height: 0.9rem;
            margin-right: 0.1rem;
            margin-bottom: 0.1rem;
            border-radius: 0.05rem;
            float: left;
            text-align: center;
            img {
              width: 0.3rem;
              height: 0.3rem;
              border-radius: 50%;
              margin: 0.1rem;
            }
            p {
              font-size: 0.12rem;
            }
            input {
              display: none;
            }
          }
        }
      }
    }
    .form-item-container.active{
        border-bottom: 1px solid #00c3ff;
    }
    .form-img {
      border-bottom: 1px solid #ccc;
    }
    .publish-agreement {
      p {
        font-size: 0.14rem;
        color: #ccc;
      }
    }
  }
}
</style>