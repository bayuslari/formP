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
        lineConnector: function($this) {
            // btn Condition
            var x = $this.closest('.filter-wrapper').attr('data-id');
            $('.filter-wrapper[data-id="'+ x +'"] > .filter-inner > .filter-head').connections({
                to: '.filter-wrapper[data-id="'+ x +'"] > .filter-inner > .filter-row',
                'class': 'related-conn'
            });

            // btn Sous
            var x = $this.closest('.filter-wrapper').attr('data-id');
            $('.filter-wrapper[data-id="'+ x +'"] > .filter-inner > .filter-head').connections({
                to: '.filter-wrapper[data-id="'+ x +'"] > .filter-inner > .filter-wrapper',
                'class': 'related-conn'
            });

            // Update line connection
            $('.filter-head').connections('update');
            $('.filter-wrapper').connections('update');
            $('.filter-row').connections('update');
        },
        filterHandler: function(){
            var $template_table = $(".template-wrapper");
            var $template_row = $(".template-row");
            var $template_btn_sous = $(".template-btn-sous");

            $(".filter-btn-wrapper > .btn-condition, .btn-wrapper > .btn-condition").click(function() {
                app.destroySelect2Filter();
                var $row = jQuery($template_row).clone(true).removeClass("template-row");
               
                $(this).closest('.filter-wrapper').addClass('show-row');

                if (!$('#filters .filter-row').length){
                    // Add row when click "+ Add condition" first time    
                    $('.dashed + .filter-inner').append($row);
                    $('.dashed.btn-wrapper').remove();
                } else {
                    $row.insertAfter($(this).closest(".filter-row"));
                }

                // Add class .filter-inner-active
                var $dataId = parseInt($(this).closest('.filter-wrapper').attr('data-id'));
                var childCount = $('.filter-wrapper[data-id="'+ $dataId +'"] > .filter-inner > div').length;
                if (childCount === 3) {
                    $(this).closest('.filter-inner').addClass('filter-inner-active');
                }
                
                app.initSelect2Filter();
                app.lineConnector($(this));
                
            
            });

            $(".filter-btn-wrapper > .btn-sous, .btn-wrapper > .btn-sous").click(function() {
                app.destroySelect2Filter();
                var $dataId = parseInt($(this).closest('.filter-wrapper').attr('data-id'));
                var $wrapperLength = $('.filter-wrapper').length - 1;

                var $table = jQuery($template_table)
                    .clone(true)
                    .removeClass("template-wrapper").children().addClass('sous-wrapper').attr('data-id', $wrapperLength++);
                $table.insertAfter($(this).closest(".filter-row"));

                
                var childCount = $('.filter-wrapper[data-id="'+ $dataId +'"] > .filter-inner > div').length;
                if (childCount === 3) {
                    $(this).closest('.filter-inner').addClass('filter-inner-active');
                }

                // If btn sous clicked, than add btn after this
                var $btnAfterSous = jQuery($template_btn_sous)
                    .clone(true)
                    .removeClass("filter-btn-wrapper template-btn-sous");
                if (!$('.filter-wrapper[data-id="'+ $dataId +'"] > .filter-inner > .filter-btn-after-sous').length){
                    $(this).closest('.filter-inner').append($btnAfterSous);
                }

                app.initSelect2Filter();
                app.lineConnector($(this));
            });

            // Btn after sous
            $(".filter-btn-after-sous > .btn-condition").click(function() {
                app.destroySelect2Filter();
                var $row = jQuery($template_row).clone(true).removeClass("template-row");
                
                $row.insertBefore($(this).parent());
                app.initSelect2Filter();

                $(this).parent().addClass('d-none');
                app.lineConnector($(this));
                setTimeout(() => {
                    $(this).parent().remove();
                }, 300);
            });


            $(".btn-after-sous > .btn-sous").click(function() {
                // app.destroySelect2Filter();
                // var $dataId = parseInt($(this).closest('.filter-wrapper').attr('data-id'));
                // var $table = jQuery($template_table_sous)
                //     .clone(true)
                //     .removeClass("template-wrapper-sous").children().addClass('sous-wrapper').attr('data-id', $dataId + 2);
                // $table.insertBefore($(this).parent());
                // app.initSelect2Filter();
                
                // app.lineConnector($(this));
                
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