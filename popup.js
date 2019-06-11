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
      
      /*
       <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                        </tr>*/

        for(let i = 0; i<request.posts.length;i++){
      let item =document.createElement("tr");
      let d1 = document.createElement("td");
      d1.textContent = request.posts[i];
      
      let d2 = document.createElement("td");
       d2.classList.add("text-center");
       d2.classList.add("align-middle");
      //d2.textContent = request.posts[i];
//<button type="button" class="btn btn-dark">Dark</button>
      let del = document.createElement("button");
      del.classList.add('btn');
      del.classList.add('btn-danger')
      del.classList.add('btn-sm')
			del.textContent="X";
			del.onclick = function(){
				//alert(i);
				b.runtime.sendMessage({type: "delete_hiden_posts",id:i});
			};
      d2.appendChild(del);
      item.appendChild(d1);
      item.appendChild(d2);
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
