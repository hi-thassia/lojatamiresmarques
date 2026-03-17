(function () {
  var section = document.querySelector('.reels-section');
  if (!section) return;

  var items   = section.querySelectorAll('.reel-item');
  var dots    = section.querySelectorAll('.reel-dot');
  var prevBtn = section.querySelector('.reel-arrow--prev');
  var nextBtn = section.querySelector('.reel-arrow--next');
  var muteBtn = section.querySelector('.reel-mute-btn');
  var iconMuted   = muteBtn.querySelector('.icon-muted');
  var iconUnmuted = muteBtn.querySelector('.icon-unmuted');

  var currentIndex     = 0;
  var isMuted          = true;
  var isSectionVisible = false;

  function activeVideo() {
    return items[currentIndex].querySelector('video');
  }

  function updateMuteUI() {
    if (isMuted) {
      iconMuted.style.display   = '';
      iconUnmuted.style.display = 'none';
      muteBtn.setAttribute('aria-label', 'Ativar som');
    } else {
      iconMuted.style.display   = 'none';
      iconUnmuted.style.display = '';
      muteBtn.setAttribute('aria-label', 'Desativar som');
    }
  }

  function goTo(index) {
    var oldVideo = activeVideo();
    oldVideo.pause();

    items[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');

    currentIndex = (index + items.length) % items.length;

    items[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');

    var newVideo = activeVideo();
    newVideo.muted = isMuted;

    if (isSectionVisible) {
      newVideo.play().catch(function () {});
    }
  }

  muteBtn.addEventListener('click', function () {
    isMuted = !isMuted;
    activeVideo().muted = isMuted;
    updateMuteUI();
  });

  prevBtn.addEventListener('click', function () {
    goTo(currentIndex - 1);
  });

  nextBtn.addEventListener('click', function () {
    goTo(currentIndex + 1);
  });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      if (i !== currentIndex) goTo(i);
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      isSectionVisible = entry.isIntersecting;
      var video = activeVideo();
      if (entry.isIntersecting) {
        video.muted = isMuted;
        video.play().catch(function () {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);

  // Init UI
  updateMuteUI();
})();
