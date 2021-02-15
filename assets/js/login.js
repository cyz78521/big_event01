$(function () {
    // 按需切换
    $('#link_reg').on('click', () => {
        $('.login_box').hide()
        $('.reg_box').show();
    })

    $('#link_login').on('click', () => {
        $('.login_box').show()
        $('.reg_box').hide();
    })
    // 从layui中获取form对象
    var form = layui.form
    // 从layui中导出layer对象
    var layer = layui.layer
    // 自定义校验规则
    form.verify({
        // 自定义了一个pass的验证规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repwd: function(value){
            // 拿到密码框的值
            var pwd = $('.reg_box [name=password]').val()
            // 判断两次输入的值是否一致
            if(pwd !== value) {
                // 不相等就返回值
                return '两次密码输入不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 发送ajax
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: function (res) {
                // 判断请求结果
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录！');
                // 注册成功后跳转到登录页面
                $('#link_login').click();
                // 重置表单
                $('#form_reg')[0].reset()
            }
        });
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发送ajax
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                // 判断返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提示信息
                layer.msg('恭喜你，登陆成功！')
                // 将token保存到本地
                localStorage.setItem("token",res.token)
                // 跳转到本地
                location.href = '/index.html'
            }
        });
    })
})