<template>
  <div class="login">
    <div class="container">
      <h2>登陆</h2>
      <!-- 登录表单 -->
      <el-form style="padding: 0 .1rem;" :model="login" status-icon :rules="rule" ref="login">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="login.username" auto-complete="off" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" type="password" v-model="login.password" auto-complete="off" />
        </el-form-item>
        <el-form-item>
          <el-checkbox class="check" v-model="checked">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" class="btn" type="primary" round @click="submitForm('login')">登录</el-button>
        </el-form-item>
      </el-form>
      <div>
        <p style="text-align: center;">
          <a href="#" class="tips">还没有账号？点我去注册</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {},
  props: {},
  data() {
    let checkUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    let checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      login: {
        username: '',
        password: ''
      },
      checked: false,
      rule: {
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    };
  },
  created() { },
  mounted() { },
  methods: {
    submitForm(login) {
      this.$refs[login].validate((valid) => {
        if (valid) {
          //提交表单
          this.$http.post('http://127.0.0.1:8080/login.do', {
            username: this.login.username,
            password: this.login.password
          }).then(res => {
            console.log(res);
            if (res.bodyText === 'index') {
              this.$router.push({ path: 'home' }); //跳转到home组件中
            } else {
              console.log("登录失败");
              return false;
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  computed: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/img/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  .container {
    width: 1.5rem;
    box-shadow: 0 -0.02rem 0.1rem 0 rgba(0, 0, 0, 0.4);
    background-color: #fff;
    padding: 0 0.2rem 0.1rem;
    border-radius: 0.03rem;
    h2 {
      text-align: center;
      color: #409eff;
      border-bottom: 1px solid #eee;
      padding: 0.1rem 0 0.05rem;
      margin-bottom: 0.1rem;
      font-weight: 500;
    }
  }
}
</style>