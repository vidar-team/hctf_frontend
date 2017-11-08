<template>
  <div class="ranking-container" v-loading="loading">
    <h2> {{ $t("ranking.ranking") }}</h2>
    <template v-if="ranking.length > 0">
      <el-table :data="ranking">
        <el-table-column
          type="index"
          :index="getIndex"
          label="#"
        >
        </el-table-column>
        <el-table-column
          prop="team_name"
          :label="$t('ranking.teamName')">
        </el-table-column>
        <el-table-column
          :label="$t('ranking.score')">
          <template slot-scope="scope">
            <span :class="scope.row.effect">{{ scope.row.dynamic_total_score || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('ranking.more')">
          <template slot-scope="scope">
            {{ scope.row.more || '--'}}
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-else>
      <span v-if="!loading"> Not Available</span>
    </template>
    <template v-if="isExpandMode && ranking.length > 0">
      <el-pagination
        layout="prev, pager, next"
        :total="100"
        :page-size="20"
        :current-page="currentPage"
        @current-change="getRanking">
      </el-pagination>
    </template>
  </div>
</template>
<style>
  .ranking-container {
    width: 100%;
  }

  .ranking-header, .ranking-body {
    border: 1px solid #aaa;
    min-height: 2.5rem;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .12), 0 0 2px 0 rgba(0, 0, 0, .04);
    border-radius: 2px;
    width: 100%;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .ranking-header {
    margin-bottom: 10px;
  }

  .ranking-body {
    margin: 4px auto;
    transition: all .5s;
  }

  .ranking-body:hover {
    border: 1px solid #4db3ff;
  }

  .ranking-header-column, .ranking-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    vertical-align: middle;
    float: left;
    width: 25%;
    font-size: 1rem;
    line-height: 2.5rem;
  }

  .ranking-header-column-left, .ranking-item-left {
    margin-left: 1rem;
    margin-right: -2rem;
    text-align: left;
  }

  .score-desc {
    animation-duration: 4s;
    animation-name: desc;
  }

  .score-inc {
    animation-duration: 4s;
    animation-name: inc;
  }

  @keyframes desc {
    from {
      color: #ff6d6d;
    }
    to {
      color: black;
    }
  }

  @keyframes inc {
    from {
      color: #11b95c;
    }
    to {
      color: black;
    }
  }
</style>
<script>
  import Team from '@/model/Team';

  let TeamModel = new Team();
  export default {
    data() {
      return {
        ranking: [],
        teamList: [],
        currentPage: 1,
        loading: false
      }
    },
    async mounted() {
      this.getRanking();
      while (this.$route.name === "Index") {
        await (() =>
            new Promise(resolve => setTimeout(resolve, 30000)))();
        this.fresh();
      }
    },
    props: ['expand'],
    computed:{
      isExpandMode(){
        return this.expand !== undefined;
      }
    },
    methods: {
      getIndex(index){
        return (this.currentPage - 1) * 20 + index + 1;
      },
      checkChange() {
        let teams = Array.from(this.ranking, i => {
          return i.team_id
        }).filter(i => i !== null);
        this.$emit("change", teams);
      },
      async getRanking(page) {
        this.loading = true;
        try {
          this.ranking = await TeamModel.getRanking(this.currentPage);
          if (page !== undefined){
            this.currentPage = page;
          }
          this.checkChange();
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      async fresh() {
        let newRanking;
        this.loading = true;
        try {
          newRanking = await TeamModel.getRanking(this.currentPage);
        }
        catch (e) {
          return this.$handleError(e);
        }
        this.loading = false;
        this.checkChange();
        for (let index in this.ranking) {
          this.ranking[index].index = +index + 1;
        }
        for (let index in newRanking) {
          newRanking[index].index = +index + 1;
        }
        // do diff
        for (let team of newRanking) {
          let oldTeam = this.ranking.find(i => i.team_name === team.team_name);
          // 排位变更
          if (oldTeam.index !== undefined) {
            if (oldTeam.index < team.index) {
              team.more = "↓"
            }
            else if (oldTeam.index > team.index) {
              team.more = "↑"
            }
            else {
              team.more = '--'
            }
          }
          else {
            team.more = "New"
          }

          // 分数变更动画效果
          if (oldTeam.dynamic_total_score !== team.dynamic_total_score) {
            let diff = team.dynamic_total_score - oldTeam.dynamic_total_score;
            team.effect = diff < 0 ? "score-desc" : "score-inc"
          }
        }
        this.ranking = newRanking;
      },
      isEmpty() {
        return !this.ranking.some(i => {
          return !!i.dynamic_total_score;
        })
      }
    }
  }
</script>
