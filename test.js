var cl = require( "./index" );
//debug
cl.debug = true;
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
