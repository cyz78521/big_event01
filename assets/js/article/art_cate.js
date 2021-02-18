$(function () {
    // 导入layer
    var layer = layui.layer
    // 导入form
    var form = layui.form

    initArtCateList()
    // 获取文章分类列表
    function initArtCateList() {
        // 发送ajax
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                var htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr)
            }
        });
    }

    // 给添加类别注册点击事件 
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $('#dialog_add').html()
        })
    })

    // 通过代理形式为表单绑定submit事件
    $('body').on('submit', '#form_add', function (e) {
        // 阻止默认行为
        e.preventDefault(),
            // 发起ajax
            $.ajax({
                type: "POST",
                url: "/my/article/addcates",
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('新增文章分类失败！')
                    }
                    // 重新渲染
                    initArtCateList()
                    // 提示添加成功
                    layer.msg('新增文章分类成功！')
                    // 关闭弹出层
                    layer.close(indexAdd)
                }
            });
    })

    // 通过代理形式为编辑绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn_edit', function () {
        // 弹出层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '修改文章分类',
            content: $('#dialog_edit').html()
        })

        var id = $(this).attr('data-id')
        // 发起请求
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                form.val('form_edit', res.data)
            }
        });
    })

    // 通过代理形式为修改分类的表单绑定submit事件
    $('body').on('submit', '#form_edit', function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 发起ajax
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                // 关闭弹出层
                layer.close(indexEdit)
                // 渲染页面
                initArtCateList()
            }
        });
    })

    // 通过代理形式为删除绑定点击事件
    $('tbody').on('click', '.btn_delete', function () {
        var id = $(this).attr('data-id')
        // 弹出询问框
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败！')
                    }
                    layer.msg('删除文章分类成功！')
                    // 关闭弹出层
                    layer.close(index);
                    // 重新渲染页面
                    initArtCateList()
                }
            });

        });
    })
})