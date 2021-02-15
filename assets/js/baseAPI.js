// 开发环境服务器地址
var baseURL = "http://api-breakingnews-web.itheima.net"


// 每次调用ajax之前都会调用这个函数用来拼接路径
// 在函数中可以拿到ajax的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起ajax请求之前拼接路径
    options.url = baseURL + options.url

    // 统一为有权限的接口设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 统一全局挂载complete回调函数
    options.complete = function (res) {
        // console.log('执行了complete函数');
        console.log(res);
        // 判断是否有权限访问
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 强制清空token
            localStorage.removeItem('token')
            // 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})