<template>

</template>
<script>
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
