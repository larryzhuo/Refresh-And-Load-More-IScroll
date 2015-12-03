/**
 * Created by Administrator on 2015/12/2.
 */
(function(){
    window.Data={

        getData: function(interface, params, successCallBack, errorCallBack){
            //params.sid = "7B6D326278414AD3B14AD0D1D469C471";
            params.sid = "C288AD9B17CD43ABA8AD1A96AA87A3E1";
            params.nonGzip = 1;
            $.ajax({
                type:'GET',
                data: params,
                url: path.host + path["path"+interface],
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function(data){
                    successCallBack(data);
                },
                error: function(data){
                    errorCallBack(data);
                }
            });
        }
    };
})();
