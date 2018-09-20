var questionClicked = document.querySelectorAll('.question-hyperlink');
var upVotes = document.querySelectorAll('.vote-up-off');
var downVotes = document.querySelectorAll('.vote-down-off');
var askQuestion = document.querySelectorAll('.aside-cta');
var favourite = document.querySelectorAll('.star-off');


function eventClickReg(type,list){
	for(var i=0; i<list.length; i++){
		list[i].addEventListener('click',function(event){
			var clickData = this.textContent.trim();
			var requestData = type;
			if(type=='upVotes'||type=='questionClicked'){
				requestData += ";"+clickData;
			}
			console.log(clickData );
			console.log("clicked");
			chrome.runtime.sendMessage({'message':"EVENT_CLICK", 'data': requestData},function(response){
				console.log(response);
			})
		});
	}
}
eventClickReg('questionClicked',questionClicked);
//eventClickReg('upVotes',upVotes);
//eventClickReg('downVotes',downVotes);
eventClickReg('askQuestion',askQuestion);
//eventClickReg('favourite',favourite);
window.addEventListener('click',function(event){
	var targetElement = event.target || event.srcElement;
	console.log(targetElement.textContent);
	//submit button text context : Post Your Answer
	if(targetElement.textContent=='up vote'||targetElement.textContent=='down vote'||targetElement.textContent=='favorite' || targetElement.id == 'submit-button' ){
		var requestData = "";
		if(targetElement.textContent !== 'submit-button')
		{
			requestData = targetElement.textContent.trim();
		}
		else
		{
			requestData = 'submit-button';
		}
		chrome.runtime.sendMessage({'message':"EVENT_CLICK", 'data': requestData},function(response){
				console.log(response);
		});
	}
});
var count = 0;
window.addEventListener('scroll', function(e) {
	count++;
	if(count==50){
		console.log('scrolled');
		var requestData = 'scroll';
		chrome.runtime.sendMessage({'message':"EVENT_SCROLL", 'data': requestData},function(response){
			console.log(response);
		});
		count = 0;
	}
});

window.addEventListener('dblclick', function(e) {
	console.log('dbclick');
	var requestData = 'doubleclick';
	chrome.runtime.sendMessage({'message':"EVENT_DOUBLE_CLICK", 'data': requestData},function(response){
		console.log(response);
	})
});
