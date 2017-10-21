import Model from '@/model/model'

class Category extends Model {
  /**
   * 获得所有分类
   * @returns {Promise}
   */
  getAllCategories() {
    return new Promise(async (resolve, reject) => {
      try {
        let lists = this.request("GET", "/Category/list", {}, {
          needAuth: true
        });
        resolve(lists);
      }
      catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 添加分类
   * @param categoryName
   * @returns {Promise}
   */
  createCategory(categoryName) {
    return new Promise(async (resolve, reject) => {
      try {
        let newCategory = await this.request("POST", "/Category/create", {
          categoryName: categoryName
        }, {
          needAuth: true
        });
        resolve(newCategory);
      }
      catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 删除分类
   * @param categoryId
   * @returns {Promise}
   */
  removeCategory(categoryId) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request("POST", "/Category/deleteCategory", {
          categoryId: categoryId
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

export default Category;
