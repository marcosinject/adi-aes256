/* Skills Scroll Functionality */

document.addEventListener('DOMContentLoaded', function() {
    const centerContent = document.querySelector('.center-content');
    const scrollDashes = document.querySelectorAll('.scroll-dash');
    
    if (!centerContent || scrollDashes.length === 0) return;

    // Get the total scrollable height
    function updateScrollIndicators() {
        const scrollTop = centerContent.scrollTop;
        const scrollHeight = centerContent.scrollHeight;
        const clientHeight = centerContent.clientHeight;
        const totalScroll = scrollHeight - clientHeight;

        // Calculate which dash should be active based on scroll position
        const scrollPercentage = totalScroll > 0 ? scrollTop / totalScroll : 0;
        const activeDashIndex = Math.min(
            Math.floor(scrollPercentage * scrollDashes.length),
            scrollDashes.length - 1
        );

        // Update active dash
        scrollDashes.forEach((dash, index) => {
            dash.classList.toggle('active', index === activeDashIndex);
        });
    }

    // Add scroll event listener
    centerContent.addEventListener('scroll', updateScrollIndicators);

    // Click on dash to scroll
    scrollDashes.forEach((dash, index) => {
        dash.addEventListener('click', function() {
            const scrollHeight = centerContent.scrollHeight;
            const clientHeight = centerContent.clientHeight;
            const totalScroll = scrollHeight - clientHeight;
            const targetScroll = (index / (scrollDashes.length - 1)) * totalScroll;
            
            centerContent.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        });
    });

    // Initialize on load
    updateScrollIndicators();

    // Handle window resize
    window.addEventListener('resize', updateScrollIndicators);

    // Keyboard navigation for accessibility
    centerContent.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            centerContent.scrollTop += 50;
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            centerContent.scrollTop -= 50;
        } else if (e.key === ' ') {
            e.preventDefault();
            centerContent.scrollTop += 200;
        }
    });
});

/* Smooth scroll behavior for internal links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#skills-section') {
            // Allow normal navigation for non-section links
            return;
        }
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* Intersection Observer for animations */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill boxes
document.querySelectorAll('.skill-box').forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(20px)';
    box.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(box);
});
