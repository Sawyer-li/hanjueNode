$(function(){
	$(window).on('scroll',function() {
		if(!this1.retTopIsTrue){
				if($(document).scrollTop()>400){
					this1.retTopIsTrue = true;
				}
			}else{
				if($(document).scrollTop()<400){
					this1.retTopIsTrue = false;
				}
			}
	});
})