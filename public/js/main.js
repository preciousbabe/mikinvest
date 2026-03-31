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
// Photo gallery items
ScrollReveal().reveal(".gallery__item", {
  ...scrollRevealOption,
  interval: 150
});


ScrollReveal().reveal(".service__card", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".menu__card", {
  ...scrollRevealOption,
  interval: 500,
});





// Initialize Swiper
const swiper = new Swiper('.gallery__swiper', {
  slidesPerView: 1, // Default for mobile
  spaceBetween: 10,
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
      slidesPerView: 2, // For tablets
    },
    1024: {
      slidesPerView: 3, // For desktops
    },
  },
});


document.getElementById('toggleViewBtn').addEventListener('click', function (e) {
    e.preventDefault();

    const hiddenCards = document.querySelectorAll('.menu__card.hidden');

    hiddenCards.forEach(card => {
        card.classList.toggle('show');
    });

    this.textContent = this.textContent.includes('More') 
        ? 'View Less' 
        : 'View More';
});



// Initialize Swiper
const swiper2 = new Swiper('.testimonials__swiper', {
  slidesPerView: 1, // Default for mobile
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
      slidesPerView: 2, // Two testimonials per row on tablets
    },
    1024: {
      slidesPerView: 3, // Three testimonials per row on desktops
    },
  },
});


// Load Properties after everything is ready
document.addEventListener("DOMContentLoaded", () => {
    loadProperties();
});

document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  let name = document.getElementById("fullName").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  // Validate inputs
  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields.");
    return;
  }

  // WhatsApp Number (replace with actual number)
  let phoneNumber = "+2347071455454"; // Example: replace with your WhatsApp number

  // Format message for WhatsApp
  let whatsappMessage = `Hello, my name is ${name}. %0AEmail: ${email} %0A%0A${message}`;

  // Open WhatsApp chat
  window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, "_blank");
});
