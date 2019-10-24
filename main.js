(function(e) {
  e(window.jQuery, window, document);
})(function($, window, document) {
  console.log("init");
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
      app.updateLineWhenAccordionChange();
      app.textareaCounter();
      app.dataTable();
    },

    onResize: function() {
      // call function here to applied on resize window
    },

    // ======================================================================
    // Your function here
    // * Don't forget to use proper function name to describes your function
    // ======================================================================
    select2: function() {
      $("select").select2();
    },
    initSelect2Filter: function() {
      $(".select-choisir").select2();
      $(".select-condition").select2();
    },
    destroySelect2Filter: function() {
      $(".select-choisir").select2("destroy");
      $(".select-condition").select2("destroy");
    },
    lineConnector: function($this) {
      // btn Condition
      var x = $this.closest(".filter-wrapper").attr("data-id");
      $(
        '.filter-wrapper[data-id="' + x + '"] > .filter-inner > .filter-head'
      ).connections({
        to:
          '.filter-wrapper[data-id="' + x + '"] > .filter-inner > .filter-row',
        class: "related-conn"
      });

      // btn Sous
      var x = $this.closest(".filter-wrapper").attr("data-id");
      $(
        '.filter-wrapper[data-id="' + x + '"] > .filter-inner > .filter-head'
      ).connections({
        to:
          '.filter-wrapper[data-id="' +
          x +
          '"] > .filter-inner > .filter-wrapper',
        class: "related-conn"
      });

      app.updateLineConnection();
    },
    updateLineConnection() {
      // Update line connection
      $(".filter-head").connections("update");
      $(".filter-wrapper").connections("update");
      $(".filter-row").connections("update");
    },
    filterHandler: function() {
      var $template_table = $(".template-wrapper");
      var $template_row = $(".template-row");
      var $template_initial = $(".template-initial");

      $(".filter-btn-wrapper > .btn-condition, .dashed > .btn-condition").click(
        function() {
          app.destroySelect2Filter();

          var $row = jQuery($template_row)
            .clone(true)
            .removeClass("template-row");
          var $dataId = parseInt(
            $(this)
              .parents(".filter-wrapper")
              .attr("data-id")
          );

          if ($(".btn-wrapper + .filter-inner > div").length < 3) {
            // Add row when click "+ Add condition" first time
            $(this)
              .closest(".filter-wrapper")
              .addClass("first-wrapper");
            $(".dashed + .filter-inner > .filter-head").after($row);
          } else {
            $(this)
              .closest(".filter-inner > .filter-btn-wrapper")
              .before($row);
          }

          // Add class .filter-inner-active
          var childCount = $(
            '.filter-wrapper[data-id="' + $dataId + '"] > .filter-inner > div'
          ).length;
          if (childCount === 4) {
            $(this)
              .closest(".filter-inner")
              .addClass("filter-inner-active");
          }

          app.initSelect2Filter();
          app.lineConnector($(this));
        }
      );

      $(".filter-btn-wrapper > .btn-sous, .dashed > .btn-sous").click(
        function() {
          app.destroySelect2Filter();
          var $dataId = parseInt(
            $(this)
              .closest(".filter-wrapper")
              .attr("data-id")
          );
          var $wrapperLength = $(".filter-wrapper").length - 1;

          var $table = jQuery($template_table)
            .clone(true)
            .removeClass("template-wrapper")
            .addClass("sous-wrapper")
            .attr("data-id", $wrapperLength++);
          $(this)
            .closest(".filter-inner > .filter-btn-wrapper")
            .before($table);

          if ($(".btn-wrapper + .filter-inner > div").length < 3) {
            // Add row when click "+ Add sous" first time
            $(this)
              .closest(".filter-wrapper")
              .addClass("first-wrapper");
            $(".dashed + .filter-inner > .filter-head").after($table);
          } else {
            $(this)
              .closest(".filter-inner > .filter-btn-wrapper")
              .before($table);
          }

          // Add class .filter-inner-active
          var childCount = $(
            '.filter-wrapper[data-id="' + $dataId + '"] > .filter-inner > div'
          ).length;

          if (childCount === 4) {
            $(this)
              .closest(".filter-inner")
              .addClass("filter-inner-active");
          }

          app.initSelect2Filter();
          app.lineConnector($(this));
        }
      );

      $(".btn-remove").click(function() {
        var $tr = $(this).closest(".filter-row");
        var $table = $(this).closest(".first-wrapper");
        var $tableSous = $(this).closest(".sous-wrapper > .filter-inner");
        var $tableFirst = $(this).closest(".first-wrapper > .filter-inner");

        if ($tableSous.children().length <= 3) {
          $tableSous.closest(".sous-wrapper").remove();
          $(this)
            .closest(".sous-wrapper > .filter-inner")
            .removeClass("filter-inner-active");
        } else if ($tableSous.children().length <= 4) {
          // $tableSous.removeClass('filter-inner-active');
          $(this)
            .closest(".sous-wrapper > .filter-inner")
            .removeClass("filter-inner-active");
          $tr.remove();
        } else {
          $tr.remove();
        }

        if ($tableFirst.children().length <= 3) {
          $table.removeClass("first-wrapper");
          $(this)
            .closest(".first-wrapper > .filter-inner")
            .removeClass("filter-inner-active");
          $tr.remove();
        } else if ($tableFirst.children().length <= 4) {
          $(this)
            .closest(".first-wrapper > .filter-inner")
            .removeClass("filter-inner-active");
          $tr.remove();
        } else if ($tableFirst.children().length > 4) {
          $tr.remove();
        }

        app.updateLineConnection();
      });
    },
    datepicker: function() {
      $("#datetimepicker1").datetimepicker({
        format: "L",
        previous: "far fa-chevron-left",
        next: "far fa-chevron-right"
      });
      $("#datetimepicker2").datetimepicker({
        format: "L",
        useCurrent: false
      });

      $("#datetimepicker1").on("change.datetimepicker", function(e) {
        $("#datetimepicker2").datetimepicker("minDate", e.date);
      });
      $("#datetimepicker2").on("change.datetimepicker", function(e) {
        $("#datetimepicker1").datetimepicker("maxDate", e.date);
      });
    },
    updateLineWhenAccordionChange: function() {
      $(".accordion").on("hide.bs.collapse", function() {
        app.updateLineConnection();
        $("html").addClass("accordion-hide");
      });
      $(".accordion").on("shown.bs.collapse", function() {
        $("html").removeClass("accordion-hide");
        setTimeout(() => {
          app.updateLineConnection();
        }, 100);
      });
    },
    textareaCounter: function() {
      // Init label textarea
      $(".textarea-counter").each(function() {
        var maxlength = $(this)
          .find("textarea")
          .attr("maxlength");
        $(this)
          .find(".length")
          .html(maxlength);
        $(this)
          .find(".maxlength")
          .html(maxlength);
      });
      // When typing
      $(".textarea-counter textarea").on("input", function() {
        var maxlength = $(this).attr("maxlength");
        var currentLength = $(this).val().length;

        if (currentLength >= maxlength + 1) {
          return;
        } else {
          $(this)
            .parent()
            .find(".length")
            .html(maxlength - currentLength);
        }

        // Placeholder typewriter
        if (currentLength > 0) {
          $(this)
            .parent()
            .addClass("hide-typewriter");
        } else {
          $(this)
            .parent()
            .removeClass("hide-typewriter");
        }
      });
    },
    dataTable: function() {
      /* Create an array with the values of all the checkboxes in a column */
      $.fn.dataTable.ext.order["dom-checkbox"] = function(settings, col) {
        return this.api()
          .column(col, { order: "index" })
          .nodes()
          .map(function(td, i) {
            return $("input", td).prop("checked") ? "1" : "0";
          });
      };

      $(document).ready(function() {
        var table = $(".table-datatable").DataTable({
          columnDefs: [
            {
              targets: [0],
              orderDataType: "dom-checkbox"
            }
          ],
          paging: false,
          bFilter: true,
          ordering: true,
          searching: false,
          dom: "t"
        });

        $(":checkbox").on("change", function(e) {
          var row = $(this).closest("tr");
          // var hmc = row.find(":checkbox:checked").length;
          // var kluj = parseInt(hmc);
          // row.find("td.counter").text(kluj);
          table.row(row).invalidate("dom");
        });
        $('.dataTable').on("click", ".btn-remove", function(){
          table.row($(this).parents('tr')).remove().draw(false);
        });
      });
    }
  };

  $(document).ready(function() {
    app.init($);
    $(window).resize(function() {
      app.onResize();
    });
  });
});
