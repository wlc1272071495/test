//<tr id="cart_item_1825" nc_group="1825" class="shop-list ">
//    <td>
//    <input type="checkbox" checked nc_type="eachGoodsCheckBox" value="1825|1" id="cart_id1825" name="cart_id[]">
//    </td>
//    <td class="w60">
//    <a href="JavaScript:void(0);" target="_blank" class="ncc-goods-thumb"><img src="../images/3_05593085589881814_60.jpg" alt="Apple iPhone 8 Plus  移动联通电信4G手机 深空灰色 256GB" /></a>
//    </td>
//    <td class="tl" >
//    <dl class="ncc-goods-info">
//    <dt>
//    <a href="JavaScript:void(0);" target="_blank">Apple iPhone 8 Plus  移动联通电信4G手机 深空灰色 256GB</a>
//</dt>
//</dl>
//</td>
//<td class="w120"><em id="item1825_price">7988.00</em></td>
//    <td class="w120 ws0"><a href="JavaScript:void(0);" onclick="" title="减少商品件数" class="add-substract-key tip">-</a>
//    <input id="input_item_1825" value="1" orig="1" changed="1" onkeyup="change_quantity(1825, this);" type="text" class="text w20"/>
//    <a href="JavaScript:void(0);" onclick="" title="增加商品件数" class="add-substract-key tip" >+</a></td>
//    <td class="w120">            <em id="item1825_subtotal" nc_type="eachGoodsTotal">7988.00</em>
//    </td>
//    <td class="w80">            <a href="javascript:void(0)" onclick="collect_goods('102985');">收藏</a><br/>
//    <a href="javascript:void(0)" onclick="drop_cart_item(1825);">删除</a></td>
//    </tr>
$(function(){
    var proList = [],originalProList = [];
    //请求json数据获取商品信息并渲染到页面
    $.ajax('../data/shoppingCart.json',{
        method:'GET',
        async:false,
        success:function(data){
            originalProList = originalProList.concat(data.proList);
            proList = data.proList;
            addProList(proList);
        },
        error:function(){
            console.log('error');
        },
        fail:function(){
            console.log('fail');
        }
    });
})

function addProList(list){
    var proPic = $('#tbody');
    if(list.length>0){
        //proPic.html('');
        var pro = '';
        list.forEach(function(index,ele){
            var proInfo = list[ele];
            pro += '<tr id="cart_item_1825" nc_group="1825" class="shop-list ">'+
                '<td class="checkbox">'+
                '<input type="checkbox" nc_type="eachGoodsCheckBox" value="1825|1" id="cart_id1825" name="cart_id[]" class="checkGoods">'+
                '</td>'+
                '<td class="w60">'+
                '<a href="JavaScript:void(0);" target="_blank" class="ncc-goods-thumb"><img src='+proInfo.imageSrc +' alt="Apple iPhone 8 Plus  移动联通电信4G手机 深空灰色 256GB" /></a>'+
                '</td>'+
                '<td class="tl" >'+
                '<dl class="ncc-goods-info">'+
                '<dt>'+
                '<a href="JavaScript:void(0);" target="_blank">&nbsp;&nbsp;'+ proInfo.proName +'</a>'+
            '</dt>'+
            '</dl>'+
            '</td>'+
            '<td class="w120"><em id="item1825_price">'+ proInfo.proPrice +'</em></td>'+
                '<td class="w120 ws0"><a href="JavaScript:void(0);" onclick="" title="减少商品件数" class="add-substract-key tip reduce">-</a>'+
                '<input id="input_item_1825" value="1" orig="1" changed="1" type="text" class="text w20"/>'+
                '<a href="JavaScript:void(0);" onclick="" title="增加商品件数" class="add-substract-key tip add" >+</a></td>'+
                '<td class="w120">            <em id="item1825_subtotal" nc_type="eachGoodsTotal">'+ proInfo.proPrice +'</em>'+
                '</td>'+
                '<td class="w80">            <a href="javascript:void(0)" >收藏</a><br/>'+
                '<a href="javascript:void(0)" class="delete">删除</a></td>'+
                '</tr>'
        });
        proPic.append(pro);
    }
    //删除按键
    $(".delete").click(function () {
        $(this).parents('.shop-list').remove();
        $("#cartTotal").text(arr.sum());
    });
    //增加数量
    $(".add").click(function () {
        var num = $(this).prev(".text").val()*1 + 1;
        $(this).prev(".text").val(num);
        var smallTotal = ($(this).parent().prev(".w120").text() * num).toFixed(2);
        $(this).parent().next(".w120").text(smallTotal);

    });
    //减少数量
    $(".reduce").click(function () {
        var num = $(this).next(".text").val()*1 - 1;
        if(num < 0){
            $(this).parents('.shop-list').remove();
        }
        $(this).next(".text").val(num);
        var smallTotal = ($(this).parent().prev(".w120").text() * num).toFixed(2);
        $(this).parent().next(".w120").text(smallTotal);
         //alert($(this).parent().prev(".w120").text());
        //alert($(this).parent().next(".w120").text());

    })
    $('input[name="cart_id[]"]').click(function () {
        if($(this).prop("checked")){
            arr.push($(this).parent().siblings().eq(4).text()*1);
        }else{
            arr.splice($.inArray('$(this).parent().siblings().eq(4).text()*1',arr),1);
        }
        $("#cartTotal").text(arr.sum());
    })
}

var arr = [];
Array.prototype.sum = function (){
    var result = 0;
    for(var i = 0; i < this.length; i++) {
        result += this[i];
    }
    return result;
};
//arr.sum();


