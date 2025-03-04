/*----------Cursor Animation --------------*/

const body = document.querySelector('body');
const spotlightElements = document.querySelectorAll('.spotlight, .port-spotlight, .link-spotlight, .footer-spotlight');
const containers = document.querySelectorAll('#hero, .port-last-img, .video-link-section, #footer');

let lastMouseX = 0;
let lastMouseY = 0;

// Function to update spotlight position
function updateSpotlight(x, y) {
    containers.forEach((container, index) => {
        const spotlight = spotlightElements[index];
        const rect = container.getBoundingClientRect();

        const spotlightX = x - rect.left - spotlight.offsetWidth / 2;
        const spotlightY = y - rect.top - spotlight.offsetHeight / 2;

        spotlight.style.left = `${spotlightX}px`;
        spotlight.style.top = `${spotlightY}px`;

        if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        ) {
            spotlight.style.opacity = '1';
            spotlight.style.transform = 'scale(1)';
        } else {
            spotlight.style.opacity = '0';
            spotlight.style.transform = 'scale(0.5)';
        }
    });
}

// Update spotlight on mouse move
body.addEventListener('mousemove', (e) => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    updateSpotlight(lastMouseX, lastMouseY);
});

// Update spotlight on scroll (keeps position after scroll)
window.addEventListener('scroll', () => {
    updateSpotlight(lastMouseX, lastMouseY);
});


/*----------Cursor Animation --------------*/





/*----------Cousel Animation --------------*/
const track = document.querySelector('.all-test-cards');
const countTrack = document.querySelector('.count-track');
const cards = document.querySelectorAll('.testimonials-card');

let isDown = false;
let startX;
let scrollLeft;
let currentIndex = 0;

const totalCards = cards.length;

// Clone First & Last Card (for smooth infinite loop)
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, track.firstChild);

// After cloning, update total length
const actualCardCount = totalCards + 2; // Original + 2 clones
let cardWidth = cards[0].offsetWidth + 20; // include margin/gap

// Scroll to first real card initially (skip the clone)
track.scrollLeft = cardWidth;

// Drag Events
track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('grabbing');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
});

track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('grabbing');
});

track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('grabbing');
    snapToNearestCard();
});

track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2; // speed
    track.scrollLeft = scrollLeft - walk;
});

// Snap to nearest card (with infinite logic)
function snapToNearestCard() {
    cardWidth = document.querySelector('.testimonials-card').offsetWidth + 20;
    const nearestIndex = Math.round(track.scrollLeft / cardWidth);
    currentIndex = nearestIndex - 1; // exclude left clone from index
    updateCounter();

    gsap.to(track, {
        scrollLeft: nearestIndex * cardWidth,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: checkInfiniteWrap
    });
}

// Check if we are on clone, jump instantly (loop magic)
function checkInfiniteWrap() {
    if (currentIndex < 0) {
        // Wrapped to left clone -> Jump to last real card
        currentIndex = totalCards - 1;
        track.scrollLeft = (currentIndex + 1) * cardWidth; // +1 because of clone
    } else if (currentIndex >= totalCards) {
        // Wrapped to right clone -> Jump to first real card
        currentIndex = 0;
        track.scrollLeft = cardWidth; // skip left clone
    }
    updateCounter();
}

// Update counter
function updateCounter() {
    countTrack.innerText = `${(currentIndex + 1)} / ${totalCards}`;
}

// Initial counter update
updateCounter();


/*----------Cousel Animation --------------*/




/*----------text on image Animation --------------*/
const textOnImage = document.querySelector('.port-last-img-1');
const cursorText = document.querySelector('.text-on-img-1');
const line1 = document.querySelector('.text-on-img-1 .line1');
const line2 = document.querySelector('.text-on-img-1 .line2');

// Initial state setup (optional, to make sure it's clean)
gsap.set(cursorText, { opacity: 0 });
gsap.set([line1], { width: 0, visibility: 'hidden' });

textOnImage.addEventListener('mouseenter', () => {
    // Show the cursor text
    gsap.to(cursorText, { opacity: 1, duration: 0.2 });

    // Animate the first line
    gsap.set(line1, { visibility: 'visible' });
    gsap.to(line1, { width: '100%', duration: 0.2, ease: 'power2.out' });

    // Animate the second line after the first finishes
    gsap.delayedCall(0.2, () => {
        // gsap.set(line2, { visibility: 'visible' });
        gsap.to(line2, { width: '60%', duration: 0.2, ease: 'power2.out' });
    });
});

textOnImage.addEventListener('mousemove', (e) => {
    const rect = textOnImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(cursorText, { left: x, top: y, duration: 0.1, ease: 'none' });
});

textOnImage.addEventListener('mouseleave', () => {
    // Hide cursor text
    gsap.to(cursorText, { opacity: 0, duration: 0.2 });

    // Shrink the lines back to 0 and then hide them
    gsap.to([line1, line2], { width: 0, duration: 0.4, ease: 'power2.in' });

    gsap.delayedCall(0.5, () => {
        gsap.set([line1], { visibility: 'hidden' });
    });
});

/*----------text on image Animation --------------*/



/*---------- Corsel Js --------------*/
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.all-coursel-here');
    const carouselItems = document.querySelectorAll('.coursel');
    

    const itemWidth = carouselItems[0].offsetWidth + parseInt(getComputedStyle(carouselItems[0]).marginRight);
    let isAnimating = false;

    function shiftRight() {
        if (isAnimating) return;
        isAnimating = true;

        carouselContainer.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        carouselContainer.style.transform = `translateX(-${itemWidth+62}px)`;

        setTimeout(() => {
            const firstItem = carouselContainer.firstElementChild;
            carouselContainer.appendChild(firstItem);

            carouselContainer.style.transition = 'none';
            carouselContainer.style.transform = 'translateX(0)';
            isAnimating = false;
        }, 600);
    }

    function shiftLeft() {
        if (isAnimating) return;
        isAnimating = true;

        const lastItem = carouselContainer.lastElementChild;
        carouselContainer.prepend(lastItem);

        carouselContainer.style.transition = 'none';
        carouselContainer.style.transform = `translateX(-${itemWidth}px)`;

        setTimeout(() => {
            carouselContainer.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
            carouselContainer.style.transform = 'translateX(0)';

            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }, 10);
    }

    document.querySelector('.prev').addEventListener('click', shiftLeft);
    document.querySelector('.next').addEventListener('click', shiftRight);
});



/*---------- Corsel Js --------------*/






/*---------- HERO ANIMATION --------------*/

    // Framer Motion-like intro animation using GSAP
    gsap.from(".top-heading h1", {
        opacity: 0,
        y: -500,
        duration: 1.5,
        ease: "power2.out"
    });

    window.addEventListener("load", function() {
        gsap.from(".hero-image-text img", {
            opacity: 0,
            scale: 0.5,
            duration: 1.5,
            ease: "power2.out"
        });
    });
    
    

    gsap.from(".hero-image-text p:nth-child(1)", {
        opacity: 0,
        x: -100,
        duration: 1,
        stagger: 0.3
    });
    gsap.from(".hero-image-text p:nth-child(3)", {
        opacity: 0,
        x: 100,
        duration: 1,
        stagger: 0.3
    });

    gsap.from(".social-name a", {
        opacity: 0,
        x: -100,
        duration: 1,
        stagger: 0.2,
        delay: 0.5
    });
/*---------- HERO ANIMATION --------------*/




/*---------- Menu --------------*/
const menuContainer = document.querySelector('.menu-bar-container');
const navLinks = document.querySelectorAll('.menu-bar-navlink li a');
const crossIcon = document.querySelector('.cross-icon');

let menuOpen = false;

function openMenu() {
    gsap.set(menuContainer, { visibility: 'visible' });

    // Container grows from center
    gsap.to(menuContainer, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Navlinks come down one by one
    gsap.to(navLinks, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.to('.menu-bar-navlink', {
        opacity: 1,
        duration: 0.5,
        delay: 0.2
    });

    menuOpen = true;
}

function closeMenu() {
    // Navlinks go back up
    gsap.to(navLinks, {
        opacity: 0,
        y: -50,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.in'
    });

    // Container shrinks back
    gsap.to(menuContainer, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.in',
        onComplete: () => gsap.set(menuContainer, { visibility: 'hidden' })
    });

    menuOpen = false;
}

// You can trigger openMenu() from your menu icon button click
document.querySelector('.menu-bar svg').addEventListener('click', openMenu);  // <- attach to your actual menu icon

// Close menu when cross icon is clicked
crossIcon.addEventListener('click', closeMenu);

/*---------- Menu --------------*/