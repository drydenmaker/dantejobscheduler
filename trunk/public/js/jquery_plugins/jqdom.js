/**
 * jQDOM v1.0 - Chainable and vanilla DOM creation
 *   * http://www.alterform.com/resources/jqdom
 *
 *
 * Copyright (c) 2006 Nate Cavanaugh, dual licensed under the MIT and GPL
 * licenses:
 *   * http://www.opensource.org/licenses/mit-license.php
 *   * http://www.gnu.org/licenses/gpl.txt
 * 
 * 
 *	 		/////////// Chainable DOM Creation ///////////
 *	 		$().dom(el, prepend, children, attributes)
 * 		
 * 			el: This can be a string (such as 'div'), or an existing DOM element (NOT a jQuery object)
 *
 *			prepend (optional): boolean (true/false) that determines whether to append or prepend the created items to the parent object. Can be set, or ignored. Defaults to false (append).
 * 			
 * 			children (optional): This can either be a plain text string, or it can be an array of elements that will be used as the children.
 * 			
 * 			attributes(optional): A hash object of key/value pairs that set the attributes
 * 			
 * 			/////////// Vanilla DOM Creation ///////////
 * 			$.dom(el, children, attributes, parent, prepend, replace);
 * 			
 * 			ARGUMENTS:
 * 			el: This can be a string (such as 'div'), or an existing DOM element (NOT a jQuery object)
 *	
 * 			children (optional): This can either be a plain text string, or it can be an array of elements that will be used as the children.
 * 			
 * 			attributes(optional): A hash object of key/value pairs that set the attributes
 * 			
 * 			parent (optional): A string of jQuery selectors, or an element that you want the item to be appended to. If this is not included, the created element will be returned rather than placed in the DOM.
 *
 *			prepend (optional): boolean (true/false) that determines whether to append or prepend the created items to the parent object. Can be set, or ignored. Defaults to false (append). 
 * 			
 * 			replace(optional): A boolean value (true/false) if you want the created item to replace the existing elements inside of 'parent'. The default is to append the created element to the parent.
 * 			
 * 	
 *			
 * 
 * Examples:
 *	//////////////////////
 *		Chainable DOM Creation 
 *			$('body').dom('div')
 *							.text('Hello World!')
 *								.css({background:'#ccc'})
 *									.dom('a',true) //Now prepending children to our freshly created divs
 *										.attr({href:'http://alterform.com',rel:'external'})
 *											.click(function(){alert(this.href);return false;})
 *												.end() //Now back to the created divs
 *													.end() //Now back to the body 
 *													
 *		//////////////////////
 * 		Vanilla DOM creation:
 * 			$.dom('div', 'text', {align:'center',style:'background-color:#ccc', id:'myDiv'},'body');
 */
jQuery.fn.dom= function( e,pp,c,a ){
	var col=[];
	var prepend = pp || false;
	c = c || '';
	a = a || {};
	this.each(function(){
		if(e||c) {
				c=(typeof c=='string'||(typeof c=='object'&&!c.length))?[c]:c;
				e=(!e&&c.length==1)?document.createTextNode(c[0]):e;
				var inputName = a['name'] || a['id'] || '';
				var n = (typeof e=='string')?document.createElement((e == 'input' && jQuery.browser.msie) ? '<input name="' + inputName + '"></input>' : e) : !(e&&e===c[0])?e.cloneNode(false):e.cloneNode(true);
				if(e.nodeType!=3) {
						c[0]===e?c[0]='':'';     
						for(var i=0,j=c.length;i<j;i++) typeof c[i]=='string'? ((c[i] =='') ? '': n.appendChild(document.createTextNode(c[i]))):n.appendChild(c[i].cloneNode(true));
						
						if(a) {jQuery(n).attr(a);}
				}
			}
	if(!prepend){				
		this.appendChild(n);
	} else {
		this.insertBefore( n, this.firstChild );
	}
	col.push(n);
	});

	return this.pushStack(col);
}; 
jQuery.dom = function(e,c,a,p,pp,x) {
var prepend = pp || false;
if(e||c) {
        c=(typeof c=='string'||(typeof c=='object'&&!c.length))?[c]:c;
        e=(!e&&c.length==1)?document.createTextNode(c[0]):e;
		var inputName = a['name'] || a['id'] || '';
        var n = (typeof e=='string')?document.createElement((e == 'input' && jQuery.browser.msie) ? '<input name="' + inputName + '"></input>' : e) : !(e&&e===c[0])?e.cloneNode(false):e.cloneNode(true);
        if(e.nodeType!=3) {
                c[0]===e?c[0]='':'';     
                for(var i=0,j=c.length;i<j;i++) typeof c[i]=='string'? ((c[i] =='') ? '': n.appendChild(document.createTextNode(c[i]))):n.appendChild(c[i].cloneNode(true));
				
                if(a) {jQuery(n).attr(a);}
        }
	}
        if(!p)return n;
		p=jQuery(p);
		p.each(function(){
			var el = jQuery(this);
				if(x){ el.empty();}
				if(n){ (!prepend) ? el.append(n) : el.prepend(n); }
			});
}