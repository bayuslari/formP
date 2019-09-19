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
            app.datepicker();
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
            $('.filter-head').connections({
                to: '.filter-inner > .filter-row',
                'class': 'related-conn'
            });
            $('.filter-head').connections('update');

        },
        filterHandler: function(){
            var $template_table = $(".template-wrapper");
            var $template_row = $(".template-row");
            var $template_head = $(".template-head");

            $(".btn-condition").click(function() {
                app.destroySelect2Filter();
                var $row = jQuery($template_row).clone(true).removeClass("template-row");
                var $head = jQuery($template_head).clone(true).removeClass("template-head");
               
                $(this).closest('.filter-wrapper').addClass('show-row');

                if (!$('#filters .filter-row').length){
                    // Add row when click "+ Add condition" first time
                    $('.dashed + .filter-inner').prepend($row);
                    $('.dashed.btn-wrapper').remove();
                } else {
                    $row.insertAfter($(this).closest(".filter-row"));
                }

                $(this).closest('.filter-inner').prepend($head).addClass('filter-inner-active');
                
                // if(!$('#filters > .filter-wrapper > .filter-inner > .filter-head').length){
                //     $(this).closest('.filter-inner').prepend($head).addClass('filter-inner-active');
                // }

                // if(!$('.sous-wrapper > .filter-inner > .filter-head').length){
                //     $(this).closest('.filter-inner').prepend($head).addClass('filter-inner-active');
                // }

                app.initSelect2Filter();
                
                    app.lineConnector();
                
            });

            $(".btn-sous").click(function() {
                app.destroySelect2Filter();
                var $head = jQuery($template_head).first().clone(true).removeClass("template-head");
                
                var $table = jQuery($template_table)
                    .clone(true)
                    .removeClass("template-wrapper").addClass('sous-wrapper');
                $table.insertAfter($(this).closest(".filter-row"));
                
                app.initSelect2Filter();
                  
                    app.lineConnector();
            });

            
        },
        datepicker: function(){
            $('#datetimepicker1').datetimepicker({
                format: 'L'
            });
            $('#datetimepicker2').datetimepicker({
                format: 'L',
                useCurrent: false
            });

            $("#datetimepicker1").on("change.datetimepicker", function (e) {
                $('#datetimepicker2').datetimepicker('minDate', e.date);
            });
            $("#datetimepicker2").on("change.datetimepicker", function (e) {
                $('#datetimepicker1').datetimepicker('maxDate', e.date);
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