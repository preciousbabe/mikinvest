const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const headerImage = document.querySelector(".header__image");
headerImage.addEventListener(
  "animationend",
  (e) => {
    setTimeout(() => {
      headerImage.classList.add("reveal");
    });
  },
  { once: true }
);

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 1200,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 800,
});
ScrollReveal().reveal(".header__content div", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".header .nav__links", {
  delay: 1500,
});
ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".about__content > div", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".mainImg", {
  ...scrollRevealOption,
  delay: 800,
});
ScrollReveal().reveal(".formTable", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".banner__card", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".banner__content h2", {
  ...scrollRevealOption,
  delay: 500,
});


ScrollReveal().reveal(".service__card", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".menu__card", {
  ...scrollRevealOption,
  interval: 500,
});

// Initialize Gallery Swiper after ScrollReveal setup completes
setTimeout(() => {
  const swiper = new Swiper('.gallery__swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    resizeObserver: true,
    autoHeight: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    on: {
      init: function() {
        setTimeout(() => this.update(), 100);
      }
    }
  });

  // Force recalculation after all images and fonts load
  window.addEventListener('load', () => {
    swiper.update();
    swiper.updateSize();
    swiper.updateSlides();
    swiper.slideTo(0, 0);
  });

  // Video click handlers - use display:none instead of innerHTML to preserve layout
  document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      const videoId = wrapper.dataset.videoId;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&controls=1`;
      iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:0;';
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      
      const poster = wrapper.querySelector('.video-poster');
      const playBtn = wrapper.querySelector('.play-button');
      if (poster) poster.style.display = 'none';
      if (playBtn) playBtn.style.display = 'none';
      
      wrapper.appendChild(iframe);
    });
  });
}, 100);

document.getElementById('toggleViewBtn').addEventListener('click', function (e) {
    e.preventDefault();

    const extraCards = document.querySelectorAll('.menu__card.extra');

    extraCards.forEach(card => {
        card.classList.toggle('hidden');
    });

    const isMore = this.textContent.includes('More');
    this.innerHTML = isMore 
        ? `View Less <i class="ri-arrow-right-long-line"></i>` 
        : `View More <i class="ri-arrow-right-long-line"></i>`;
});

// Initialize Testimonials Swiper
const swiper2 = new Swiper('.testimonials__swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Load Properties after everything is ready
document.addEventListener("DOMContentLoaded", () => {
    loadProperties();
});

document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let name = document.getElementById("fullName").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields.");
    return;
  }

  let phoneNumber = "+2347071455454";

  let whatsappMessage = `Hello, my name is ${name}. %0AEmail: ${email} %0A%0A${message}`;

  window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, "_blank");
});