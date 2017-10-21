import Vue from 'vue'

class Rules {
  rules = [];
  data = {};
  ruleCount = 0;

  constructor(rules = [], data = {}) {
    this.rules = rules;
    this.data = data;
    for (let rule of this.rules) {
      rule._ruleId = this.ruleCount++; // 添加内部id标识
    }
  }

  /**
   * 使对象可迭代
   */
  * [Symbol.iterator]() {
    for (let rule of this.rules) {
      yield rule;
    }
  }

  /**
   * 为内部规则重新按顺序赋予ID
   */
  reIndex() {
    this.ruleCount = 0;
    for (let rule of this.rules) {
      rule._ruleId = this.ruleCount++;
    }
  }

  /**
   * 删除指定 ruleId 的规则
   * @param ruleId
   * @returns {*}
   */
  remove(ruleId) {
    if (ruleId === undefined) {
      return;
    }
    let index = this.rules.findIndex(i => i._ruleId === ruleId);
    let newRules = this.rules.slice(0, index).concat(this.rules.slice(index + 1, this.rules.length));
    Vue.set(this, 'rules', newRules);
    if (index === 0 && this.rules.length > 0) {
      Vue.delete(this.rules[0], 'logicOperator');
    }
    this.reIndex();
    return this;
  }

  append(rule) {
    rule._ruleId = this.ruleCount++;
    this.rules.push(rule);
    return this;
  }

  toString() {
    let r = JSON.parse(JSON.stringify(this.rules));
    for (let i of r) {
      delete i["_ruleId"];
    }
    return JSON.stringify(r);
  }
}

export default Rules;
