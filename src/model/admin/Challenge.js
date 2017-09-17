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
   * @returns {Promise}
   */
  createChallenge(title, url, description, score, flag, config, levelId, releaseTime){
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
          releaseTime: timeString
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
}

export default Challenge;
