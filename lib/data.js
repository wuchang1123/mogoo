var data = {};
data.users = [
	{
		"uid": 0,
		"nick": "蘑菇街",
		"email": "mog@163.com",
		"link": "/users/0",
		"avatar": "http://tp3.sinaimg.cn/1879044834/50/5621386268/0"
	},
	{
		"uid": 1,
		"nick": "赵小依儿",
		"email": "zx@163.com",
		"link": "/users/1",
		"avatar": "http://tp1.sinaimg.cn/2419065720/50/40008906015/0"
	},
	{
		"uid": 2,
		"nick": "花",
		"email": "hua@163.com",
		"link": "/users/2",
		"avatar": "http://tp1.sinaimg.cn/1450186460/50/40013288969/0"
	},
	{
		"uid": 3,
		"nick": "李开复",
		"email": "likaifu@163.com",
		"link": "/users/3",
		"avatar": "http://tp3.sinaimg.cn/1197161814/50/1290146312/1"
	},
	{
		"uid": 4,
		"nick": "手办童萌会",
		"email": "shouban@163.com",
		"link": "/users/4",
		"avatar": "http://tp2.sinaimg.cn/1955145213/50/5636204802/1"
	},
	{
		"uid": 5,
		"nick": "网易同城约会",
		"email": "yuehui@163.com",
		"link": "/users/5",
		"avatar": "http://tp1.sinaimg.cn/2419065720/50/40008906015/0"
	},
	{
		"uid": 6,
		"nick": "深圳交警",
		"email": "sz@163.com",
		"link": "/users/6",
		"avatar": "http://tp4.sinaimg.cn/1792702427/50/39999632791/1"
	},
	{
		"uid": 7,
		"nick": "留几手",
		"email": "ljs@163.com",
		"link": "/users/7",
		"avatar": "http://tp4.sinaimg.cn/1761179351/50/22821626784/1"
	}
];
data.mos = [
	{
		"mid": 0,
		"title": "高达 78",
		"cover": "http://c8.imimg.cn/zp/z1/T1Y8ETBTYT1RCvBVdK.222.148.jpg",
		"link": "/mos/1",
		"photoCount": 12,
		"createTime": 1363596146151,
		"user": "{{user}}",
		"shop": "{{shop}}"
	},
	{
		"mid": 1,
		"title": "高达678",
		"cover": "http://c5.imimg.cn/zp/z1/T194ETBCVT1RCvBVdK.222.222.jpg",
		"link": "/mos/1",
		"photoCount": 0,
		"createTime": 1363596146151,
		"user": "{{user1}}",
		"shop": "{{shop}}"
	},
	{
		"mid": 2,
		"title": "高达8678",
		"cover": "http://c0.imimg.cn/zp/z1/T1gXWTBTKT1RCvBVdK.222.333.jpg",
		"link": "/mos/1",
		"photoCount": 2,
		"createTime": 1363596146151,
		"user": "{{user2}}",
		"shop": "{{shop}}"
	},
	{
		"mid": 3,
		"title": "高达8678",
		"cover": "http://c5.imimg.cn/zp/z1/T11FWTByZg1RCvBVdK.222.140.jpg",
		"link": "/mos/1",
		"photoCount": 3,
		"createTime": 1363596146151,
		"user": "{{user3}}",
		"shop": "{{shop}}"
	},
	{
		"mid": 4,
		"title": "高达8678",
		"cover": "http://c6.imimg.cn/zp/z1/T1zzWTBTCT1RCvBVdK.222.347.jpg",
		"link": "/mos/1",
		"photoCount": 4,
		"createTime": 1363596146151,
		"user": "{{user4}}",
		"shop": "{{shop}}"
	},
	{
		"mid": 5,
		"title": "高达8678",
		"cover": "http://c7.imimg.cn/zp/z1/T1rNWTB4Ej1RCvBVdK.222.382.jpg",
		"link": "/mos/1",
		"photoCount": 5,
		"createTime": 1363596146151,
		"user": "{{user5}}",
		"shop": "{{shop}}"
	},
	{
		"mid": 6,
		"title": "高达8678",
		"cover": "http://c9.imimg.cn/zp/z1/T1zzWTB7bT1RCvBVdK.222.317.jpg",
		"link": "/mos/1",
		"photoCount": 6,
		"createTime": 1363596146151,
		"user": "{{user6}}",
		"shop": "{{shop}}"
	},
	{
		"mid": 7,
		"title": "高达8678",
		"cover": "http://b.imimg.cn/ad/2013/02/1361845111646.220.300.jpg",
		"link": "/mos/1",
		"photoCount": 7,
		"createTime": 1363596146151,
		"user": "{{user7}}",
		"shop": "{{shop}}"
	}
];
data.shops = [
	{
		"sid": 0,
		"en": "taobao",
		"name": "淘宝",
		"link": "http://item.taobao.com/item.htm?id=20076416459",
		"price": "300.00"
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
	//console.log(key, index);
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