<template>
  <el-row>
    <el-col :span="10">
      <el-form>
        <h2>添加 Challenge</h2>
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input placeholder="可用占位符: {teamId}" v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="基准分数">
          <el-input type="number" v-model.number="form.score"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="Flag">
          <el-input v-model="form.flag" :disabled="disableFlagInput"></el-input>
          <el-button type="text" @click="viewMultiFlagForm">多 Flag 设定</el-button>
          <el-button type="text" @click="viewDynamicFlagForm">开启动态 Flag</el-button>
        </el-form-item>

        <el-dialog title="多 Flag 设定" :visible.sync="multiFlagDialogVisible">
          <el-form>
            <span>
              多 Flag 意味着需要为每一个队伍设定一个 Flag，请在下方提供多于队伍数量的 Flag。
              <br>
              注意，当用于二进制题时，需要为每一个队伍分配不一样的文件，请确定 URL 中使用了合适的占位符。
              <br>
              格式说明: 请提供一个 JSON 数组，其中每一项含有两个属性，team_id 为队伍 ID， flag 为 flag 内容。
              <br>
              示例：<span style="font-family: Consolas, monospace;">[{"team_id": 1, "flag": "hctf_flag_example"}]</span>
            </span>
            <el-form-item label="Flag 设定">
              <el-input type="textarea" v-model="form.multiFlag"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="multiFlagDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveMultiFlag">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="动态 Flag 设定" :visible.sync="dynamicFlagDialogVisible">
          <el-form>
            <span>
              动态 Flag 意味着每个队伍的 Flag 将会根据用户的答题 Token 和题目答案计算。公式如下：
            </span>
            <br>
            <span style="font-family: Consolas, monospace">
              userFlag = SHA256(userToken + flag)
            </span>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dynamicFlagDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveDynamicFlag">设定为动态 Flag</el-button>
          </div>
        </el-dialog>

        <el-form-item label="最小解决时间">
          <el-input type="number" v-model.number="form.config.minimumSolveTime"></el-input>
          <span>从 Level 开放到提交正确 Flag 的时间小于该值将会被封禁，单位为秒，0为不限制。</span>
        </el-form-item>
        <el-form-item label="Level">
          <el-cascader
            :options="parsedCategories"
            v-model="form.levelId">
          </el-cascader>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="form.releaseTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import Category from '@/model/admin/Category';
  import Challenge from '@/model/admin/Challenge'

  let CategoryModel = new Category();
  let ChallengeModel = new Challenge();
  export default {
    data() {
      return {
        categories: [],
        loading: false,
        form: {
          levelId: [],
          releaseTime: new Date(new Date().valueOf() + 24 * 60 * 60 * 1000).toISOString(),
          title: "",
          description: "",
          score: 0,
          url: "",
          flag: "",
          multiFlag: "",
          isDynamicFlag: false,
          config: {
            multiFlag: false,
            minimumSolveTime: 0
          }
        },
        multiFlagDialogVisible: false,
        dynamicFlagDialogVisible: false,
        disableFlagInput: false,
        flags: []
      }
    },
    async mounted() {
      this.loading = true;
      try {
        this.categories = await CategoryModel.getAllCategories();
      }
      catch (e) {
        this.$handleError(e);
      }
      this.loading = false;
    },
    methods: {
      async submit() {
        let config = this.form.config;
        if (!this.form.title || !this.form.description || !this.form.url || !this.form.score || !this.form.releaseTime || this.form.levelId.length === 0) {
          return this.$handleError({
            message: "请填写表单全部内容"
          });
        }
        this.loading = true;
        if (!this.form.flag && !this.form.isDynamicFlag) {
          if (this.flags.length === 0) {
            return this.$handleError({
              message: "请设定 Flag"
            });
          }
          else {
            config.multiFlag = true;
          }
        }
        else {
          if (this.form.flag !== "") {
            this.flags = [{
              flag: this.form.flag
            }];
          }
        }

        try {
          let challenge = await ChallengeModel.createChallenge(this.form.title, this.form.url, this.form.description, this.form.score, this.flags, config, this.form.levelId[1], this.form.releaseTime, this.form.isDynamicFlag);
          this.$message({
            showClose: true,
            message: '创建成功啦',
            type: 'success'
          });
          this.$router.push({
            name: "Admin-Challenge-Level",
            query: {
              id: this.form.levelId[1]
            }
          })
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      viewMultiFlagForm() {
        if (this.form.isDynamicFlag) {
          return this.$handleError({
            message: "多 Flag 与动态 Flag 不可同时设定"
          });
        }
        this.multiFlagDialogVisible = true;
      },
      viewDynamicFlagForm() {
        if (this.flags.length > 1) {
          return this.$handleError({
            message: "多 Flag 与动态 Flag 不可同时设定"
          });
        }
        this.dynamicFlagDialogVisible = true;
      },
      saveMultiFlag() {
        let multiFlag = this.form.multiFlag;
        try {
          multiFlag = JSON.parse(multiFlag)
        }
        catch (e) {
          return this.$handleError({
            message: "JSON 不合法"
          });
        }
        if (!Array.isArray(multiFlag)){
          return this.$handleError({
            message: "JSON 不合法"
          })
        }
        for (let flag of multiFlag) {
          if (!flag.hasOwnProperty("flag") || !flag.hasOwnProperty("team_id")) {
            return this.$handleError({
              message: "JSON 不合法"
            })
          }
        }
        this.form.flag = "";
        this.flags = multiFlag;
        this.multiFlagDialogVisible = false;
        this.disableFlagInput = true;
      },
      saveDynamicFlag() {
        if (!this.form.flag) {
          this.dynamicFlagDialogVisible = false;
          return this.$handleError({
            message: "请先填写 Flag"
          });
        }
        this.form.isDynamicFlag = true;
        this.dynamicFlagDialogVisible = false;
      }
    },
    computed: {
      parsedCategories() {
        let parsedCategories = [];
        for (let category of this.categories) {
          let parsedCategory = {
            label: category.category_name,
            value: category.category_id,
            children: []
          };
          if (category.levels.length === 0) {
            parsedCategory.disabled = true;
          }
          else {
            for (let level of category.levels) {
              parsedCategory.children.push({
                value: level.level_id,
                label: level.level_name
              });
            }
          }
          parsedCategories.push(parsedCategory);
        }
        return parsedCategories;
      }
    }
  }
</script>
