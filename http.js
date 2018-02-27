var http = require('http');
var querystring = require('querystring');
var trustedDomains = 'http://localhost'; //跨域设置

http.createServer(function (req,res){
	if(req.method == "POST"){
		console.log('接受请求视频流输出.');
		var requrl = req.url.toString();
		requrl = requrl.split("/");
		vidno = requrl[1];
		var path = 'demo.mp4';
		var fs = require('fs');
		var rs = fs.createReadStream(path);
		var buf1;
		var util = require('util');
		const encoder = new util.TextEncoder();
		const uint8array = encoder.encode('player.mp4');
		console.log('输出流已就绪.');
		res.writeHead(200, { 'Content-Type': 'video/mpeg4',
			'Content-Length': "" + fs.statSync(path).size,
			'Content-Disposition':"attachment;filename=\""+uint8array+"\"",
			'Access-Control-Allow-Origin':trustedDomains
			});
		rs.on('data',function(chunk){
			buf1 = chunk;
			res.write(buf1);
		});
		rs.on('end',function(){
			res.end();
			console.log('输出流已完成.');
		});
	}
	else
	{
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end('Unsupported accessing.'); //阻止用GET方式访问
	}
}).listen(8080);
