// pages/mymovie/mymovie.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviename:"",
    content:"",
    images:[],
    fileIds:[]

  },
  submit:function(){
    //提交
    //功能一
    if(this.data.images==0){
      wx.showToast({
        title: '请选择要上传的图片',
      });
      return;
    }
    wx.showLoading({
      title: '正在上传中',
    });
    var rows=[];
    for(var i=0;i<this.data.images.length;i++){
      rows.push(new Promise((resolve,reject)=>{
        var item= this.data.images[i];
        var suffix=/\.\w+$/.exec(item)[0]
        var newfile = new Date().getTime();
        newfile += Math.floor(Math.random() * 9999);
        newfile += suffix;
        wx.cloud.uploadFile({
          cloudPath:newfile,
          filePath:item,
          success:(res=>{
            var fid = res.fileID;
            this.data.fileIds.push(fid);
            resolve();
          })
        })
      }));
    }
    Promise.all(rows).then(res=>{
      var mName = this.data.moviename;
      var content = this.data.content;
      var list = this.data.fileIds;
      db.collection("mymovie").add({
        data:{
          content:content,
          mName:mName,
          imgList:list
        }
      }).then(res => {
        //7.添加成功 隐藏加载提示框
        wx.hideLoading();
        wx.showToast({
          title: '发表成功',
        })
      }).catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: '发表失败',
        })

      })
    })


    
 
  },
  jumpDetail:function(){
    wx.navigateTo({
      url: '/pages/lmovie/lmovie',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {

  },
  onChangeMname:function(event){
    console.log(event.detail);
    this.setData({
      moviename:event.detail
    })
  },
  onChangeContent: function (event) {
    console.log(event.detail);
    this.setData({
      content: event.detail
    })
  },
  upload:function(){
    wx.showLoading({
      title: '数据正在加载',
    })
    wx.chooseImage({
      count:9,
      sizeType:["original","compressed"],
      sourceType:["album","camera"],
      success:(res)=>{
        var list = res.tempFilePaths;
        this.setData({
          images:list
        });
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})