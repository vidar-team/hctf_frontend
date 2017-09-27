<template>
  <div class="ranking-container">
    <div class="ranking-header">
      <div class="ranking-header-column ranking-header-column-left">#</div>
      <div class="ranking-header-column">Team Name</div>
      <div class="ranking-header-column">Score</div>
      <div class="ranking-header-column">More</div>
    </div>
    <div class="ranking-body" v-for="(team, index) in ranking">
      <div class="ranking-item ranking-item-left">{{ index + 1 }}</div>
      <div class="ranking-item">{{ team.team_name }}</div>
      <div class="ranking-item">{{ team.score }}</div>
      <div class="ranking-item">{{ team.more || '--' }}</div>
    </div>
  </div>
</template>
<style>
  .ranking-container{
    width: 70%;
  }
  .ranking-header, .ranking-body{
    border: 1px solid #aaa;
    min-height: 3rem;
    box-shadow: #aaa 1px 1px 1px 0;
    border-radius: 2px;
    width: 100%;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  .ranking-header {
    margin-bottom: 10px;
  }
  .ranking-body {
    margin: 4px auto;
    transition: all .5s;
  }
  .ranking-body:hover{
    border-color: #eef1f6;
  }
  .ranking-header-column, .ranking-item{
    text-align: center;
    vertical-align: middle;
    float: left;
    width: 25%;
    font-size: 1.5rem;
    line-height: 3rem;
  }
  .ranking-header-column-left, .ranking-item-left{
    margin-left: 1rem;
    margin-right: -1rem;
    text-align: left;
  }
</style>
<script>
  import Team from '@/model/Team';
  let TeamModel = new Team();
  export default {
    data(){
      return {
        ranking: []
      }
    },
    async mounted(){
      this.getRanking();
      while(true){
        if (this.$route.name !== "Index"){
          break;
        }
        this.fresh();
        await (() => {
          return new Promise(resolve => setTimeout(resolve, 5000))
        })();
      }
    },
    methods: {
      async getRanking(){
        try{
          this.ranking = await TeamModel.getRanking();
        }
        catch (e){
          this.$handleError(e);
        }
      },
      async fresh(){
        let newRanking = await TeamModel.getRanking();
        for (let index in this.ranking){
          this.ranking[index].index = +index + 1;
        }
        for (let index in newRanking){
          newRanking[index].index = +index + 1;
        }
        // do diff
        for (let team of newRanking){
          let oldTeam = this.ranking.find(i => i.team_name === team.team_name);
          if (oldTeam.index !== undefined){
            if (oldTeam.index < team.index){
              team.more = "↓"
            }
            else if (oldTeam.index > team.index){
              team.more = "↑"
            }
            else{
              team.more = '--'
            }
          }
          else{
            team.more = "New"
          }
        }
        this.ranking = newRanking;
      }
    }
  }
</script>
