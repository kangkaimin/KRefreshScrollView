# KRefreshScrollView
微信小程序下拉刷新，Android 不卡顿。

主要解决在Android设备上由于scroll-view下拉刷新过程中由于setData高消耗造成的卡顿问题。

KRefreshScrollView 并不是真正的 scroll-view ，而是一个普通的Component，而是内置了一个scroll-view，所以scroll-view的一些方法KRefreshScrollView并不支持，需要自己添加。

主要实现下拉刷新，上拉加载更多功能较弱，可根据需求二次开发。

![](https://github.com/kangkaimin/KRefreshScrollView/blob/master/images/show.gif) 



# 代码片段

可直接运行，[点击打开](https://developers.weixin.qq.com/s/pENm1pmX7SaO)



# 原理
通过wxs来实现下拉过程中的界面变化，wxs直接操作wxml，不会卡顿。

松手后的回弹效果通过animation动画来实现，不卡顿。



# 使用
```
<KRefreshScrollView id="theRefreshView" 
 bindstartRefresh="startRefresh" 
 bindstartLoadMore="startLoadMore" 
 KHeight="{{pageHeight}}" 
 CanRefresh="{{false}}" 
 CanLoadMore="{{false}}">

  <view wx:for="{{arr}}" wx:key>
    <view style="background:#fbbd08;width:100%;height:100px;text-align: center; line-height: 100px;border-bottom: 8rpx solid #eee;">
      {{item}}
    </view>
  </view>

</KRefreshScrollView>
```



# 相关属性和API
- 属性：

>**KHeight**：高度，**这是一个必填属性**，在没有高度的情况下内置scroll-view的一些回调不会被触发 

>**CanRefresh**：下拉刷新是否可用 

>**CanLoadMore**：上拉加载更多是否可用 

>**bindstartRefresh**：绑定通知页面开始刷新的回调

>**bindstartLoadMore**：绑定通知页面开始加载更多的回调

- 方法

>**noMore**：没有更多了

>**canLoadMore**：加载更多是否可用

>**finishRefresh**：刷新完成，收起下拉界面


# 一毛也能兴奋一整天，滋滋滋滋
![](https://github.com/kangkaimin/KRefreshScrollView/blob/master/images/ali.jpg) 



 
