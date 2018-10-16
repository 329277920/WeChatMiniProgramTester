// pages/news/news.js
Page({ 
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pid: 0,
    windowHeight:0,
    windowWidth:0,
    hidden:true,
    hideHeader:true,
    pageSize:20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });          
      }
    });   
    that.setList(that);    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 下拉刷新
   */
  lower:function(){
    console.log("下拉刷新");
    this.setList(this);
  },

  /**
   * 上拉刷新
   */
  upper:function(){
    console.log("上拉刷新");
    this.setListDown(this);
  },

   /**
   * 滚动后发生
   */
  scroll: function (event){
    console.log("滚动" + event.detail.scrollTop);
    var that = this;
    that.setData({
      scrollTop: event.detail.scrollTop
    });
  },

  setList: function(that){
    this.setData({ hiddle:false });
    this.data.pid++
    var items = this.data.list;  
    for (var i = (this.data.pid - 1) * that.data.pageSize + 1; i <= this.data.pid * that.data.pageSize; i++) {      
      this.data.list.push({ title: "title" + i,id:i });
    }
    this.setData({ list: this.data.list,hiddle:true });    
    console.log(this.data.pid);
  },

  setListDown: function (that) {
    this.setData({ hiddleHeader: false });
    this.data.pid++
    var items = [];
    for (var i = (this.data.pid - 1) * that.data.pageSize + 1; i <= this.data.pid * that.data.pageSize; i++) {
      items.push({ title: "title" + i, id: i });
    }
    this.setData({ list: items, hiddleHeader: true });
    console.log(this.data.pid);
  }
})