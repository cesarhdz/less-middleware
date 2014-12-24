var expect = require("chai").expect
  , sinon = require('sinon')
  , Compiler = require("../src/less.js")



describe('Less', function(){

	var compiler

	beforeEach(function(){
		compiler = new Compiler
	})

	describe('middleware', function(){
		it('Should return a function', function(){
			// when
			var middleware = compiler.middleware()

			//then
			expect(middleware).to.be.a('function')
		})
	})


	describe('process method', function(){
		it('Should call callback function', function(){
			//given
			var cb = sinon.spy()

			//when
			compiler.process('', '', cb)

			//then
			expect(cb.called).to.be.true
		})
	})


	describe('build method', function(){
		it('SHould return a function', function(){
			expect(compiler.build()).to.be.a('object')
		})
	})

})
