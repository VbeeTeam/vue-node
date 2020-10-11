<template>
  <div class="home">
    <Header :title="title" />

    <div class="content">
      <div class="content_header">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="formInline.sex" placeholder="请选择性别">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" style="margin-right: 20px;">查询</el-button>
            <router-link to="/add"><el-button type="info">新增</el-button></router-link>
          </el-form-item>
        </el-form>
      </div>

      <div class="content_table">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column label="姓名" width="180" prop="name"></el-table-column>
          <el-table-column label="性别" width="180" prop="sex">
            <template slot-scope="scope">
              <span>{{ scope.row.sex == 0 ? '男' : '女' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="年龄" width="180" prop="age"></el-table-column>
          <el-table-column label="手机号" width="180" prop="phone"></el-table-column>
          <el-table-column label="备注" width="180" prop="memo"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
             <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { isPhone } from "@/assets/js/common.js";
import { apiList, apiDelete, apiSearch } from "@/api/api.js";

export default {
  name: "Home",
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
      title: "客户信息管理系统",
      formInline: {
        name: "",
        sex: "",
      },
      tableData: [],
      page: 1,
      size: 5,
      total: 0
    };
  },
  methods: {
    //获取列表方法
    getList() {
      let obj = {
        page: this.page,
        size: this.size,
        name: this.formInline.name,
        sex: this.formInline.sex
      }
      apiList(obj).then((res) => {
        this.tableData = res.list.data;
        this.total = res.total;
      });
    },
    //搜索
    search() {
      this.getList();
    },
    //修改
    handleEdit(id) {
      this.$router.push({path:"/edit",query:{id: id}});
    },
    handleDelete(index, row) {
      apiDelete({ id: row.id }).then((res) => {
        this.tableData = res.list;
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
       this.page = val;
       this.getList();
    },
    
  },
  created() {
    //初始化列表
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  padding-top: 100px;
  box-sizing: border-box;
  .content {
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    .content_header {
      text-align: center;
    }
    .content_table {
      ::v-deep .el-table {
        .cell {
          text-align: center;
        }
      }
      .el-pagination {
        padding-top: 20px;
      }
    }
  }
 
}
</style>
