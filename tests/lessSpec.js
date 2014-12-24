var expect = require("chai").expect
  , Compiler = require("../src/less.js")



describe('Less', function(){

	var compiler

	beforeEach(function(){
		compiler = new Compiler
	})

	describe('middleware', function(){


		it('Should have middleware method', function(){

			expect(compiler).to.respondTo('middleware');
			
		})


		it('Should return a function', function(){

			// when
			var middleware = compiler.middleware()

			//then
			expect(middleware)
				.to.be.a('function')

		})

		
	})


})
