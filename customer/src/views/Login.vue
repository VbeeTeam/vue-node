<template>
  <div class="login">
    <div class="login_form">
      <h3>管理后台登录</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="账号" prop="name" label-width="50px">
          <el-input v-model="ruleForm.name" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" label-width="50px">
          <el-input type="password" v-model="ruleForm.pass" size="medium"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" size="medium">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        name: "",
        pass: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          localStorage.setItem("user",this.ruleForm);
          this.$router.push({ path: "/" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  background: url(../assets/img/bg.png) left top;
  background-size: cover;
  height: 100%;
  position: relative;
  .login_form {
    width: 370px;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
    h3 {
      text-align: center;
      color: #409eff;
    }
    .el-form-item {
      margin-top: 20px;
      ::v-deep .el-form-item__label:before {
        content: "";
      }
      .el-input {
        width: 300px;
      }
      .el-button {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
}
</style>