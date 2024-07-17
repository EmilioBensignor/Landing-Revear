const videos = [
  {
    image: "content/images/DiferenciasEntreMarbleYRevex.png",
    title: "Diferencias entre Marble y Revex",
    videoUrl: "https://www.youtube-nocookie.com/embed/f7-ZWkTGYWs?controls=0&disablekb=1&rel=0&autoplay=1&loop=1&playlist=f7-ZWkTGYWs",
    type: "short"
  },
  {
    image: "content/images/MarbleVerdeCemento.png",
    title: "Marble Verde Cemento",
    videoUrl: "https://www.youtube-nocookie.com/embed/fVtOTiRqedY?controls=0&disablekb=1&rel=0&autoplay=1&loop=1&playlist=fVtOTiRqedY",
    type: "short"
  },
  {
    image: "content/images/naturalStoneParis.png",
    title: "Natural Stone Paris",
    videoUrl: "https://www.youtube-nocookie.com/embed/ufP4zJde7jk?controls=0&disablekb=1&rel=0&autoplay=1&loop=1&playlist=ufP4zJde7jk",
    type: "short"
  },
  {
    image: "content/images/naturalStoneGrey.png",
    title: "Natural Stone Grey",
    videoUrl: "https://www.youtube-nocookie.com/embed/WXHlmNzAPqA?controls=0&disablekb=1&rel=0&autoplay=1&loop=1&playlist=WXHlmNzAPqA",
    type: "short"
  },
  {
    image: "content/images/ConoceMasDeNaturalStone.png",
    title: "Conocé más de Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/iQbP9CdunKg?controls=0&disablekb=1&rel=0&autoplay=1&loop=1&playlist=iQbP9CdunKg",
    type: "short"
  },
  {
    image: "content/images/ComoAplicarBaseRevear.png",
    title: "Cómo aplicar Revear Base",
    videoUrl: "https://www.youtube-nocookie.com/embed/zk9iLdP6irU?controls=0&disablekb=1&rel=0&autoplay=1&loop=1&playlist=zk9iLdP6irU",
    type: "horizontal"
  },
  {
    image: "content/images/ComoAplicarRevearMarble.png",
    title: "Cómo aplicar Revear Marble",
    videoUrl: "https://www.youtube-nocookie.com/embed/SgsdX98ZD-g?controls=0&disablekb=1&rel=0&autoplay=1&loop=1&playlist=SgsdX98ZD-g",
    type: "horizontal"
  },
  {
    image: "content/images/ComoAplicarRevoquePlastico.png",
    title: "Cómo aplicar Revoque Plástico",
    videoUrl: "https://www.youtube-nocookie.com/embed/UYqeqX9dLHw?controls=0&disablekb=1&rel=0&autoplay=1&loop=1&playlist=UYqeqX9dLHw",
    type: "horizontal"
  },
  {
    image: "content/images/ComoAplicarNaturalStone.png",
    title: "Cómo aplicar Natural Stone",
    videoUrl: "https://www.youtube-nocookie.com/embed/G8iHYJE6MEE?controls=0&disablekb=1&rel=0&autoplay=1&loop=1&playlist=G8iHYJE6MEE",
    type: "horizontal"
  },
  {
    image: "content/images/ComoAplicarRevearRevex.png",
    title: "Cómo aplicar Revear Revex",
    videoUrl: "https://www.youtube-nocookie.com/embed/GDbN_QZ-vl8?controls=0&disablekb=1&rel=0&autoplay=1&loop=1&playlist=GDbN_QZ-vl8",
    type: "horizontal"
  },
];

const swiperWrapper = document.getElementById('swiper-wrapper');
const videoFrame = document.getElementById('videoFrame');
let activeCard = null;

function createCards() {
  videos.forEach((video, index) => {
    const card = document.createElement('div');
    card.className = 'card swiper-slide';
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
    swiperWrapper.appendChild(card);

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

const swiper = new Swiper('.swiper', {
  loop: true,
  grabCursor: true,
  slidesPerView: 5,
  speed: 250,
  loopFillGroupWithBlank: false,
  loopedSlides: 4,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

window.onload = function () {
  if (videos.length > 0) {
    setVideoUrl(videos[0].videoUrl, videos[0].type);
  }
}