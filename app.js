App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        this.globalData.windowHeight = e.windowHeight; 
      }
    })
  },
  globalData: {
    windowHeight :10
  }
})
