
export function setupScrollAnimation() {
    const jobItems = document.querySelectorAll('.job-item-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    jobItems.forEach(item => {
        observer.observe(item);
    });
}