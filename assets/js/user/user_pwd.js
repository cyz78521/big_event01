$(function () {
    // 导入form
    var form = layui.form
    // 导入layer
    var layer = layui.layer

    // 自定义校验规则
    form.verify({
        // 定义了密码的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 新密码的校验规则
        samePwd: function (value) {
            // 拿到旧密码框的值
            var pwd = $('[name=oldPwd]').val()
            // 判断是否相等
            if (value === pwd) {
                return '新旧密码不能相同！'
            }
        },
        repwd: function (value) {
            // 拿到新密码的值
            var pwd = $('[name=newPwd]').val()
            // 判读昂两个密码是否一致
            if (value !== pwd) {
                return '两次密码输入不一致！'
            }
        }
    })

    // 检测表单的提交事件
    $('.layui-form').on('submit',function (e) {
        // 阻止表单的默认行为
        e.preventDefault()
        // 发起ajax
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        });
    })
})