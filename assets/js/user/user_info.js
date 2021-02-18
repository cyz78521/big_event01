$(function () {
    // 导入form元素
    var form = layui.form
    // 导入layer
    var layer = layui.layer

    // 设置自定义校验规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6之间！'
            }
        }
    })


    // 调用渲染用户的基本信息
    initUserInfo()

    // 初始化用户的基本信息
    function initUserInfo() {
        // 发送ajax
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status) {
                    return layer.msg('获取用户信息失败！')
                }
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        });
    }


    // 重置表单的处理函数
    $('#btnReset').on('click', function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 重新渲染表单
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 发起ajax
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 重新渲染用户的头像和欢迎文本
                window.parent.getUserInfo()
            }
        });
    })
})