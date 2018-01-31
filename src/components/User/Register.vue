<template>
  <el-card>
    <el-form @keyup.enter.native.prevent="submit" @submit.prevent="submit" v-loading="loading">
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
        <el-switch
          v-model="form.isHDUStudent"
          :active-text="$t('register.isHDUStudent')"
          :inactive-text="$t('register.isNotHDUStudent')">
        </el-switch>
      </el-form-item>
      <transition-group name="fade">
        <template v-if="form.isHDUStudent">
          <el-form-item label="学号"key="studentNumber">
            <el-input type="number" placeholder="学号" v-model="form.studentNumber"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" key="realName">
            <el-input placeholder="真实姓名" v-model="form.realName"></el-input>
          </el-form-item>
          <el-form-item label="学院" key="college">
            <el-input placeholder="学院" v-model="form.college"></el-input>
          </el-form-item>
        </template>
      </transition-group>
      <el-form-item>
        <el-button @click="submit" type="primary">{{ $t('register.register') }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
<script>
  import Team from '@/api/Team';

  export default {
    data() {
      return {
        form: {
          teamName: "",
          email: "",
          password1: "",
          password2: "",
          isHDUStudent: false,
          studentNumber: "",
          realName: "",
          college: ""
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
        if (this.form.isHDUStudent) {
          if (!this.form.studentNumber || !this.form.realName || !this.form.college) {
            return this.$message.error("校内学生请填写全部字段");
          }
        }
        this.loading = true;
        try {
          let result = await Team.register(this.form.teamName, this.form.email, this.form.password2, this.form.isHDUStudent, this.form.studentNumber,
                                           this.form.realName, this.form.college);
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
