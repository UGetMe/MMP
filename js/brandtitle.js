/*
 * @Author: zhengwei
 * @Date:   2016-10-23 15:57:22
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-10-24 14:49:00
 */

'use strict';
$(function() {
    setCategoryTitle($('#category > .row'));

    function setCategoryTitle(dom, callback) {
        $.ajax({
            "url": "http://mmb.ittun.com/api/getbrandtitle",
            success: function(data) {
                data = data.result;
                // console.log(data);
                var titleHtml = '<ul class="category-title">';
                for (var i = 0; i < data.length; i++) {
                    titleHtml += '<li>';
                    titleHtml += '<a href="brand.html?brandtitleid='+data[i].brandTitleId+'" data-title-id="' + data[i].brandTitleId + '" style="background-image:url(http://www.zuyushop.com/wap/images/arrow1.gif);">';
                    titleHtml += data[i].brandTitle;
                    titleHtml += '</a>';
                    titleHtml += '</li>';
                }
                titleHtml += "</ul>";
                $(dom).html(titleHtml);
                // setCategory($('#category > .row > .category-title > li > a'));
                // $('#menu > .row > .menu-item:nth-last-child(-n+4)').addClass('hide');
                // menuMore($('#menu > .row > .menu-item:nth-child(8) > a'));
            }
        })
    }
});
