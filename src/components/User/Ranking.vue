<template>
  <div class="ranking-container">
    <h2> {{ $t("ranking.ranking") }}</h2>
    <div class="ranking-header">
      <div class="ranking-header-column ranking-header-column-left">#</div>
      <div class="ranking-header-column">Team Name</div>
      <div class="ranking-header-column">Score</div>
      <div class="ranking-header-column">More</div>
    </div>
    <div class="ranking-body" v-for="(team, index) in ranking">
      <div class="ranking-item ranking-item-left">{{ index + 1 }}</div>
      <div class="ranking-item">{{ team.team_name }}</div>
      <div class="ranking-item" :class="team.effect">{{ team.dynamic_total_score || 0 }}</div>
      <div class="ranking-item">{{ team.more || '--' }}</div>
    </div>
  </div>
</template>
<style>
  .ranking-container {
    width: 100%;
  }

  .ranking-header, .ranking-body {
    border: 1px solid #aaa;
    min-height: 2.5rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
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
    text-align: center;
    vertical-align: middle;
    float: left;
    width: 25%;
    font-size: 1rem;
    line-height: 2.5rem;
  }

  .ranking-header-column-left, .ranking-item-left {
    margin-left: 1rem;
    margin-right: -1rem;
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
      }
    },
    async mounted() {
      this.getRanking();
      while (true) {
        if (this.$route.name !== "Index") {
          break;
        }
        await (() =>
            new Promise(resolve => setTimeout(resolve, 30000)))();
        this.fresh();
      }
    },
    methods: {
      checkChange() {
        let teams = Array.from(this.ranking, i => {
          return i.team_id
        }).filter(i => i !== null);
        this.$emit("change", teams);
      },
      async getRanking() {
        try {
          this.ranking = await TeamModel.getRanking();
          this.checkChange();
        }
        catch (e) {
          this.$handleError(e);
        }
      },
      async fresh() {
        let newRanking;
        try {
          newRanking = await TeamModel.getRanking();
        }
        catch (e) {
          return this.$handleError(e);
        }
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
