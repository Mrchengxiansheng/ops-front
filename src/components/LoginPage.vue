<template>
  <div class="ops-login-page" v-if="pcLoginFlag">
    <div class="ops-login-card">
      <div class="ops-login__close" @click="closeLogin">
        <img src="../assets/logo.png" alt />
      </div>
      <div class="ops-login__content">
        <div class="ops-login__header">
          <div
            class="ops-login_method ops-login_message"
            :class="{ active: messageMethod }"
            @click="changeMessageMethod"
          >
            短信登录
          </div>
          <div
            class="ops-login_method ops-login_password"
            :class="{ active: verificationMethod }"
            @click="changeVerificationMethod"
          >
            密码登录
          </div>
        </div>
        <div class="ops-login__container">
          <div class="ops-login-middle">
            <div
              class="ops-login-input_account"
              :class="{ 'input_focus': loginMethod.phoneFlag, 'input_error':loginMethod.phoneErrorFlag }"
            >
              <input
                class="ops-login-input"
                type="text"
                :placeholder="loginMethod.account"
                v-model="accountValue"
                @focus="focusStyle(1)"
                @blur="blurStyle(1)"
              />
            </div>
            <p class="ops-login_check" :class="{ 'check_error':loginMethod.phoneErrorFlag }">{{ loginMethod.phoneError }}</p>
            <div class="ops-login-input_account" :class="{ 'input_focus': loginMethod.verificationFlag, 'input_error': loginMethod.verificationErrorFlag }">
              <input
                class="ops-login-input"
                :class="{ 'input_bottom': loginMethod.id === 1 }"
                type="text"
                :placeholder="loginMethod.password"
                @focus="focusStyle(2)"
                @blur="blurStyle(2)"
                v-model="password"
              />
              <span v-if="loginMethod.id === 1" class="input-verification">
                获取验证码
              </span>
            </div>
            <p class="ops-login_check" :class="{ 'check_error':loginMethod.verificationErrorFlag }">{{ loginMethod.verificationError }}</p>
          </div>
          <div class="ops-login__button">登录</div>
        </div>
        <div class="ops-login__register_bar">
          <span class="ops-register_question">登录遇到问题?</span>
          <span class="ops-register_button">注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex"

export default {
  data() {
    return {
      loginData: [
        {
          id: 1,
          account: "手机号",
          password: "验证码",
          phoneError: "*手机号不能为空",
          verificationError: "*验证码不能为空",
          phoneFlag: false,
          verificationFlag: false,
          phoneErrorFlag: false,
          verificationErrorFlag: false
        },
        {
          id: 2,
          account: "手机号/邮箱/用户名",
          password: "密码",
          phoneError: "*账号不能为空",
          verificationError: "*密码不能为空",
          phoneFlag: false,
          verificationFlag: false,
          phoneErrorFlag: false,
          verificationErrorFlag: false
        }
      ],
      loginMethod: {
        id: 1,
        account: "手机号",
        password: "验证码",
        phoneError: "*手机号不能为空",
        verificationError: "*验证码不能为空",
        phoneFlag: false,
        verificationFlag: false,
        phoneErrorFlag: false,
        verificationErrorFlag: false
      },
      messageMethod: true,
      verificationMethod: false,
      accountValue: "",
      password: ""
    };
  },
  computed: {
    ...mapState(["pcLoginFlag"])
  },
  methods: {
    ...mapMutations(["pcChangeLogin"]),
    closeLogin() {
      this.pcChangeLogin();
    },
    changeMessageMethod: function() {
      if (!this.messageMethod) {
        this.messageMethod = true;
        this.loginMethod = JSON.parse(JSON.stringify(this.loginData[0]));
      }
      this.verificationMethod = false;
    },
    changeVerificationMethod: function() {
      if (!this.verificationMethod) {
        this.verificationMethod = true;
        this.loginMethod = JSON.parse(JSON.stringify(this.loginData[1]));
      }
      this.messageMethod = false;
    },
    focusStyle: function(num) {
      if (num === 1) {
        this.loginMethod.phoneFlag = true;
        if (this.loginMethod.phoneErrorFlag && !this.accountValue) {
          this.loginMethod.phoneErrorFlag = true;
        } else {
          this.loginMethod.phoneErrorFlag = false;
        }
      }
      if (num === 2) {
        this.loginMethod.verificationFlag = true;
        if (this.loginMethod.verificationErrorFlag && !this.password) {
          this.loginMethod.verificationErrorFlag = true;
        } else {
          this.loginMethod.verificationErrorFlag = false;
        }
      }
    },
    blurStyle: function(num) {
      if (num === 1) {
        this.loginMethod.phoneFlag = false;
        if (!this.accountValue) {
          this.loginMethod.phoneErrorFlag = true;
        } else {
          this.loginMethod.phoneErrorFlag = false;
        }
      }
      if (num === 2) {
        this.loginMethod.verificationFlag = false;
        if (!this.password) {
          this.loginMethod.verificationErrorFlag = true;
        } else {
          this.loginMethod.verificationErrorFlag = false;
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.ops-login-page {
  width: 100%;
  height: 100%;
  background-color: #2d2f33;
  opacity: 0.8;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .ops-login-card {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    padding: 30px;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 10px;
    .ops-login__close {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      position: absolute;
      right: -25px;
      top: 0;
      img {
        width: 20px;
        height: 20px; 
      }
    }
    .ops-login__header {
      height: 50px;
      line-height: 50px;
      color: #999;
      border-bottom: 1px solid #ccc;
      .ops-login_method {
        display: inline-block;
        margin-right: 20px;
        position: relative;
      }
      .ops-login_method.active::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #ee9a00;
      }
    }
    .ops-login__container {
      .ops-login-middle {
        margin-top: 10px;
        .ops-login-input_account {
          width: 380px;
          height: 40px;
          padding: 0 10px;
          border: 1px solid #ededed;
          border-radius: 5px;
          font-size: 14px;
          margin-bottom: 10px;
          .ops-login-input {
            width: 100%;
            height: 40px;
            line-height: 40px;
          }
          .input_bottom {
            display: inline-block;
            width: 260px;
            height: 40px;
            line-height: 40px;
          }
          .input-verification {
            display: inline-block;
            width: 120px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #00c3ff;
            position: relative;
          }
          .input-verification::before {
            content: "";
            width: 2px;
            height: 20px;
            position: absolute;
            top: 10px;
            left: 0;
            background-color: #ededed;
          }
        }
        .ops-login-input_account.input_focus {
          border: 1px solid #00c3ff;
        }
        .ops-login-input_account.input_error {
          border: 1px solid #ff0000;
        }
        .ops-login_check {
          display: none;
          font-size: 14px;
          margin: 5px 10px;
          color: #ff0000;
        }
        .ops-login_check.check_error {
          display: block;
        }
      }
      .ops-login__button {
        margin: 20px 0;
        text-align: center;
        height: 40px;
        line-height: 40px;
        background-color: #4cc3ff;
        color: #fff;
        border-radius: 5px;
      }
    }
    .ops-login__register_bar {
      height: 40px;
      font-size: 14px;
      .ops-register_question {
        float: left;
      }
      .ops-register_button {
        float: right;
      }
    }
  }
}
</style>
