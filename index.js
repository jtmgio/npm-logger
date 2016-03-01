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
function logger( options ){
	if( ! _.isObject( options ) && _.isString( options )){
		options = {
			message : options
		};
	}
	//validate/default options
	root.options = _.defaults( options, { 
		log_level : "info", 
		message : ">>>no message<<<", 
		args : [] 
	});	
	//return intance of Logger
	return new logger.Logger( options, logger.debug, logger.module, logger.path );
}
//exports
module.exports = logger;
logger.Logger = require( "./mc-logger" );