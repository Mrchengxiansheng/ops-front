<template>
  <div class="ops-new-article">
    <OutsideHeader></OutsideHeader>
    <div class="new-article-main">
      <div class="new-article__header">发布图片</div>
      <div class="new-article__editor">
        <div class="form-item-container">
          <span class="form-item-container__lable">标题:</span>
          <div class="form-input" :class="[inputFlag ? 'active' : '']">
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
        <div class="form-item-container">
          <span class="form-item-container__lable">图片介绍:</span>
          <div class="form-input" :class="[textareaFlag ? 'active' : '']">
            <textarea
              class="textarea__value"
              @focus="focusChange(2)"
              @blur="blurChange(2)"
              type="text"
              placeholder="请输入正文"
            ></textarea>
            <span class="textarea__span">{{ imgDecNumber }}/500</span>
          </div>
        </div>
        <div class="form-item-container">
          <span class="form-item-container__lable">上传图片:</span>
          <div class="form-input-imgs">
            <div
              class="input-imgs-show"
              v-for="item in willUploadFile"
              :key="item.id"
              :style="{backgroundImage: 'url('+ item.tmpUrl+')'} "
            >
              <div class="img_close_btn" @click="imgShowCancel(item.imgIndex)">去除</div>
            </div>
            <div class="form-input-imgs__add" @click="upload">
              <div class="add__module">
                <img src="../../assets/logo.png" alt />
                <p>点击添加图片</p>
                <p class="add__demand">最多可同时上传50张（支持格式jpg、png、jpeg、gif，宽高尺寸推荐大于420像素）</p>
                <input
                  id="fileToUpload"
                  @change="inputChange"
                  type="file"
                  accept="image/gif, image/jpg, image/png, image/jpeg"
                  multiple="multiple"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="new-article-publish">
        <span class="publish__button" @click="willPublish">发布</span>
      </div>
    </div>
    <div v-show="upLoadState" class="up-load-mask">
      <div class="up-load-state">
        <span class="state_left" @click="upContinue">继续上传</span>
        <span class="state_right" @click="goHome">返回列表页</span>
      </div>
      
    </div>
  </div>
</template>

<script>
import OutsideHeader from "@/components/OutsideHeader.vue";
import axios from "axios";
export default {
  name: "articleCreate",
  components: {
    OutsideHeader
  },
  data() {
    return {
      tilteNumber: 0,
      imgDecNumber: 0,
      inputFlag: false,
      textareaFlag: false,
      fileMaxCount: 50,
      willUploadFile: [],
      imgShowCancelFlag:false,
      count:0,
      upLoadState:false
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
    },
    inputChange() {
        let fileList = document.getElementById("fileToUpload").files;
        if (fileList.length > this.fileMaxCount) {
          alert("最多只能上传" + this.fileMaxCount + "张图");
          return;
        }
        for (let i = 0; i < fileList.length; i++) {
          let f = fileList[i]; 
          let tmpUrl = window.URL.createObjectURL(f);
          let imgIndex=this.count+i;
          this.willUploadFile.push({ f, imgIndex, tmpUrl });
        }
        this.count+=fileList.length;
    },
    imgShowCancel(index) {
      let sub=0;
      for(let i=0;i<this.willUploadFile.length;i++){
        if(this.willUploadFile[i].imgIndex===index){
          sub=i;
          break;
        }
      }
      this.willUploadFile.splice(sub,1);
    },
    upload() {
      const inputFile = document.getElementById("fileToUpload");
      inputFile.click();
    },
    async willPublish() {
      let fd = new FormData();
      let title = document.querySelector(".input__value").value;
      let describe = document.querySelector(".textarea__value").value;
      fd.append("title", title);
      fd.append("describe", describe);
      for (let i = 0; i < this.willUploadFile.length; i++) {
        fd.append("f1", this.willUploadFile[i].f); //支持多文件上传
      }
      await axios({
        method: "POST",
        url: "http://localhost:3000/post",
        data:fd
      }).then((res)=>{
        // this.afterUpShow=res.data;
        this.upLoadState=true;
        console.log(res.data);
      }).catch((e)=>{
        console.log(e);
      });
    },
    upContinue(){
      this.upLoadState = false;
    },
    goHome(){
      this.$router.push({path:"/"});
    }
  }
};
</script>

<style scoped lang="less">
.ops-new-article {
  padding-top: 100px;
  background-color: #fafafa;
  .new-article-main {
    width: 1170px;
    margin: 0 auto 100px;
    background-color: #fff;
    .new-article__header {
      padding: 0 30px;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      font-weight: 600;
      border-bottom: 1px solid #ccc;
    }
    .new-article__editor {
      padding: 50px 80px 40px;
      .form-item-container {
        display: flex;
        margin-bottom: 30px;
        .form-item-container__lable {
          display: inline-block;
          width: 100px;
          line-height: 50px;
        }
        .form-input {
          flex-grow: 1;
          display: flex;
          border: 1px solid #ccc;
          padding: 0 20px;
          border-radius: 10px;
          position: relative;
          .input__value {
            flex: 1;
            font-size: 14px;
            height: 38px;
            padding: 5px 0;
          }
          .textarea__value {
            flex: 1;
            padding: 8px 0;
            font-size: 14px;
            height: 82px;
            max-height: 82px;
          }
          .input__span {
            line-height: 48px;
            font-size: 14px;
            color: #ccc;
          }
          .textarea__span {
            position: absolute;
            bottom: 8px;
            right: 20px;
            font-size: 14px;
            color: #ccc;
          }
        }
        .form-input.active {
          border: 1px solid #00c3ff;
        }
        .form-input-imgs {
          display: flex;
          flex-wrap: wrap;
          .input-imgs-show {
            width: 240px;
            height: 180px;
            margin-right: 50px;
            margin-bottom: 20px;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
            .img_close_btn {
              width: 40px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              background-color: #fff;
              border-radius: 50%;
              position: absolute;
              top: 10px;
              right: 10px;
            }
          }
          .form-input-imgs__add {
            width: 200px;
            height: 140px;
            padding: 20px;
            background-color: #f5f5f5;
            .add__module {
              text-align: center;
              img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin: 5px 0 10px;
              }
              p {
                font-size: 12px;
                margin-bottom: 10px;
              }
              .add__demand {
                line-height: 20px;
                color: #ccc;
              }
            }
            input {
              display: none;
            }
          }
        }
      }
    }
    .new-article-publish {
      margin-top: 10px;
      text-align: center;
      .publish__button {
        text-align: center;
        display: inline-block;
        width: 200px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 14px;
        background-color: #4cc3ff;
      }
    }
  }
  .up-load-mask {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    background-color: rgba(0,0,0,0.4);
    // text-align: center;
    .up-load-state {
      background-color: #fff;
      width: 500px;
      height: 300px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
      .state_left, .state_right {
        margin-top: 120px;
        display: inline-block;
        background-color: #4cc3ff;
        color: #fff;
        height: 60px;
        line-height: 60px;
        width: 100px;
        border-radius: 10px;
      }
      .state_left {
        margin-right: 50px;
      }
    } 
  }
}
</style>