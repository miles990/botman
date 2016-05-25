
module.exports = function(robot){

	var cmdDic = {};
	cmdDic["version"] = {"info":"列出版本號"};
	cmdDic["author"] = {"info":"列出作者"};
	cmdDic["help"] = {"info":"hubot相關文件"};
	cmdDic["list"] = {"info":"列出所有指令"};
	cmdDic["ansible"] = {"info":"執行ansible"};
	cmdDic["http"] = {"info":"Making HTTP calls"}
	cmdDic["demo"] = {"info":"各種Demo筆記"}

	robot.respond(/cmd (.*)/i, function(res){
		cmd = res.match[1];
		if(cmd === "version"){
			res.reply("version 1.0.0");
		}else if(cmd === "author"){
			res.reply("AlexLee");
		}else if(cmd === "help"){
			res.reply("https://github.com/github/hubot/blob/master/docs/scripting.md");
		}else if(cmd === "list"){
			var str = "\n";
			for(prop in cmdDic){
				str += "[cmd "+prop+"] "+ cmdDic[prop].info +"\n";
			}
			res.reply(str);
		}else if(cmd === "ansible"){
			var spawn = require('child_process').spawn;
			var ls = spawn('ansible',['-i','/Users/AlexLee/ansible-nodejs/hosts','all','-m','raw','-a','uname -a']);
			ls.stdout.on('data', function(data){
				res.reply("stdout:"+data);
			});
			ls.stderr.on('data', function(data){
				res.reply("stderr:"+data);
			})
		}else if(cmd === "http"){
			res.http('http://andymatthews.net/code/deepthoughts/get.cfm').get()(function(error, response, body) {
		      return res.reply(body);
		    });
		}else if(cmd === "demo"){
			res.reply("nodejs addon => "+"https://github.com/miles990/nodejs-addon-example.git");
		}else{
			res.reply("無此指令 ["+cmd+"]");
		}
	});

	robot.respond(/hello/i, function(res){
		res.reply("world");
	});
	
	// Hearing and responding
	robot.hear(/badger/i, function(res){
		res.send("Badgers? BADGERS? WE DON'T NEED NO STINKIN BADGERS");
	});

	robot.respond(/open the pod bay doors/i, function(res){
		res.reply("I'm afraid I can't let you do that.");
	});

	robot.hear(/I like pie/i, function(res){
		res.emote("makes a freshly baked pie");
	});

	// robot.enter();

	// robot.leave();

	// robot.topic();

	// robot.catchAll();
}