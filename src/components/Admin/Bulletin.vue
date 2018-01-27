<template>
  <el-tabs v-model="activeTabName" v-loading="loading">
    <el-tab-pane label="公告列表" name="list">
      <el-table :data="bulletins">
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="prepareEditBulletin(scope.row.bulletin_id)">编辑</el-button>
            <el-button type="text" style="color: red" @click="deleteBulletin(scope.row.bulletin_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="添加公告" name="add">
      <el-form>
        <el-form-item label="标题">
          <el-input style="width: 293px" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" style="width: 293px" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createBulletin">提交</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-dialog title="编辑公告" :visible.sync="editDialogVisible">
      <el-form v-loading="dialogLoading">
        <el-form-item label="标题">
          <el-input type="text" v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="editForm.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBulletin">确 定</el-button>
      </div>
    </el-dialog>
  </el-tabs>
</template>
<script>
  import Bulletin from '@/api/admin/Bulletin';
  let BulletinModel = new Bulletin();
  export default {
    data(){
      return {
        activeTabName: "list",
        bulletins: [],
        form: {
          title: "",
          content: ""
        },
        editForm: {
          bulletinId: "",
          title: "",
          content: ""
        },
        loading: false,
        dialogLoading: false,
        editDialogVisible: false
      }
    },
    async mounted(){
      this.loading = true;
      try{
        this.bulletins = await BulletinModel.getAllBulletins();
      }
      catch (e){
        this.$handleError(e);
      }
      this.loading = false;
    },
    methods: {
      prepareEditBulletin(bulletinId){
        this.editDialogVisible = true;
        let bulletin = this.bulletins.find(b => {
          return b.bulletin_id === bulletinId;
        });
        this.editForm.title = bulletin.title;
        this.editForm.content = bulletin.content;
        this.editForm.bulletinId = bulletin.bulletin_id;
      },
      async deleteBulletin(bulletinId){
        this.loading = true;
        try{
          await BulletinModel.deleteBulletin(bulletinId);
          this.bulletins = await BulletinModel.getAllBulletins();
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      },
      async createBulletin(){
        if (!this.form.title || !this.form.content){
          return this.$handleError({
            message: "请填写所有项目"
          });
        }
        this.loading = true;
        try{
          this.bulletins.push(await BulletinModel.createBulletin(this.form.title, this.form.content));
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      },
      async editBulletin(){
        if (!this.editForm.bulletinId || !this.editForm.title || !this.editForm.content){
          return this.$handleError({
            message: "请填写所有项目"
          });
        }
        this.dialogLoading = true;
        try{
          await BulletinModel.editBulletin(this.editForm.bulletinId, this.editForm.title, this.editForm.content);
          this.bulletins = await BulletinModel.getAllBulletins();
          this.editDialogVisible = false;
        }
        catch (e){
          this.$handleError(e);
        }
        this.dialogLoading = false;
      }
    }
  }
</script>
