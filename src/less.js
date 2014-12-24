var less = require('less'),
	fs = require('fs');



module.exports = function LessCompiler(){


	this.config = {
		errorFile = __dirname + '/css/less-error.css'
	}

	this.middleware = function(dir, config){
		return function(req, res, next){

			// Se busca dentro del app
			var file =  dir + (req.params[0] || 'index') + '.less'

			// Si no hay archivo continuamos
			if(! fs.existsSync(file)) return next()

			var data = fs.readFileSync(file)


			this.process(data.toString, file, function(css){
				res.contentType('text/css')
				res.status(200).send(css)
			})
		}
	}


	/**
	 * wrapper of less render to make build and middleware compatible
	 *  even if an error ocurred a css is returned	
	 * 
	 * @param  {string}   string   Data to be rendered
	 * @param  {string}   file     Path to fille that will be added to options
	 * @param  {Function} callback Callback executed after getting css,
	 * @return {void}
	 */
	this.process = function(string, file, callback){

		var options = {
			filename: file
		}

		less.render(string, options, function(e, result){

			if(e){
				var util = require('util')
				css = fs.readFileSync(this.config.errorFile).toString();
				css = util.format(css, e.message, e.filename, e.line)
			}else{
				css = result.css
			}

			// Call css
			callback(css)
		})
	}

}

