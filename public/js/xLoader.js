(function($) {

    var sLoadingMessage = "loading...";

    var defaults = {
        xPostLoad: 'postLoad'
		, target: ".xdynamic"
		, xmodal: false
    };

    var FormDefaults = {
        target: ".xdynamic"
		, beforeSubmit: function(formData, form, options) {

		    if (typeof ($(form).validate) == 'function') {
		        crossley.log('Validating Form. Errors:' + $(form).validate().errorList.length);

		        return ($(form).validate().errorList.length == 0);
		    }
		    crossley.log('not validating form');
		    return true;

		}
		, success: function() {
		    $(this).xOnFormLoad();
		}
		, error: function(xhr, status, error) {
		    var error = xhr.responseText;
		    // TODO: Replace this with growl or dialog
		    $('html').html(error);
		}
    };

    $.fn.xSetOptions = function(new_options) {
        element = $(this);

        if (typeof (new_options) != 'undefined') {
            $.each(new_options, function(event, fn) {
                if (typeof (fn) == 'function')
                    element.bind(event, fn);
            });
        }

        options = $.extend({}, defaults, element.data('wLoad:options'), new_options);
        element.data('wLoad:options', options);

        return this;
    }

    $.fn.xLoadSetup = function(new_options) {
        this.each(function() {

            var loadElement = $(this);
            targetId = '#' + loadElement.attr("id");

            // set a links
            loadElement.find("a")
				.filter(function() { return ($(this).attr('target') != '_top'); })
				.xSetOptions(new_options).each(function() {
				    //crossley.log('setting anchor link load');
				    $(this).click(function() {
				        thisoptions = $(this).data('wLoad:options')
				        if (thisoptions.xmodal || $(this).attr('target') == '_modal') {
				            $(this).xALoadModal();
				        }
				        else {
				            $(this).xALoad();
				        }

				        return false;
				    });
				});

            FormDefaults.target = targetId;
            var form_options = $.extend({}, loadElement.data('wLoad:options'), FormDefaults, new_options);

            // set form submit
            loadElement.find("form").ajaxForm(form_options);

        });

        return this;
    }

    $.fn.xLoad = function(sUrl, options, callback) {

        xElement = $(this);
		
		if (typeof (options) == 'function')
		{
			callback = options;
			options = {};
		}
		else
		{
			callback = function() { };
		}
            		
        crossley.log('USING xLOAD');

        xElement.html(sLoadingMessage).load(sUrl, function() {
            $(this).xLoadSetup(options);
			$(this).each(callback);
        });

        return this;
    }

    // ajax load html and then set all the sublinks to ajax load into a modal
    $.fn.xModalChildLoad = function(sUrl, options, callback) {

        if (typeof (callback) != 'function')
            callback = function() { };

        xMElement = $(this);
        thisoptions = $.extend({}, modalDefaults, options);

        crossley.dir(thisoptions);

        crossley.log('USING MODAL CHILD LOAD');

        xMElement.load(sUrl, function() {
            crossley.log('setting modal options');
            $(this).xLoadSetup(thisoptions);
            callback();
        });

        return this;
    }

    // simply make child links modal
    $.fn.xModalLinks = function(options, callback) {
        // make sure we dont throw errors on the callback
        if (typeof (callback) != 'function')
            callback = function() { };

        // set the targets to modal to trigger modal loading
        this.find('a').each(function() {
            $(this).attr('target', '_modal');
        });

        // set the options on the links
        thisoptions = $.extend({}, modalDefaults, options);
        $(this).xLoadSetup(thisoptions);

        // trigger the callback
        callback();
        // chain!
        return this;
    }

    $.fn.xALoad = function() {
        xAElement = $(this);
        options = xAElement.data('wLoad:options');

        crossley.log('USING xALOAD');
		sTarget = $(this).attr('target');
		if (sTarget.length)
		{
			crossley.log('link has target: ' + sTarget);
			oContainer = $('#' + sTarget);
		}
		
		if (typeof(oContainer) != 'undefined' && oContainer.length)
		{
			crossley.log('found target. loading link to target');
		}
		else
		{
			crossley.log('loading link to ' + options.target);
			oContainer = $(this).parents(options.target);
		}
		
		crossley.log('laoding url ' + escape($(this).attr('href')));

        oContainer.load(escape($(this).attr('href')), function() {
            $(this).xLoadSetup(options);
        });

        return this;
    }

    $.fn.xALoadModal = function() {
        xAM_Element = $(this);
        options = xAM_Element.data('wLoad:options');
        crossley.dir(options, 'Modal Options');
        $.xModalStack($(this).attr('href'), options);
    }

    $.fn.xOnFormLoad = function(thisoptions) {
        xF_Element = $(this);
        options = xF_Element.data('wLoad:options');
        xF_Element.xLoadSetup(options);
    }
	
	$.xLoadModal = function(sUrl, oData, fCallback) {
        crossley.dir(oData, 'Modal Options');
        $.xModalStack(sUrl, {data: oData, modalCallBack: fCallback});
    }
	
	// configure modal defaults
    var modalDefaults = {
        xmodal: true
		, content_id: 'dialog_prim'
		, dialog_id: 'dialog'
		, convert_buttons: true
		, convert_caption: true
		, remove_links: true
		, modalOps: {
		    modal: true,
		    bgiframe: true,
		    width: 400,
		    buttons: {
		        "Cancel": function() {
		            $(this).dialog("close");
		        }
		    },
		    close: function(event, ui) {
		        $(this).remove();
		    }
		}
		, modalCallBack: function() { crossley.log('empty modal callback'); }
		, ajaxFormOptions: {}
    };

    $.xModalStack = function(sUrl, new_options) {
        StackModalOptions = $.extend({}, modalDefaults, new_options);
        modleOptions = $.extend({}, modalDefaults.modalOps, StackModalOptions.modalOps);
		
        sContentId = StackModalOptions.content_id;
		sDialogTitle = modleOptions.title || 'Add';
        sDialogId = StackModalOptions.dialog_id || 'dialog';
        ModalCB = StackModalOptions.modalCallBack

        ajaxFormOptions = $.extend({
			target: '#' + sContentId
            ,success: function(oResponse, textStatus) {
				// this; // the options for this ajax request
                crossley.log('response success');

                $(this)
					.dialog('option', 'buttons', { 'Done': function() { $(this).dialog('close'); ModalCB(oResponse); } })
					.xConvertModalButtons(this);

            }
			, error: function (XMLHttpRequest, textStatus, errorThrown) {
				// this; // the options for this ajax request
			  crossley.log('response error');
			  $('#' + sContentId).html(XMLHttpRequest.status + ' : ' + statusText + ' ' + errorThrown );
			}

        }, StackModalOptions.ajaxFormOptions);
		
        // TODO: keep a count of dialogs, to make DOM IDs unique for multiple Dialogs open
        if ($('#' + sContentId).length < 1) {

            crossley.log('USING xMODAL STACK');

            $('body').dom('div').attr({
                'id': sDialogId,
                'title': sDialogTitle
            }).each(function() {
                $(this).dom('div').attr({
                    'id': sContentId
					, 'class': 'xContainer'
                }).load(sUrl, StackModalOptions.data, function(responseText, textStatus, XMLHttpRequest) {
					crossley.log('textStatus:' + textStatus);
                    MyModleOptions = $.extend({}, modleOptions); // copy the options to avoid refrencing

                    if (StackModalOptions.remove_links) {
                        // TODO: add some more configuration for what to do with anchor tags
                        $('#' + sDialogId).find('a').remove();
                    }

                    oModal = $('#' + sDialogId).dialog(MyModleOptions);
                    // TODO: make a links stack modals
					
					if (StackModalOptions.convert_buttons) {
		                // get the form buttons, make dialog buttons then remove the form buttons
		                oModal.xConvertModalButtons(ajaxFormOptions);
		            }
					
					if (StackModalOptions.convert_caption){
						oModal.xConvertModalTitle(MyModleOptions);
					}
					
                });
				
            });
			
			

        }
        else {
            // todo - maybe push the dialog into the LIFO stack and add annother content div
        }

        return this;
    };
	
	// modify a jQuery UI dialog containing a form, moving the buttons to dialog buttons
	$.fn.xConvertModalButtons = function(ajaxFormOptions){
		
		crossley.dir(ajaxFormOptions);

		oModal = $(this);
		
		oButtons = $.extend({}, oModal.dialog("option", "buttons")); 
		
		crossley.log('Modal found ' + oModal.length + '');
		
		oModal.find('form input[type=submit]').each(function() {

            // TODO: make button value pass on submit
            ButtonFaceTitle = $(this).attr('value');
            ButtonName = $(this).attr('name');

            sHiddenInput = '<input type="hidden" name="' + ButtonName + '" value="' + ButtonFaceTitle + '">'

            crossley.log('adding button ' + ButtonFaceTitle);

            oButtons[ButtonFaceTitle] = function() {
                crossley.log('button clicked: ' + ButtonFaceTitle);
                crossley.dir(ajaxFormOptions);

                $(this).find('form').append(sHiddenInput)
						.ajaxSubmit(ajaxFormOptions);
            };

        }).remove();
		
		oModal.dialog('option', 'buttons', oButtons);
	};
	
	$.fn.xConvertModalTitle = function(modalOptions){
		
		oModal = $(this);
		
		if (oModal.find('caption').length == 1 && 
			(typeof(modalOptions.title) == 'undefined' || 
			  modalOptions.title == "Add" || 
			  modalOptions.title == ""))
		{
			sTitle = oModal.find('caption').html();
			oModal.dialog('option', 'title', sTitle);
			oModal.find('caption').remove();
		}
		else
		{
			crossley.log(modalOptions.title + ' not fixing header :' + oModal.find('caption').length);
		}
	}

    var ASPdefaults = {
        xTarget: 'x_asp_target',
        cache: false,
        type: "POST",
        url: "./Users.asmx/ping",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(msg) {
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            crossley.log('ajax error, status: \n' + textStatus + '\n - error: \n' + errorThrown)
        }
    };

    $.fn.xLoadASP_XML = function(sUrl, sData, callback, options) {
        crossley.log('- calling XML WS');
        newOptions = options | {};
        newOptions.dataType = 'XML';
        $(this).xLoadASP_WS(sUrl, sData, callback, newOptions);
        return this;
    };

    $.fn.xLoadASP_JSON = function(sUrl, sData, callback, options) {
        crossley.log('- calling JSON WS');
        newOptions = options | {};
        newOptions.dataType = 'json';
        newOptions.contentType = 'application/json; charset=utf-8';
        $(this).xLoadASP_WS(sUrl, sData, callback, newOptions);
        return this;
    };

    $.xLoadImgArray = function(aImages) {
        var arr = jQuery.makeArray(aImages);
        var allImgs = [];
        baseURL = '';
        c = 0;
        jQuery(arr).each(function() {
            allImgs[c] = new Image(); //new img obj
            allImgs[c].src = (this[0] == '/' || this.match('http://')) ? this : baseURL + this;     //set src either absolute or rel to css dir
            c++;
        });
        return this;
    };

    $.fn.xLoadASP_WS = function(sUrl, sData, callback, options) {

        $(this).html(sLoadingMessage);

        // TODO: verify the scope on this and race conditions
        var x_Element = $(this);

        (function() {

            var myCallback, myData

            //make sure we have a callback function		
            if (typeof (callback) == 'function') {
                myCallback = callback;
            }
            else {
                myCallback = function() { }
            }

            // TODO: auto serialize objects
            // make sure we have a data object string
            if (typeof (sData) == 'undefined' || sData.length < 2) {
                myData = '{}';
            }
            else {
                myData = sData;
            }


            x_Element_id = x_Element.attr("id");

            crossley.log(' setting element id to - ' + x_Element_id);

            //console.dir(x_Element);

            // setup to put message in element
            function outputData(msg) {
                crossley.log('-- + fireing callback function to ' + this.xTarget)

                // check for the asp security hack
                if (typeof (msg.d) == 'undefined') {
                    AnswerValue = msg
                }
                else {
                    // hack is present - assign
                    AnswerValue = msg.d
                }

                // check to see if it is a standard complex JSON obj
                if (typeof (AnswerValue.sHtml) == 'undefined') {
                    $(this.xTarget).html(AnswerValue);
                }
                else {
                    // there is more data here, only display the HTML
                    $(this.xTarget).html(AnswerValue.sHtml);
                }

                myCallback(AnswerValue);
            }

            crossley.log('- setting options ');

            // munge options together prefering anything passed in
            new_options = $.extend({}, ASPdefaults, {
                xTarget: '#' + x_Element_id,
                url: sUrl,
                data: sData
					, contentType: "application/json; charset=utf-8"
					, dataType: 'json'
					, success: outputData
            }, options);

            crossley.log('- calling ajax');
            crossley.dir(new_options);

            $.ajax(new_options);

        })();

        return this;
    }

})(jQuery);