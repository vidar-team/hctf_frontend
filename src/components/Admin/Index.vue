<template>
  <section>
    <h2 style="font-family: Consolas, monospace">Welcome back, my dearest master.</h2>
    <div class="system-log">
      <template v-for="log in logs">
        <div class="system-log-body">
          <span class="system-log-time">[{{ log.created_at }}]</span>
          <span :class="parseLevel(log.level)"> [{{ log.level }}] </span>
          <span class="system-log-message"> {{ log.message }} </span>
        </div>
      </template>
    </div>
  </section>
</template>
<style>
  .system-log {
    font-family: Consolas, "Noto Sans CJK SC Regular", "Microsoft YaHei UI Light", monospace;
  }

  .system-log-time {
    color: #aaa;
  }

  .system-log-level-info {
    color: #1b559f;
  }

  .system-log-level-notice {
    color: #aaa;
  }

  .system-log-level-error {
    color: red;
  }

  .system-log-level-emergency {
    color: red;
    font-size: larger;
  }

  .system-log-level-warning {
    color: #ad9931;
  }
</style>
<script>
  import SystemLog from '@/api/admin/SystemLog';

  export default {
    data() {
      return {
        logs: [],
        nowId: 0,
        loading: false
      }
    },
    async mounted() {
      this.loadLogs();
      while (this.$route.name === "Admin-Index") {
        await (() => new Promise(resolve => setTimeout(resolve, 3000)))();
        this.loadLogs(this.nowId);
      }
    },
    methods: {
      async loadLogs(startId = 0) {
        this.loading = true;
        try {
          let recentLogs = await SystemLog.list(startId);
          for (let log of recentLogs.reverse()) {
            this.logs.unshift(log)
          }
          this.nowId = this.logs[0] && this.logs[0].id;
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      parseLevel(level) {
        return `system-log-level-${level.toLowerCase()}`
      }
    }
  }
</script>
