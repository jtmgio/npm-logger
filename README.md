#NPM LOGGER
NPM Module for logging errors

##The Design	
	- This will be a logger built directly for MC
	- This will extend Colors and Log modules
	- This will follow the MC standards for logging for our log entries service
	
##The Implementation
Require the module using the full path of the module. i.e. var cl = require( "@memberclicks/mc-logger" );

`var cl = require( "@memberclicks/mc-logger" );`

	
`cl({ log_level : [log-level]|string, message : message|string, args : [args]|array }); ~ cl({ log_level : "info", message : "The response was %s and %s", args : [ 200, 400] });`

```	
	//debug
	cl.debug = false;	
	cl.module = "ui-directory-search";
	cl.path = __dirname;
	

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
	
```

###Production Output

```
{ 
		"timestamp": "2016-02-18 10:41:16,585", 
		"server-id": "dock01", 
		"server-ip": "192.168.10.26", 
		"level": "INFO", 
		"module": "invoice", 
		"logger": "routes.list.list.controller", 
		"message": "The response was 200 and 400" 
}	
```	
	
###Code Details	
- @[log-level] - the log level for the outputted log. This will default to log level of 6 (info)	
- @message - The string based message to send to the sdtout
- @[args] - argument list to replace in @message "%s %s"
	
- 0 EMERGENCY system is unusable
- 1 ALERT action must be taken immediately
- 2 CRITICAL the system is in critical condition
- 3 ERROR error condition
- 4 WARNING warning condition
- 5 NOTICE a normal but significant condition
- 6 INFO a purely informational message
- 7 DEBUG messages to debug an application
