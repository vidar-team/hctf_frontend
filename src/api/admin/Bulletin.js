import Model from '@/api/model'

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

  /**
   * 创建公告
   * @param title
   * @param content
   * @returns {Promise}
   */
  createBulletin(title, content){
    return new Promise(async (resolve, reject) => {
      try{
        let bulletin = await this.request("POST", "/Bulletin/create", {
          title: title,
          content: content
        }, {
          needAuth: true
        });
        resolve(bulletin);
      }
      catch (e){
        reject(e);
      }
    })
  }

  /**
   * 删除公告
   * @param bulletinId
   * @returns {Promise}
   */
  deleteBulletin(bulletinId){
    return new Promise(async(resolve, reject) =>{
      try{
        let bulletins = await this.request("POST", "/Bulletin/delete", {
          bulletinId: bulletinId
        }, {
          needAuth: true
        });
        resolve(bulletins);
      }
      catch (e){
        reject(e);
      }
    })
  }

  /**
   * 编辑公告
   * @param bulletinId
   * @param title
   * @param content
   * @returns {Promise}
   */
  editBulletin(bulletinId, title, content){
    return new Promise(async (resolve, reject) => {
      try{
        let bulletin = await this.request("POST", "/Bulletin/edit", {
          bulletinId: bulletinId,
          title: title,
          content: content
        }, {
          needAuth: true
        });
        resolve(bulletin);
      }
      catch (e){
        reject(e);
      }
    })
  }
}
export default new Bulletin();
