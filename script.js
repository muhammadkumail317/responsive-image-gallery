// ==== Select Elements ====

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox-image");

const closeBtn = document.querySelector(".close");

const currentImage = document.getElementById("current-image");

const totalImages = document.getElementById("total-images");

const prevBtn = document.querySelector(".prev");

const nextBtn = document.querySelector(".next");

let currentIndex = 0;

totalImages.textContent = galleryItems.length;

// ==== Open Lightbox ====

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentIndex = index;

        updateLightbox();

        lightbox.classList.add("active");

    });

});
// ==== Close Lightbox ====

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("active");

});

// ==== Update Image ====

function updateLightbox() {

    lightboxImage.classList.remove("show");

    setTimeout(() => {

        const img = galleryItems[currentIndex].querySelector("img");

        lightboxImage.src = img.src;

        currentImage.textContent = currentIndex + 1;

        lightboxImage.classList.add("show");

    }, 150);

}
// ==== Next Image ====

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }

    updateLightbox();

});
// ==== Previous Image ====

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    }

    updateLightbox();

});
// ==== Keyboard Navigation ====

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active")) return;

    if (e.key === "ArrowRight") {

        nextBtn.click();

    }

    else if (e.key === "ArrowLeft") {

        prevBtn.click();

    }

    else if (e.key === "Escape") {

        lightbox.classList.remove("active");

    }

});
// ==== Close on Background Click ====

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");

    }

});
// ==== Image Filtering ====

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active button
        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        // Activate clicked button
        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {

                item.classList.remove("hide");

            } else {

                item.classList.add("hide");

            }

        });

    });

});

// ==== Preloader ====

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    preloader.style.opacity = "0";

    setTimeout(() => {

        preloader.style.display = "none";

    }, 600);

});


// ==== Scroll Reveal ====

const reveals = document.querySelectorAll(".reveal");

function revealElements() {

    reveals.forEach(element => {

        const windowHeight = window.innerHeight;

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 120) {

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealElements);

revealElements();

// ==== Back To Top ====

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ==== Theme Toggle ====

const themeToggle = document.querySelector(".theme-toggle");

const themeIcon = themeToggle.querySelector("i");

// Load saved theme
if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light");

    themeIcon.classList.remove("fa-moon");

    themeIcon.classList.add("fa-sun");

}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

        localStorage.setItem("theme", "light");

    } else {

        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");

        localStorage.setItem("theme", "dark");

    }

});
