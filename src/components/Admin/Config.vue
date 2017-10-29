<template>
  <el-form v-loading="loading">
    <h2>设置</h2>
    <el-form-item label="比赛开始时间">
      <el-date-picker
        v-model="form.startTime"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="比赛结束时间">
      <el-date-picker
        v-model="form.endTime"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="Flag 前缀(仅自动应用于动态 Flag)" style="width: 293px;">
      <el-input v-model="form.flagPrefix"></el-input>
    </el-form-item>
    <el-form-item label="Flag 后缀(仅自动应用于动态 Flag)" style="width: 293px;">
      <el-input v-model="form.flagSuffix"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="editConfig">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import System from '@/model/admin/System';

  let SystemModel = new System();

  export default {
    data() {
      return {
        form: {
          startTime: "",
          endTime: "",
          flagPrefix: "",
          flagSuffix: ""
        },
        loading: false
      }
    },
    computed: {},
    async mounted() {
      this.loading = true;
      try {
        let metaInfo = await SystemModel.getMetaInfo();
        this.form.startTime = metaInfo.startTime;
        this.form.endTime = metaInfo.endTime;
        this.form.flagPrefix = metaInfo.flagPrefix;
        this.form.flagSuffix = metaInfo.flagSuffix;
      }
      catch (e) {
        this.$handleError(e);
      }
      this.loading = false;
    },
    methods: {
      async editConfig(){
        this.loading = true;
        try{
          await SystemModel.editConfig(this.form.startTime, this.form.endTime, this.form.flagPrefix, this.form.flagSuffix);
        }
        catch (e){
          return this.$handleError(e);
        }
        this.loading = false;
      }
    }
  }
</script>
