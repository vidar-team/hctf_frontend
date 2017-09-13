class Rules {
  rules = [];
  data = {};
  ruleCount = 0;
  constructor(rules = [], data = {}){
    this.rules = rules;
    this.data = data;
    for (let rule of this.rules){
      rule._ruleId = ++this.ruleCount; // 添加内部id标识
    }
  }

  /**
   * 使对象可迭代
   */
  *[Symbol.iterator](){
    for (let rule of this.rules){
      yield rule;
    }
  }

  /**
   * 为内部规则重新按顺序赋予ID
   */
  reIndex(){
    this.ruleCount = 0;
    for (let rule of this.rules){
      rule._ruleId = ++this.ruleCount;
    }
  }

  remove(ruleId){
    if (!ruleId){
      return;
    }
    let index = this.rules.findIndex(i => i._ruleId === ruleId);
    let newRules = this.rules.slice(0, index - 1).concat(this.rules.slice(index, this.rules.length));
    this.rules = newRules;
    this.reIndex();
    return this;
  }
}
export default Rules;
