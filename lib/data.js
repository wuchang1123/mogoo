var data = {};
data.users = [
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
data.mos = [
	{
		"mid": 0,
		"title": "高达 78",
		"cover": "http://e.hiphotos.baidu.com/baike/s%3D220/sign=f40e3404279759ee4e5067c982fa434e/342ac65c103853430706d7289213b07ecb8088ea.jpg",
		"link": "/mos/1",
		"photoCount": 12,
		"user": "{{user}}"
	},
	{
		"mid": 1,
		"title": "高达678",
		"cover": "http://e.hiphotos.baidu.com/baike/s%3D220/sign=f40e3404279759ee4e5067c982fa434e/342ac65c103853430706d7289213b07ecb8088ea.jpg",
		"link": "/mos/1",
		"photoCount": 0,
		"user": "{{user1}}"
	},
	{
		"mid": 2,
		"title": "高达8678",
		"cover": "http://e.hiphotos.baidu.com/baike/s%3D220/sign=f40e3404279759ee4e5067c982fa434e/342ac65c103853430706d7289213b07ecb8088ea.jpg",
		"link": "/mos/1",
		"photoCount": 2,
		"user": "{{user2}}"
	},
	{
		"mid": 3,
		"title": "高达8678",
		"cover": "http://e.hiphotos.baidu.com/baike/s%3D220/sign=f40e3404279759ee4e5067c982fa434e/342ac65c103853430706d7289213b07ecb8088ea.jpg",
		"link": "/mos/1",
		"photoCount": 3,
		"user": "{{user3}}"
	},
	{
		"mid": 4,
		"title": "高达8678",
		"cover": "http://e.hiphotos.baidu.com/baike/s%3D220/sign=f40e3404279759ee4e5067c982fa434e/342ac65c103853430706d7289213b07ecb8088ea.jpg",
		"link": "/mos/1",
		"photoCount": 4,
		"user": "{{user2}}"
	},
	{
		"mid": 5,
		"title": "高达8678",
		"cover": "http://e.hiphotos.baidu.com/baike/s%3D220/sign=f40e3404279759ee4e5067c982fa434e/342ac65c103853430706d7289213b07ecb8088ea.jpg",
		"link": "/mos/1",
		"photoCount": 5,
		"user": "{{user2}}"
	},
	{
		"mid": 6,
		"title": "高达8678",
		"cover": "http://e.hiphotos.baidu.com/baike/s%3D220/sign=f40e3404279759ee4e5067c982fa434e/342ac65c103853430706d7289213b07ecb8088ea.jpg",
		"link": "/mos/1",
		"photoCount": 6,
		"user": "{{user2}}"
	},
	{
		"mid": 7,
		"title": "高达8678",
		"cover": "http://e.hiphotos.baidu.com/baike/s%3D220/sign=f40e3404279759ee4e5067c982fa434e/342ac65c103853430706d7289213b07ecb8088ea.jpg",
		"link": "/mos/1",
		"photoCount": 7,
		"user": "{{user2}}"
	},
	{
		"mid": 8,
		"title": "高达8678",
		"cover": "http://img6.cache.netease.com/photo/0031/2013-03-18/8Q8P008V025D0031.jpg",
		"link": "/mos/1",
		"photoCount": 8,
		"user": "{{user2}}"
	},
	{
		"mid": 9,
		"title": "高达8678",
		"cover": "http://h.hiphotos.baidu.com/baike/s%3D220/sign=2c8bc71e6b600c33f479d9ca2a4d5134/4a36acaf2edda3cc3b31bc2a01e93901203f92e6.jpg",
		"link": "/mos/1",
		"photoCount": 2,
		"user": "{{user9}}"
	},
	{
		"mid": 10,
		"title": "高达8678",
		"cover": "http://f.hiphotos.baidu.com/baike/s%3D220/sign=aa367e2ec93d70cf48faad0fc8dcd1ba/d043ad4bd11373f0570a4388a40f4bfbfbed04eb.jpg",
		"link": "/mos/1",
		"photoCount": 2,
		"user": "{{user10}}"
	}
];

var allRe = /(?:'|")*\{\{([a-zA-Z]+)(\d*)\}\}(?:'|")*/g;
function parseAll(key, index) {
	var all = data[key + "s"] || null,
		len = all && all.length || 0;
	index = index || parseInt(Math.random() * len);
	if (index >= len) {
		index = index % len;
	}
	//console.log(index);
	return all ? reParse(JSON.stringify(all[index])) : "null";
}
function reParse(str) {
	return str.replace(allRe, function($0, key, index) {
		//console.log(arguments);
		return parseAll(key, index);
	});
}

module.exports = {
	parse: function(str) {
		return reParse(str);
	}
}