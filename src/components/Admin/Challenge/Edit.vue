<template>
  <el-tabs v-model="activeTabName">
    <el-tab-pane label="概览" name="overview" v-loading="loading">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input style="width: 293px" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" style="width: 293px" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="开放时间">
          <el-date-picker
            v-model="form.releaseTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一些功能">
          <el-button type="text" @click="resetScoreDialogVisible = true">修订基准分数</el-button>
        </el-form-item>

        <!-- Dialogs -->

        <el-dialog title="危险操作确认" :visible.sync="resetScoreDialogVisible">
          <span>警告：修改题目的基准分数，将会重新计算全部已经通过该题的队伍在本题的得分，生产环境请谨慎操作。</span>
          <el-form v-model="form" v-loading="dialogLoading">
            <el-form-item label="基准分数">
              <el-input v-model="form.score" type="number"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetScoreDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="resetScore">确认</el-button>
          </div>
        </el-dialog>
        <el-form-item>
          <el-button type="primary" @click="submitOverview">保存</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="Flag 管理" name="flags" v-loading="loading">
      <el-table :data="flags">
        <el-table-column
          prop="flag_id"
          label="Flag ID"
        >
        </el-table-column>
        <el-table-column
          prop="flag"
          label="Flag"
        >
        </el-table-column>
        <el-table-column
          prop="team_id"
          label="限定队伍 ID(0为不限制)"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="startEditFlag(scope.row.flag_id)">编辑</el-button>
            <el-button type="text" style="color: red" @click="deleteFlag(scope.row.flag_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑 Flag" :visible.sync="editFlagDialogVisible">
        <el-form v-model="form" v-loading="dialogLoading">
          <el-form-item label="Flag">
            <el-input v-model="editFlagForm.flag"></el-input>
          </el-form-item>
          <el-form-item label="限定队伍ID (0为不限制)">
            <el-input v-model="editFlagForm.teamId" type="number"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editFlagDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editFlag">确认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加 Flag" :visible.sync="addFlagDialogVisible">
        <el-form v-loading="dialogLoading">
            <span>
              请按以下格式添加 Flag。
              <br>
              格式说明: 请提供一个 JSON 数组，其中每一项含有两个属性，team_id 为队伍 ID， flag 为 flag 内容。
              <br>
              示例：<span style="font-family: Consolas, monospace;">[{"team_id": 1, "flag": "hctf_flag_example"}]</span>
            </span>
          <el-form-item label="Flag 设定">
            <el-input type="textarea" v-model="addFlagForm.flag"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFlagDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addFlags">确定</el-button>
        </div>
      </el-dialog>
      <div style="margin-top: 1rem;">
        <el-button type="danger" @click="deleteAllFlags">删除所有 Flag</el-button>
        <el-button type="primary" @click="addFlagDialogVisible = true">批量添加 Flag</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import Challenge from '@/model/admin/Challenge';
  import Flag from '@/model/admin/Flag';

  let FlagModel = new Flag();
  let ChallengeModel = new Challenge();
  export default {
    data() {
      return {
        activeTabName: "overview",
        form: {
          title: "",
          description: "",
          releaseTime: ""
        },
        editFlagForm: {
          flagId: "",
          flag: "",
          teamId: 0
        },
        addFlagForm: {
          flag: ""
        },
        loading: false,
        dialogLoading: false,
        resetScoreDialogVisible: false,
        editFlagDialogVisible: false,
        addFlagDialogVisible: false,
        flags: [],
        isFlagLoaded: false
      }
    },
    watch: {
      async activeTabName() {
        if (this.activeTabName === "flags" && !this.isFlagLoaded) {
          this.loading = true;
          try {
            this.flags = await ChallengeModel.getFlagsInfo(this.$route.query.challengeId);
            this.isFlagLoaded = true;
          }
          catch (e) {
            this.$handleError(e);
          }
          this.loading = false;
        }
      }
    },
    methods: {
      /**
       * 提交简介修改
       * @returns {Promise.<void>}
       */
      async submitOverview() {
        if (!this.form.title || !this.form.description || !this.form.releaseTime) {
          return this.$handleError({
            message: "信息均不能为空"
          });
        }
        try {
          if (new Date(this.form.releaseTime) <= new Date()) {
            await this.$confirm('开放时间小于当前时间，创建后将立即可见，生产环境不建议进行此操作，确认继续?', '危险操作确认', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            });
          }
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = true;
        try {
          await ChallengeModel.editChallenge(this.$route.query.challengeId, this.form.title, this.form.description, this.form.releaseTime);
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      /**
       * 提交基准分数修改
       * @returns {Promise.<void>}
       */
      async resetScore() {
        this.dialogLoading = true;
        try {
          await ChallengeModel.resetScore(this.$route.query.challengeId, this.form.score);
          this.resetScoreDialogVisible = false;
        }
        catch (e) {
          this.$handleError(e);
        }
        this.dialogLoading = false;
      },
      /**
       * 提交删除Flag
       * @param flagId
       * @returns {Promise.<void>}
       */
      async deleteFlag(flagId) {
        this.loading = true;
        try {
          await FlagModel.deleteFlag(flagId);
          this.flags = await ChallengeModel.getFlagsInfo(this.$route.query.challengeId);
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      /**
       * 开始编辑 Flag / 准备数据
       * @param flagId
       */
      startEditFlag(flagId) {
        this.editFlagDialogVisible = true;
        let flag = this.flags.find(i => i.flag_id === flagId);
        this.editFlagForm.flag = flag.flag;
        this.editFlagForm.teamId = flag.team_id;
        this.editFlagForm.flagId = flag.flag_id;
      },
      /**
       * 提交 Flag 编辑
       * @returns {Promise.<void>}
       */
      async editFlag() {
        this.dialogLoading = true;
        try {
          let editedFlag = await FlagModel.editFlag(this.editFlagForm.flagId, this.editFlagForm.flag, this.editFlagForm.teamId);
          let nowFlag = this.flags.find(i => i.flag_id === this.editFlagForm.flagId);
          nowFlag.flag = editedFlag.flag;
          nowFlag.team_id = editedFlag.team_id;
          this.editFlagDialogVisible = false;
        }
        catch (e) {
          this.$handleError(e);
        }
        this.dialogLoading = false;
      },
      /**
       * 提交 删除全部关联 Flag
       * @returns {Promise.<void>}
       */
      async deleteAllFlags() {
        try {
          await this.$confirm('此操作将会删除该问题下的所有Flag，但不会删除该题目已经产生的提交记录，也不会扣除对应分数。生产环境不建议进行此操作，请谨慎操作。', '危险操作确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          });
        }
        catch (e) {
          return;
        }
        this.loading = true;
        try {
          await ChallengeModel.deleteAllFlags(this.$route.query.challengeId);
          this.flags = [];
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      /**
       * 添加 Flag
       * @returns {Promise.<void>}
       */
      async addFlags(){
        try{
          let newFlags = this.addFlagForm.flag;
          try{
            newFlags = JSON.parse(newFlags);
          }
          catch(e){
            return this.$handleError({
              message: "JSON 不合法"
            })
          }
          if (!Array.isArray(newFlags)){
            return this.$handleError({
              message: "JSON 不合法"
            })
          }
          for (let flag of newFlags) {
            if (!flag.hasOwnProperty("flag") || !flag.hasOwnProperty("team_id")) {
              return this.$handleError({
                message: "JSON 不合法"
              })
            }
          }
          this.dialogLoading = true;
          let flags = await ChallengeModel.addFlags(this.$route.query.challengeId, newFlags);
          this.flags = flags;
          this.addFlagDialogVisible = false;
        }
        catch (e){
          this.$handleError(e);
        }
        this.dialogLoading = false;
      }
    },
    async mounted() {
      if (!this.$route.query.challengeId) {
        this.$router.push({
          name: "Admin-Challenge-Category"
        })
      }
      this.loading = true;
      let challengeInfo = await ChallengeModel.getChallengeInfo(this.$route.query.challengeId);
      this.loading = false;
      this.form.title = challengeInfo.title;
      this.form.description = challengeInfo.description;
      this.form.releaseTime = challengeInfo.release_time;
      this.form.score = challengeInfo.score;
    }
  }
</script>
