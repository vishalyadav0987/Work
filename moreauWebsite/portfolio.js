/*----------Cursor Animation--------------*/

const body = document.querySelector('body');
const spotlight = document.querySelector('.port-spotlight');
const imageContainer = document.querySelector('.port-last-img');

let lastMouseX = 0;
let lastMouseY = 0;

function updateSpotlight(x, y) {
    const rect = imageContainer.getBoundingClientRect();
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
}

// Mouse move updates position & stores coordinates
body.addEventListener('mousemove', (e) => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    updateSpotlight(lastMouseX, lastMouseY);
});

// Scroll uses the stored coordinates (same mouse position after scroll)
window.addEventListener('scroll', () => {
    updateSpotlight(lastMouseX, lastMouseY);
});




/*----------Cursor Animation--------------*/