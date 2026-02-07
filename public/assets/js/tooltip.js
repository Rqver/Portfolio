window.initToolTips = function() {
    document.querySelectorAll(".tooltip").forEach((element) => {
        element.classList.add("border-b", "border-ctp-subtext1/40", "cursor-help", "relative");

        const tip = document.createElement("span");
        tip.className =
            'pointer-events-none text-center absolute left-1/2 z-10 w-max max-w-xs -translate-x-1/2 ' +
            'rounded-md bg-ctp-crust px-2 py-1 text-sm text-ctp-text shadow-lg ' +
            'opacity-0 transition-opacity -top-2 -translate-y-full';

        tip.innerHTML = element.querySelector("template").innerHTML;
        element.appendChild(tip);

        let hideTimer;

        const show = () => {
            clearTimeout(hideTimer);
            tip.classList.add('opacity-100');
            tip.classList.remove('pointer-events-none')
        };

        const hide = () => {
            hideTimer = setTimeout(() => {
                tip.classList.remove('opacity-100');
                tip.classList.add('pointer-events-none')
            }, 120);
        };

        element.addEventListener('mouseenter', show);
        element.addEventListener('mouseleave', hide);
        tip.addEventListener('mouseenter', show);
        tip.addEventListener('mouseleave', hide);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    window.initToolTips();
})