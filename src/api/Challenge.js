import Model from './model';

class Challenge extends Model {
  /**
   * 获得所有可用的题目
   * @returns {Promise}
   */
  getValidChallenges() {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request("GET", "/Challenge/list", {}, {
          needAuth: true
        });
        resolve(result);
      }
      catch (e) {
        reject(e);
      }
    });
  }

  /**
   * 获得已经解出题目的队伍
   * @param challengeId
   * @returns {Promise}
   */
  getSolvedTeams(challengeId){
    return new Promise(async (resolve, reject) => {
      try{
        let solvedTeams = await this.request("GET", "/Challenge/solvedTeams", {
          challengeId: challengeId
        }, {
          needAuth: true
        });
        resolve(solvedTeams);
      }
      catch (e){
        reject(e);
      }
    })
  }
  /**
   * 提交 Flag
   * @param flag
   * @returns {Promise}
   */
  submitFlag(flag) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request("POST", "/Challenge/submitFlag", {
          flag: flag
        }, {
          needAuth: true
        });
        resolve(result);
      }
      catch (e) {
        reject(e);
      }
    })
  }
}

export default Challenge;
