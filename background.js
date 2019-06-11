var brows  =  typeof(browser) != "undefined" ? browser : chrome;

function checkURL(tabID, changeInfo, tab){
	// If it satisfies the criteria (the URL containing 'www.opera.com')
    //b.pageAction.show(tabID);
	if (tab.url.indexOf('vk') > -1) {
		// Shows the page action
		brows.pageAction.show(tabID);
	}
}
brows.tabs.onUpdated.addListener(checkURL);


// отправка
//chrome.extension.sendMessage({type: "render_output", msg: request.msg});
// слушатель
brows.runtime.onMessage.addListener(function (request, sender, sendResponse)
{

//    console.log(request);
	switch (request.type) {
		case "request_count_hiden_posts":
		{
			let count = localStorage.getItem("countHidePost") || 0;
			brows.runtime.sendMessage({type: "response_count_hiden_posts", count:count});
			break;
		}
		case "get_storage":
		{
			let postsRaw = localStorage.getItem("HidePost") || "[]";
			let posts = JSON.parse(postsRaw);
			
			if(!!request.tab){
			
				brows.tabs.query({active: true, currentWindow: true}, function(tabs) {
				  chrome.tabs.sendMessage(tabs[0].id, {type: "response_get_storage", posts:posts});
				});
			} else {
				brows.runtime.sendMessage({type: "response_get_storage", posts:posts});
			}

			break;
		}
		case "inc_hiden_posts":
		{
			let count = parseInt(localStorage.getItem("countHidePost") || 0);
			localStorage.setItem("countHidePost",count +1);
			break;
		}
		case "delete_hiden_posts":
		{
			let postsRaw = localStorage.getItem("HidePost") || "[]";
			let old = JSON.parse(postsRaw);
			let posts = [];
			for(let i = 0; i < old.length; i++){
				if(i == request.id )
					continue;
				posts.push(old[i]);
			};
			localStorage.setItem("HidePost",JSON.stringify(posts));
			
		
			
			brows.tabs.query({active: true, currentWindow: true}, function(tabs) {
			  chrome.tabs.sendMessage(tabs[0].id, {type: "response_get_storage", posts:posts});
			});
	
			brows.runtime.sendMessage({type: "response_get_storage", posts:posts});
			
			break;
		}
		case "add_hiden_posts":
		{
			let postsRaw = localStorage.getItem("HidePost") || "[]";
			let posts = JSON.parse(postsRaw);
			posts.push(request.text);
			localStorage.setItem("HidePost",JSON.stringify(posts));
			
		
			
			brows.tabs.query({active: true, currentWindow: true}, function(tabs) {
			  chrome.tabs.sendMessage(tabs[0].id, {type: "response_get_storage", posts:posts});
			});
	
			brows.runtime.sendMessage({type: "response_get_storage", posts:posts});
			
			break;
		}
	}
});


brows.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
		if (!localStorage.getItem("HidePost")){
			let posts = [
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
				"азговоры о косметике, нижнем белье",
				"начала меня уволили с работы",
				"на счeт в 2 раза бoльшe",
				"дома в интернете зарабатывать",
				"долг перевалил за",
				"Внес депозит, получил",
				"хитрых трюка для запуска интернет бизнеса",
				"модели открытия бизнеса",
				"рублей за день!"
			];
			localStorage.setItem("HidePost",JSON.stringify(posts));
		}
        
    }else if(details.reason == "update"){
        var thisVersion = brows.runtime.getManifest().version;
       // console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
	
	if (!localStorage.getItem("HidePost")){
			let posts = [
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
				"азговоры о косметике, нижнем белье",
				"начала меня уволили с работы",
				"на счeт в 2 раза бoльшe",
				"дома в интернете зарабатывать",
				"долг перевалил за",
				"Внес депозит, получил",
				"хитрых трюка для запуска интернет бизнеса",
				"модели открытия бизнеса",
				"рублей за день!"
			];
			localStorage.setItem("HidePost",JSON.stringify(posts));
		}
		
});
