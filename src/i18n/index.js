import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// load languages

import zh from "./messages/zh-cn";
import en from  "./messages/en";

const messages = {
  "zh-cn": zh,
  "en": en
};
console.log(messages);
const i18n = new VueI18n({
  locale: 'zh-cn', // set locale
  messages, // set locale messages
});

export default i18n;
