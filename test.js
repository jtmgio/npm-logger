var cl = require( "./index" );
//debug
cl.debug = true;
//execute
cl({
	log_level : "info", 
	message : "hello %s",
	args : [ "josh" ]
});

