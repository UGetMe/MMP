/*
 * @Author: zhengwei
 * @Date:   2016-10-24 10:19:37
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-10-24 19:05:16
 */

'use strict';
$(function() {
    setBrandList($('.brand-list'), $.getUrlParam("brandtitleid"))

    function setBrandList(dom, brandtitleid, callback) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbrand",
            data: { "brandtitleid": brandtitleid },
            "success": function(data) {
                var html = template('brandList', data);
                dom.html(html);
                // console.log(data);
                   // console.log(data.result[0].brandId);
                setBrandProduct($('.product-list'), data.result[0].brandTitleId);

            }
        })
    }

    function setBrandProduct(dom, brandtitleid, callback) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbrandproductlist",
            data: { "brandtitleid": brandtitleid, "pagesize": 4 },
            success: function(data) {
                // console.log(brandid);
                console.log(data);
                var html = template('brandProduct', data);
                dom.html(html);
                setProductCom($('.product-com'), data.result);
            }
        })
    }

    function setProductCom(dom, productlist, callback) {
        var productid = [];
        for (var i = 0; i < productlist.length; i++) {
            productid.push(productlist[i].productId);
        }
        $.ajax({
            url: "http://mmb.ittun.com/api/getproduct",
            data: { "productid": productid[0] },
            success: function(result) {
                result = result.result;
                // console.log(result);
                for (var j = 0; j < result.length; j++) {
                    $.ajax({
                        url: "http://mmb.ittun.com/api/getproductcom",
                        data: { "productid": productid[0] },
                        success: function(data) {
                            // console.log(data);
                            data = data.result;
                            var productCom = []
                            for (var i = 0; i < data.length; i++) {
                                productCom.push({
                                    "productName": result[0].productName,
                                    "productImg": result[0].productImg,
                                    "comContent": data[i].comContent,
                                    "comTime": data[i].comTime,
                                    "comFrom": data[i].comFrom,
                                    "comName": data[i].comName
                                })
                            }
                            data = { result: productCom };
                            // console.log(data);
                            var html = template('ProductCom', data);
                            dom.html(html);
                        }
                    })
                }
            }
        })
    }
});
(function($) {
    $.getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" +
            name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);
