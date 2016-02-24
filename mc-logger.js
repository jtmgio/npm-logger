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
	}cl	
	
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
var colors, Log, log, _, cl, defaults, os;
_ = require( "lodash" );
Log = require( "log" );
log = new Log( "info" );
colors = require( "colors" );
os = require( "os" );
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
	emergency : { id : 0, color : "orange" },
	alert : { id : 1, color : "red"  },
	critical : { id : 2, color : "red" },
	error : { id : 3, color : "red" },
	warning : { id : 4, color : "red" },
	notice : { id : 5, color : "green" },
	info : { id : 6, color : "blue" },
	debug : { id : 7, color : "purple" }
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
function Logger( params, debug ){
	var root = this;

	root.debug = debug || false;
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
	if( this.debug ){
		var args = _.concat( [ params.message[ this.log_level_info.color ] ], params.args );
		log[ this.log_level ].apply( log, args );			
	}
	var output = {
		"timestamp": new Date().getTime(), 
		"server-id": os.hostname(), 
		"server-ip": "192.168.10.26", 
		"level": "INFO", 
		"module": "invoice", 
		"logger": "routes.list.list.controller", 
		"message": "The response was 200 and 400" 
	}

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
** METHOD NAME - fnGetServerIp
** DESC - this will get the server IP address
**-------------------------------------------------------------------------------------
*/
function fnGetServerIp(){
	
}