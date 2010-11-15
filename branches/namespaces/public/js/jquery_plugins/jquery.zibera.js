/**
 * @author drydenmaker
 */
(function($){

    $.fn.tablestripe = function(options){
        // build main options before element iteration
        var opts = $.extend({}, $.fn.tablestripe.defaults, options);
        // iterate and reformat each matched element
        return this.each(function(){
			if (opts.prepend_class)
			{
				$(this).find('tbody tr:even').each(function(){
					$(this).attr('class', opts.hilight_class + ' ' + $(this).attr('class'))
				});
			}
			else
            {
				$(this).find('tbody tr:even').addClass(opts.hilight_class);
			}
        });
    };
	
    //
    // plugin defaults
    //
    $.fn.tablestripe.defaults = {
        hilight_class: 'ui-state-highlight',
		prepend_class: false
    };

})(jQuery);

