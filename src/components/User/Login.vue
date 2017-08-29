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
          let result = await UserModel.login(this.form.email, this.form.password);
          if (result.access_token){
            localStorage.setItem('jwt', result.access_token);
          }
          result = await UserModel.getUserInfo();
          this.$store.commit("setTeamName", result.team.teamName);
          this.$store.commit("login");
          this.$router.push('/');
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      }
    }
  }
</script>
