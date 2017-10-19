import Model from '@/model/model'

class Challenge extends Model{
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
  createChallenge(title, url, description, score, flag, config, levelId, releaseTime, isDynamicFlag){
    let time = new Date(releaseTime);
    let timeString = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    return new Promise(async (resolve, reject) => {
      try{
        let newChallenge = this.request("POST", "/Challenge/create", {
          title: title,
          url: url,
          description: description,
          score: score,
          flag: flag,
          config: JSON.stringify(config),
          levelId: levelId,
          releaseTime: timeString,
          isDynamicFlag: isDynamicFlag
        }, {
          needAuth: true
        });
        resolve(newChallenge);
      }
      catch (e){
        reject(e);
      }
    })
  }

  /**
   * 删除 Challenge
   * @param challengeId
   * @returns {Promise}
   */
  deleteChallenge(challengeId){
    return new Promise(async (resolve, reject) => {
      try{
        let result = this.request("POST", "/Challenge/delete", {
          challengeId: challengeId
        }, {
          needAuth: true
        });
        resolve(result);
      }
      catch (e){
        reject(e);
      }
    })
  }

  /**
   * 获得问题详情
   * @param challengeId
   * @returns {Promise}
   */
  getChallengeInfo(challengeId){
    return new Promise(async (resolve, reject) => {
      try{
        let challengeInfo = await this.request("GET", "/Challenge/info", {
          challengeId: challengeId
        }, {
          needAuth: true
        });
        resolve(challengeInfo);
      }
      catch (e){
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
  editChallenge(challengeId, title, description, releaseTime){
    let time = new Date(releaseTime);
    let timeString = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    return new Promise(async (resolve, reject) => {
      try{
        let challenge = await this.request("POST", "/Challenge/edit", {
          challengeId: challengeId,
          title: title,
          description: description,
          releaseTime: timeString
        }, {
          needAuth: true
        });
        resolve(challenge);
      }
      catch (e){
        reject(e);
      }
    })
  }
}

export default Challenge;
