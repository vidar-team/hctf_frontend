import Model from '@/model/model';

class Challenge extends Model{
  /**
   * 获得所有可用的题目
   * @returns {Promise}
   */
  getValidChallenges(){
    return new Promise(async (resolve, reject) => {
      try{
        let result = this.request("GET", "/Challenge/list", {}, {
          needAuth: true
        });
        resolve(result);
      }
      catch (e){
        reject(e);
      }
    });
  }
}

export default Challenge;
