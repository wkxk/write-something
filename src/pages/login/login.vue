<template>
  <div class="login-wrap">
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="validate">
          <el-input v-model="ruleForm.validate" class="validate-code" placeholder="验证码"></el-input>
          <div class="code" @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p style="font-size:12px;line-height:12px;margin-top:10px;color:#e31e1b;cursor: pointer;text-align:right;" @click="handleCommand()">立即注册</p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      errorInfo: false,
      ruleForm: {
        username: 'wkxk',
        password: '123456',
        validate: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        validate: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    submitForm(formName) {
      const self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          localStorage.setItem('ms_username', self.ruleForm.username);
          localStorage.setItem('ms_user', JSON.stringify(self.ruleForm));
          if(self.ruleForm.validate != self.identifyCode) {
            self.$message.error("验证码错误");
            self.refreshCode();
            return;
          }
          self.$http.post('/api/user/login', self.ruleForm)
            .then(res => {
              if (res.status == 200) {
                self.$message.success(res.msg)
                setTimeout(() => {
                  self.$router.push('/home');
                },10);
              } else {
                self.refreshCode();
                self.$message.error(res.msg);
              }
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCommand() {
      this.$router.push('/register');
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/bg.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 320px;
    transform: translate(-50%,-50%);
    padding: 30px;
    border-radius: 4px;
    background: #fff;
    box-sizing: border-box;
    .login-btn {
      text-align: center;
      button {
        width: 100%;
        height: 40px;
      }
    }
    .code {
      width: 112px;
      height: 36px;
      border: 1px solid #ccc;
      float: right;
      border-radius: 4px;
    }
    .validate-code {
      width: 80px;
      float: left;
    }
  }
}
</style>
