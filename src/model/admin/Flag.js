import Model from '@/model/model'

class Flag extends Model{
  /**
   * 删除 Flag
   * @param flagId Flag ID
   * @returns {Promise}
   */
  deleteFlag(flagId){
    return new Promise(async (resolve, reject) => {
      try{
        let result = await this.request("POST", "/Flag/delete", {
          flagId: flagId
        }, {
          needAuth: true
        });
        resolve();
      }
      catch (e){
        reject(e);
      }
    })
  }
}

export default Flag;
