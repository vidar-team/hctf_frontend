<template>

</template>
<script>
  import User from '../../model/User';
  let UserModel = new User();
  export default {
    async mounted(){
      try{
        let result = await UserModel.getUserInfo();
        console.log(result);
      }
      catch (e){
        this.$handleError(e);
      }
    }
  }
</script>
