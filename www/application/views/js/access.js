Access = {

	initialize: function(){
		$(".acceder").click(function(){
			if($(".loginDiv").is(":visible")){
				$(".loginDiv").fadeOut();
				$($(".loginDiv").find("input[type='text']")).removeClass("errorBorder");
				$($(".loginDiv").find("input[type='password']")).removeClass("errorBorder");
				$(".loginDiv").find("input[type='text'],input[type='password']").css({"color":""});
				$("#errorLogin").hide();
				
			}else{
				$(".loginDiv").fadeIn();
				$(".loginDiv").find("input[type='text']").focus();
				$(".loginDiv").find("input[type='text'],input[type='password']").bind( "click", function(){
				});
				
				$(document).unbind().bind("keypress", function(e) {
				    if($(".loginDiv").is(":visible") && e.which == 13) {
				    	$(".loginDiv").find("input[type='button']").trigger("click");
				    }
				});
				
				$(".loginDiv").find("input[type='button']").unbind().bind( "click", function(){
					var email = $(".loginDiv").find("input[type='text']");
					var password = $(".loginDiv").find("input[type='password']");
					var post = true;
					if($(email).val() == "" || $(email).val() == "Correo electrónico"){
						post = false;
						$(email).addClass("errorBorder");
					}
					if($(password).val() == ""){
						post = false;
						$(password).addClass("errorBorder");
					}
					
					if(post){
						$.ajax({
					        url: 'index.php/login/getUser',
					        type: 'post',
					        data: $('form#form_login').serialize(),
					        dataType: "json",
					        success: function(response) {
					        	if(response ==  false){
					        		$("#errorLogin").fadeIn();
					        		isLoged = false;
					        		isAdmin = false;
					        		idUser = -1;
					        		
					        	}else{
					        		$(".acceder").hide();
					        		$("#closeSesion").show();
					        		$(".loginDiv").fadeOut();
					        		isLoged = true;
					        		$("#closeSesion").text(response.user);
					        		idUser = response.id;
					        		$.ajax({
					        		    url: 'index.php/login/isAdmin',
					        		    success: function(response) {
					        		    	if(response == 1){
					        		    		isAdmin = true;
					        		    	}else{
					        		    		isAdmin = false;
					        		    	}
					        		    	updatedState();
					        		    }
					        		});
					        		
					        	}
					        	drawCategories();
					        }
					    });
					}
				});
				
			}
		});

		$(".closeLogin").bind( "click", function(){
			$(".acceder").trigger("click");
		});
		
		$("#closeSesion").bind( "click", function(){
			$.ajax({
		        url: 'index.php/login/logout',
		        type: 'post',
		        data: $('form#form_login').serialize(),
		        success: function(response) {
		        	$("#closeSesion").hide();
					$(".acceder").show();
					$(".loginDiv").find("input[type='text']").val("");
					$(".loginDiv").find("input[type='password']").val("");
					drawCategories();
					isLoged = false;
					isAdmin = false;
					idUser = -1;
					updatedState();
		        }
		    });
		});

		$("body").click(function(){
			$("#fancy_select_panel").hide(300);
		});

	}
}