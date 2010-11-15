/**
 * @author drydenmaker
 */
(function($){

    $.fn.popOut = function(options){
        // build main options before element iteration
        var opts = $.extend({}, $.fn.popOut.defaults, options);
		watts.bDebug = true;
		var targetMenu = opts.menu_tag + '.' + opts.menu_class
		watts.log('using ' + targetMenu + ' as menu');
        // iterate and reformat each matched element
        this.find('a.switch').click(function() {
            $(targetMenu).hide();
			oSwitch = $(this);
            oSwitch.parent().find(targetMenu).positionOn(oSwitch, opts).show(opts.effect);
            return false;
        }).end().find('input').click(function() {
            // dont hide when these inputs are clicked
            return false;
        });
		
		$("html").click(function(event) {
            $(targetMenu).hide(opts.effect);
        });
		
		return this
    };
	
	//
    // plugin defaults
    //
    $.fn.popOut.defaults = {
        effect: undefined,
		menu_tag: 'ul',
		menu_class: 'popOut'
		
    };
	
	$.fn.positionOn = function(target, options){
		// Subject is the jquery result
		// Target is the stationary Node
		
		$(this).css( {margin: 0} );
		
		var popZIndex = $(target).css('zIndex') + 1;
		
		var targetPos = $(target).offset();
		var subjectPos = $(this).offset();
		
		var targetWidth = $(target).outerWidth();
		var subjectWidth = $(this).outerWidth();
		
		var targetHeight = $(target).outerHeight();
		var subjectHeight = $(this).outerHeight();
				
		var opts = $.extend({}, $.fn.positionOn.defaults, options);
				
		if (opts.vertical_position == 'top')
		{
			pxTop = Math.round(targetPos.top - subjectHeight + opts.top_offset);
		}
		else
		{
			pxTop = Math.round(targetPos.top + targetHeight + opts.top_offset);
		}
		
		if (opts.vertical_position == 'right')
		{
			pxLeft = Math.round(targetPos.left + targetWidth + opts.left_offset);
		}
		else
		{
			pxLeft = Math.round(targetPos.left + opts.left_offset);
		}
		
		watts.log('setting -- left: ' + pxLeft + 'px, top: ' + pxTop + 'px, position: absolute, z-index:' + popZIndex);
		
		// $(this).css( { left: pxLeft + 'px', top: pxTop + 'px', position: 'absolute', 'z-index': popZIndex} );
		$(this).css( { left: pxLeft + 'px', top: pxTop + 'px', position: 'absolute' } ); // .css( 'zIndex', popZIndex );
				
		return this;
	};
	
	//
    // plugin defaults
    //
    $.fn.positionOn.defaults = {
        vertical_position: 'bottom', //(bottom, top)
        top_offset: 2,
		horizontal_position: 'left', // (left, right)
		left_offset : 2
    };
    

})(jQuery);
            