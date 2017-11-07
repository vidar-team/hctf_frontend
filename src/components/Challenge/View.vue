<template>
  <article class="challenge-body">
    <div class="challenge-content">
      <div class="challenge-item">
        <span class="challenge-item-key">{{ $t('challenge.description') }}</span>
        <div class="challenge-item-value">
          {{ challenge.description }}
        </div>
      </div>
      <div class="challenge-item">
        <span class="challenge-item-key">URL</span>
        <div class="challenge-item-value">
          <a :href="formatURL(challenge.url)" target="_blank">{{ formatURL(challenge.url) }}</a>
        </div>
      </div>
      <div class="challenge-item">
        <span class="challenge-item-key">{{ $t('challenge.baseScore') }}</span>
        <div class="challenge-item-value">
          {{ challenge.score }}
        </div>
      </div>
      <div class="challenge-item">
        <span class="challenge-item-key">{{ $t('challenge.solvedCount') }}</span>
        <div class="challenge-item-value">
          {{ challenge.solvedCount }}
        </div>
      </div>
    </div>
  </article>
</template>
<style>
  .challenge-body {
    margin: 2rem auto;
    clear: both;
  }

  .challenge-item {
    line-height: 2;
  }

  .challenge-item-key {
    color: #aaa;
    display: inline-block;
    margin-right: 1rem;
  }

  .challenge-item-value {
    display: inline-block;
  }

  .dynamic-flag-badge {
    vertical-align: super;
    font-size: smaller;
    font-weight: normal;
  }

  a {
    text-decoration: none;
    color: #4db3ff;
  }

  a:hover {
    color: #1c8de0;
  }
</style>
<script>
  export default {
    data() {
      return {}
    },
    props: ["challenge", "placeholders"],
    methods: {
      formatURL(url) {
        let mappings = this.placeholders;
        for (let key of Object.keys(mappings)) {
          url = url.replace("{" + key + "}", mappings[key]);
        }
        return url;
      }
    }
  }
</script>
