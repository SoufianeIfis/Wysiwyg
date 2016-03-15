(function($){

	function my_switch() {
		var open = false;
		$("#switch").on("click", function (){
			if(open === false) {
				open = true;
		 		$.get(this.href,function(){
		 			var content = my_size.html();
		 			$("#size").text(content);
		 		});
			}
			else{
				open = false;
				$.get(this.href, function () {
					var content = my_size.text-decoration();
		 			$("#size").html(content);
				});
			}
		});
	}

	function my_link() {
		$('#link').on("click", function (){
			var url = prompt("Entrez le nom de votre lien", "http://");
			var text = document.getSelection();
			document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank">' + text + '</a>');
		});
	}

	function my_save() {
		$('#save').on("click", function (){
			localStorage.setItem('ok', JSON.stringify($('#size').html()));
		});
	}

	var my_size;
	var cmp = [
		{key: "bold", value: '<input type= "button" value="bold" onclick= "document.execCommand(\'bold\')" style="font-weight:bold"/>', exec_func: false},
		{key: "underline", value: '<input type="button" value="underline" onclick="document.execCommand(\'underline\')" style="text-decoration:underline"/>', exec_func: false},
		{key: "italic", value: '<input type="button" value="italic" onclick="document.execCommand(\'italic\')" style="font-style:italic"/>', exec_func: false},
		{key: "delete", value: '<input type="button" value="delete" onclick="document.execCommand(\'delete\')"/>', exec_func: false},
		{key: "justifyLeft", value: '<input type="button" value="left" onclick="document.execCommand(\'justifyLeft\')"/>', exec_func: false},
		{key: "justifyCenter", value: '<input type="button" value="center" onclick="document.execCommand(\'justifyCenter\')"/>', exec_func: false},
		{key: "justifyRight", value: '<input type="button" value="right" onclick="document.execCommand(\'justifyRight\')"/>', exec_func: false},
		{key: "strikeThrough", value: '<input type="button" value="barré" onclick="document.execCommand(\'strikeThrough\')"/>', exec_func: false},
		{key: "justifyFull", value: '<input type="button" value="justif" onclick="document.execCommand(\'justifyFull\')"/>', exec_func: false},
		{key: "police", value: '<select id="police" onchange="document.execCommand(\'fontSize\', false, document.getElementById(\'police\').value)"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option>', exec_func: false},
		{key: "color", value: '<input id="color" type="color" onchange="document.execCommand(\'foreColor\',false,document.getElementById(\'color\').value)"/>', exec_func: false},
		{key: "switch", value: '<input id="switch" type=\"button\" value=\"switch\" onclick=\"document.execCommand(\'switch\')\"/>', exec_func: my_switch},
		{key: "link", value: '<input type=\"button\" id="link" value=\"links\" onclick=\"document.execCommand(\'links\')\" />', exec_func: my_link},
		{key: "save", value: '<input type=\"button\" id=\"save\" value=\"save\" onclick=\"document.execCommand(\'save\')\" />', exec_func: my_save},
	];
	var defaults = {
		"backgroundColor": "red",
		"borderRadius": "1em",
		"marginLeft": "0",
		"marginTop": "2%",
		"width": "150vh",
		"height": "40vh",
		buttons: ["bold", "italic", "underline", "delete", "justifyLeft", "justifyCenter", "justifyRight", "strikeThrough", "justifyFull", "color", "police", "switch", "indent", "outdent", "link", "save"]
	};

	$.fn.my_wysiwyg = function(options) {

		var param=$.extend(defaults, options);
		this.each(function() {
			$(this).replaceWith('<div contenteditable="true" id="size">');
			my_size = $("#size");
			my_size.css('overflow', 'auto');
			my_size.css("backgroundColor", param.backgroundColor);
			my_size.css("borderRadius", param.borderRadius);
			my_size.css("marginLeft", param.marginLeft);
			my_size.css("marginTop", param.marginTop);
			my_size.css("width", param.width);
			my_size.css("height", param.height);

			var cpt = defaults.buttons.length;
			for(var i=0;i<cpt; i++){
				for (var j = 0; j < cmp.length; j++) {
					if (cmp[j].key == param.buttons[i]) {
						param.buttons[i] = my_size.after(cmp[j].value);
						if (cmp[j].exec_func !== false) {
							cmp[j].exec_func(param.buttons[i]);
						}
					}
				}
			}
		});
		if (typeof(localStorage.ok) !== "undefined") {
			var ls = JSON.parse(localStorage.ok);
			my_size.html(ls);
		}
		setInterval(function(){
			localStorage.setItem('ok', JSON.stringify($('#size').html()));
		}, 60000);
	};
})(jQuery);