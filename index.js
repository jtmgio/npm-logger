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
	//setup the parameter defaults
	params = params || {
		env : "prod",
		module : "No Module Given",
		path : __dirname
	};
	//are we in debug mode?
	params.debug = ( _.indexOf( [ "dev", "development", "stage" ], params.env ) > -1 ) ? true : false; 
	//return our constructor and lib
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
