export function initPortfolioSlider() {
    const slider = document.querySelector('.portfolio__slider');
    const track = document.querySelector('.portfolio__track');

    if (!slider || !track) return;

    let position = 0;
    let maxScroll = 0;
    let direction = 0;
    let startX = 0;

    function updateBounds() {
        const sliderWidth = slider.offsetWidth;
        const trackWidth = track.scrollWidth;

        maxScroll = Math.max(0, trackWidth - sliderWidth);

        if (position > maxScroll) {
            position = maxScroll;
            track.style.transform = `translateX(${-position}px)`;
        }
    }

    function animate() {
        if (direction !== 0) {
            position += direction * 2;

            if (position < 0) position = 0;
            if (position > maxScroll) position = maxScroll;

            track.style.transform = `translateX(${-position}px)`;
        }

        requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
        const sliderWidth = slider.offsetWidth;
        const zone = sliderWidth * 0.3;

        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;

        if (x < zone) {
            direction = -1;
        } else if (x > sliderWidth - zone) {
            direction = 1;
        } else {
            direction = 0;
        }
    }

    function stop() {
        direction = 0;
    }

    slider.addEventListener('mousemove', handleMouseMove);
    slider.addEventListener('mouseleave', stop);

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        position += diff;

        if (position < 0) position = 0;
        if (position > maxScroll) position = maxScroll;

        track.style.transform = `translateX(${-position}px)`;

        startX = currentX;
    });

    updateBounds();

    position = maxScroll / 2;
    track.style.transform = `translateX(${-position}px)`;

    animate();

    window.addEventListener('resize', updateBounds);
}