/**
 * Created by Administrator on 2015/12/2.
 */
/*
* 需求：包装iscroll加入上拉加载更多与下拉刷新
* 1.刷新图标旋转之后才刷新，否则不算刷新
* 2.之后手动下拉才能激发刷新，如果是惯性导致达到临界位置不会显示刷新
* 3.下拉加载在手动下拉和惯性到达临界位置时都会激发
*/
(function(win){
    var myScroll;
    win.reScroll = function(idselector, options, pullUpAction, pullDownAction, upDistance, downDistance){
        var pullTop = $(".pull-top");
        var pullBottom = $(".pull-bottom");

        pullTop.append("<i class='arrow-down'></i><span class='pullup-text'>下拉加载刷新</span>");
        pullBottom.append("<i class='arrow-loading'></i><span class='pulldown-text'>上拉加载更多</span>");

        var topi = $('.pull-top i');
        var scro = $('#scroller');
        var pullTopHeight = 40;
        var pullBottomHeight = 40;

        myScroll = new IScroll(idselector, options);

        //标记是否正在加载
        var isLoading = false;
        myScroll.showLoad = function(){
            isLoading = true;
            pullBottom.css('display', 'block');
        };
        myScroll.closeLoad = function(){
            isLoading = false;
            pullBottom.css('display', 'none');
        };
        myScroll.disableLoad = function(){
            pullBottom.css('display', 'none');
            myScroll.loadDisabled = true;
        };
        myScroll.enableLoad = function(){
            myScroll.loadDisabled = false;
        };

        //标记是否正在刷新
        var isRefreshing = false;
        myScroll.showRefresh = function(){
            isRefreshing = true;
            topi.removeClass('arrow-down');
            topi.removeClass('rotate-top');
            topi.addClass('arrow-loading');
        };
        myScroll.closeRefresh = function(){
            pullTop.css('display', 'none');
            topi.removeClass('arrow-loading');
            topi.addClass('arrow-down');
            isRefreshing = false;
        };

        scro.on("touchmove", function(){
            //下拉
            if(myScroll.y > upDistance){
                pullTop.css('display','block');

                if(myScroll.y < pullTopHeight + upDistance){
                    if( topi.hasClass('rotate-top')){
                        topi.removeClass('rotate-top');
                    }
                }
                else if(myScroll.y > pullTopHeight + upDistance){
                    if( !topi.hasClass('rotate-top')){
                        topi.addClass('rotate-top');
                    }
                }
            }
            //上拉
            else if(!myScroll.loadDisabled && myScroll.y < myScroll.maxScrollY - downDistance){
                pullBottom.css('display','block');
            }
        });

        //touchend只会激发一次
        scro.on("touchend", function(){
            if(myScroll.y > upDistance){
                if(myScroll.y > pullTopHeight + upDistance){
                    if(!isRefreshing){
                        myScroll.showRefresh();
                        pullUpAction();
                    }
                }else{
                    myScroll.closeRefresh();
                }
            }

            else if(!myScroll.loadDisabled && myScroll.y < myScroll.maxScrollY - downDistance){
                if( !isLoading ){
                    myScroll.showLoad();
                    pullDownAction();
                }
            }
        });

        /*
        *对于refresh必须touch激发，对于load无论是滑动还是touch到达临界，都触发
        * */
        myScroll.on("scroll", function(){
            //处理滑动下拉激发多次问题
            if(!myScroll.loadDisabled && myScroll.y < myScroll.maxScrollY - downDistance){
                if( !isLoading ){
                    myScroll.showLoad();
                    pullDownAction();
                }
            }
        });

        return myScroll;
    }
})(window);
