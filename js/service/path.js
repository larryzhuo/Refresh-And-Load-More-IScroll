(function(){
    var debug = false;

    if(debug){
        window.path={
            //本地环境
            host: 'http://localhost:63342/AnyLib/src/',

            pathIndex: 'model/index.json'
        };
    }else{
        window.path={
            //测试环境
            host: 'http://hrmsv3-mlearning-dmzstg1.pingan.com.cn/',

            pathCourse: 'learn/app/haveLearntCourseList.do'
        };
    }
})();
