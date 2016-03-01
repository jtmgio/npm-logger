/*
	The Design	
	- This will be a logger built directly for MC
	- This will extend Colors and Log modules
	- This will follow the MC standards for logging for our log entries service
	
	The Implementation
	var cl = require( "@memberclicks/mc-logger" );
	cl({ log_level : [log-level]|string, message : message|string, args : [args]|array }); ~ cl({ log_level : "info", message : "The response was %s and %s", args : [ 200, 400] });
	
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
var colors, Log, log, _, cl, defaults, os, dateformat;
_ = require( "lodash" );
Log = require( "log" );
log = new Log( "info" );
colors = require( "colors" );
os = require( "os" );
date_format = require( "dateformat" );
cl = function() { return console.log.apply(console, arguments); };
defaults = {};

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
	var root = this;
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
	var message = fnReplaceTokens( params.message, params.args );

	if( this.debug ){
		log[ this.log_level ].call( log, message[ this.log_level_info.color ] );			
		return this;
	}
	var output = {
		"timestamp": date_format( new Date(), "yyyy-mm-dd h:MM:ss TT"), 
		"server-id": os.hostname(), 
		"server-ip": fnGetServerIps().join( ", " ), 
		"level": this.log_level.toUpperCase(), 
		"module": this.module, 
		"logger": this.path, 
		"message": message
	}
	console.log( output );
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
	var log_level, log_level_map;
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
    var chunks = message.split( "%s" );
    return args.reduce(function( memo, arg, idx ){
        return memo + chunks[ idx ] + arg;
    }, "");
}
/*
**-------------------------------------------------------------------------------------
** METHOD NAME - fnGetServerIp
** DESC - this will get the server IP address
** FROM - https://nodejs.org/api/os.html#os_os_networkinterfaces
**-------------------------------------------------------------------------------------
*/
function fnGetServerIps(){
	var interfaces = os.networkInterfaces();
	var addresses = [];
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