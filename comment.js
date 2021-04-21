var named;

function delete1(id) {
	localStorage.removeItem(id);
	this.Storage.writeData();
}

function prom() {

	var name = prompt("please enter your name", ""); 
	named = name;
	if (named) 

	{

		alert("welcome：" + name)
		document.getElementById("shangtian").style.display = "none";
		document.getElementById("ritian").value = named;

	} else {
		document.getElementById("ritian").value = "unknow";
	}

}
var Storage = {
	saveData: function() 
	{

		var data = document.querySelector("#post textarea");
		if (data.value != "") {
			var time = new Date().getTime() + Math.random() * 5; 
			if (named) {
				localStorage.setItem(time, data.value + "|" + named + "|" + this
			.getDateTime()); 
			} else {
				localStorage.setItem(time, data.value + "|" + "unknow" + "|" + this
			.getDateTime()); 
			}

			data.value = "";
			this.writeData();
		} else {
			alert("please enter your message");
		}
	},
	writeData: function() 
	{
		var dataHtml = "",
			data = "";
		for (var i = localStorage.length - 1; i >= 0; i--) 
		{
			data = localStorage.getItem(localStorage.key(i)).split("|");

			
				"</span><p><span class=\"msg\">" + data[0] +
				"<input style=\"float:right;border:none;border-radius:5px;\" id=\"clearBt\" type=\"button\" onclick=\"delete1(" +
				localStorage.key(i) + ");\" value=\"delete\"/>" + "</span></p>";
		}
		document.getElementById("comment").innerHTML = dataHtml;
	},
	clearData: function()
	{
		if (localStorage.length > 0) {
			if (window.confirm("After emptying, it cannot be restored. Are you sure to empty?")) {
				localStorage.clear();
				this.writeData();
			}
		} else {
			alert("There is no need to clear data！");
		}
	},
	getDateTime: function()
	{
		var isZero = function(num) {
			if (num < 10) {
				num = "0" + num;
			}
			return num;
		}

		var d = new Date();
		return d.getFullYear() + "-" + isZero(d.getMonth() + 1) + "-" + isZero(d.getDate()) + " " + isZero(d
			.getHours()) + ":" + isZero(d.getMinutes()) + ":" + isZero(d.getSeconds());
	}
}

window.onload = function() {
	Storage.writeData();
	document.getElementById("postBt").onclick = function() {
		Storage.saveData();
	} 
	document.getElementById("clearBt").onclick = function() {
		Storage.clearData();
	} 
}
