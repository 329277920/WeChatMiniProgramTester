// pages/syslist/syslist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pid:0,
    pageSize:20,
    hiddleTop:true,
    hiddleFoot:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    this.onReflection(this);
  },   

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {  
    wx.stopPullDownRefresh();
    var that = this;    
    that.startTopLoading(that);
    setTimeout(function(){    
      that.onReflection(that, function (that) {       
        that.stopTopLoading(that);
      });
    },500);   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉");
    var that = this;    
    that.startFootLoading(that);
    setTimeout(function(){
      that.onPagging(that,function(that){
        that.stopFootLoading(that);
      });
    },500);   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  onReflection:function(that,callBack){
    this.data.pid++
    var items = [];
    for (var i = (this.data.pid - 1) * that.data.pageSize + 1; i <= this.data.pid * that.data.pageSize; i++) {
      items.push({ title: "title" + i, id: i });
    }
    this.setData({ list: items});
    if(callBack){
      callBack(that);
    }        
  },

  onPagging: function (that, callBack) {
    that.data.pid++
    var items = [];
    for (var i = (that.data.pid - 1) * that.data.pageSize + 1; i <= this.data.pid * that.data.pageSize; i++) {
      items.push({ title: "title" + i, id: i });
    }
    that.data.list = that.data.list.concat(items);
    that.setData({ list: that.data.list});
    console.log(that.data.pid + ":" + that.data.list.length);
    if(callBack){
      callBack(that);
    }
  },

  startTopLoading:function(that){
     that.setData({ hiddleTop:false });
  },
  stopTopLoading: function (that){
    that.setData({ hiddleTop: true });
  },
  startFootLoading: function (that){
    that.setData({ hiddleFoot: false });
  },
  stopFootLoading: function (that){
    that.setData({ hiddleFoot: true });
  },
  
  // 在分享时触发
  onShareAppMessage :function(res){
    console.log("正在分享");
    console.log("分享来源:" + res.from);   
    var path = "/pages/index/index";
    if (res.from == "menu") {
      path: "/pages/index/index"
    }
    else{      
      path = "/pages/syslist/syslist"
    }
    console.log("分享地址:" + path);   
    return {
      title:"两只兔子说段子",
      path: path,
      imageUrl:"/images/share.png",
      success:function(){
        console.log("分享成功");
      },
      fail:function(){
        console.log("分享失败");
      },
      complete:function(){
        console.log("结束分享");
      }
    }       
  },

  onShare:function(){
    console.log("按钮分享");
    wx.showShareMenu({

    });
  }
})

  