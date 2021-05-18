var link = document.querySelector(".btn-show-feedback");
var close = document.querySelector(".btn-form-close");
var popup = document.querySelector(".form-feedback");
var infocus = document.querySelector("[name='your-name']");
      
link.addEventListener("click", function (event) {
  event.preventDefault();
  popup.classList.add("form-feedback-show");
  infocus.focus();
});

close.addEventListener("click", function (event) {
  event.preventDefault();
  popup.classList.remove("form-feedback-show");   
});
