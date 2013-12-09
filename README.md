jquery.popSlide.js
==================

适用场景
-----------------
本插件适用于各种轮播页面<br />

html结构
------------------
结构很简单，在需要轮播的元素外套一层包裹元素，<br />

形如：

        <ul class="slide-wrap">
            <li>我是轮播元素</li>
            <li>我是轮播元素</li>
            <li>我是轮播元素</li>
            <li>我是轮播元素</li>
        </ul>
你也可以使用div包裹:  
        <div class="slide-wrap">
            <div>我是轮播元素</div>
            <div>我是轮播元素</div>
            <div>我是轮播元素</div>
        </div>

包裹元素必须使用relative定位：
        .slide-wrap{
            position:relative;
        }
包裹元素的样式最好在页面的css文件中写好，避免js脚本最后加载导致的页面重绘。
轮播元素初始样式最好也写在css文件中，虽然插件会进行初始化，但考虑到js文件会最后引入，<br />
会让页面格式出现短暂的混乱，建议写在css中。

在js中使用
-------------
先后引入jquery和jquery.popSlide.js文件

        <script type="text/javascript" src="http://codeorigin.jquery.com/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="https://raw.github.com/phataim/jquery.popSlide.js/master/js/jquery.popSlide-1.0.js"></script>

接下来初始化即可

        $('.slide-wrap').popSlide({
        auto : true,
        delay : 5000,
        duration : 200,
        itemWidth : null,
        itemHeight : null,
        itemNum : null,
        onShowFrame : 1,
        onShow : {
            num : 4,
            style : [{
                'left': '50px',
                'top': '100px',
                'width': '200px',
                'height': '300px',
                'opacity':'1'
            },{
                'width': '300px',
                'height': '500px',
                'left': '300px',
                'top': '0px',
                'opacity':'1'
            },{
                'left': '650px',
                'top': '100px',
                'width': '200px',
                'height': '300px',
                'opacity':'1'
            },{
                'left': '950px',
                'top': '100px',
                'width': '200px',
                'height': '300px',
                'opacity':'1'
            },{
                'left': '1200px',
                'top': '100px',
                'width': '100px',
                'height': '300px',
                'opacity':'1'
            }]
        },
        readyState:{
            left : {
                'top':'250px',
                'left':'0px',
                'height':'0',
                'width':'0',
                'opacity':'0'
            },
            right : {
                'top':'250px',
                'left':'1200px',
                'height':'0',
                'width':'0',
                'opacity':'0'
            }
        },
        controller:{
            'prev':'.btn-prev',
            'next':'.btn-next',
            prevCallBack:function(){},
            nextCallBack:function(){}
        }
        })