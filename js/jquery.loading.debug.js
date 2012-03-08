/*
* jquery-loading. The jquery-loading.js
*
* Copyright (c) Jaime Jaramillo
* https://github.com/jjaramillo
*
* Version : 1.0.0
*/
(function ($) {
    var methods = {
            init: function(options){
                var settings = $.extend({
                    'baseurl': '',
                    'image': 'img/preloader.gif',
                    'fullscreen': false,
                    'backgroundcolor': 'black',
                    'imagebackgroundcolor': 'white',
                    'spinnerwidth': 64,
                    'spinnerheight': 64,
                    'autoshow': true
                }, options);
                return this.each(function(){
                    var ajaxloader = $('<div class="Ajax-Loader"><div class="Ajax-Loader-Overlay"></div><div class="Ajax-Loader-Image ui-corner-all"><img src="' + settings.baseurl + settings.image + '"/></div></div>');
                    $('body').append(ajaxloader);
                    if (settings.fullscreen === false) {
                        ajaxloader.css('top', this.offset().top).css('left', this.offset().left).width(this.outerWidth()).height(this.outerHeight()).css('position', 'absolute').css('z-index', 99999);
                        ajaxloader.find('.Ajax-Loader-Overlay').css({ opacity: 0.5, 'background-color': settings.backgroundcolor }).width(this.outerWidth()).height(this.outerHeight());
                    }
                    else {
                        ajaxloader.css({ width: '100%', height: '100%', position: 'absolute', 'z-index': 99999, top: 0, left: 0 });
                        ajaxloader.find('.Ajax-Loader-Overlay').css({ opacity: 0.5, 'background-color': settings.backgroundcolor, width: '100%', height: '100%' });
                    }
            
                    ajaxloader.find('.Ajax-Loader-Image').css(
                        {
                            top: -((ajaxloader.height() / 2) + settings.spinnerheight),
                            'background-color': settings.imagebackgroundcolor,
                            position: 'relative',
                            width: settings.spinnerwidth * 2,
                            height: settings.spinnerheight * 2,
                            margin: '0 auto'
                        });
                    ajaxloader.find('img').css(
                        {
                            display: 'block',
                            margin: '0 auto',
                            top: settings.spinnerheight / 2,
                            position: 'relative'
                        }
                    );
                    ajaxloader.hide();
                    if(settings.autoshow === true)
                    {
                        ajaxloader.fadeIn();
                    }
                    $(this).data('ajaxloader', ajaxloader);
                });
            },
            show: function(){
                return this.each(function(){
                    var ajaxloader = $(this).data('ajaxloader');
                    ajaxloader.fadeIn();
                });
            },
            hide: function(){
                return this.each(function(){
                    var ajaxloader = $(this).data('ajaxloader');
                    ajaxloader.fadeOut();
                });    
            },
            destroy: function(){
                return this.each(function(){
                    var ajaxloader = $(this).data('ajaxloader');
                    ajaxloader.remove();
                    $(this).removeData('ajaxloader');
                });
            }
            
    };
    $.fn.ajaxloader = function (method) {        
        if(methods[method]){
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if(typeof(method === 'object' && ! method)){
            return methods.init.apply(this, arguments);
        }
        else{
            $error('Method ' +  method + 'was not found on jquery.ajaxloader');
        }
    };
})(jQuery);