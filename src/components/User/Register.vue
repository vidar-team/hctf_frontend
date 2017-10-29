<template>
  <el-card>
    <el-alert
      :title="Unavailable"
      type="error"
      description="Registration is now unavailable. Please come back later."
      :closable="false"
      show-icon>
    </el-alert>
    <el-form @keyup.enter.native="submit" v-loading="loading">
      <h2>{{ $t('register.register') }}</h2>
      <el-form-item :label="$t('register.teamName')">
        <el-input :placeholder="$t('register.teamName')" v-model="form.teamName"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input placeholder="Email" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('register.password')">
        <el-input type="password" :placeholder="$t('register.password')" v-model="form.password1"></el-input>
      </el-form-item>
      <el-form-item :label="$t('register.confirmPassword')">
        <el-input type="password" :placeholder="$t('register.confirmPassword')" v-model="form.password2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" type="primary" disabled>{{ $t('register.register') }}</el-button>
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
          return this.$message.error(this.$t("register.pleaseFillTheForm"));
        }
        if (this.form.password1 !== this.form.password2) {
          return this.$message.error(this.$t("register.pleaseConfirmPassword"));
        }
        this.loading = true;
        try {
          let result = await UserModel.register(this.form.teamName, this.form.email, this.form.password2);
          this.$router.push({
            name: "User-Login"
          });
        }
        catch (e) {
          this.$message.error(e.message);
        }
        this.loading = false;
      }
    }
  }
</script>
