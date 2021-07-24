(function (){


    var WrongPost = [];

	var b  =  typeof(browser) != "undefined" ? browser : chrome;

	// отправка
	b.runtime.sendMessage({type: "get_storage",tab:true});
	// слушатель
	b.runtime.onMessage.addListener(function (request, sender, sendResponse)
	{//debugger;
		switch (request.type) {
			case "response_get_storage":
			{
				
				WrongPost = request.posts || [];
				break;
			}
		}
	});

	

	// Создадим observer для нотификаций о создании новых элементов на странице
	var listObserver = new MutationObserver(elementAdded);
	// и следим за body, когда новые списки аудиозаписей добавятся
	listObserver.observe(document.body, {childList: true, subtree: true});
var count = 0;
	// вызывается при любой модификации DOM страницы
	function elementAdded(mutations)
	{

		for (var i = 0; i < mutations.length; i++)
		{
			var added = mutations[i].addedNodes;
			// просмотрим добавленные элементы на предмет списка аудиозаписей
			for (var j = 0; j < added.length; j++)
			{

				findAudioLists(added[j]);
			}
		}
	}

	// рекурсивная функция проходит по добавленным элементам и ищет в них списки аудиозаписей
	function findAudioLists(node)
	{
		if (node.id)	// у списка должно быть id
		{
			/*for (var i = 0; i < list_ids.length; i++)	// смотрим, совпадает ли id с искомыми
			{
				if (list_ids[i] == node.id)
				{
					listFound(node);
					return;	// не будем искать внутри уже найденного списка
				}
			}*/

				if (node.classList.contains('post'))
				{

					checkContent(node);
					return;
				}

		}
		// пройдемся по дереву добавленного элемента
		var child = node.firstElementChild;
		while (child)
		{
			findAudioLists(child);	// вызываем рекурсивно для всех дочерних элементов
			child = child.nextElementSibling;
		}
	}

    function checkContent(node){

        //debugger;
        var contentNode = node.getElementsByClassName("wall_post_text");
        for(var i =0; i< contentNode.length; i++){
            var text = contentNode[0].innerText;

            for(var j = 0; j< WrongPost.length;j++)
                if (text.includes(WrongPost[j].content)){
                    node.style.backgroundColor="red";
                    let delBut = node.querySelector("a[onclick*=\"feed.ig\"]");
                    if(delBut){
                        delBut.click();
                        //let c = localStorage.getItem("countHidePost") || 0;
                        
						b.runtime.sendMessage({type: "inc_hiden_posts"});
						console.log("Hidded  POST "+WrongPost[j].content);
					}
					if(WrongPost[j].isDeletePost){
						let delPost = node.querySelector("a[onclick*=\"wall.deletePost\"]");
						if(delPost){
							delPost.click();
							//let c = localStorage.getItem("countHidePost") || 0;
							
							b.runtime.sendMessage({type: "inc_delete_posts"});
						}
						console.log("Deleted  POST "+WrongPost[j].content);
					}
                    
					return;
                }
        }
    }

})();
