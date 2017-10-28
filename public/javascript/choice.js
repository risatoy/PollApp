$(document).ready(function() {

      $(".addButton").click(function(){
          var html = $(".hide").html();
          $(".after-addButton").after(html);
      });

      $("body").on("click",".removeButton",function(){
          $(this).parents(".control-group").remove();
      });

});
