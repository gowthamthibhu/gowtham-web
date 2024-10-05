/* About Section Animation */
document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('#about');
    const aboutContainer = document.querySelector('.about__container');
    const aboutHeading = document.querySelector('.about__heading');
    const aboutDescription = document.querySelector('.about__description');
    const aboutImg = document.querySelector('.about__img');
    const aboutBoxes = document.querySelectorAll('.about__box');

    function handleScroll() {
        const aboutSectionPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (aboutSectionPosition < screenPosition) {
            aboutContainer.classList.add('visible');
            aboutHeading.classList.add('visible');
            aboutDescription.classList.add('visible');
        }
    }

    function handleMouseMove(event) {
        const xAxis = (window.innerWidth / 2 - event.pageX) / 25;
        aboutImg.style.transform = `perspective(1000px) rotateY(${xAxis}deg)`;
    }

    function handleMouseLeave() {
        aboutImg.style.transform = 'perspective(1000px) rotateY(0deg)';
    }

    aboutBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.transform = 'scale(1.1)';
            box.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });

        box.addEventListener('mouseleave', () => {
            box.style.transform = 'scale(1)';
            box.style.boxShadow = 'none';
        });
    });

    window.addEventListener('scroll', handleScroll);
    aboutImg.addEventListener('mousemove', handleMouseMove);
    aboutImg.addEventListener('mouseleave', handleMouseLeave);
});

/* timeline popup */
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.timeline__item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, {
        threshold: 0.1 // Adjust as needed
    });

    items.forEach(item => {
        observer.observe(item);
    });
});

function showImage(imageSrc) {
    const popup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    popupImage.src = imageSrc;
    popup.style.display = 'block';
}

function hideImage() {
    const popup = document.getElementById('imagePopup');
    popup.style.display = 'none';
}


/* Skills Tab Interaction */
const tabs = document.querySelectorAll('[data-target]'),
    tabContent = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);

        tabContent.forEach(tabContents => {
            tabContents.classList.remove('skills__active');
        });
        target.classList.add('skills__active');

        tabs.forEach(tab => {
            tab.classList.remove('skills__active');
        });
        tab.classList.add('skills__active');
    });
});

/* Project Section Filtering (Mixitup) */
let mixerportfolio = mixitup('.project__container', {
    selectors: {
        target: '.project__card'
    },
    animation: {
        duration: 300
    }
});

const linkProject = document.querySelectorAll('.project__item');

function activeProject() {
    linkProject.forEach(l=> l.classList.remove('active-project'));
    this.classList.add('active-project');
}

linkProject.forEach(l => l.addEventListener("click", activeProject));

/* project popup */
document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("project__button")) {
        togglePortfolioPopup();
        portfolioItemsDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup(){
    document.querySelector(".portfolio__popup").classList.toggle("open");
}

document.querySelector(".portfolio__popup-close").addEventListener("click", togglePortfolioPopup)

function portfolioItemsDetails(portfolioItem) {
    document.querySelector(".pp__thumbnail img").src = portfolioItem.querySelector(".project__img").src;
    document.querySelector(".portfolio__popup-subtitle span").innerHTML = portfolioItem.querySelector(".project__title").innerHTML;
    document.querySelector(".portfolio__popup-body").innerHTML = portfolioItem.querySelector(".portfolio__item-details").innerHTML;
}

/* input animation */
const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});

/* scroll active link */

// ============== SCROLL SECTIONS ACTIVE LINK ==============
const sections = document.querySelectorAll("section[id]");

// add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
    // get current scroll position
    let scrollY = window.pageYOffset;

    // Now we loop through sections to get height, top and ID values for each
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute("id");

        /* - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
           - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector */
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add("active-link");
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove("active-link");
        }
    });
}
