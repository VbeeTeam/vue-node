<template>
  <div class="edit">
    <Header :title="title" />
    <div class="content">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.memo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center; padding-bottom: 20px">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确认</el-button
          >
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import { isPhone } from "@/assets/js/common.js";
import { apiEdit, apiSearch } from "@/api/api.js";
export default {
  name: "Edit",
  components: {
    Header,
  },
  data() {
    var checkPhone = (rules, value, callback) => {
      if (value == "") {
        return callback(new Error("请输入手机号"));
      } else if (!isPhone(value)) {
        return callback(new Error("请输入正确手机号"));
      } else {
        callback();
      }
    };
    return {
      title: "修改客户信息",
      form: {
        name: "",
        sex: "",
        age: "",
        phone: "",
        memo: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { min: 1, max: 3, message: "长度在 1 到 3 个字符", trigger: "blur" },
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
      },
      formLabelWidth: "150px",
    };
  },
  methods: {
    //查询数据
    getInfo() {
      apiSearch({ id: this.$route.query.id }).then((res) => {
        this.form = res.obj;
      });
    },
    //确认修改
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiEdit(this.form).then((res) => {
            if (res.title) {
              this.$router.push({ path: "/" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.getInfo();
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 600px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  padding-top: 50px;
  .el-form {
    .el-input {
      width: 300px;
    }
  }
}
</style>