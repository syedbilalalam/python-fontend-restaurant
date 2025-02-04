// Animation functions
function banimate(element) {
    return new Promise((resovle) => {

        element.style.visibility = 'visible';
        element.style.opacity = '1';
        element.style[element.dataset.animate] = '0';

        if (element.dataset.animationPending == 'half') {
            element.dataset.animationPending = 'false';
        }

        setTimeout(resovle, 400);
    });
}

// Updating all requested elements for animation process
const animateableElems = document.querySelectorAll('[data-animation-pending="true"]');
for (let i = 0; i < animateableElems.length; i++) {
    animateableElems[i].dataset.animationPending = 'half';
    animateableElems[i].style[animateableElems[i].dataset.animate] = animateableElems[i].dataset.runUp + 'px';
}

// Section switches
const sections = document.querySelectorAll('.bsection');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(async entry => {
        if (entry.isIntersecting) {
            // Perform any action here

            // Starting the animation at the viewed side
            const animationReadyState = entry.target.querySelectorAll('.banimate');
            for (let i = 0; i < animationReadyState.length; i++) {
                entry.target.classList.remove('bsection');
                await banimate(animationReadyState[i]);
            }
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the section is visible
});

// Observe each section
sections.forEach(section => observer.observe(section));


