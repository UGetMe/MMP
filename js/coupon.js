/*
* @Author: zhengwei
* @Date:   2016-10-25 20:52:09
* @Last Modified by:   zhengwei
* @Last Modified time: 2016-10-26 15:17:16
*/

'use strict';
$(function (){
	setCoupon($('.coupon-title'))
	function setCoupon(dom,callback){
		$.ajax({url:"http://mmb.ittun.com/api/getcoupon",success:function (data) {
			var html = template('couponTitle',data);
			dom.html(html);
		}})
	}
});