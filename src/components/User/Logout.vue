<template>

</template>
<script>
  import Team from '@/model/Team';

  let TeamModel = new Team();
  export default {
    async mounted() {
      try {
        localStorage.removeItem("jwt");
        this.$store.commit("logout");
        this.$router.push({
          name: "Index"
        });
      }
      catch (e) {
        this.$handleError(e);
      }
    }
  }
</script>
