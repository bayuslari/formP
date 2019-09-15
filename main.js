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
        lineConnector: function() {
            $('.filter-parent').connections({
                to: '.filter-row',
                'class': 'related-conn'
            });
        },
        filterHandler: function(){
            $('#btn-condition').click(function() {
                $('#filtres .btn-wrapper').fadeOut();
                $('.filter-wrapper').fadeIn(500);
                setTimeout(function(){
                    app.lineConnector();
                    app.select2();
                }, 600)
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