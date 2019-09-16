(function(e) {e(window.jQuery, window, document);})(function($, window, document) {
    console.log('init');
    var app = {

        // ==============================================================================================
        // Call your function here to become a single function
        // * This method make your code more modular and make it easy to toggle your function
        // * If you want to disable a function, just commented on function that you need to disable below
        // ==============================================================================================

        init: function($) {
            app.select2();
            app.filterHandler();
        },

        onResize: function() {
            // call function here to applied on resize window
        },

        // ======================================================================
        // Your function here
        // * Don't forget to use proper function name to describes your function
        // ======================================================================
        select2: function() {
            $('select').select2();
        },
        initSelect2Filter: function(){
            $('.select-critere').select2();
            $('.select-condition').select2();
        },
        destroySelect2Filter: function(){
            $('.select-critere').select2("destroy");
            $('.select-condition').select2("destroy");
        },
        lineConnector: function() {
            $('.filter-parent').connections({
                to: '.filter-row',
                'class': 'related-conn'
            });
        },
        filterHandler: function(){
            function add_row($wrapper){
                var section_id = $wrapper.find('.filter-row').length;
                var $template = jQuery('.template-filter-row');
                
                var $row = jQuery($template).clone().removeClass('template-filter-row').attr('data-id', section_id);
                console.log(section_id);
                $wrapper.append($row);
                
                    app.lineConnector();
                    app.initSelect2Filter();
                    $('.filter-row').connections('update');
   
            }

            jQuery('#btn-condition').click(function(){
                $('.filter-parent').css('display','block');
                app.destroySelect2Filter();
                add_row($('#filter-wrapper'));
            });

            
           
        }
    }

    $(document).ready(function () {
        app.init($);
        $(window).resize(function() {
            app.onResize();
        });
    });
});