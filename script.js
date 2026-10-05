document.addEventListener("DOMContentLoaded", () => {


  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

      menuToggle.classList.toggle("active");

      navbar.classList.toggle("open");

      document.body.classList.toggle("menu-open");

    });


    navbar.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        navbar.classList.remove("open");

        document.body.classList.remove("menu-open");

      });

    });

  }


  /* =====================================================
     HEADER SCROLL
  ===================================================== */

  const header = document.getElementById("header");

  if (header) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 50) {

        header.classList.add("scrolled");

      } else {

        header.classList.remove("scrolled");

      }

    });

  }


  /* =====================================================
     HERO SLIDER
  ===================================================== */

  const slides =
    document.querySelectorAll(".hero-slide");

  const dots =
    document.querySelectorAll(".dot");

  const nextButton =
    document.getElementById("nextSlide");

  const prevButton =
    document.getElementById("prevSlide");


  if (slides.length) {

    let currentSlide = 0;

    let sliderTimer;


    function showSlide(index) {

      if (index >= slides.length) {

        index = 0;

      }

      if (index < 0) {

        index = slides.length - 1;

      }


      slides.forEach(slide => {

        slide.classList.remove("active");

      });


      dots.forEach(dot => {

        dot.classList.remove("active");

      });


      slides[index].classList.add("active");


      if (dots[index]) {

        dots[index].classList.add("active");

      }


      currentSlide = index;

    }


    function nextSlide() {

      showSlide(currentSlide + 1);

    }


    function previousSlide() {

      showSlide(currentSlide - 1);

    }


    function startSlider() {

      clearInterval(sliderTimer);

      sliderTimer =
        setInterval(nextSlide, 5500);

    }


    if (nextButton) {

      nextButton.addEventListener("click", () => {

        nextSlide();

        startSlider();

      });

    }


    if (prevButton) {

      prevButton.addEventListener("click", () => {

        previousSlide();

        startSlider();

      });

    }


    dots.forEach((dot, index) => {

      dot.addEventListener("click", () => {

        showSlide(index);

        startSlider();

      });

    });


    showSlide(0);

    startSlider();

  }


  /* =====================================================
     REVEAL ON SCROLL
  ===================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (revealElements.length) {

    const revealObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },

        {
          threshold: .12
        }

      );


    revealElements.forEach(element => {

      revealObserver.observe(element);

    });

  }


  /* =====================================================
     PROJECT LIGHTBOX
  ===================================================== */

  const galleryItems =
    document.querySelectorAll(".gallery-item");

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImage =
    document.getElementById("lightboxImage");

  const lightboxClose =
    document.getElementById("lightboxClose");

  const lightboxPrev =
    document.getElementById("lightboxPrev");

  const lightboxNext =
    document.getElementById("lightboxNext");

  const lightboxCounter =
    document.getElementById("lightboxCounter");


  if (
    galleryItems.length &&
    lightbox &&
    lightboxImage
  ) {

    let currentImage = 0;


    function openLightbox(index) {

      currentImage = index;

      updateLightbox();

      lightbox.classList.add("active");

      document.body.style.overflow = "hidden";

    }


    function closeLightbox() {

      lightbox.classList.remove("active");

      document.body.style.overflow = "";

    }


    function updateLightbox() {

      const image =
        galleryItems[currentImage]
          .querySelector("img");


      if (!image) return;


      lightboxImage.src =
        image.src;


      lightboxImage.alt =
        image.alt;


      if (lightboxCounter) {

        lightboxCounter.textContent =
          `${currentImage + 1} / ${galleryItems.length}`;

      }

    }


    function nextImage() {

      currentImage++;

      if (
        currentImage >=
        galleryItems.length
      ) {

        currentImage = 0;

      }

      updateLightbox();

    }


    function previousImage() {

      currentImage--;

      if (currentImage < 0) {

        currentImage =
          galleryItems.length - 1;

      }

      updateLightbox();

    }


    galleryItems.forEach((item, index) => {

      item.addEventListener("click", () => {

        openLightbox(index);

      });

    });


    if (lightboxClose) {

      lightboxClose.addEventListener(
        "click",
        closeLightbox
      );

    }


    if (lightboxNext) {

      lightboxNext.addEventListener(
        "click",
        nextImage
      );

    }


    if (lightboxPrev) {

      lightboxPrev.addEventListener(
        "click",
        previousImage
      );

    }


    lightbox.addEventListener("click", event => {

      if (event.target === lightbox) {

        closeLightbox();

      }

    });


    document.addEventListener("keydown", event => {

      if (
        !lightbox.classList.contains("active")
      ) {

        return;

      }


      if (event.key === "Escape") {

        closeLightbox();

      }


      if (event.key === "ArrowLeft") {

        nextImage();

      }


      if (event.key === "ArrowRight") {

        previousImage();

      }

    });

  }


  /* =====================================================
     CONTACT FORM -> WHATSAPP
  ===================================================== */

  const contactForm =
    document.getElementById("contactForm");


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const name =
          document.getElementById("name")
            ?.value.trim();


        const phone =
          document.getElementById("phone")
            ?.value.trim();


        const service =
          document.getElementById("service")
            ?.value.trim();


        const message =
          document.getElementById("message")
            ?.value.trim();


        const whatsappNumber =
          "966542546474";


        const text =
          `السلام عليكم، أرغب في التواصل مع شركة حدث الجنوب التجارية.

الاسم: ${name}

رقم الجوال: ${phone}

الخدمة المطلوبة: ${service || "غير محددة"}

تفاصيل المشروع:
${message}`;


        const url =
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;


        window.open(url, "_blank");

      }

    );

  }


});