var elem = document.getElementById('count');
var count = localStorage.getItem("countHidePost");
elem.innerText = parseInt(count||0);
