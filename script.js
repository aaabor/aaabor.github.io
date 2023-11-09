var img = document.getElementById('img');
var slides = ["BannerA.png", "BannerB.png", "BannerC.png"];
var currentSlide = 0;

function slider() {
  currentSlide += 1;
  if (currentSlice >= slides.length)
    currentSlide = 0;

  img.innerHTML = "<img src=\"banners/" + slides[currentSlide] + "\" />";
}

setInterval(slider, 3000);