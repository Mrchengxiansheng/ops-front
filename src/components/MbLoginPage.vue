<template>
  <div class="ops-login-page">
    <div class="ops-login-card">
      <div class="ops-login__close" @click="goBack">
        <img src="../assets/logo.png" alt />
      </div>
      <div class="ops-login__content">
        <div class="ops-login__header">
          <div
            class="ops-login_method ops-login_message"
            :class="{ active: messageMethod }"
            @click="changeMessageMethod"
          >短信登录</div>
          <div
            class="ops-login_method ops-login_password"
            :class="{ active: verificationMethod }"
            @click="changeVerificationMethod"
          >密码登录</div>
        </div>
        <div class="ops-login__container">
          <div class="ops-login-middle">
            <div class="ops-login-input_account">
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
            <div class="ops-login-input_account login_captcha">
              <input
                class="ops-login-input"
                type="text"
                :placeholder="loginMethod.password"
                v-model="password"
                @focus="focusStyle(2)"
                @blur="blurStyle(2)"
              />
              <span v-if="loginMethod.id === 1" class="input-verification">获取验证码</span>
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
  methods: {
    // ...mapMutations(["changeLogin"]),
    // closeLogin: function() {
    //   this.changeLogin();
    // },
    goBack() {
      this.$router.go(-1);
    },
    changeMessageMethod() {
      if (!this.messageMethod) {
        this.messageMethod = true;
        this.loginMethod = JSON.parse(JSON.stringify(this.loginData[0]));
      }
      this.verificationMethod = false;
    },
    changeVerificationMethod() {
      if (!this.verificationMethod) {
        this.verificationMethod = true;
        this.loginMethod = JSON.parse(JSON.stringify(this.loginData[1]));
      }
      this.messageMethod = false;
    },
    focusStyle(num) {
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
    blurStyle(num) {
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

<style  scoped lang="less">
.ops-login-page {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  font-size: 0.14rem;
  .ops-login-card {
    padding: 0.5rem 0.3rem;
    .ops-login__close {
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 0.05rem;
      margin-bottom: 0.03rem;
      img {
        width: 0.2rem;
        height: 0.2rem;
      }
    }
    .ops-login__header {
      height: 0.5rem;
      line-height: 0.5rem;
      color: #999;
      text-align: center;
      .ops-login_method {
        display: inline-block;
        margin-right: 0.2rem;
        position: relative;
      }
      .ops-login_method.active {
        color: #000;
        font-size: 0.18rem;
        font-weight: 600;
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
        margin-top: 0.1rem;
        .ops-login-input_account {
          width: 100%;
          height: 0.4rem;
          padding: 0 0.1rem;
          border: 1px solid #ededed;
          border-radius: 0.05rem;
          margin-bottom: 0.1rem;
          .ops-login-input {
            width: 100%;
            height: 0.4rem;
            line-height: 0.4rem;
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
        .login_captcha {
          display: flex;
          .ops-login-input {
            flex: 1;
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
        margin: 0.2rem 0;
        text-align: center;
        height: 0.4rem;
        line-height: 0.4rem;
        background-color: #4cc3ff;
        color: #fff;
        border-radius: 0.05rem;
      }
    }
    .ops-login__register_bar {
      height: 0.4rem;
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

