<template>
  <el-card>
    <h2>登陆</h2>
    <el-form @keyup.enter.native="submit" v-loading="loading">
      <el-form-item label="Email">
        <el-input type="email" placeholder="Email" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" placeholder="密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click.prevent="submit">登陆</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import User from '../../model/User';
  let UserModel = new User();
  export default {
    data(){
      return {
        form: {
          email: "",
          password: ""
        },
        loading: false
      }
    },
    mounted(){

    },
    methods: {
      async submit(){
        if (!this.form.email || !this.form.password){
          return this.$message.error("请填写表单内容");
        }
        this.loading = true;
        try{
          await UserModel.login(this.form.email, this.form.password);
        }
        catch (e){
          this.$message.error(e.message);
        }
        this.loading = false;
      }
    }
  }
</script>
