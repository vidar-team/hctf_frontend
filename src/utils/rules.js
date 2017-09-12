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
  *[Symbol.iterator](){
    for (let rule of this.rules){
      yield rule;
    }
  }
}
export default Rules;
