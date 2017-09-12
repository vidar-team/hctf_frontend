import Model from '@/model/model'

class Category extends Model {
  /**
   * 获得所有分类
   * @returns {Promise}
   */
  getAllCategories(){
    return new Promise(async (resolve, reject) => {
      try{
        let lists = this.request("GET", "/Category/list");
        resolve(lists);
      }
      catch (e){
        reject(e);
      }
    })
  }

  /**
   * 添加分类
   * @param categoryName
   * @returns {Promise}
   */
  createCategory(categoryName){
    return new Promise(async (resolve, reject) => {
      try{
        let newCategory = this.request("POST", "/Category/create", {
          categoryName: categoryName
        }, {
          needAuth: true
        });
        resolve(newCategory);
      }
      catch (e){
        reject(e);
      }
    })
  }
}

export default Category;
