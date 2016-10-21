$("textarea.main_input").keyup(function(){ //пока нет текста кнопка не работает
		var empty=true;
		if ($(".main_input").val() == "") empty=false;
			else empty = true;
		if (empty) $(".button_start").prop("disabled",false);
			else $(".button_start").prop("disabled",true);
	});

function makeArray(text){ 
//извлекаем из поля текст и разбиваем его на объекты
	var arr = [];

	var last = 0;console.log(text.length);

	for (var i = 0; i < text.length; i++) {
		console.log(i);
		if (i != text.length){
			if (text[i] == "-" || text[i] == ":"){
				console.log("rerere");
				var word = $.trim(text.substring(last,i).toLowerCase());
				console.log("word="+word);
				
				//task.word = word;
				var dash = i+1;
				var j = i+1;
				while (j != text.length){
					if (text[j] == ';' || text[j] == ','){
						var translation = $.trim(text.substring(dash,j).toLowerCase());
						console.log("translation="+translation);
					//	task.translation = translation;
					arr.push({
								'word': word,
								'translation': translation
					});
						last = j+1;
						break;
					} else j++;
				}
			} else continue;
		} 
	}
	return arr;
	
}

var right = 0;
var wrong = [];
var task_array;
var main = function () {
	var i = 0;
	//$(".button_restart").prop("disabled",false);
	
	var split;
	var current_progress = 0;

	
	$(".button_start").click(function(){
		task_array = makeArray($("textarea.main_input").val());
		if (task_array.length != 0){
		$(".progress").show();
		split = 100 / task_array.length;
		$(".one").slideUp(400); //убираем описание
		$(".two").hide(); //убираем поле ввода
		$(".test").show(); //показываем окно тестирования
		$(".word").text(task_array[i].translation);
	} else alert("You put something wrong!")
	});



	
	$(".button_next").click(function(){
		i++;
		current_progress=current_progress+split;
		$(".progress-bar").css("width",current_progress+"%");
		if (i != task_array.length){
			$(".button_next").attr("disabled",true);
			console.log("current_progress="+current_progress);
			$(".word").text(task_array[i].translation);
			$(".answer_form").attr("disabled",false);
			$(".answer_form").val("");
			
			set_color_default();
		} else {
			game_over();

		}
	});
	
	$(".button_submit").click(function(){

		$(".answer_form").attr("disabled",true);
		var answer = $(".answer_form").val();
		if ($.trim(answer)==task_array[i].word){
			set_color_green();
			$(".button_next").attr("disabled",false);
			right++;
		}
		else {
			set_color_red();
			$(".button_next").attr("disabled",false);
			$(".answer").show();
			$(".answer").text(task_array[i].word+" - "+task_array[i].translation);
			wrong.push(task_array[i]);
		}
	});
	$(".button_restart").click(function(){
		new main;
	});
}
function set_color_default(){
	$(".word").removeClass("label-danger");
	$(".word").removeClass("label-success");
	$(".word").addClass("label-default");
}
function set_color_red(){
	$(".word").removeClass("label-default");
		$(".word").addClass("label-danger");
}
function set_color_green(){
	$(".word").removeClass("label-default");
	$(".word").addClass("label-success");
}

function game_over(){
	$(".test").hide();
	$(".game_over").show();
	$("<h1>").text(right+" correct answers out of "+task_array.length+".").appendTo(".game_over");
	$("<h2>").text("Wrong answers:").appendTo(".game_over");
	for (var i = 0; i < wrong.length; i++) {
		$("<h4>").text(wrong[i].word+" - "+wrong[i].translation).appendTo(".game_over");
	}
	$("<form>").addClass("form-inline").appendTo(".game_over");

	$("<button>").addClass("btn btn-success button_restart").text("Try again").appendTo(".form-inline");
	$("<h3>").text("For new input text reload the page.").appendTo(".form-inline");


}
$(document).ready(new main());
$(document).ready(function(){
	
		
});