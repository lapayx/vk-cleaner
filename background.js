function checkURL(tabID, changeInfo, tab){
	// If it satisfies the criteria (the URL containing 'www.opera.com')
    chrome.pageAction.show(tabID);
	if (tab.url.indexOf('vk') > -1) {
		// Shows the page action
		chrome.pageAction.show(tabID);
	}
}
chrome.tabs.onUpdated.addListener(checkURL);


// отправка
//chrome.extension.sendMessage({type: "render_output", msg: request.msg});
// слушатель
chrome.extension.onMessage.addListener(function (request, sender, sendResponse)
{
//    console.log(request);
  switch (request.type) {
    case "request_count_hiden_posts":
    {
      let count = localStorage.getItem("countHidePost") | 0;
      chrome.extension.sendMessage({type: "response_count_hiden_posts", count:count});
      break;
  }
      case "inc_hiden_posts":
      {
        let count = localStorage.getItem("countHidePost") | 0;
        localStorage.setItem("countHidePost",count +1);

        break;
        }
    }
});
