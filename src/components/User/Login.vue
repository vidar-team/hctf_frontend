<template>
  <el-card>
    <h2>登陆</h2>
    <el-form @keyup.enter.native="submit">
      <el-form-item label="Email">
        <el-input placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>登陆</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import User from '../../model/User';
  let UserModel = new User();
  export default {
    data(){
      return {}
    },
    mounted(){

    },
    methods: {
      async submit(){
        await UserModel.login();
      }
    }
  }
</script>
