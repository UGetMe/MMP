/*
 * @Author: zhengwei
 * @Date:   2016-10-20 10:29:50
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-10-24 15:55:20
 */

'use strict';
$(function() {

    setProductListTitle($('.product-list-title'), $.getUrlParam('categoryid'));
    setProductList($("#product-list > .product-list"), $.getUrlParam('categoryid'), $.getUrlParam('pageid'));

    function setProductListTitle(dom, categoryid, callback) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getcategorybyid",
            data: { "categoryid": categoryid },
            success: function(data) {
                data = data.result;
                console.log(categoryid);
                var titleHtml = "";
                titleHtml += '  <a href="index.html" class="list-title1">首页</a> >'
                titleHtml += '  <a href="category.html" class="list-title2">全部分类</a> >'
                titleHtml += '  <a href="#" class="list-title3" id="category">' + data[0].category + '</a> >'
                titleHtml += '  <a href="" class="select">筛选</a>';
                dom.html(titleHtml);
            }
        });
    }

    function getCategory(categoryid) {
        var category = "";
        $.ajax({
            url: "http://mmb.ittun.com/api/getcategorybyid",
            data: { "categoryid": categoryid },
            success: function(data) {
                data = data.result;
                category = data[0].category;
            }
        });
        return category;
    }

    function setProductList(dom, categoryid, pageid, callback) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getproductlist",
            data: { "categoryid": categoryid, "pageid": pageid },
            success: function(data) {
                // console.log(data);
                var pageCount = Math.ceil(data.totalCount / data.pagesize);
                data = data.result;
                var productlistHtml = "<ul>";
                for (var i = 0; i < data.length; i++) {
                    productlistHtml += '<li>';
                    productlistHtml += '<a href="bijia.html?productid=' + data[i].productId + '">';
                    productlistHtml += '<div class="pic">';
                    productlistHtml += data[i].productImg;
                    productlistHtml += '</div>';
                    productlistHtml += '<div class="info">';
                    productlistHtml += '<div class="tit">';
                    productlistHtml += data[i].productName;
                    productlistHtml += '</div>';
                    productlistHtml += '<div class="price">';
                    productlistHtml += '<em>' + data[i].productPrice + '</em>';
                    productlistHtml += '<span class="star"><em class="star5"></em></span>';
                    productlistHtml += '</div>';
                    productlistHtml += '<div class="other">';
                    productlistHtml += '<em>' + data[i].productQuote + '</em>';
                    productlistHtml += '<em>' + data[i].productCom + '</em>';
                    productlistHtml += '</div>';
                    productlistHtml += '</div>';
                    productlistHtml += '</a>';
                    productlistHtml += '</li>';
                }
                productlistHtml += "</ul>";
                productlistHtml += '<div class="clearfix page">';
                productlistHtml += '<span class="w33">' + '<a href="productlist.html?categoryid=' + categoryid + '&category=' + $('#category').html() + '&pageid=' + (pageid - 1) + '">上一页</a></span>';
                productlistHtml += '<span class="w33"><select id="selectPage" name="select"  selected style="border: 1px solid #bababa; font-size: 16px; padding: 8px 15px; height: 36px"">';
                for (var i = 1; i < pageCount + 1; i++) {
                    if (pageid == i) {
                        productlistHtml += '<option value="' + i + '" selected>' + i + '/' + pageCount + '</option>';
                    } else {
                        productlistHtml += '<option value="' + i + '">' + i + '/' + pageCount + '</option>';
                    }
                }
                productlistHtml += '</select></span>'
                productlistHtml += '<span class="w33"><a href="productlist.html?categoryid=' + categoryid + '&category=' + $('#category').html() + '&pageid=' + (Number(pageid) + 1) + '" >下一页</a></span>'
                productlistHtml += '</div>'
                dom.html(productlistHtml);
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
