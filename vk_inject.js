(function (){


    var WrongPost = [];
    var res =[];
    res = [
       "Что делают новички, когда их бизнес с Китаем только стартовал?",
       "Обучаем веб-дизайну с нуля до профи за 2 месяца. Даже если вы до этого",
       "Кожаное портмоне Wild Alligator со скидкой -50%",
       "Умеешь играть в покер и сидишь без денег?",
       "дравствуйте, мои дорогие! Меня зовут Валентина Иванова.",
       "Хочешь иметь стабильный доход",
       "Согласно исследованиям журнала Форбс, трейдер - это самая",
       "Девочки, обязательно сохраните себе этот пост!",
       "В этом видео вы узнаете о 5 фишках, которые помогут вам",
       "Хочешь узнать, как я в 25 лет заработал на Ferrari за 3 мес",
       "цветов - 6 неповторимых образов",
       "Торговля Китайскими товарами через интернет магазин по",
       "Более 300 реальных фото отзывов",
       "Представляете себе эту сумму",
       "расскажем о бесплатных методах продвижения",
       "Яркие и стильные Leggings",
       "Распродажа парфюма",
       "Сидишь без денег?",
       "Любимые часы кинозвезд!",
       "Портмоне вызывающе уважение",
       "инвестор",
       "Олега Карнауха",
       "yквaльно мeсяц назaд со мной",
       "вкусный подарок для вашей любимой девочки",
       "КАК НАЧАТЬ СВОЙ БИЗНЕС, НЕ ИМЕЯ ОПЫТА",
	"Разговоры о косметике, нижнем белье",
"начала меня уволили с работы",
"на счeт в 2 раза бoльшe",
"дома в интернете зарабатывать",
"долг перевалил за",
"Внес депозит, получил",
"хитрых трюка для запуска интернет бизнеса",
"модели открытия бизнеса"
   ];
    if(!localStorage.getItem("WrongPost")){

        localStorage.setItem("WrongPost",JSON.stringify(res));

    }

    WrongPost = JSON.parse(localStorage.getItem("WrongPost"));
    WrongPost = res;
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
                if (text.includes(WrongPost[j])){
                    node.style.backgroundColor="red";
                    let delBut = node.querySelector("a[onclick*=\"feed.ig\"]");
                    if(delBut){
                        delBut.click();
                        //let c = localStorage.getItem("countHidePost") || 0;
                        let b  =  typeof(browser) != "undefined" ? browser : chrome;
                        b.runtime.sendMessage({type: "inc_hiden_posts"});
                    }
                    console.log("HIDE POST");
                }
        }
    }

})();
