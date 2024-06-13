const videos = [
  {
    image: "content/images/DiferenciasEntreMarbleYRevex.png",
    title: "Diferencias entre Marble y Revex",
    videoUrl: "https://www.youtube-nocookie.com/embed/m-LI-gu6B-0?controls=0&disablekb=1&rel=0&autoplay=1",
    type: "short"
  },
  {
    image: "content/images/MarbleVerdeCemento.png",
    title: "Marble Verde Cemento",
    videoUrl: "https://www.youtube-nocookie.com/embed/H9wAvG8GOmU?controls=0&disablekb=1&rel=0&autoplay=1",
    type: "short"
  },
  {
    image: "content/images/naturalStoneParis.png",
    title: "Natural Stone Paris",
    videoUrl: "https://www.youtube-nocookie.com/embed/2I98kOjsYZA?controls=0&disablekb=1&rel=0&autoplay=1",
    type: "short"
  },
  {
    image: "content/images/naturalStoneGrey.png",
    title: "Natural Stone Grey",
    videoUrl: "https://www.youtube-nocookie.com/embed/YDgBWyeSoYc?controls=0&disablekb=1&rel=0&autoplay=1",
    type: "short"
  },
  {
    image: "content/images/ConoceMasDeNaturalStone.png",
    title: "Conocé más de Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/2OJMCqeeoGY?controls=0&disablekb=1&rel=0&autoplay=1",
    type: "short"
  },
  {
    image: "content/images/ComoAplicarBaseRevear.png",
    title: "Cómo aplicar Revear Base",
    videoUrl: "https://www.youtube-nocookie.com/embed/Q29wEHJXblk?controls=0&disablekb=1&rel=0&autoplay=1",
    type: "horizontal"
  },
  {
    image: "content/images/ComoAplicarRevearMarble.png",
    title: "Cómo aplicar Revear Marble",
    videoUrl: "https://www.youtube-nocookie.com/embed/yFTj999qe6w?controls=0&disablekb=1&rel=0&autoplay=1",
    type: "horizontal"
  },
  {
    image: "content/images/ComoAplicarRevoquePlastico.png",
    title: "Cómo aplicar Revoque Plástico",
    videoUrl: "https://www.youtube-nocookie.com/embed/6BgkeRUCGyQ?controls=0&disablekb=1&rel=0&autoplay=1",
    type: "horizontal"
  },
  {
    image: "content/images/ComoAplicarNaturalStone.png",
    title: "Cómo aplicar Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/K_SYd6rzIwk?controls=0&disablekb=1&rel=0&autoplay=1",
    type: "horizontal"
  },
  {
    image: "content/images/ComoAplicarRevearRevex.png",
    title: "Cómo aplicar Revear Revex",
    videoUrl: "https://www.youtube-nocookie.com/embed/EJ2QI4Sm6so?controls=0&disablekb=1&rel=0&autoplay=1",
    type: "horizontal"
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
    card.setAttribute('data-video-type', video.type);
    card.innerHTML = `<p>${video.title}</p>`;
    card.addEventListener('click', () => {
      videoFrame.src = video.videoUrl;
      videoFrame.classList.remove('short', 'horizontal');
      videoFrame.classList.add(video.type);
      videoFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      if (activeCard) {
        activeCard.classList.remove('active');
      }
      card.classList.add('active');
      activeCard = card;
    });
    slider.appendChild(card);

    if (index === 0) {
      setVideoUrl(video.videoUrl, video.type);
      card.classList.add('active');
      activeCard = card;
    }
  });
}

function setVideoUrl(url, type) {
  videoFrame.src = url;
  videoFrame.classList.remove('short', 'horizontal');
  videoFrame.classList.add(type);
  videoFrame.onload = () => {
    videoFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  };
}

createCards();

window.onload = function () {
  if (videos.length > 0) {
    setVideoUrl(videos[0].videoUrl, videos[0].type);
  }
}

let currentIndex = 0;
const totalCards = videos.length;
const cardsToShow = 5;
const cardWidth = 240;

function updateSlider() {
  const translateValue = -currentIndex * cardWidth;
  slider.style.transform = `translateX(${translateValue}px)`;
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
    prevTranslate = -currentIndex * cardWidth;
  }
}

function nextSlide() {
  if (currentIndex < totalCards - cardsToShow) {
    currentIndex++;
    updateSlider();
    prevTranslate = -currentIndex * cardWidth;
  }
}

document.querySelector('.prev').addEventListener('click', prevSlide);
document.querySelector('.next').addEventListener('click', nextSlide);

document.addEventListener('DOMContentLoaded', () => {
  updateSlider();
});

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
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
}

function endDrag() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < totalCards - cardsToShow) {
    currentIndex++;
  } else if (movedBy > 100 && currentIndex > 0) {
    currentIndex--;
  }

  updateSlider();
  prevTranslate = currentTranslate;
}

function drag(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  if (isDragging) requestAnimationFrame(animation);
}

document.addEventListener('keydown', function (event) {
  if (event.key === "Escape" || event.key === "Backspace" || event.key === "Alt") {
    event.preventDefault();
  }
});

document.addEventListener('contextmenu', event => event.preventDefault());