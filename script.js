
// Simple contact form handler: show a thank-you popup and reset form
document.addEventListener('DOMContentLoaded', function(){
  var form = document.getElementById('contact-form');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Thank you for contacting Unlac Health! We will get back to you soon.');
    form.reset();
  });
});
