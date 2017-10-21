import rulesDefinition from './RulesDefinition'

export default {
  filters: {
    parseLogicOperator(logicOperator) {
      return rulesDefinition.logicOperatorMap[logicOperator];
    },
    parseCompareOperator(compareOperator) {
      return rulesDefinition.compareOperatorMap[compareOperator];
    },
    parseRuleType(ruleType) {
      return rulesDefinition.typeMap[ruleType];
    }
  }
}
