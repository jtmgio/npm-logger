/*
	The Design	
	- This will be a logger built directly for MC
	- This will extend Colors and Log modules
	- This will follow the MC standards for logging for our log entries service
	
	The Implementation
	var cl = require( "@memberclicks/mc-logger" );
	cl( [log-level], message, [args] ); ~ cl( "info", "The response was %s and %s", 200, 400 );
	
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
var colors, Log, log, _;

_ = require( "lodash" );
Log = require( "log" );
log = new Log( "info" );
colors = require( "colors" );


//================================================================================//
//========= export public api  ===================================================//
//================================================================================//
module.exports = logger;

//================================================================================//
//=========  public methods  =====================================================//
//================================================================================//
function logger( log_level, message ){
	console.log( logger.debug );
}


logger.prototype.debug = false;

//================================================================================//
//=========  private methods  ====================================================//
//================================================================================//


