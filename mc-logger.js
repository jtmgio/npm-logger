/*
	The Design	
	- This will be a logger built directly for MC
	- This will extend Colors and Log modules
	- This will follow the MC standards for logging for our log entries service
	
	The Implementation
	var cl = require( "@memberclicks/mc-logger" );
	cl({ log_level : [log-level]|string, message : message|string, args : [args]|array }); ~ cl({ log_level : "info", message : "The response was %s and %s", args : [ 200, 400] });
	
	//execute
	cl({
		log_level : "info", 
		message : "hello %s to %s",
		args : [ "josh", "test" ]
	});
	
	cl( "testing" );
	
	cl({
		log_level : "alert", 
		message : "hello %s to %s",
		args : [ "josh", "test" ]
	});
	
	The Output
	{ 
		"timestamp": "2016-02-18 10:41:16,585", 
		"server-id": "dock01", 
		"server-ip": "192.168.10.26", 
		"level": "INFO", 
		"module": "invoice", 
		"logger": "routes.list.list.controller", 
		"message": "The response was 200 and 400" 
	}	
	
	@[log-level] - the log level for the outputted log. This will default to log level of 6 (info)	
	@message - The string based message to send to the sdtout
	@[args] - argument list to replace in @message "%s %s"
	
	0 EMERGENCY system is unusable
	1 ALERT action must be taken immediately
	2 CRITICAL the system is in critical condition
	3 ERROR error condition
	4 WARNING warning condition
	5 NOTICE a normal but significant condition
	6 INFO a purely informational message
	7 DEBUG messages to debug an application	
*/
//================================================================================//
//=========  required modules  ===================================================//
//================================================================================//

const _ = require( "lodash" );
const Log = require( "log" );
const log = new Log( "info" );
const colors = require( "colors" );
//const os = require( "os" );
const date_format = require( "dateformat" );
const cl = function() { return console.log.apply( console, arguments ); };
const defaults = {};
const winston = require( "winston" );
const ts_format = () => ( new Date().getTime() );
//in the docker container this will add the folder to the correct spot. should only be executed in a 
//stage/prod env
const logs_directory = `/data/server/logs`;
const fs = require( "fs" );

//create the logs directory in the base of the application	
if( process.env.NODE_ENV != "dev" && ! fs.existsSync( logs_directory ) ){
	fs.mkdirSync( logs_directory );

	//setup winston to write to the filesystem
	//wl = winston log
	const wl = new ( winston.Logger ) ({
		transports : [
			new ( winston.transports.Console )({
				colorize: true, 
				timestamp : ts_format        
			}),
			new ( winston.transports.File )({
				filename : `${logs_directory}/application-out.log`,
				timestamp : ts_format,
				level : "info",
			})
		]
	});
}


//root properties
//debug
defaults.debug = false;
//default color
defaults.default_color = "white";
//default log level
defaults.default_log_level = "info";
//log levels map
defaults.log_levels_map = {
	emergency : { id : 0, color : "bgRed" },
	alert : { id : 1, color : "bgRed"  },
	critical : { id : 2, color : "bgRed" },
	error : { id : 3, color : "bgRed" },
	warning : { id : 4, color : "bgYellow" },
	notice : { id : 5, color : "cyan" },
	info : { id : 6, color : "blue" },
	debug : { id : 7, color : "green" }
};


//================================================================================//
//========= export public api  ===================================================//
//================================================================================//
module.exports = Logger;

//================================================================================//
//=========  public methods  =====================================================//
//================================================================================//
/*
**-------------------------------------------------------------------------------------
** METHOD NAME - logger ~ constructor
** DESC - this is the constructor method 
**-------------------------------------------------------------------------------------
*/
function Logger( params, debug, module, path ){
	let root = this;
	root.debug = debug || false;
	root.module = module || "NO MODULE";
	root.path = path || "";
	root.log_level = params.log_level || defaults.default_log_level;
	root.log_level_info = fnGetLogLevelInfo.call( root, defaults );
	root.init();
	root.writeMessage( params );
}
/*
**-------------------------------------------------------------------------------------
** METHOD NAME - init
** DESC - initial fn call - put something cool here
**-------------------------------------------------------------------------------------
*/
Logger.prototype.init = function(){ return this; };
/*
**-------------------------------------------------------------------------------------
** METHOD NAME - writeMessage
** DESC - this will format the message based on the debug is true or not
**-------------------------------------------------------------------------------------
*/
Logger.prototype.writeMessage = function( params ){
	let message = fnReplaceTokens( params.message, params.args );

	if( this.debug ){
		log[ this.log_level ].call( log, message[ this.log_level_info.color ] );			
		return this;
	}
 
	wl.info( message, {
		log_level: this.log_level.toUpperCase(), 
		module: this.module, 
		logger: this.path, 
		message: message
	});	


	return this;
};
//================================================================================//
//=========  private methods  ====================================================//
//================================================================================//
/*
**-------------------------------------------------------------------------------------
** METHOD NAME - fnGetLogLevelInfo
** DESC - this will get the log level info
**-------------------------------------------------------------------------------------
*/
function fnGetLogLevelInfo( defaults ){
	let log_level, log_level_map;
	log_level = ( _.has( defaults.log_levels_map, this.log_level ) ? this.log_level : defaults.default_log_level );
	log_level_map = defaults.log_levels_map[ log_level ];
	log_level_map.name = log_level;
	return log_level_map;
}

/*
**-------------------------------------------------------------------------------------
** METHOD NAME - fnReplaceTokens
** DESC - this will replace all tokens in message
**-------------------------------------------------------------------------------------
*/
function fnReplaceTokens( message, args ){
	if( _.isEmpty( args ) ){
		return message;
	}
    let chunks = message.split( "%s" );
    return args.reduce(function( memo, arg, idx ){
        return memo + chunks[ idx ] + arg + ( ! _.isUndefined( chunks[ idx + 1 ] ) ? chunks[ idx + 1 ] : "" );
    }, "");
}
/*
**-------------------------------------------------------------------------------------
** METHOD NAME - fnGetServerIp
** DESC - this will get the server IP address
** FROM - https://nodejs.org/api/os.html#os_os_networkinterfaces
**-------------------------------------------------------------------------------------

function fnGetServerIps(){
	let interfaces = os.networkInterfaces();
	let addresses = [];
	for (var k in interfaces) {
	    for (var k2 in interfaces[k]) {
	        var address = interfaces[k][k2];
	        if (address.family === 'IPv4' && !address.internal) {
	            addresses.push( address.address );
	        }
	    }
	}
	return addresses;	
}
*/
