/*!    
 *  popSlide v1.0
 * 
 *  2013.11.29
 *
 *  Author: 尹帆(ivanyin)
 */

(function($) { 

    defaults = {
        auto : true,
        delay : 5000,
        duration : 200,
        itemNum : null,
        onShowFrame : 3,
        onShow : {
            num : 1,
            style : [{}]
        },
        readyState:{
            left : {},
            right : {}
        },
        controller:{
            'prev':'.btn-prev',
            'next':'.btn-next'
        }
    }

    $.fn.popSlide = function( options ) {

        if(this.length == 0) return this;

        if(this.length > 1){
            this.each(function(){$(this).popSlide(options)});
            return this;
        }

        var self = this,

            settings = {},

            // sliding = [],

            items = [],

            itemNum = 0,

            onShowQueue = [],

            onShowFrame = 1,

            loopQuene = [],

            playTimeoutId = '',

            controller = [];

        settings = $.extend({}, defaults, options);


        function init(){
            self.css({'position':'relative'});
            var tmp = self.children();
            itemNum = settings.itemNum || tmp.length;
            onShowFrame = settings.onShowFrame;
            $.each(tmp, function(index, val) {
                items[index] = $(tmp[index]);
                items[index].data.sliding = false;
            //     if(settings.frameClick === true)items[index].click(function(event) {
            //         if(index === 0){
            //             if(onShow === 1)show(index,'right');
            //             else show(index,'left');
            //         } else if(index === itemNum-1){
            //             if (onShow === 0)show(index,'right');
            //             else show(index,'left');
            //         } else {
            //             show(index,(index > onShow)?'left':'right')
            //         }
            //         show(index,(onShow-index));

            //     });
            });
            
            loopQuene = items.slice(-settings.onShow.num).concat(items).concat(items.slice(0,settings.onShow.num));

            var firstFrame = getFirstFrame(settings.onShowFrame);

            onShowQueue = getToShowQuene(firstFrame);

            for(var i = 0;i < settings.onShow.num ; i++){
                onShowQueue[i].css(settings.onShow.style[i]);
                
            }
            //setTimeout(function(){show(settings.onShowFrame+1,'left')},2000)

            // controller['next'] = $(settings.controller.next);
            // controller['prev'] = $(settings.controller.prev);

            // controller.next.on('click',  function(event) {
            //     next();
            // });
            // controller.prev.on('click',  function(event) {
            //     prev();
            // });
            
            if(settings.auto)play();
        }


        function show(toShowFrame,direction){

            if(!isAnimationOver())return false;

            if(typeof(settings.beforeSlide) === 'function')settings.beforeSlide(onShowFrame,toShowFrame);

            var toShowQuene = getToShowQuene(getFirstFrame(toShowFrame));

            var readyQuene = getReadyQuene(toShowQuene,onShowQueue);

            $.each(readyQuene, function(index, val) {
                var tmpdir = '';
                if(direction === 'left')tmpdir= 'right';
                else tmpdir = 'left'
                val.css(settings.readyState[tmpdir]);
            });

            var toHideQuene = getToHideQuene(toShowQuene,onShowQueue);

            var slidingFrames = onShowQueue.concat(toShowQuene);

            startAnimation(slidingFrames);

            onShowFrame = toShowFrame;

            onShowQueue = toShowQuene;

            $.each(toShowQuene, function(index, val) {
                val.animate(settings.onShow.style[index],settings.duration,(function(x){
                    return function(){
                        toShowQuene[x].data.sliding = false;
                        play();
                        // afterCall(settings.afterSlide);
                    }
                })(index));
            });

            $.each(toHideQuene, function(index, val) {
                val.animate(settings.readyState[direction],settings.duration,(function(x){
                    return function(){
                        toHideQuene[x].data.sliding = false;
                        play();
                        // afterCall(settings.afterSlide);
                    }
                })(index));
            });

            return ;
            
        }

        function getFirstFrame(toShowFrame){
            if(settings.onShow.num % 2){
                //奇数
                return toShowFrame - (settings.onShow.num - 1) / 2 + settings.onShow.num -1;
            } else {
                //偶数
                return toShowFrame - settings.onShow.num / 2 + settings.onShow.num ;
            }
        }

        function getReadyQuene(toShowQuene,onShowQueue){
            var tmp = [];
            $.each(toShowQuene,function(index, el) {
                if($.inArray(toShowQuene[index],onShowQueue) < 0)tmp.push(toShowQuene[index]);
            });
            return tmp;
        }

        function getToHideQuene(toShowQuene,onShowQueue){
            var tmp = [];
            $.each(onShowQueue,function(index, el) {
                if($.inArray(onShowQueue[index],toShowQuene)<0)tmp.push(onShowQueue[index]);
            });
            return tmp;
        }

        function getToShowQuene(firstFrame){
            return loopQuene.slice(firstFrame, firstFrame + settings.onShow.num);
        }


        function next(){
            if (onShowFrame > itemNum) {
                show(1,'left')
            } else {
                show(onShowFrame+1,'left');
            }
        }

        function prev(){
            if(onShowFrame === 1){
                show(itemNum,'right');
            } else {
                show(onShowFrame-1,'right');
            }
        }

        function play(){
            if(!settings.auto)return false;
            if(playTimeoutId)clearTimeout(playTimeoutId);
            if(!isAnimationOver())return false;
            playTimeoutId = setTimeout(function(){
                    next();
                },settings.delay);
        }

        function afterCall(callback){
            if(!isAnimationOver())return false;
            if(typeof(callback) === 'function')callback(onShow);
        }


        function isAnimationOver(){
            for (var i = 0; i < itemNum ; i++) {
                if(items[i].data.sliding)return false;
            };
            return true;
        }

        function startAnimation(slidingFrames){
            for (i in slidingFrames) {
                slidingFrames[i].data.sliding = true;
            }
        }

        init();

    }; 
})( jQuery ); 