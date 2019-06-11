(function (){
var b  =  typeof(browser) != "undefined" ? browser : chrome;

// отправка
b.runtime.sendMessage({type: "request_count_hiden_posts"});
b.runtime.sendMessage({type: "get_storage"});
// слушатель
b.runtime.onMessage.addListener(function (request, sender, sendResponse)
{
  switch (request.type) {

    case "response_count_hiden_posts":{
	
        let elem = document.getElementById('count');
        elem.textContent = parseInt(request.count);
      break;
	}
	  case "response_get_storage":
	  {

        let elem = document.getElementById('post');
		while(elem.children.length>0){
		
			elem.children[0].remove();
		  }
        for(let i = 0; i<request.posts.length;i++){
			let item =document.createElement("p");
			item.textContent = request.posts[i];
			let del = document.createElement("button");
			del.textContent="X";
			del.onclick = function(){
				//alert(i);
				b.runtime.sendMessage({type: "delete_hiden_posts",id:i});
			};
			item.appendChild(del);
			elem.appendChild(item);
		}
      break;
	  }
  }
  
  
let newPostBut = document.getElementById('buttonNewPost');
newPostBut.onclick = function(){
	let val = document.getElementById('inputNewPost').value.trim();
	if(val.length <4){
		alert("Короткое имя, min 5");
		return;
	}
	b.runtime.sendMessage({type: "add_hiden_posts",text:val});
	document.getElementById('inputNewPost').value = "";
}


});

/*


var elem = document.getElementById('count');
var count = localStorage.getItem("countHidePost");
elem.innerText = parseInt(count||0);
*/
})();
