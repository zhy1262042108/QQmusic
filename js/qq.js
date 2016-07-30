$(function(){
   var audio=$('#audio').get(0);
   var $audio=$('#audio');
   var play=$('.play');
   var currentIndex;
   //定义数组并把数据追加到页面中
   var arr=[
   {src:"mp3/1.mp3",song:"爱的华尔兹",name:"郑爽",time:"04:33"},
   {src:"mp3/2.mp3",song:"爱，频率",name:"安七炫",time:"03:58"},
   {src:"mp3/3.mp3",song:"日不落",name:"蔡依林",time:"03:48"},
   {src:"mp3/4.mp3",song:"可以了",name:"陈奕迅",time:"00:57"},
   {src:"mp3/5.mp3",song:"这就是命",name:"黄渤",time:"04:52"},
   {src:"mp3/6.mp3",song:"雪",name:"王艺翔",time:"03:46"}]
   $(arr).each(function(index,value){
      $('<li data-id="'+index+'"><div class="song">'+value.song+'</div><div class="name">'+value.name+'</div><div class="time">'+value.time+'</div><div class="list-cp"><span class="like"></span><span class="share"></span><span class="fav"></span><span class="del"></span></div></li>').appendTo('.player-list ul');
   })
   //点击li切换歌曲
   $('.player-list ul li').on('click',function(){
      currentIndex=$(this).index();
      // currentIndex=parseInt($(this).attr('data-id'));
         $('.player-list ul li').removeClass('playing');
         $(this).addClass('playing');
          audio.src=arr[currentIndex].src;
         audio.play();
   })
   //点击播放按钮控制播放于暂停
   play.on('click',function(){
      if (currentIndex==undefined) {
         currentIndex=0;
         audio.src=arr[currentIndex].src;
      }
      if (audio.paused) {
         audio.play();
      }else{
         audio.pause();
      }
   })
   
   //播放器播放时的函数
   $audio.on('play',function(){
      $('.play').addClass('audio1');
      $('.player-list ul li').removeClass('playing').eq(currentIndex).addClass('playing');
      var v=arr[currentIndex];
      $('.mini-player .music-name span').text(v.song);
      $('.mini-player .singer-name').text(v.name);
      $('.mini-player .time1').text(v.time);
   })
   $audio.on('pause',function(){
      $('.play').removeClass('audio1');
   })
   //切换下一首歌
   $('.next').on('click',function(){
      if (currentIndex==undefined) {
         currentIndex=0;
      }else{
         currentIndex+=1;
      }
      if(currentIndex>=arr.length){
         currentIndex=0;
      }
      audio.src=arr[currentIndex].src;
      audio.play();
   })
   //切换上一首歌
   $('.pre').on('click',function(){
      if (currentIndex==undefined) {
         currentIndex=0;
      }else{
         currentIndex-=1;
      }
      if(currentIndex<0){
         currentIndex=arr.length-1;
      }
      audio.src=arr[currentIndex].src;
      audio.play();
   })
   //删除指定歌曲
   $('.list-cp .del').on('click',function(e){
      e.stopPropagation();
      var i=$('.list-cp .del').index(this);
      $(this).closest('li').remove();
      arr.splice(i,1);
      $('.value').html(arr.length);
      console.table(arr);
   })
   //删除全部歌曲
   $('.player-list-title .removeall').on('click',function(){
      $('.player-list ul li').remove();
      arr.splice(0,arr.length)
      $('.value').html(arr.length);
      console.table(arr)
   })
   //控制音量
   $('.yl').on('click',function(e){
      audio.volume=e.offsetX/$(this).width();
   })
   $('.lb').on('click',function(e){
      e.stopPropagation();
      if (!$(this).attr('origin-v')) {
         $(this).attr('origin-v',audio.volume);
         audio.volume=0;
         console.log(audio.volume)
      }else{
         audio.volume=$(this).attr('origin-v');
         $(this).removeAttr('origin-v');
      }
   })
   $audio.on('volumechange',function(){
      if (audio.volume===0) {
         $('.lb').addClass('active');
      }else{
         $('.lb').removeClass('active');
      }

      var w=audio.volume*$('.yl').width();
      $('.volume .heng').width(w);
      $('.volume .yuandian').css({left:w-3});
   })
   $('.yuandian').on('mousedown',function(e){
      e.preventDefault();
      e.stopPropagation();
     /* $(this).closest('.volume').addClass('moving');*/
      $(document).on('mousemove',function(e){ 
         var left=e.pageX-$('.yl').offset().left-3;
         var v=left/$('.yl').width();
         v=(v>1)?1:v;
         v=(v<0)?0:v;
         audio.volume=v;
      })
   })
   $(document).on('mouseup',function(e){
      /*$('.volume').removeClass('moving');*/
      $(document).off('mousemove');
   })
   //控制播放时间
   $audio.on('timeupdate',function(){
      time=audio.duration-audio.currentTime;
      $('.time1').html(format_duration(time));
   })
   var format_duration = function(str){
      if (isNaN(str)) {
         return "--:--";
      };
      var num = Number(str);
      var fen = parseInt( num/60 );
      var miao = Math.round(num%60);
      miao = (miao < 10)?( '0' + miao):miao;
      fen = '0' + fen;
      return  fen + ':' + miao;
   }
   //控制播放进度条
   $('.jingdutiao').on('click',function(e){
      audio.currentTime=e.offsetX/$(this).width()*audio.duration;
   })
   $audio.on('timeupdate',function(){
      var w=audio.currentTime*$('.jingdutiao').width()/audio.duration;
      $('.jingdutiao .heng1').width(w);
      $('.jingdutiao .yuandian1').css({left:w-$('.yuandian1').width()/2});
   })
   //提示卡
   var tips=$('.tishika');
   var sanjiao=$('.sanjiao');
   $('.jingdutiao').on('mouseover',function(e){
      $('.jingdutiao').on('mousemove',function(e){
        date=e.offsetX/$(this).width()*audio.duration;
      $('.tishika').html(format_duration(date));
      tips.css({display:'block',left:e.offsetX-tips.width()/2}) 
      sanjiao.css({display:'block',left:e.offsetX-4}) 
      })
      
   })
   $('.jingdutiao').on('mouseout',function(e){
      tips.css({display:'none'})
      sanjiao.css({display:'none'})
   })
   $('.yuandian1').on('mouseover',function(e){
      e.stopPropagation();
   })
   $('.yuandian1').on('mousedown',function(e){
      e.preventDefault();
      e.stopPropagation();
     /* $(this).closest('.volume').addClass('moving');*/
      $(document).on('mousemove',function(e){

         var left=e.pageX-$('.jingdutiao').offset().left-3;
         var v=left/$('.jingdutiao').width()*audio.duration;
         audio.currentTime=v;
      })
   })
   $(document).on('mouseup',function(e){
      /*$('.volume').removeClass('moving');*/
      $(document).off('mousemove');
   })
   var flag=true;
   $('.playway').on('click',function(e){
      e.stopPropagation();
      if (flag) {
         flag=false;
         $('.playwaybox').css({display:'block'});
         
      }else{
         $('.playwaybox').css({display:'none'});
         flag=true;
      }
      
   })
   $('.randomplay').on('click',function(){
      currentIndex=Math.floor(Math.random()*arr.length);
      audio.src=arr[currentIndex].src;
      audio.play();
   })
   $('.orderplay').on('click',function(){
      currentIndex+=1;
      if (currentIndex>=arr.length) {
         currentIndex=0;
      }
      if (!currentIndex) {currentIndex=0};
      audio.src=arr[currentIndex].src;
      audio.play();
   })
   $audio.on('ended',function(){
      $('.orderplay').trigger('click');
   })
   $('.repeatone').on('click',function(){
      if (!currentIndex) {currentIndex=0};
      audio.src=arr[currentIndex].src;
      audio.play();
   })
   $('.repeatall').on('click',function(){
      currentIndex+=1;
      if (currentIndex>=arr.length) {
         currentIndex=0;
      }
      if (!currentIndex) {currentIndex=0};
      audio.src=arr[currentIndex].src;
      audio.play();
   })
   $('.value').html(arr.length);
   $('.big-play-list').on('click',function(){
      $('.player-list').toggleClass('animation');
   })
})