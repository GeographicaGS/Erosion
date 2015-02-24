function sectionEvent(){
	
	this._createSection = function(sections){
		var self = this;
		var html = "";
		$.each(sections, function(section){
			if($.isPlainObject(sections[section])){
				html += "<ul><li><span>" + section + "</span>"
				html += "<ul class='subsection'>";
				$.each(sections[section], function(subsection){
					html += "<li><a target='_blanck' href='application/views/js/sections/" + sections[section][subsection] + "'>" + subsection + "</a></li>"
				});
				html += "</ul>";

			}else{
				html += "<ul><li><a target='_blanck' href='application/views/js/sections/" + sections[section] + "'>" + section + "</a>"
			}
			html += "</li></ul>";
		});	
		return html;
	};

	$("nav").append(this._createSection(sections));

	$("header nav ul").mouseenter(function(){
		$(this).find(".subsection").show();
	});
	$("header nav ul").mouseleave(function(){
		$(this).find(".subsection").hide();
	});
}