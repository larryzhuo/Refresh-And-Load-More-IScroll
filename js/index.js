/**
 * Created by Administrator on 2015/12/2.
 */
(function(){
    var myScroll;
    var mySwipe;

    $(document).ready(function(){
        //可以先初始化之后再调用refresh或者使用checkDOMChanges
        myScroll = window.reScroll('#wrapper', {
                //监听滚动事件这个必须得设置
                probeType: 3,
                scrollbars: true,
                mouseWheel: true,
                //interactiveScrollbars: true,
                //shrinkScrollbars: 'scale',
                fadeScrollbars: true,
                //checkDOMChanges:true
            },
            function(){
                console.log("refresh");
                init();
            },
            function(){
                init(true);
                console.log("load more");
            },
            30,
            30
        );
    });

    //初始化swipes
    function dotSwipe(data){
        var swipetmpl = $('#swipetmpl');
        var swipeText = doT.template(swipetmpl.text());
        $('.swipe-wrap').html(swipeText(data.body));
        /*数据填充完成之后生成滚动*/
        var elem = document.getElementById('mySwipe');
        mySwipe = Swipe(elem, {
             startSlide: 0,
             auto: 3000,
            continuous: true
            // disableScroll: true,
            // stopPropagation: true,
            // callback: function(index, element) {},
            // transitionEnd: function(index, element) {}
        });
    }


    //填充list
    var httpparam = {
        curPage: 1,
        numPerPage: 5,
        sortType: 1
    };
    var courseList = [];

    function dotCourseList(data, isLoadMore){
        var listtmpl = $('#courselisttmpl');
        var listText = doT.template(listtmpl.text());
        if(isLoadMore){
            //避免重复设置
            if(courseList.slice(-1)[0].courseId != data.body.courseArr.slice(-1)[0].courseId){
                courseList = courseList.concat(data.body.courseArr);

                httpparam.curPage++;
                if(httpparam.curPage > data.totalPage){
                    myScroll.disableLoad();
                }
            }
        }else{
            courseList.length = 0;
            courseList = data.body.courseArr;
            myScroll.enableLoad();

            httpparam.curPage++;
            if(httpparam.curPage > data.totalPage){
                myScroll.disableLoad();
            }
        }
        $('#index-courselist').html(listText(courseList));

        myScroll.refresh();
    }


    function init(isLoadMore, closeEffect){
        if(!isLoadMore){
            httpparam.curPage = 1;
        }
        window.Data.getData(
            "Course",
            httpparam,
            function(data){
                if(data.code == 0){
                    if(isLoadMore){
                        dotCourseList(data, true);
                        //关闭load效果
                        myScroll.closeLoad();
                    }else{
                        dotSwipe(data);
                        dotCourseList(data, false);
                        //关闭refresh效果
                        myScroll.closeRefresh();
                    }
                }
            },
            function(){
                console.log("request throw error");
            }
        );
    }
    init(false);

    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

})();
