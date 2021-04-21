var named;

function delete1(id) {
	localStorage.removeItem(id);
	this.Storage.writeData();
}

function prom() {

	var name = prompt("please enter your name", ""); //将输入的内容赋给变量 name ，
	named = name;
	if (named) //如果返回的有内容

	{

		alert("welcome：" + name)
		document.getElementById("shangtian").style.display = "none";
		document.getElementById("ritian").value = named;

	} else {
		document.getElementById("ritian").value = "unknow";
	}

}
var Storage = {
	saveData: function() //保存数据
	{

		var data = document.querySelector("#post textarea");
		if (data.value != "") {
			var time = new Date().getTime() + Math.random() * 5; //getTime是Date对象中的方法，作用是返回 1970年01月01日至今的毫秒数
			if (named) {
				localStorage.setItem(time, data.value + "|" + named + "|" + this
			.getDateTime()); //将毫秒数存入Key值中，可以降低Key值重复率
			} else {
				localStorage.setItem(time, data.value + "|" + "unknow" + "|" + this
			.getDateTime()); //将毫秒数存入Key值中，可以降低Key值重复率
			}

			data.value = "";
			this.writeData();
		} else {
			alert("please enter your message");
		}
	},
	writeData: function() //输出数据
	{
		var dataHtml = "",
			data = "";
		for (var i = localStorage.length - 1; i >= 0; i--) //效率更高的循环方法
		{
			data = localStorage.getItem(localStorage.key(i)).split("|");

			
				"</span><p><span class=\"msg\">" + data[0] +
				"<input style=\"float:right;border:none;border-radius:5px;\" id=\"clearBt\" type=\"button\" onclick=\"delete1(" +
				localStorage.key(i) + ");\" value=\"删除\"/>" + "</span></p>";
		}
		document.getElementById("comment").innerHTML = dataHtml;
	},
	clearData: function() //清空数据
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
	getDateTime: function() //获取日期时间
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
	Storage.writeData(); //当打开页面的时候，先将localStorage中的数据输出一边，如果没有数据，则输出空
	document.getElementById("postBt").onclick = function() {
		Storage.saveData();
	} //发表评论按钮添加点击事件，作用是将localStorage中的数据输出
	document.getElementById("clearBt").onclick = function() {
		Storage.clearData();
	} //清空所有已保存的数据
}
