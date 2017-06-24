/**
 * Created by jinsebainian on 2017/5/19.
 */
import _ from "lodash";

/**
 * pica库处理图片
 * */
class PicaDisposePhoto {
  constructor(config = {}) {
    //配置图片处理默认参数
    const defaultConfig = {
      //图片最大尺寸
      maxWidthOrHeight: 2500,
      width: -1,
      height: -1,
      picaQuality: 90,
      picaConfig: { features: [ 'js', 'wasm', 'ww', 'cib' ] },
      picaOptions: {
        quality: 3,
        unsharpAmount: 80,
        unsharpRadius: 0.6,
        unsharpThreshold: 90,
      }
    }

    let newConfig = _.merge(defaultConfig, config)
    this.picaQuality = newConfig.picaQuality
    this.picaOptions = newConfig.picaOptions
    this.maxWidthOrHeight = newConfig.maxWidthOrHeight
    this.size = {
      width: newConfig.width,
      height: newConfig.height,
    }
    this.Pica = require('pica/dist/pica')(newConfig.picaConfig)
  }

  //加载图片读取图片大小
  getImage(url) {
    return new Promise(function (resolve, reject) {
      try {
        let img = document.createElement('img')
        img.onload = (e) => {
          resolve(e.target)
        }
        img.onerror = (error) => {
          reject(error)
        }
        img.src = url
      } catch (err) {
        reject('预加载错误')
      }
    })
  }

  disposePhotoWithFile(file, imgInfo = {}) {
    return this.getImage(window.URL.createObjectURL(file))
      .then((img) => {
        window.URL.revokeObjectURL(img.src)
        let canvas = document.createElement('canvas')
        // 根据size 属性 设置转换后的图片大小
        if (this.size.width <= 0 && this.size.height <= 0) {
          // 同时设置高宽，着直接使用设置的大小
          if (img.width > img.height) {
            let width = img.width < this.maxWidthOrHeight ? img.width : this.maxWidthOrHeight
            canvas.width = width
            canvas.height = (img.height * width) / img.width
          } else {
            let height = img.height < this.maxWidthOrHeight ? img.height : this.maxWidthOrHeight
            canvas.height = height
            canvas.width = (img.width * height) / img.height
          }
        } else if (this.size.width > 0 && this.size.height > 0) {
          // 没有设置高或宽，者根据最大宽度进行计算
          canvas.width = this.size.width
          canvas.height = this.size.height
        } else if (this.size.width > 0) {
          // 设置宽度，者根据图片比例设置起大小
          let width = this.size.width
          canvas.width = width
          canvas.height = img.height / (img.width * width)
        } else {
          // 设置高度，者根据图片比例设置起大小
          let height = this.size.height
          canvas.height = height
          canvas.width = img.width / (img.height * height)
        }

        //返回图片信息
        imgInfo.width = canvas.width
        imgInfo.height = canvas.height

        return this.Pica.resize(img, canvas, this.picaOptions)
      })
      .then(result => {
        return this.Pica.toBlob(result, file.type, this.picaQuality)
      })
      // .then(blob => {
      //   return new File([ blob ], file.name, { type: file.type, lastModified: Date.now() })
      // })
      .catch(err => {
        if (err) {
          alert(err.toString())
        }
        throw "系统错误，可能原因：1.文件过大，系统内存太低 2.系统版本过低，不支持图片压缩"
      })
  }
}

export default PicaDisposePhoto
