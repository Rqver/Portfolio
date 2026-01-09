// JS For the text swap/flip effect inspired by https://landonorris.com/

const md = window.matchMedia("(min-width: 768px)");

window.initSwap = function(playIntro = false) {
    const targets = document.querySelectorAll(".norris-swap");
    targets.forEach((el) => {
        const originalText = el.textContent;
        const hoverText = el.getAttribute("data-swap") || originalText;

        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        const originalChars = Array.from(segmenter.segment(originalText), s => s.segment);
        const hoverChars = Array.from(segmenter.segment(hoverText), s => s.segment);

        const maxLength = Math.max(originalChars.length, hoverChars.length);

        while (originalChars.length < maxLength) originalChars.push("\u00A0");
        while (hoverChars.length < maxLength) hoverChars.push("\u00A0");

        el.textContent = "";

        originalChars.forEach((char, index) => {
          const span = document.createElement("span");
          span.className = "char";
          span.setAttribute("data-start", char);
          span.setAttribute("data-end", hoverChars[index]);
          span.style.setProperty("--index", index);
          span.textContent = char;
          el.appendChild(span);
        });

        if (playIntro && el.classList.contains("active")) {
            setTimeout(() => {
                el.classList.remove("active");
            }, 1400);
        } else {
            el.classList.remove("active");
        }

        el.classList.remove("invisible");
      });
}

document.addEventListener("DOMContentLoaded", () => {
    window.initSwap(true);
});

md.addEventListener("change", (e) => {
    if (e.matches) initSwap();
});