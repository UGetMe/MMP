/*
 * @Author: zhengwei
 * @Date:   2016-10-26 13:49:47
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-10-26 15:16:48
 */

'use strict';
$(function() {
    setTitle($('.bcj-title'), $.getUrlParam('titleid'));
    setProductList($('.bcj-list'), $.getUrlParam('titleid'));

    function setTitle(dom, titleid) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbaicaijiatitle",
            success: function(data) {
                console.log(data);
                var html = template('bcjTitle', data);
                dom.html(html);
                var titleLi = dom.find('.ul-wapper .tabs li');
                var tabsUlWidth = 0;
                for (var i = 0; i < titleLi.length; i++) {
                    tabsUlWidth += $(titleLi[i]).width();
                }
                dom.find('.ul-wapper .tabs').css('width', tabsUlWidth);
                $(titleLi[titleid || 0]).addClass('active');
            }
        })
    }

    function setProductList(dom, titleid, callback) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbaicaijiaproduct",
            data: { "titleid": titleid || 0 },
            success: function(data) {
                console.log(data);
                var html = template('bcjProductList', data);
                dom.html(html);
            }
        })
    }
})
