$(function(){
    var proList = [],originalProList = [];
    //请求json数据获取商品信息并渲染到页面
    $.ajax('../data/proList.json',{
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

    //点击展开关闭
    $('.tree .tree-parent').on('click',function(){
        var _this = $(this);
        _this.toggleClass('tree-parent-collapsed').siblings('ul').toggleClass('tree-group-collapsed');
    });

    //默认排序
    $('.sort-original').on('click',function(){
        addProList(originalProList);
    });

    //价格排序操作
    $('.sort-price').on('click',function(){
        var _this =$(this);
        if(!_this.hasClass('selected')){
            _this.addClass('selected').find('a').addClass('asc');
            _this.siblings().removeClass('selected');
            proList = proList.sort(lowToHigh);
        }else{
            if(_this.find('a').hasClass('desc')){
                _this.find('a').removeClass('desc').addClass('asc');
                proList = proList.sort(lowToHigh);
            }else{
                _this.find('a').removeClass('asc').addClass('desc');
                proList = proList.sort(highToLow);
            }
        }
        addProList(proList);
    });

    // 筛选的下拉展开
    $('.all span').on('click',function(){
        var _this = $(this);
        var sortList = _this.parent().siblings('.list');
        if(sortList.css('height')=='22px'){
            sortList.css('height','44px');
            _this.html('<i class="icon-angle-down"></i>收起').find('i').css({'border-width':'1px 0px 0px 1px','top':'0px'});
        }else{
            sortList.css('height','22px');
            _this.html('<i class="icon-angle-down"></i>更多').find('i').css({'border-width':'0px 1px 1px 0px','top':'-3px'});
        }
    });
    //$(".option").hover(function(){
    //    $(this).css("display","block");
    //},function(){
    //    $(this).css("display","none");
    //});

});
function animatenTop(thisTop, thisLeft) {
    var CopyDiv = '<div id="box" style="top:' + thisTop + "px;left:" + thisLeft + 'px" ></div>', topLength = $(".my-cart").offset().top, leftLength = $(".my-cart").offset().left;
    $("body").append(CopyDiv), $("body").children("#box").animate({
        "width": "0",
        "height": "0",
        "margin-top":"0",
        "top": topLength,
        "left": leftLength,
        "opacity": 0
    }, 1000, function() {
        $(this).remove();
    });
}

//商品列表渲染
function addProList(list){
    var proPic = $('.list_pic');
    if(list.length>0){
        proPic.html('');
        var pro = '';
        list.forEach(function(index,ele){
            var proInfo = list[ele];
            var goodsid = proInfo.goodsid;
            var marketPrice = proInfo.proPrice*1 + 200.00;
            pro += '<li class="item" id="'+ goodsid + '">'+
                '<div class="goods-content">'+
                '<div class="goods-pic"><a href="javascript:void(0);" target="_blank" title='+proInfo.proName+'><img src='+proInfo.imageSrc+' title='+proInfo.proName+' alt='+proInfo.proName+'></a></div>'+
                '<div class="goods-info" style="top: 230px;">'+
                '<div class="goods-pic-scroll-show">'+
                '<ul>'+
                '<li class="selected"><a href="javascript:void(0);"><img src='+proInfo.imageArr[0]+'></a></li>'+
                '<li class=""><a href="javascript:void(0);"><img src='+proInfo.imageArr[1]+'></a></li>'+
                '<li class=""><a href="javascript:void(0);"><img src='+proInfo.imageArr[2]+'></a></li>'+
                '<li class=""><a href="javascript:void(0);"><img src='+proInfo.imageArr[3]+'></a></li>'+
                '<li class=""><a href="javascript:void(0);"><img src='+proInfo.imageArr[4]+'></a></li>'+
                '</ul>'+
                '</div>'+
                '<div class="goods-name"><a href="javascript:void(0);" target="_blank" title='+proInfo.proName+'>'+proInfo.proName+'</a></div>'+
                '<div class="goods-price"> <em class="sale-price" title="商城价：¥'+proInfo.proPrice+'">¥'+proInfo.proPrice+'</em> <em class="market-price" title="市场价：¥'+marketPrice+'">¥'+marketPrice+'</em> <span class="raty" data-score="5" title="很满意" style="width: 80px;"><img src="../images/star-on.png" alt="1" title="很满意">&nbsp;<img src="../images/star-on.png" alt="2" title="很满意">&nbsp;<img src="../images/star-on.png" alt="3" title="很满意">&nbsp;<img src="../images/star-on.png" alt="4" title="很满意">&nbsp;<img src="../images/star-on.png" alt="5" title="很满意"><input type="hidden" name="score" value="5" readonly="readonly"></span> </div>'+
                '<div class="goods-sub">'+
                '<span class="goods-compare"><i></i>加入对比</span> </div>'+
                '<div class="sell-stat">'+
                '<ul>'+
                '<li><a href="javascript:void(0);" target="_blank" class="status">0</a>'+
                '<p>商品销量</p>'+
                '</li>'+
                '<li><a href="javascript:void(0);" target="_blank">0</a>'+
                '<p>用户评论</p>'+
                '</li>'+
                '<li><em>&nbsp;</em></li>'+
                '</ul>'+
                '</div>'+
                '<div class="store"><a href="javascript:void(0)" title="电子商务仓" class="name">电子商务仓</a></div>'+
                '<div class="add-cart">'+
                '<a href="javascript:void(0);"><i class="icon-shopping-cart"></i>加入购物车</a>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</li>'
        });
        proPic.append(pro);
        proPic.parent().find('.Pagination').remove();
        proPic.parent().kkPages({
            PagesClass:'.item', //需要分页的元素
            PagesMth:12, //每页显示个数
            PagesNavMth:5 //显示导航个数
        });

        //鼠标经过弹出图片信息
        $(".item").hover(
            function() {
                $(this).find(".goods-info").animate({"top": "180px"}, 400, "swing");
            },function() {
                $(this).find(".goods-info").stop(true,false).animate({"top": "230px"}, 400, "swing");
            }
        );

        $('.list_pic').find('dl').on('mouseout',function(){
            $(this).find('.slide-show').hide();
        });
        /*  */
        $('.slide_tiny').on('mouseover',function(){
            small_image = $(this).attr('nctype');
            $(this).parents('.slide-show').find('img:first').attr('src',small_image);
        });


        // 加入购物车
        $('a[nctype="add_cart"]').click(function() {
            var _parent = $(this).parent(), thisTop = _parent.offset().top, thisLeft = _parent.offset().left;
            animatenTop(thisTop, thisLeft), !1;


        });
        // 图片切换效果
        $('.goods-pic-scroll-show').find('a').mouseover(function(){
            $(this).parents('li:first').addClass('selected').siblings().removeClass('selected');
            var _src = $(this).find('img').attr('src');
            _src = _src.replace('_60.', '_240.');
            $(this).parents('.goods-content').find('.goods-pic').find('img').attr('src', _src);
        });

        //点击跳转到商品详情页面
        $(".item").click(function () {
            var id = $(this).attr("id");
            window.location.href = "goods.html?id="+id;

        })
    }
}

function lowToHigh(a,b){
    return a.proPrice - b.proPrice;
}

function highToLow(b,a){
    return a.proPrice - b.proPrice;
}