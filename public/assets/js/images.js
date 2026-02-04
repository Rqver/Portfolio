window.initImages = function() {
     document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('opacity-100');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('opacity-100')
            })
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    window.initImages();
})