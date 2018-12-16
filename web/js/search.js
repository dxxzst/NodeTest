(function () {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieWltZW5nIiwicGFzc3dvcmQiOiJ5aW1lbmciLCJ1c2VyVHlwZSI6InR5cGUxIiwiZXhwIjoxNTQ3MTc3Mzk3LCJpc3MiOiJnby5taWNyby5zcnYudXNlciJ9.1znZIOV6gvEp5-B-AfgkCqyHAAKwhlIvTc3-svMGoPI";
    var arr = [];
    var serverPath = "http://" + window.location.host;

    //搜索内容
    var getData = function (params, flag) {
        var loading = parent.layer.load(0, {
            scrollbar: false,
            shade: [0.3, '#fff']
        });
        $.ajax({
            type: "POST",
            //url: "http://dev.shannonai.com:8011/api/search/research_report_figure",
            url: serverPath + "/api/search/research_report_figure",
            dataType: 'JSON',
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            success: function (data) {
                parent.layer.close(loading);
                if (data.pageItems && data.pageItems.length > 0) {
                    initTable(data);
                    if (flag) {
                        initPage(data);
                    }
                }
            },
            error: function (error) {
                parent.layer.close(loading);
                console.log(error)
            }
        });
    };
    //下载PDF
    var downPdf = function (url) {
        var loading = parent.layer.load(0, {
            scrollbar: false,
            shade: [0.3, '#fff']
        });
        $.ajax({
            type: "get",
            //url: "http://dev.shannonai.com:8011" + url,
            url: serverPath + url,
            dataType: 'JSON',
            headers: {
                "token": token
            },
            success: function (data, status, xhr) {
                parent.layer.close(loading);
                if (data) {
                    var tempUrl = data.split('/');
                    tempUrl[0] = serverPath;
                    var tempWindow = window.open('_blank'); // 先打开页面
                    tempWindow.location = tempUrl.join('/'); // 后更改页面地址
                }
            },
            error: function (xhr) {
                parent.layer.close(loading);
                alert(xhr.responseText);
            }
        });
    };
    var initTable = function (data) {
        arr = data.pageItems;
        for (var i = 0; i < arr.length; i++) {
            arr[i].showImg = '<div>标题:' + arr[i].title + '<br>来源:' + arr[i].dataSource + '日期:' + arr[i].date + '</div>' +
                '<img src="' + arr[i].figureUrl + '" style="width: 80%;max-width: 600px">';
            arr[i].down = '<button data-index="' + i + '" class="down btn btn-warning">下载PDF</button>'
        }
        $('#searchTable').bootstrapTable({
            clickToSelect: true
        });
        $('#searchTable').bootstrapTable('load', arr);
        $('html,body').height('auto')
    };
    var tableClick = function () {
        $('#searchTable').on('click', '.down', function () {
            var ownUrl = arr[$(this).attr('data-index')].link;
            downPdf(ownUrl);
        })
    };


    var searchSubmit = function () {
        $('#searchForm').submit(function () {
            submitForm(1, 10, true);
        });
    };
    var submitForm = function (num, size, flag) {
        var searchVal = $('#searchForm').find('input[name="search"]').val();
        var obj = {
            question: searchVal,
            pageSize: size,
            pageNum: num
        };
        getData(obj, flag);
    };
    var initPage = function (data) {
        new Page({
            id: 'pagination',
            pageTotal: Math.ceil(data.totalCount / 10), //必填,总页数
            pageAmount: 10, //每页多少条
            dataTotal: data.totalCount, //总共多少条数据
            curPage: 1, //初始页码,不填默认为1
            pageSize: 10, //分页个数,不填默认为5
            showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
            showSkipInputFlag: true, //是否支持跳转,不填默认不显示
            getPage: function (page) {
                submitForm(page, 10, false)
            }
        });
    };

    var init = function () {
        //initTable();
        tableClick();
        searchSubmit();
    };
    $(document).ready(function () {
        init();
    })
})();
