<template>

</template>
<script>
  import User from '../../model/Team';
  let UserModel = new User();
  export default {
    async mounted(){
      try{
        let result = await UserModel.getTeamInfo();
        console.log(result);
      }
      catch (e){
        this.$handleError(e);
      }
    }
  }
</script>
