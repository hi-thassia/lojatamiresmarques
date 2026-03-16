/* MENU MOBILE */

const menuToggle = document.querySelector('.menu-toggle')
const navLinks = document.querySelector('.nav-links')

if (menuToggle && navLinks) {

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active')
  })

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active')
    })
  })

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav') && !e.target.closest('.menu-toggle')) {
      navLinks.classList.remove('active')
    }
  })

}
