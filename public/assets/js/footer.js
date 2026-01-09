document.getElementById('currentYear').innerText = new Date().getFullYear();

const button = document.getElementById('backToTop');
button.addEventListener('click', () => {
    window.scroll({ top: 0, behavior: 'smooth'})
})