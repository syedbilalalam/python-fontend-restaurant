// script.js

// document.addEventListener('DOMContentLoaded', () => {
//     // Navbar Toggle for Mobile View
//     const navToggle = document.querySelector('.nav-toggle');
//     const navLinks = document.querySelector('.nav-links');

//     navToggle.addEventListener('click', () => {
//         navLinks.classList.toggle('show-links');
//     });

//     // Smooth Scroll for Navigation Links
//     const scrollLinks = document.querySelectorAll('.nav-links a');
//     scrollLinks.forEach(link => {
//         link.addEventListener('click', (e) => {
//             e.preventDefault();
//             const id = e.target.getAttribute('href').slice(1);
//             const element = document.getElementById(id);

//         if (element) {
//             const position = element.offsetTop - 60; // Adjust offset for fixed navbar
//             window.scrollTo({
//                 left: 0,
//                 top: position,
//                 behavior: 'smooth'
//             });
//         }

//         // Close mobile menu after clicking
//         if (navLinks.classList.contains('show-links')) {
//             navLinks.classList.remove('show-links');
//         }
//     }); // Closing brace for scrollLinks.forEach
// }); // Closing brace for DOMContentLoaded

// // Form Validation for Reservations
// const reservationForm = document.querySelector('.reservation-form');
// reservationForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const name = document.getElementById('name').value.trim();
//     const email = document.getElementById('email').value.trim();
//     const phone = document.getElementById('phone').value.trim();
//     const date = document.getElementById('date').value.trim();
//     const time = document.getElementById('time').value.trim();

//     if (!name || !email || !phone || !date || !time) {
//         alert('Please fill in all the required fields.');
//         return;
//     }

//     alert(`Reservation Confirmed!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}`);
//     reservationForm.reset();
// });

// // Dynamic Menu Highlighting
// window.addEventListener('scroll', () => {
//     const sections = document.querySelectorAll('section');
//     const navLinks = document.querySelectorAll('.nav-links a');

//     let currentSection = '';

//     sections.forEach(section => {
//         const sectionTop = section.offsetTop - 70; // Adjust for fixed navbar
//         const sectionHeight = section.clientHeight;

//         if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
//             currentSection = section.getAttribute('id');
//         }
//     });

//     navLinks.forEach(link => {
//         link.classList.remove('active');
//         if (link.getAttribute('href').slice(1) === currentSection) {
//             link.classList.add('active');
//         }
//     });
// });

// // Newsletter Subscription Handling
// const newsletterForm = document.querySelector('.newsletter-form');
// newsletterForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const email = document.querySelector('#newsletter-email').value.trim();
//     if (email === '') {
//         alert('Please enter a valid email address.');
//         return;
//     }

//     alert(`Thank you for subscribing to our newsletter!`);
//     newsletterForm.reset();
// });