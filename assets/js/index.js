$(function () {
    // 导入layer
    var layer = layui.layer
    // 调用获取用户基本信息的函数
    getUserInfo()



    // 给退出按钮绑定事件
    $('#btnLogout').on('click',function () {
        // 弹出提示框
        layer.confirm('确认退出吗?', {icon: 3, title:'提示'}, function(index){
            // 删除token值
            localStorage.removeItem('token')
            // 跳转到登录页
            location.href = '/login.html'
            
            // 关闭询问框
            layer.close(index);
          });
    })
})

// 封装获取用户基本信息的函数
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // 判断请求结果
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 渲染用户头像
            renderAvatar(res.data)
        }
    });
}

// 渲染用户的头像
function renderAvatar(user) {
    console.log(user);
    // 获取用户名称
    var name = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text_avatar').hide();
    }else{
        // 渲染文字头像
        $('.layui-nav-img').hide()
        // 将第一个字符转换为大写
        var first = name[0].toUpperCase()
        $('.text_avatar').html(first).show;
    }
}