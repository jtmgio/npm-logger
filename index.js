//see mc-logger.js for detailed implementation
var _, cl, Logger;
_ = require( "lodash" );
Logger = require( "./mc-logger" );
cl = function() { return console.log.apply(console, arguments); };
/*
**-------------------------------------------------------------------------------------
** METHOD NAME - logger
** DESC - simple wrapper for npm module Logger 
**-------------------------------------------------------------------------------------
*/
function logger( params ){
	var root = this;

	params = params || {
		debug : false,
		module : "No Module Given",
		path : __dirname
	};

	return function( options ){

		if( ! _.isObject( options ) && _.isString( options )){
			options = {
				message : options
			};
		}

		//validate/default options
		options = _.defaults( options, { 
			log_level : "info", 
			message : ">>>no message<<<", 
			args : [] 
		});	
		
		return new logger.Logger( options, params.debug, params.module, params.path );
	}
}

//exports
module.exports = logger;
logger.Logger = require( "./mc-logger" );
