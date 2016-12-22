(function (){
var b  =  typeof(browser) != "undefined" ? browser : chrome;

// отправка
b.runtime.sendMessage({type: "request_count_hiden_posts"});
// слушатель
b.runtime.onMessage.addListener(function (request, sender, sendResponse)
{
  switch (request.type) {
    case "response_count_hiden_posts":
        var elem = document.getElementById('count');
        var count = localStorage.getItem("countHidePost");
        elem.textContent = parseInt(request.count||0);
      break;
  }
});
/*


var elem = document.getElementById('count');
var count = localStorage.getItem("countHidePost");
elem.innerText = parseInt(count||0);
*/
})();
