/**
 * @author acrossley
 */
crossley = {
	loadingIndicator : '...loading...',
	
	log : function(string){
		if (typeof(console) != 'undefined')
		{
			console.log(string);
		}
	},
	
	dir : function(object){
		if (typeof(console) != 'undefined' && 
			typeof(console.dir) == 'function')
		{
			console.dir(object);
		}
	},
	
	errorHandler : function(msg, url, linenumber){
		// TODO: log these back to the server unless it is an ajax request
		crossley.log("Error: " + msg + " - " + url + " (line:" + linenumber + ")");
		return true;
	},
	
	// this means that we are not on the
	// page and you need to forward when set to true
	logonForward : undefined,
	
	addMethod : function (object, name, fn){
	    var old = object[ name ];
	    if ( old )
	    {
		    object[ name ] = function(){
	            if ( fn.length == arguments.length )
	                return fn.apply( this, arguments );
	            else if ( typeof old == 'function' )
	                return old.apply( this, arguments );
	        };
		}
	    else
		{
			object[name] = fn;
		}
	},
	
	listeners : [],
	// allback will be triggered callback(context, data)
	addListener : function(event, callback)
	{
		crossley.addMethod(crossley.listeners, event, callback);
	}
}

//window.onerror = crossley.errorHandler