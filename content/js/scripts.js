const videos = [
  {
    image: "content/images/EjImgVideo.png",
    title: "Revear Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/2OJMCqeeoGY?controls=0&disablekb=1&rel=0&autoplay=1"
  },
  {
    image: "content/images/EjImgVideo.png",
    title: "Revear Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/Al3477ilPgs?controls=0&disablekb=1&rel=0&autoplay=1"
  },
  {
    image: "content/images/EjImgVideo.png",
    title: "Revear Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/5k56KY5JHgs?controls=0&disablekb=1&rel=0&autoplay=1"
  },
  {
    image: "content/images/EjImgVideo.png",
    title: "Revear Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/2OJMCqeeoGY?controls=0&disablekb=1&rel=0&autoplay=1"
  },
  {
    image: "content/images/EjImgVideo.png",
    title: "Revear Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/2OJMCqeeoGY?controls=0&disablekb=1&rel=0&autoplay=1"
  },
  {
    image: "content/images/EjImgVideo.png",
    title: "Revear Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/2OJMCqeeoGY?controls=0&disablekb=1&rel=0&autoplay=1"
  },
  {
    image: "content/images/EjImgVideo.png",
    title: "Revear Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/2OJMCqeeoGY?controls=0&disablekb=1&rel=0&autoplay=1"
  },
  {
    image: "content/images/EjImgVideo.png",
    title: "Revear Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/2OJMCqeeoGY?controls=0&disablekb=1&rel=0&autoplay=1"
  },
  {
    image: "content/images/EjImgVideo.png",
    title: "Revear Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/2OJMCqeeoGY?controls=0&disablekb=1&rel=0&autoplay=1"
  },
  {
    image: "content/images/EjImgVideo.png",
    title: "Revear Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/2OJMCqeeoGY?controls=0&disablekb=1&rel=0&autoplay=1"
  },
];

const slider = document.getElementById('slider');
const videoFrame = document.getElementById('videoFrame');
let activeCard = null;

function createCards() {
  videos.forEach((video, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundImage = `url(${video.image})`;
    card.setAttribute('data-video-url', video.videoUrl);
    card.innerHTML = `<p>${video.title}</p>`;
    card.addEventListener('click', () => {
      videoFrame.src = video.videoUrl;
      videoFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      if (activeCard) {
        activeCard.classList.remove('active');
      }
      card.classList.add('active');
      activeCard = card;
    });
    slider.appendChild(card);

    if (index === 0) {
      setVideoUrl(video.videoUrl);
      card.classList.add('active');
      activeCard = card;
    }
  });
}

function setVideoUrl(url) {
  videoFrame.src = url;
  videoFrame.onload = () => {
    videoFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  };
}

createCards();

window.onload = function() {
  if (videos.length > 0) {
    setVideoUrl(convertToEmbedUrl(videos[0].videoUrl));
  }
};

let currentIndex = 0;
const totalCards = videos.length;
const cardsToShow = 5;
const cardWidth = 240;

let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

const sliderContainer = document.querySelector('.slider-container');

sliderContainer.addEventListener('mousedown', startDrag);
sliderContainer.addEventListener('touchstart', startDrag);

sliderContainer.addEventListener('mouseup', endDrag);
sliderContainer.addEventListener('mouseleave', endDrag);
sliderContainer.addEventListener('touchend', endDrag);

sliderContainer.addEventListener('mousemove', drag);
sliderContainer.addEventListener('touchmove', drag);

function startDrag(event) {
  isDragging = true;
  startPosition = getPositionX(event);
  animationID = requestAnimationFrame(animation);
}

function endDrag() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < totalCards - cardsToShow) {
    currentIndex++;
  }

  if (movedBy > 100 && currentIndex > 0) {
    currentIndex--;
  }

  updateSlider();
}

function drag(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPosition;
  }
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}

function updateSlider() {
  currentTranslate = -currentIndex * cardWidth;
  prevTranslate = currentTranslate;
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
}

function nextSlide() {
  if (currentIndex < totalCards - cardsToShow) {
    currentIndex++;
    updateSlider();
  }
}

document.querySelector('.prev').addEventListener('click', prevSlide);
document.querySelector('.next').addEventListener('click', nextSlide);

document.addEventListener('DOMContentLoaded', () => {
  updateSlider();
});

document.addEventListener('keydown', function (event) {
  if (event.key === "Escape" || event.key === "Backspace" || event.key === "Alt") {
    event.preventDefault();
  }
});

document.addEventListener('contextmenu', event => event.preventDefault());