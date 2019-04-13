var Bmob = require('../../utils/bmob.js');
var app = getApp();
var that;
Page({

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

 
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
    that = this;
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo,
        currentUserId: currentUserId
      })
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },
  onShow: function () {
  
  },

  testHistory:function(){
    var currentUserId = that.data.currentUserId;
    var User = Bmob.Object.extend("_User");
    var queryUser = new Bmob.Query(User);
    queryUser.get(currentUserId, {
      success: function (result) {
        var register = result.get("register");
        if (register==false){
          wx.navigateTo({
            url: '../register/register'
          })
        }
        else{
          wx.navigateTo({
            url: '../testHistory/testHistory'
          })
        }
      },
      error: function (object, error) {
        // 查询失败
      }
    });
  },

  personalInformation: function () {
    var currentUserId = that.data.currentUserId;
    var User = Bmob.Object.extend("_User");
    var queryUser = new Bmob.Query(User);
    queryUser.get(currentUserId, {
      success: function (result) {
        var register = result.get("register");
        if (register == false) {
          wx.navigateTo({
            url: '../register/register'
          })
        }
        else {
          wx.navigateTo({
            url: '../personalInformation/personalInformation'
          })
        }
      },
      error: function (object, error) {
        // 查询失败
      }
    });
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '大学考试题库',
      path: '/pages/choiceMain/choiceMain',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  phonecall:function(){
    wx.makePhoneCall({
      phoneNumber: '01086466630',
    })
  }
 
})