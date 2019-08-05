const app = getApp()

Page({
  theRefreshView: undefined,
  data: {
    pageHeight: getApp().globalData.windowHeight,
    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  onLoad: function() {
    console.log('KRefreshScrollView 是一个微信小程序上的下拉刷新View，主要解决在Android设备上下拉卡顿的问题');

  },
  startRefresh() {
    console.log("开始刷新")
    this.theRefreshView = this.selectComponent("#theRefreshView");
    let that = this;

    setTimeout(() => {
      console.log("刷新完成")
      that.theRefreshView.finishRefresh();
    }, 3000);
  },
  startLoadMore() {
    this.theRefreshView = this.selectComponent("#theRefreshView"); 
    console.log("开始加载更多")
  }

})