window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  var options = {
    slidesToScroll: 1,
    slidesToShow: 3,
    loop: true,
    infinite: false,
    navigation: true,
    pagination: true,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach('.carousel', options);

  carousels.forEach(function (carousel) {
    var wrap = carousel.element.closest('.carousel-wrap');
    if (!wrap) return;

    // 箭头默认挂在 .slider 内，会被轮播容器的 overflow: hidden 裁掉。
    // 移到 .carousel-wrap 下即可显示在两侧留白中；
    // appendChild 会保留已绑定的点击事件。
    ['.slider-navigation-previous', '.slider-navigation-next'].forEach(function (sel) {
      var arrow = carousel.element.querySelector(sel);
      if (arrow) wrap.appendChild(arrow);
    });
  });

  // 当滑块数量不超过当前可见数量时，隐藏箭头与圆点
  function refreshControls() {
    carousels.forEach(function (carousel) {
      var wrap = carousel.element.closest('.carousel-wrap');
      if (!wrap) return;
      var hasMore = carousel.state.length > carousel.slidesToShow;
      wrap.classList.toggle('has-no-controls', !hasMore);
    });
  }

  refreshControls();
  window.addEventListener('resize', refreshControls);
  window.addEventListener('orientationchange', refreshControls);

  bulmaSlider.attach();
});
