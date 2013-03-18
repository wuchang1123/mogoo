/*
	velocity.js engine
*/
var config        = require('config'),
	pathFn        = require('path'),
	rootPath      = __dirname.replace(/\/lib\/views$/, ""),
	fs            = require('fs'),
	exists        = fs.existsSync || pathFn.existsSync,
	Velocity      = require(rootPath + '/node_modules/velocityjs/src/velocity.js'),
	macros        = require('./velocity-macros'),
	viewsPath     = rootPath + "/" + config.view.tplPath,
	layoutPath    = viewsPath + "/layout",
	defaultLayout = config.view.layout || "main.vm",
	layoutCache   = {},
	vmtplCache;

exports.cache = {};

exports.Parser  = Velocity.Parser;

exports.Compile = Velocity.Compile;

exports.Helper  = Velocity.Helper;

exports.Jsonify = Velocity.Helper.Jsonify;

/**
 * Compile a `Function` representation of the given jade `str`.
 *
 * Options:
 *
 *   - `compileDebug` when `false` debugging code is stripped from the compiled template
 *   - `client` when `true` the helper functions `escape()` etc will reference `jade.escape()`
 *      for use with the Jade client-side runtime.js
 *
 * @param {String} str
 * @param {Options} options
 * @return {Function}
 * @api public
 */

exports.compile = function(str, options){
	var options  = options || {},
		filename = options.filename ? JSON.stringify(options.filename) : 'undefined',
		
		asts     = exports.Parser.parse(str),
		compile  = new exports.Compile(asts);
	console.log(macros);
	return function(locals){
		return compile.render(locals, macros);
	};
};

/**
 * Render the given `str` of jade and invoke
 * the callback `fn(err, str)`.
 *
 * Options:
 *
 *   - `cache` enable template caching
 *   - `filename` filename required for `include` / `extends` and caching
 *
 * @param {String} str
 * @param {Object|Function} options or callback
 * @param {Function} callback
 * @api public
 */

exports.render = function(str, options, callback){
	// swap args
	if ('function' == typeof options) {
		callback = options;
		options = {};
	}
	
	// cache requires .filename
	if (options.cache && !options.filename) {
		return callback(new Error('the "filename" option is required for caching'));
	}
	
	try {
		var path = options.filename;
		var tmpl = options.cache
						? exports.cache[path] || (exports.cache[path] = exports.compile(str, options))
						: exports.compile(str, options);
		callback(null, tmpl(options));
	} catch (err) {
		callback(err);
	}
};

/**
 * Render a Jade file at the given `path` and callback `fn(err, str)`.
 *
 * @param {String} path
 * @param {Object|Function} options or callback
 * @param {Function} callback
 * @api public
 */

exports.renderFile = function(path, options, callback){
	var key = path + ':string';
	if ('function' == typeof options) {
		callback = options;
		options = {};
	}
	try {
		options.filename = path;
		var layoutStr;
		var str = options.cache
					? exports.cache[key] || (exports.cache[key] = fs.readFileSync(path, 'utf8'))
					: fs.readFileSync(path, 'utf8'),
			strArr,
			reLayout = /\#set\(\$layout\=['"]([^'"]+)['"]\)[\r\n\t\s]*/;
		if (/\#set\(\$layout\=['"]([^'"]+)['"]\)/.test(str)) {
			strArr = str.split(reLayout);
			//console.log(strArr);
			str = str.replace(reLayout, function($0, $1) {
				var layPath = pathFn.join(layoutPath, $1.replace(/(.+)(\.vm)*$/, "$1\.vm"));
				layoutStr = layoutCache[$1] = options.cache && layoutCache[$1] || fs.readFileSync(layPath, 'utf8');
				layoutStr && (layoutStr = replaceParse(layPath, layoutStr));
				return "";
			});
			str = layoutStr.replace("$layoutContent", strArr[2]).replace("$layoutConfig", strArr[0]);
		}
		/*
		if (options.layout !== false) {
			layoutCache = layoutStr = options.cache ? layoutCache : fs.readFileSync(pathFn.join(layoutPath, defaultLayout), 'utf8');
			str = layoutCache.replace("$layoutContent", str)
		}*/
		str = replaceParse(path, str);
		exports.render(str, options, callback);
	} catch (err) {
		callback(err);
	}
};

function replaceParse(path, str) {
	return str.replace(/#parse\(['"]([^'"]+)['"]\)/g, function($0, parsePath){
		parsePath = pathFn.resolve(pathFn.dirname(path), parsePath);
		var tmp = fs.readFileSync(parsePath, 'utf8');
		return replaceParse(parsePath, tmp);
	});
}

/**
 * Express support.
 */

exports.__express = exports.renderFile;

exports.replaceParse = replaceParse;

exports.buildAst = function(tplPath, files, dontWrite) {
	var tpls = [];
	vmtplCache = vmtplCache || fs.readFileSync(rootPath + "/lib/views/velocity-tpl.js", 'utf8');
	//console.log(vmtplCache);
	files.forEach(function(file){
		if (pathFn.extname(file) === '.vm') {
			console.log('read file ' + file);
			var template = vmtplCache;
			var str      = fs.readFileSync(tplPath + '/' + file).toString();
			str = str && replaceParse(tplPath + '/' + file, str) || "";
			var asts     = exports.Parser.parse(str);
			var jsPath   = tplPath + '/' + file.replace('.vm', '.js');
			asts.forEach(function(ast, i){
				if (ast.id && ast.id === "parse" && ast.type === 'macro_call') {
					var arg = ast.args[0];
					asts[i] = "{del}require('" + arg.value.replace('.vm', '') + "'){del}";
				}
			});
			template = template.replace('{content}', JSON.stringify(asts, null, 2));
			template = template.replace(/["']\{del\}/g, '');
			template = template.replace(/\{del\}["']/g, '');
			
			var name = '["' + file.replace(/^.*templates\//, '').replace(/\.vm$/, '') + '"]';
			template = template.replace('{name}', name);
			
			dontWrite != true && fs.writeFileSync(jsPath, template);
			tpls.push(template);
		}
	});
	if (dontWrite) {
		return tpls;
	}
}