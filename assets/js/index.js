$(function(){
	//移除上部分导航的标识部分
	$('.a_box:eq(1) .rectangle').remove();
	/*大轮播部分*/
	var CarouselIndex = {
		new: 0,
		old: 0,
		timer: '',
		autoPlayIndex: 1,
	}
	$('.CarouselPic').eq(0).css('zIndex', 4);
	$('.float_box a').mouseenter(function(){
		if(CarouselIndex.autoPlayIndex == 1){
			CarouselIndex.autoPalyIndex = 0;
			clearInterval(CarouselIndex.timer);
			CarouselIndex.old = CarouselIndex.new;
			CarouselIndex.new = $(this).index();
			var length = 50 +$(this).index() * 93;
			$('.Carousel_triangle').animate({top: length}, 200);
			$('.CarouselPic').css('zIndex', 1);
			$('.CarouselPic').eq(CarouselIndex.old).css('zIndex', 3);
			$('.CarouselPic').eq(CarouselIndex.new).css('zIndex', 4);
			$('.CarouselPic').eq(CarouselIndex.new).css('opacity', 0);
			$('.CarouselPic').eq(CarouselIndex.new).animate({'opacity': 1},1000);
		}
	});
	autoPlay(CarouselIndex);
	$('.todaySpot .t_nav li').hover(function(){
		$('.todaySpot .t_nav li').removeClass('active');
		$(this).addClass('active');
		$('.todaySpot .today_n_item').removeClass('selected');
		$('.todaySpot .today_n_item').eq($(this).index()-1).addClass('selected');

		var length = 12+($(this).index()-1)*42;
		$('.hotspot .t_nav .triangle').css('top',length+'px');
	})
	$('.discuss .t_nav li').hover(function(){
		$('.discuss .t_nav li').removeClass('active');
		$(this).addClass('active');
		$('.discuss .d_item').removeClass('selected');
		$('.discuss .d_item').eq($(this).index()-1).addClass('selected');

		var length = 12+($(this).index()-1)*42;
		$('.discuss .triangle').css('top',length+'px');
	})
	$('.newMess .t_nav li').hover(function(){
		$('.newMess .t_nav li').removeClass('active');
		$(this).addClass('active');
		$('.newMess .new_n_item ').removeClass('selected');
		$('.newMess .new_n_item ').eq($(this).index()-1).addClass('selected');

		var length = 12+($(this).index()-1)*42;
		$('.newMess .triangle').css('top',length+'px');
	})
	$('.course .t_nav li').hover(function(){
		$('.course .t_nav li').removeClass('active');
		$(this).addClass('active');
		$('.course .m_item').removeClass('selected');
		$('.course .m_item').eq($(this).index()-1).addClass('selected');

		var length = 12+($(this).index()-1)*42;
		$('.course .triangle').css('top',length+'px');
	})
})
function autoPlay(CarouselIndex){
	CarouselIndex.timer = setInterval(function(){
		CarouselIndex.old = CarouselIndex.new;
		CarouselIndex.new++;
		if(CarouselIndex.new==4){
			CarouselIndex.new = 0;
		}
		var length = 50 + CarouselIndex.new * 85;
		$('.Carousel_triangle').animate({top: length}, 200);	
		$('.CarouselPic').css('zIndex', 1);
		$('.CarouselPic').eq(CarouselIndex.old).css('zIndex', 3);
		$('.CarouselPic').eq(CarouselIndex.new).css({
			'zIndex':4,
			'opacity': 0
		}).animate({'opacity': 1},1000);
	},8000);
}
