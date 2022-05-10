// Mobile menu
$('#mobile-menu-icon').on('click', function(e) {
  $('.product-sec').toggleClass("show");
  e.preventDefault();
});

$(document).ready(function(){
	$('#nav-icon2').click(function(){
		$(this).toggleClass('open');
	});
});

// design-Work 06-08-2021
(function(){
  $("#cart_popup").on("click", function(e) {
    $(".shopping-cart").fadeToggle( "fast");
    e.preventDefault();
  });
  

  $(".close-cart").on("click", function() {
    $(".shopping-cart").fadeToggle( "fast");
  });

  $("#logout_popup").on("click", function(e) {
    $(".user-logout").fadeToggle( "fast");
    e.preventDefault();
  });
  
})();
// design-Worke 06-08-2021

jQuery(document).on('change keyup', '.required', function(e){
    let Disabled = true;
    jQuery(".required").each(function() {
       let value = this.value
       if ((value)&&(value.trim() !=''))
           {
             Disabled = false
           }else{
             Disabled = true
             return false
           }
     });
    if(Disabled){
        jQuery('.toggle-disabled').prop("disabled", true);
       }else{
        jQuery('.toggle-disabled').prop("disabled", false);
       }
  });

  $(document).ready(function(){	
    $("body").on("click",".modal-btn",function(){         
       //appending modal background inside the blue div
       $('.modal-backdrop').appendTo('.products-con');        
       //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown     
       $('body').removeClass("modal-open")
         $('body').css("padding-right","");     
   });
 });

/* upload file */
$('#fileup').change(function(){
  //here we take the file extension and set an array of valid extensions
      var res=$('#fileup').val();
      var arr = res.split("\\");
      var filename=arr.slice(-1)[0];
      filextension=filename.split(".");
      filext="."+filextension.slice(-1)[0];
      valid=[".jpg",".png",".jpeg",".ai",".svg",".pdf"];
  //if file is not valid we show the error icon, the red alert, and hide the submit button
      if (valid.indexOf(filext.toLowerCase())==-1){
          $( ".imgupload" ).hide("slow");
          $( ".imgupload.ok" ).hide("slow");
          $( ".imgupload.stop" ).show("slow");
        
          $('#namefile').css({"color":"red","font-weight":700});
          $('#namefile').html("File "+filename+" is not  pic!");
          
          $( "#submitbtn" ).hide();
          $( "#fakebtn" ).show();
      }else{
          //if file is valid we show the green alert and show the valid submit
          $( ".imgupload" ).hide("slow");
          $( ".imgupload.stop" ).hide("slow");
          $( ".imgupload.ok" ).show("slow");
        
          $('#namefile').css({"color":"#001FD1","font-weight":700});
          $('#namefile').html(filename);
        
          $( "#submitbtn" ).show();
          $( "#fakebtn" ).hide();
      }
  });  
  

 // Add new element
 $(".add").click(function(){
  // Finding total number of elements added
  var total_element = $(".add-emp-row").length;                    
  // last <div> with element class id
  var lastid = $(".add-emp-row:last").attr("id");
  var split_id = lastid.split("_");
  var nextindex = Number(split_id[1]) + 1;

  var max = 10;
  // Check total number elements
  if(total_element < max ){
      // Adding new div container after last occurance of element class
      $(".add-emp-row:last").after("<div class='row add-emp-row align-items-center' id='div_"+ nextindex +"'></div>");                        
      // Adding element to <div>
      $("#div_" + nextindex).append("<div class='col-md-5'>" + "<label>Name & last name</label>" + "<input type='text' class='form-control' placeholder='Employee name'></div>" + "<div class='col-md-5'>" + "<label>Name & last name</label>" + "<input type='text' class='form-control' placeholder='Employee email'></div>" + "<div class='col-md-2 text-center'><a href='#' id='remove_" + nextindex + " 'class='remove remove-emp'><i class='fas fa-times'></i></a></div>");
  }                    
});
// Remove element
$('.add-emp-form').on('click','.remove',function(){                
  var id = this.id;
  var split_id = id.split("_");
  var deleteindex = split_id[1];
  // Remove <div> with id
  $("#div_" + deleteindex).remove();
});  

$(function () {

  var activeIndex = $('.active-tab').index(),
      $contentlis = $('.tabs-content li'),
      $tabslis = $('.tabs li');
  
  // Show content of active tab on loads
  $contentlis.eq(activeIndex).show();

  $('.tabs').on('click', 'li', function (e) {
    var $current = $(e.currentTarget),
        index = $current.index();
    
    $tabslis.removeClass('active-tab');
    $current.addClass('active-tab');
    $contentlis.hide().eq(index).show();
	 });
});



/*=====================================================================
========================== Product-Slider-with-zoom  =========================
========================================================================*/
function zoom(e){
  var zoomer = e.currentTarget;
  e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
  e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
  x = offsetX/zoomer.offsetWidth*100
  y = offsetY/zoomer.offsetHeight*100
  zoomer.style.backgroundPosition = x + '% ' + y + '%';
}

$(document).ready(function () {
  var bigimage = $(".big");
  var thumbs = $("#thumbs");
  var bigPopup = $("#big-popup");
  //var totalslides = 10;
  var syncedSecondary = true;

  bigimage
      .owlCarousel({
          items: 1,
          slideSpeed: 2000,
          nav: false,
          autoplay: false,
          dots: false,
          loop: false,
          responsiveRefreshRate: 200
      })
      .on("changed.owl.carousel", syncPosition);

  thumbs
      .on("initialized.owl.carousel", function () {
          thumbs
              .find(".owl-item")
              .eq(0)
              .addClass("current");
      })
      .owlCarousel({
          items: 5,
          dots: true,
          nav: false,
          autoplay: false,
          smartSpeed: 200,
          slideSpeed: 500,
          slideBy: 1,
          responsiveRefreshRate: 100
      })
      .on("changed.owl.carousel", syncPosition2);

  function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;

      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
          current = count;
      }
      if (current > count) {
          current = 0;
      }
      //to this
      thumbs
          .find(".owl-item")
          .removeClass("current")
          .eq(current)
          .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
          .find(".owl-item.active")
          .first()
          .index();
      var end = thumbs
          .find(".owl-item.active")
          .last()
          .index();

      if (current > end) {
          thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
          thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
  }

  function syncPosition2(el) {
      if (syncedSecondary) {
          var number = el.item.index;
          bigimage.data("owl.carousel").to(number, 100, true);
      }
  }

  thumbs.on("click", ".owl-item", function (e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
  });
});