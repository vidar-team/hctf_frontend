<template>
  <div id="app">
    <el-menu theme="light" default-active="/" class="top-nav" mode="horizontal" :router=true>
      <el-menu-item index="/">
        HCTF
      </el-menu-item>
      <el-menu-item index="/challenge/list">
        {{ $t("root.challengeList") }}
      </el-menu-item>
      <el-menu-item index="/challenge/submit">
        {{ $t("root.submitFlag") }}
      </el-menu-item>
      <template v-if="inited">
        <template v-if="isLogin">
          <el-menu-item index="/user/logout" class="float-right">
            {{ $t("root.logout") }}
          </el-menu-item>
          <template v-if="isAdmin">
            <el-menu-item index="/admin/index" class="float-right">
              管理后台
            </el-menu-item>
          </template>
          <el-menu-item index="/user/index" class="float-right">
            {{ teamName }}
          </el-menu-item>
        </template>
        <template v-else>
          <el-menu-item index="/user/register" class="float-right">
            {{ $t("root.register ")}}

          </el-menu-item>
          <el-menu-item index="/user/login" class="float-right">
            {{ $t("root.login") }}

          </el-menu-item>
        </template>
      </template>
      <template v-else></template>
      <el-submenu index="#" class="float-right">
        <template slot="title">Language</template>
        <el-menu-item index="#en" @click="switchLanguage('en')">
          English
        </el-menu-item>
        <el-menu-item index="#zh-cn" @click="switchLanguage('zh-cn')">
          中文
        </el-menu-item>
        <!--<el-menu-item index="#ja" @click="switchLanguage('ja')">-->
          <!-- Japanese is partly supported. If you like, uncomment this and switch to it. -->
          <!--日本語-->
        <!--</el-menu-item>-->
      </el-submenu>
    </el-menu>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Auth from './utils/auth';
  import User from './model/Team';
  import System from './model/System';

  let UserModel = new User();
  let SystemModel = new System();
  export default {
    name: 'hctf',
    data() {
      return {
        inited: false,
      }
    },
    computed: {
      teamName() {
        return this.$store.state.user.teamName;
      },
      isLogin() {
        return this.$store.state.user.isLogin;
      },
      isAdmin() {
        return this.$store.state.user.isAdmin;
      },
    },
    async mounted() {
      if (localStorage.getItem("language") === null){
        // 默认语言设定为英语
        localStorage.setItem("language", "en");
        this.$i18n.locale = "en";
      }
      else{
        this.$i18n.locale = localStorage.getItem("language");
      }
      // 读取配置信息
      // 不应阻塞
      SystemModel.getMetaInfo().then(metaInfo => {
        this.$store.commit("setTime", {
          startTime: metaInfo.startTime,
          endTime: metaInfo.endTime
        });
        this.$store.commit("setFlagFormat", {
          prefix: metaInfo.flagPrefix,
          suffix: metaInfo.flagSuffix
        });
      });
      if (!Auth.isLogin()) {
        this.inited = true;
      }
      else {
        try {
          let result = await UserModel.getTeamInfo();
          if (result.admin) {
            this.$store.commit("enterAdminMode");
          }
          this.$store.commit("setTeamName", result.team_name);
          this.$store.commit("setTeamId", result.team_id);
          this.$store.commit("login");
          this.inited = true;
        }
        catch (e) {
          this.inited = true;
        }
      }
    },
    methods: {
      switchLanguage(lang) {
        localStorage.setItem("language", lang);
        return this.$i18n.locale = lang;
      }
    }
  }
</script>

<style scoped>
  .float-right {
    float: right !important;
  }

  .el-menu {
    margin: 0 auto 1rem auto;
    box-shadow: #aaa 1px 1px 1px 0px;
  }
</style>
