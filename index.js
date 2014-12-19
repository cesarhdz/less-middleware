
var less = require('less'),
	fs = require('fs');



module.exports = function(){

	this.middleware = function(dir, config){
		return function(req, res, next){

			// Se busca dentro del app
			var file =  dir + (req.params[0] || 'index') + '.less'

			// Si no hay archivo continuamos
			if(! fs.existsSync(file)) return next()

			var 
			css,
			data = fs.readFileSync(file),
			options = {
					filename: file
				}

			less.render(data.toString(), options, function(e, result){
				if(e){
					var util = require('util')
					css = fs.readFileSync(__dirname + '/css/less-error.css').toString();
					css = util.format(css, e.message, e.filename, e.line)
				}else{
					css = result.css
				}

				res.contentType("text/css")
				res.send(css, 200)
			})
		}
	}
|

}

