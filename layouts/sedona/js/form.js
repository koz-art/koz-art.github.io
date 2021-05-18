var link = document.querySelector(".find-btn");
var popup = document.querySelector(".form-search");
var arrival = popup.querySelector("[name='arrival']");
var departure = popup.querySelector("[name='departure']");
var form = popup.querySelector("form");
      
link.addEventListener("click", function (event) {
  if (!(popup.classList.contains("form-search-show")))                     {
      event.preventDefault();
      popup.classList.add("form-search-show");
      arrival.focus();
    } 
  else 
    {
      event.preventDefault();
      popup.classList.remove("form-search-show");
      popup.classList.remove("form-search-error");
    }
});
      
form.addEventListener("submit", function (event) {
  if (!(arrival.value && departure.value)) 
    {
      event.preventDefault();
      popup.classList.remove("form-search-error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("form-search-error");
    }
});