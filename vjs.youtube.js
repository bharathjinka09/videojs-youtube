videojs.Youtube=videojs.MediaTechController.extend({init:function(a,b,c){videojs.MediaTechController.call(this,a,b,c);this.features.fullscreenResize=!0;this.player_=a;this.player_el_=document.getElementById(this.player_.id());c=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;if((c=a.options().src.match(c))&&11==c[2].length){if(this.videoId=c[2],!this.player_.options().ytcontrols){this.player_.poster("http://img.youtube.com/vi/"+this.videoId+"/0.jpg");var d=this;setTimeout(function(){d.player_.posterImage.el().style.backgroundSize=
"cover"},50)}}else this.videoId="";this.id_=this.player_.id()+"_youtube_api";this.el_=videojs.Component.prototype.createEl("iframe",{id:this.id_,className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0,webkitAllowFullScreen:"",mozallowfullscreen:"",allowFullScreen:""});this.player_el_.insertBefore(this.el_,this.player_el_.firstChild);b={enablejsapi:1,iv_load_policy:3,playerapiid:this.id(),disablekb:1,controls:this.player_.options().ytcontrols?1:0,showinfo:0,modestbranding:1,
rel:0,autoplay:this.player_.options().autoplay?1:0,loop:this.player_.options().loop?1:0};c=/[?&]list=([^#\&\?]+)/;c=a.options().src.match(c);null!=c&&1<c.length&&(b.list=c[1]);"file:"!=window.location.protocol&&(b.origin=window.location.origin);this.el_.src="http://www.youtube.com/embed/"+this.videoId+"?"+videojs.Youtube.makeQueryString(b);this.player_.options().ytcontrols&&(d=this,setTimeout(function(){d.player_.bigPlayButton.hide()},50));videojs.Youtube.apiReady?this.loadYoutube():(videojs.Youtube.loadingQueue.push(this),
videojs.Youtube.apiLoading||(a=document.createElement("script"),a.src="http://www.youtube.com/iframe_api",b=document.getElementsByTagName("script")[0],b.parentNode.insertBefore(a,b),videojs.Youtube.apiLoading=!0))}});videojs.Youtube.prototype.dispose=function(){this.ytplayer.destroy();videojs.MediaTechController.prototype.dispose.call(this)};videojs.Youtube.prototype.play=function(){this.isReady_?this.ytplayer.playVideo():(this.playOnReady=!0,this.player_.options.ytcontrols||this.player_.bigPlayButton.show())};
videojs.Youtube.prototype.pause=function(){this.ytplayer.pauseVideo()};videojs.Youtube.prototype.paused=function(){return this.lastState!==YT.PlayerState.PLAYING&&this.lastState!==YT.PlayerState.BUFFERING};videojs.Youtube.prototype.currentTime=function(){return this.ytplayer.getCurrentTime()};videojs.Youtube.prototype.setCurrentTime=function(a){this.ytplayer.seekTo(a,!0);this.player_.trigger("timeupdate")};videojs.Youtube.prototype.duration=function(){return this.ytplayer.getDuration()};
videojs.Youtube.prototype.buffered=function(){var a=this.ytplayer.getVideoBytesLoaded(),b=this.ytplayer.getVideoBytesTotal();if(!a||!b)return 0;var c=this.ytplayer.getDuration(),a=a/b*c,b=this.ytplayer.getVideoStartBytes()/b*c;return videojs.createTimeRange(b,b+a)};videojs.Youtube.prototype.volume=function(){isNaN(this.volumeVal)&&(this.volumeVal=this.ytplayer.getVolume()/100);return this.volumeVal};
videojs.Youtube.prototype.setVolume=function(a){a&&a!=this.volumeVal&&(this.ytplayer.setVolume(100*a),this.volumeVal=a,this.player_.trigger("volumechange"))};videojs.Youtube.prototype.muted=function(){return this.ytplayer.isMuted()};videojs.Youtube.prototype.setMuted=function(a){a?this.ytplayer.mute():this.ytplayer.unMute();var b=this;setTimeout(function(){b.player_.trigger("volumechange")},50)};
videojs.Youtube.prototype.onReady=function(){this.isReady_=!0;this.player_.trigger("techready");this.player_.posterImage.hide();this.triggerReady();this.player_.trigger("durationchange");this.playOnReady&&(this.player_.bigPlayButton.hide(),this.ytplayer.playVideo());if(this.player_.options().ytcontrols){var a=this.player_.options();a.controls=!1;this.player_.options(a)}};
videojs.Youtube.prototype.onStateChange=function(a){if(a!=this.lastState){switch(a){case -1:this.player_.trigger("durationchange");break;case YT.PlayerState.ENDED:this.player_.trigger("ended");this.player_.options().ytcontrols||this.player_.bigPlayButton.show();break;case YT.PlayerState.PLAYING:this.player_.trigger("timeupdate");this.player_.trigger("durationchange");this.player_.trigger("playing");this.player_.trigger("play");break;case YT.PlayerState.PAUSED:this.player_.trigger("pause");break;case YT.PlayerState.BUFFERING:this.player_.trigger("timeupdate"),
this.player_.trigger("waiting"),this.player_.loadingSpinner.hide()}this.lastState=a}};
videojs.Youtube.prototype.onPlaybackQualityChange=function(a){switch(a){case "medium":this.player_.videoWidth=480;this.player_.videoHeight=360;break;case "large":this.player_.videoWidth=640;this.player_.videoHeight=480;break;case "hd720":this.player_.videoWidth=960;this.player_.videoHeight=720;break;case "hd1080":this.player_.videoWidth=1440;this.player_.videoHeight=1080;break;case "highres":this.player_.videoWidth=1920;this.player_.videoHeight=1080;break;case "small":this.player_.videoWidth=320;
this.player_.videoHeight=240;break;default:this.player_.videoWidth=0,this.player_.videoHeight=0}this.player_.trigger("ratechange")};videojs.Youtube.prototype.onError=function(a){this.player_.error=a;this.player_.trigger("error")};videojs.Youtube.isSupported=function(){return!0};videojs.Youtube.canPlaySource=function(a){return"video/youtube"==a.type};videojs.Youtube.loadingQueue=[];
videojs.Youtube.prototype.loadYoutube=function(){this.ytplayer=new YT.Player(this.id_,{events:{onReady:function(a){a.target.vjsTech.onReady()},onStateChange:function(a){a.target.vjsTech.onStateChange(a.data)},onPlaybackQualityChange:function(a){a.target.vjsTech.onPlaybackQualityChange(a.data)},onError:function(a){a.target.vjsTech.onError(a.data)}}});this.ytplayer.vjsTech=this};
videojs.Youtube.makeQueryString=function(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b.join("&")};window.onYouTubeIframeAPIReady=function(){for(var a;a=videojs.Youtube.loadingQueue.shift();)a.loadYoutube();videojs.Youtube.loadingQueue=[];videojs.Youtube.apiReady=!0};