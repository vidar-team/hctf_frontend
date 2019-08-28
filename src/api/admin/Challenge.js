import Model from '@/api/model'

class Challenge extends Model {
  /**
   * 创建新的 Challenge
   * @param title
   * @param url
   * @param description
   * @param score
   * @param flag
   * @param config
   * @param levelId
   * @param releaseTime
   * @param isDynamicFlag
   * @returns {Promise}
   */
  createChallenge(title, url, description, score, flag, config, levelId, releaseTime, isDynamicFlag) {
    let time = new Date(releaseTime);
    return new Promise(async (resolve, reject) => {
      try {
        let newChallenge = this.request("POST", "/Challenge/create", {
          title: title,
          url: url,
          description: description,
          score: score,
          flag: flag,
          config: JSON.stringify(config),
          levelId: levelId,
          releaseTime: releaseTime,
          isDynamicFlag: isDynamicFlag
        }, {
          needAuth: true
        });
        resolve(newChallenge);
      } catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 删除 Challenge
   * @param challengeId
   * @returns {Promise}
   */
  deleteChallenge(challengeId) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = this.request("POST", "/Challenge/delete", {
          challengeId: challengeId
        }, {
          needAuth: true
        });
        resolve(result);
      } catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 获得问题详情
   * @param challengeId
   * @returns {Promise}
   */
  getChallengeInfo(challengeId) {
    return new Promise(async (resolve, reject) => {
      try {
        let challengeInfo = await this.request("GET", "/Challenge/info", {
          challengeId: challengeId
        }, {
          needAuth: true
        });
        resolve(challengeInfo);
      } catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 编辑 Challenge 基本信息
   * @param challengeId
   * @param title
   * @param description
   * @param releaseTime
   * @returns {Promise}
   */
  async editChallenge(challengeId, title, description, releaseTime, url) {
    let time = new Date(releaseTime);
    return await this.request("POST", "/Challenge/edit", {
      challengeId,
      title,
      description,
      releaseTime: time.toISOString(),
      url
    }, {
      needAuth: true
    });
  }

  /**
   * 修改基准分数
   * @param challengeId
   * @param score
   * @returns {Promise}
   */
  resetScore(challengeId, score) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request("POST", "/Challenge/resetScore", {
          challengeId: challengeId,
          score: score
        }, {
          needAuth: true
        });
        resolve(result);
      } catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 获得 Flags 信息
   * @param challengeId
   * @returns {Promise}
   */
  getFlagsInfo(challengeId) {
    return new Promise(async (resolve, reject) => {
      try {
        let flags = await this.request("GET", "/Challenge/getFlags", {
          challengeId: challengeId
        }, {
          needAuth: true
        });
        resolve(flags);
      } catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 删除所有关联 Flag
   * @param challengeId
   * @returns {Promise}
   */
  deleteAllFlags(challengeId) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.request("POST", "/Challenge/deleteFlags", {
          challengeId: challengeId
        }, {
          needAuth: true
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 添加 Flag
   * @param challengeId
   * @param flag
   * @returns {Promise}
   */
  addFlags(challengeId, flag) {
    return new Promise(async (resolve, reject) => {
      try {
        let flags = await this.request("POST", "/Challenge/addFlags", {
          challengeId: challengeId,
          flag: flag
        }, {
          needAuth: true
        });
        resolve(flags);
      } catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 获得已经解出题目的队伍
   * @param challengeId
   * @returns {Promise}
   */
  getSolvedTeams(challengeId) {
    return new Promise(async (resolve, reject) => {
      try {
        let solvedTeams = await this.request("GET", "/Challenge/solvedTeams", {
          challengeId: challengeId
        }, {
          needAuth: true
        });
        resolve(solvedTeams);
      } catch (e) {
        reject(e);
      }
    })
  }
}

export default new Challenge;
