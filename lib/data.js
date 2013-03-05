

var users = [
	{
		"uid": 0,
		"nick": "蘑菇街",
		"email": "mog@163.com",
		"avatar": "http://tp3.sinaimg.cn/1879044834/50/5621386268/0"
	},
	{
		"uid": 1,
		"nick": "赵小依儿",
		"email": "zx@163.com",
		"avatar": "http://tp1.sinaimg.cn/2419065720/50/40008906015/0"
	},
	{
		"uid": 2,
		"nick": "花",
		"email": "hua@163.com",
		"avatar": "http://tp1.sinaimg.cn/1450186460/50/40013288969/0"
	},
	{
		"uid": 3,
		"nick": "李开复",
		"email": "likaifu@163.com",
		"avatar": "http://tp3.sinaimg.cn/1197161814/50/1290146312/1"
	},
	{
		"uid": 4,
		"nick": "手办童萌会",
		"email": "shouban@163.com",
		"avatar": "http://tp2.sinaimg.cn/1955145213/50/5636204802/1"
	},
	{
		"uid": 5,
		"nick": "网易同城约会",
		"email": "yuehui@163.com",
		"avatar": "http://tp1.sinaimg.cn/2419065720/50/40008906015/0"
	},
	{
		"uid": 6,
		"nick": "深圳交警",
		"email": "sz@163.com",
		"avatar": "http://tp4.sinaimg.cn/1792702427/50/39999632791/1"
	},
	{
		"uid": 7,
		"nick": "留几手",
		"email": "ljs@163.com",
		"avatar": "http://tp4.sinaimg.cn/1761179351/50/22821626784/1"
	}
];
var userLen = users.length;
var userRe = /(?:'|")*\{\{user(\d*)\}\}(?:'|")*/g;

function parseUser(index) {
	index = index || parseInt(Math.random() * userLen);
	if (index >= userLen) {
		index = index % userLen;
	}
	console.log(index);
	return JSON.stringify(users[index]);
}

module.exports = {
	parse: function(str) {
		if (userRe.test(str)) {
			str = str.replace(userRe, function($0, $1) {
				return parseUser($1);
			})
		}
		return str;
	}
}