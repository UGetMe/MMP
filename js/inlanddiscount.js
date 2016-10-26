/*
 * @Author: zhengwei
 * @Date:   2016-10-24 22:14:54
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-10-25 18:31:05
 */

'use strict';
$(function() {
    setProductList($('.inland-discount-list'))

    function setProductList(dom, callback) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getinlanddiscount",
            success: function(data) {
                var html = template("productList", data);
                dom.html(html);

            }
        })
    }
});
