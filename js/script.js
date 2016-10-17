

function makeArray(text){
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
function put_task(task){
	
	console.log("task="+task);
	$(".word").text(task.translation);
	$(".answer_form").attr("disabled",false);
	$(".button_submit").click(function(){
		$(".answer_form").attr("disabled",true);
		
		var answer = $(".answer_form").val();
		console.log(answer);
		if ($.trim(answer)==task.word){
			$(".word").removeClass("label-default");
			$(".word").addClass("label-success");
			$(".button_next").attr("disabled",false);
			return true;
		}
		else {
			$(".word").removeClass("label-default");
			$(".word").addClass("label-danger");
			$(".button_next").attr("disabled",false);
			$(".answer").show();
			$(".answer").text(task.word+" - "+task.translation);
			return false;
		}
		
	});
}

var main = function () {
	var i = 0;
	var score = [];
	var task_array;
	$(".button_start").click(function(){
		task_array = makeArray($("textarea.main_input").val());
		$(".one").slideUp(400);
		$(".two").hide();
		$(".test").show();
		put_task(task_array[i]); //здесь array НЕ ОПРЕДЕЛЕН!
		i++;
		
	});
	$(".button_next").click(function(){
			console.log("i"+i);
			put_task(task_array[i]);
			i++;
		});
	

	

}
$(document).ready(main);