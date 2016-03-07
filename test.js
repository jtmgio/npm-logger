var cl = new require( "./index" )({ debug : false, path :__dirname, module : "boo" });


cl( "testing" );

cl({ log_level : "error", message : "sorry" });

var xxx = new require( "./index" )({ debug : true, path :__dirname, module : "bar" });

xxx( "xxx" );


xxx({ log_level : "error", message : "sorry" });


var v = new require( "./index" )();

v( "ttt" );

