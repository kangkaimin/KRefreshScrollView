const REFRESHTITLE_READY = "释放后开始刷新";
const REFRESHTITLE_REFRESHING = "正在刷新...";
const REFRESHTITLE_FINISH = "刷新完成";

const LOADMORETITLE_LOADING = "正在加载更多..."
const LOADMORETITLE_NOMORE = "没有更多"

const TIME4100 = 350; // 移动100px花费的时间
const REFRESHVIEW_HEIGHT = 100; // 刷新界面的高度，需要和 wxs 中的对齐
const REFRESHVIEW_RESET_DELAY = 500; // 刷新完成后停留显示“刷新完成”的时间,300毫秒后开始收缩

Component({

  behaviors: [],

  properties: {
    KHeight: { // 高度
      type: Number,
      value: -1,
    },
    CanRefresh: {
      type: Boolean,
      value: true,
    },
    CanLoadMore: {
      type: Boolean,
      value: true,
    }
  },

  data: {
    loadViewHeight: REFRESHVIEW_HEIGHT, // 需要和 wxs 中对齐
    timeFor100: TIME4100, // 移动100px花费的时间
    refreshTitle: REFRESHTITLE_READY,
    loadMoreTitle: LOADMORETITLE_LOADING,
    originalMarginTop: 0, // 原始高度 
    loadMoreAble: true,
    isNoMore: false,
    canRefresh: true,
    refreshHeight: REFRESHVIEW_HEIGHT

  },
  lifetimes: {
    ready: function () {
      var that = this;

      this.setData({
        loadMoreAble: that.properties.CanLoadMore,
        canRefresh: that.properties.CanRefresh
      });

      var query = that.createSelectorQuery();
      query.select('#refreshParent').boundingClientRect();
      query.exec(function (res) {
        // 配置原始高度
        that.data.originalMarginTop = res[0].top;
      })
    },
    attached: function () {
      if (this.data.KHeight > 0) { } else {
        throw new Error('KRefreshScrollView 必须要通过 KHeight 设置一个 >0 的高度，以配合scroll-view使用，否则无法触发scroll-view 的 bindscrolltoupper 和 bindscroll 方法');
      }
    },
    moved: function () { },
    detached: function () { },
  },

  methods: {
    touchend() {

      let that = this;
      var query = that.createSelectorQuery();

      query.select('#refreshParent').boundingClientRect();
      query.exec(function (res) {

        if (res[0].top < that.data.originalMarginTop) {
          return;
        }

        if (res[0].top === that.data.originalMarginTop) {
          return;
        }

        if (res[0].top < that.data.loadViewHeight + that.data.originalMarginTop) {

          // 不刷新，恢复原来状态
          let moveTime = that.moveTime(res[0].top);
          that.reset(moveTime);
        } else {

          // 开始刷新
          that._startRefresh();
          that.setData({
            refreshTitle: REFRESHTITLE_REFRESHING
          });
          that.startAnim(that.moveTime(res[0].top - that.data.loadViewHeight), that.data.loadViewHeight);
        }
      })
    },

    startAnim(duration, translateY) {

      var animation = wx.createAnimation({
        duration: duration,
        timingFunction: 'ease-out',
      });
      animation.height(translateY).step()

      this.setData({
        ani: animation.export()
      })
    },

    moveTime(distance) {
      if (distance > this.data.loadViewHeight)
        return 500;
      return distance / this.data.loadViewHeight * this.data.timeFor100;
    },

    /**
     * =================================================== 上拉加载更多 start =========================================================
     */
    // 调用通过 startRefresh 绑定的方法
    _startLoadMore() {

      if (isNoMore && !loadMoreAble) {
        return
      }

      // if (this.triggerEvent('startLoadMore', {})) {
      //   this.setData({
      //     loadMoreTitle: LOADMORETITLE_LOADING
      //   });
      // } else {
      //   this.setData({
      //     loadMoreTitle: LOADMORETITLE_NOMORE
      //   });
      // }
      this.triggerEvent('startLoadMore', {})
    },

    noMore(isNoMore) {
      if (isNoMore) {
        this.setData({
          loadMoreTitle: LOADMORETITLE_NOMORE,
          isNoMore: isNoMore
        });
      } else {
        this.setData({
          loadMoreTitle: LOADMORETITLE_LOADING,
          isNoMore: isNoMore
        });
      }
    },

    canLoadMore(able) {
      this.setData({
        loadMoreAble: able
      });
    },
    //=================================================== 上拉加载更多 end =========================================================


    /**
     * =================================================== 下拉刷新 start =========================================================
     */
    // 调用通过 startRefresh 绑定的方法
    _startRefresh() {
      // 微信小程序中是通过triggerEvent来给父组件传递信息的
      this.triggerEvent('startRefresh', {}) // 将num通过参数的形式传递给父组件
    },

    finishRefresh() {
      var that = this;
      this.setData({
        refreshTitle: REFRESHTITLE_FINISH
      });

      // 显示“刷新完成” REFRESHVIEW_RESET_DELAY 毫秒后开始回弹
      setTimeout(() => {
        let moveTime = that.moveTime(that.data.loadViewHeight);
        that.reset(moveTime);
      }, REFRESHVIEW_RESET_DELAY);
    },
    //=================================================== 下拉刷新 end =========================================================

    // 一定延迟后复位状态
    reset(delay) {
      var that = this;
      that.startAnim(delay, 0)
      setTimeout(() => {
        that.setData({
          refreshTitle: REFRESHTITLE_READY
        });
      }, delay);

    },
  }

})
