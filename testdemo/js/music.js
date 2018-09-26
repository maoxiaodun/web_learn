$(function(){
	$(".start").click(function()
	{
		if($(".music").get(0).paused)
		{
			alert(1);
			$(".circle").css
			(
				"animation-play-state","running"	
			);
			$(".startimg").attr("src","img/pause.png");
			$(".music").get(0).play();
			
		}else
		{
			alert(2);
			$(".circle").css
			(
				"animation-play-state","paused"			
			);	
			$(".startimg").attr("src","img/start.png");
			$(".music").get(0).pause();
		}	
		
											
	});
	
    var curtime = 0; var per = 0; var newleft = 0; var totaltime=0;var curtime1=0;
    var curtime2 = 0; var curtime3 = 0; var gettime=0;
     var arr = ["res/jiangzhende.mp3", "res/体面.mp3"];
     var musics =$(".music").get(0);
     function loops(){
     	for(var i =1 ;i<=arr.length;i++){	
              if(musics.ended){
     		$(".music").attr("src",arr[i]);
     		musics.play();
     		if(i == arr.length){
     				$(".music").attr("src",arr[0]);
     			loops();
     		}
     	 }
       }
     }
    setInterval(function(){
		 curtime =parseInt($(".music").get(0).currentTime);
		var curtimes =s_to_hs(curtime);
	$(".text").html(curtimes);
	},1000);
	
	function ttime(){
	$(".music").on("canplay",function()
	 {
	  totaltime = parseInt($(".music").get(0).duration);
	  var totaltimes = s_to_hs(totaltime);
      $(".lasttime").html(totaltimes);
      setInterval(function()
      {
      	curtime1 =parseInt($(".music").get(0).currentTime);
    	per = parseFloat((569/totaltime)); //每秒对应的长度	
    	newleft = curtime1*per;
    	$('.progress_btn').css('left', newleft);
    	$('.progress_bar').width(newleft);
      },1000)     
	 });
	}
	// 音频加载完
	ttime();	 
	function s_to_hs(s){
	    //计算分钟
	    //算法：将秒数除以60，然后下舍入，既得到分钟数
	    var h;
	    h  =   Math.floor(s/60);
	    //计算秒
	    //算法：取得秒%60的余数，既得到秒数
	    s  =   s%60;
	    //将变量转换为字符串
	    h    +=    '';
	    s    +=    '';
	    //如果只有一位数，前面增加一个0
	    h  =   (h.length==1)?'0'+h:h;
	    s  =   (s.length==1)?'0'+s:s;
	    return h+':'+s;
	}
	
	var tag = false,ox = 0,left = 0,bgleft
	= 0;
    $('.progress_btn').mousedown(function(e) {
        ox = e.pageX - left; //按钮的默认位置
        tag = true;
    });
    
    $(document).mouseup(function() {
    	 
        tag = false;
        
    });
 $("audio").get(0).currentTime = gettime;
    $('.pro').mousemove(function(e) {//鼠标移动
        if (tag) {
             left = e.pageX - ox; //鼠标移动
             if (left <= 0) {
                left = 0;
             }else if (left > 569) {
                left = 569;
             }
              gettime = parseInt(left/per);
            var gettimes = s_to_hs(gettime);
           $(".text").html(gettimes);
          
            $('.progress_btn').css('left', left);
            $('.progress_bar').width(left);
            /*$('.text').html(parseInt((left/569)*100) + '%');*/
        }
    });
     
    $('.progress_bg').click(function(e) {//鼠标点击
         if (!tag) {
             bgleft = $('.progress_bg').offset().left;
             left = e.pageX - bgleft;
             if (left <= 0) {
                 left = 0;
            }else if (left > 569) {
                 left = 569;
            }
            curtime2 =parseInt($(".music").get(0).currentTime);
            var gettime = parseInt(left/per);
            var gettimes = s_to_hs(gettime);
           $(".text").html(gettimes);
           $("audio").get(0).currentTime = gettime;
            $('.progress_btn').css('left', left);
            
            $('.progress_bar').animate({width:left},569);
            /*$('.text').html(parseInt((left/569)*100) + '%');*/
         }
    });
    $(".pagedown").click(function(){
    	  
    	$(".music").attr("src",arr[1]);
    	$(".startimg").attr("src","img/pause.png");
    	$(".music").get(0).play();
    	
    });
      $(".pageup").click(function(){
    	  
    	$(".music").attr("src",arr[0]);
    	$(".startimg").attr("src","img/pause.png");
    	$(".music").get(0).play();
    	
    });
   
    
    
})
