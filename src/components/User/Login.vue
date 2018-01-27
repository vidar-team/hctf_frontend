<template>
  <el-card>
    <h2>{{ $t("login.login") }}</h2>
    <el-form @keyup.enter.native="submit" v-loading="loading">
      <el-form-item label="Email">
        <el-input type="email" placeholder="Email" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('login.password')">
        <el-input type="password" :placeholder="$t('login.password')" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click.prevent="submit" type="primary">{{ $t("login.login") }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import User from '@/api/Team';

  let UserModel = new User();
  export default {
    data() {
      return {
        form: {
          email: "",
          password: ""
        },
        loading: false
      }
    },
    mounted() {

    },
    methods: {
      async submit() {
        if (!this.form.email || !this.form.password) {
          return this.$message.error(this.$t("login.pleaseFillTheForm"));
        }
        this.loading = true;
        try {
          let result = await UserModel.login(this.form.email, this.form.password);
          if (result["access_token"]) {
            localStorage.setItem('jwt', result.access_token);
          }
          result = await UserModel.getTeamInfo();
          this.$store.commit("setTeamName", result.team_name);
          this.$store.commit("setTeamId", result.team_id);
          this.$store.commit("setToken", result.token);
          this.$store.commit("login");
          if (result.admin) {
            this.$store.commit("enterAdminMode");
          }
          if (this.$route.query && this.$route.query["return"]) {
            this.$router.push({
              name: this.$route.query["return"]
            });
          }
          else {
            this.$router.push('/');
          }
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      }
    }
  }
</script>
