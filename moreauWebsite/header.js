document.querySelectorAll('.navlinks ul li a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            color: 'black', // Text color stays visible
            duration: 0.2
        });

        gsap.to(link, {
            backgroundColor: 'white', // Optional if you want a full bg color
            duration: 0.2
        });

        gsap.to(link, {
            '--after-width': '100%', // Use CSS var if needed
            duration: 0.5,
            ease: 'power2.out'
        });

        gsap.to(link, {
            '--after-width': '100%',
            duration: 0.5,
            ease: 'power2.out'
        });

        gsap.to(link, {
            backgroundSize: '100% 100%',
            duration: 0.5,
            ease: 'power2.out'
        });

        gsap.to(link.querySelector('::before'), {
            width: '100%',
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    link.addEventListener('mouseleave', () => {
        gsap.to(link.querySelector('::before'), {
            width: '0%',
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});
