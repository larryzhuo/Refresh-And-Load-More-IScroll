# RefreshAndLoadMoreIScroll

I notice that iscroll.js has not refresh and load more effect. so I encapsulation it and give a example

you can import the /js/service/scroll-plugin.js to use it , but please pay attention to you have import the iscroll-probe.js, cause this plugin has use scroll event listener, this event is not support by iscroll.js


`
    var myScroll = window.reScroll(idselector, options, pullUpAction, pullDownAction, upDistance, downDistance){
`

idselector and options is the params as when you use

`
    var myScroll = new IScroll(idselector, options);
`

pullUpAction is the refresh event callback,    pullDownAction is the load more event callback, the upDistance decide the distance from screen top when refresh event fired, the downDistance decide the distance from screen bottom when load more event fired.

you can use

`
1. myScroll.showLoad() 
2. myScroll.closeLoad() 
3. myScroll.disableLoad()  
4. myScroll.enableLoad() 
5. myScroll.showRefresh() 
6. myScroll.closeRefresh() 
`

to control the refresh and load more effect 
