var cl = new require( "./index" )({ env: "development", debug : true, path :__dirname, module : "boo" });


cl({ message : { env: "development",  debug : true, path :__dirname, module : "bar" } });

cl({ log_level : "error", message : "sorry" });

var xxx = new require( "./index" )({ env: "development",  debug : true, path :__dirname, module : "bar" });

xxx( "xxx" );


xxx({  env: "development", log_level : "error", message : "sorry" });


var v = new require( "./index" )();

v( "ttt" );

