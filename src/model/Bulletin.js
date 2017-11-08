import Model from '@/model/model'

class Bulletin extends Model{
  /**
   * 获得所有公告
   * @returns {Promise}
   */
  getAllBulletins(){
    return new Promise(async(resolve, reject) => {
      try{
        let bulletins = await this.request("GET", "/Bulletin/list");
        resolve(bulletins);
      }
      catch (e){
        reject(e);
      }
    })
  }
}
export default Bulletin;
