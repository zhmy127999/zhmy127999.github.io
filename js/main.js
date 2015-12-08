$('#return_top').click(function(){
	$("html,body").animate({scrollTop: $("body").offset().top}, 1000);
});
var is_detail=false;
var bookcase, book_info;
$('#body .book_info a').click(function(){
	if(is_detail) return false;
	is_detail=true;
	var href=$(this).attr("href");
	bookcase=$(this).parents('.bookcase');
	book_info=$(this).parents('.book_info');
	book_info.after("<div id='book_detail_container' class='new_add' style='display: none;'></div>");
	bookcase.after("<div id='more_detail_container' class='new_add' style='display: none;'></div>");
	$("#book_detail_container").load(href+" #book_detail",function(){});
	$("#more_detail_container").load(href+" #more_detail",function(){});
	$("html,body").animate({scrollTop: book_info.offset().top-170}, 1000,function(){
		bookcase.siblings().fadeOut("normal",function(){
			book_info.siblings(".book_info").fadeOut("fast", function(){
				$("#book_detail_container").delay(200).fadeIn();
				$("#more_detail_container").delay(200).fadeIn();
				$("#return_back").fadeIn();
			});
		});
	});
	return false;
});
$("#return_back").click(function(){
	if(!is_detail) return false;
	is_detail=false;
	$("#book_detail_container").remove();
	$("#more_detail_container").remove();
	$("#return_back").fadeOut();
	book_info.siblings().show();
	bookcase.siblings().show();
	
	$("html,body").animate({scrollTop: book_info.offset().top-170}, 1000);

	return false;
});