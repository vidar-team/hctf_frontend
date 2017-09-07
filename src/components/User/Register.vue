<template>
  <el-card>
    <el-form @keyup.enter.native="submit" v-loading="loading">
      <h2>注册</h2>
      <el-form-item label="队伍名">
        <el-input placeholder="队伍名" v-model="form.teamName"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input placeholder="Email" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" placeholder="密码" v-model="form.password1"></el-input>
      </el-form-item>
      <el-form-item label="重复密码">
        <el-input type="password" placeholder="重复 密码" v-model="form.password2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import User from '../../model/Team';
  let UserModel = new User();
  export default {
    data() {
      return {
        form: {
          teamName: "",
          email: "",
          password1: "",
          password2: ""
        },
        loading: false
      }
    },
    methods: {
      async submit() {
        if (!this.form.teamName || !this.form.email || !this.form.password1 || !this.form.password2) {
          return this.$message.error("请填写表单所有项目");
        }
        if (this.form.password1 !== this.form.password2) {
          return this.$message.error("两次填写的密码不一致");
        }
        this.loading = true;
        try{
          let result = await UserModel.register(this.form.teamName, this.form.email, this.form.password2);
          this.$router.push({
            name: "User-Login"
          });
        }
        catch(e){
          this.$message.error(e.message);
        }
        this.loading = false;
      }
    }
  }
</script>
