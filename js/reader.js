var browser=navigator.appName 
var b_version=navigator.appVersion 
var version=b_version.split(";"); 
var trim_Version=version[1].replace(/[ ]/g,""); 
var isIE6, isIE7, isIE8, isIE9;
if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") 
	isIE6=true;
else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0") 
	isIE7=true;
else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0") 
	isIE8=true;
else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") 
	isIE9=true;
$(document).ready(function(){
	var pageWidth=654;
	var pageHeight=930;
	var pageMargin=32;
	var pageCount=0;
	var pageCur=0;
	
	$("#load-content").load("data/"+"test.html", function(){
		$(this).find("h2").hide();
		if(isIE6 || isIE7)
		{
			$("body").append("<img id='fuckingIE' src='fuckingIE' />");
			$("#load-content img").each(function(){
				$(this).attr("src","data/"+$(this).attr("src").replace($("#fuckingIE").attr("src").replace("fuckingIE",""),""));
				$(this).appendTo($(this).parent());
			});
			$("#fuckingIE").remove();
		} else
			$("#load-content img").each(function(){$(this).attr("src","data/"+$(this).attr("src"));});
		
		var page_first=true;
		var h2="";var h3="";var h22="";var h33="";
		
		
		$("#load-content div + span").each(function(){
			$(this).appendTo($(this).prev());
		});
		//span后面一般会有一个空的p标签，删除它
		$("#load-content div  > span + p").remove();
		$("#load-content div").children().each(function(){
			//记录页面所在的栏目和文章
			if($(this).get(0).tagName=="H2") h22=$(this).text();
			if($(this).get(0).tagName=="H3") h33=$(this).text();
			//如果有分割符或下下个部分的top超过页面高度则分页
			if($(this).get(0).tagName=="SPAN" || $(this).next().size()==0 || ($(this).next().next().size()>0 && $(this).next().next().position().top>=pageHeight))
			{
				var page_item=$(this).prevAll().andSelf().wrapAll("<div class='page-item'></div>").parent().appendTo("#page-box");
				if(page_first)
				{
					h2=h22;h3=h33;
					page_first=false;
				}
				page_item.attr("column-name",h2);
				page_item.attr("article-name",h3);
				page_first=true;
				pageCount++;
			}
		});
		
		$("#page-box").width(pageCount*(pageWidth+pageMargin));
		//alert(pageCount);
		
		//目录
		$("p.MsoToc2").css("fontSize", "16px").find("a").click(function(){
			pageCur=$(".page-item[column-name='"+$(this).text().split("...")[0]+"']").first().index()-1;
			changePage();
			return false;
		});
		$("p.MsoToc3").css("paddingLeft", "2em").find("a").click(function(){
			pageCur=$(".page-item[article-name='"+$(this).text().split("...")[0]+"']").first().index()-1;
			changePage();
			return false;
		});
		$("#J_CatalogueTrigger").click(function(){
			pageCur=$(".MsoToc3").parents(".page-item").index()-1;
			changePage();
		});

	});
	$(".cover").click(function(){$(this).fadeOut("fast");});
	//页面切换控制
	$(".next a").click(function(){
		pageCur++;
		changePage();
	});
	$(".prev a").click(function(){
		pageCur--;
		changePage();
	});
	$(document).keyup(function(e){
		var key =  e.which;
		if(key == 39){
			pageCur++;
			changePage();
		}else if(key == 37)
		{
			pageCur--;
			changePage();
		}
  	 });
	 
	 var clientX=0;var clientY=0;var IsDraging=false;
	 $("#page-box").mousedown(function(e){
	 	clientX=e.clientX;
		clientY=e.clientY;
		IsDraging=true;
		
	 });
	 $("#page-box").mousemove(function(e){
		 if(e.which==1 && IsDraging) {
			$("#page-box").css("left",$("#page-box").position().left+e.clientX-clientX+"px");
			clientX=e.clientX;
			clientY=e.clientY;
		 }
	 });
	 $(document).mouseup(function(e){
		 if(e.which==1 && IsDraging) {
			pageCur=-Math.round($("#page-box").position().left/(pageWidth+pageMargin));
			changePage();
			IsDraging=false;
		 }
	 });

	function changePage(){
		if(pageCur<0) 
		{
			$(".cover").fadeIn("fast");
			pageCur=0;
		}
		if(pageCur>=pageCount) pageCur=pageCount-1;
		$("#page-box").animate({left: -pageCur*(pageWidth+pageMargin)},300,function(){
			$("#J_Percent").text(pageCur+1);
			$("html,body").animate({scrollTop: 0}, 300);
		});
		var currentPageItem=$(".page-item").eq(pageCur);
		$("#J_ChapterTitle").text(currentPageItem.attr("column-name")+" - "+currentPageItem.attr("article-name"));
	}
	
	
	$("#J_HelpTipsTrigger").click(function(){$("#J_Help").fadeIn("normal");});
	$("#J_Help .close").click(function(){$("#J_Help").fadeOut("normal");});
});
