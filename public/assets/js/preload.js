// SPA stuff

const container = document.getElementById("page-content");
const cache = new Map();

async function preload(url){
    if (cache.has(url)) return;

    const res = await fetch(url);
    const html = await res.text();
    const temp = document.createElement('div');
    temp.innerHTML = html;

    const content = temp.querySelector('#page-content').innerHTML;
    cache.set(url, content);
}

document.body.addEventListener("mouseover", (e) => {
    const link = e.target.closest("a");
    if (!link || link.target === "_blank") return;

    preload(link.href);
});

async function loadUrl(url){
    let newContent = cache.get(url);

    if (!newContent) {
        const res = await fetch(url);
        const html = await res.text();

        const temp = document.createElement('div');
        temp.innerHTML = html;
        newContent = temp.querySelector('#page-content').innerHTML;

        cache.set(url, newContent);
    }

    container.innerHTML = newContent;

    container.querySelectorAll("script").forEach(oldScript => {
        if (oldScript.src) {
            const existing = document.querySelector(`script[src="${oldScript.src}"]`);

            if (existing && !container.contains(existing)) {
                return;
            }
        }

        const newScript = document.createElement("script");

        Array.from(oldScript.attributes).forEach(attr =>
            newScript.setAttribute(attr.name, attr.value)
        );

        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });

    window.initSwap();
}

document.body.addEventListener("click", async (e) => {
    const link = e.target.closest("a");
    if (!link || link.target === "_blank") return;
    e.preventDefault();
    const url = link.href;

    loadUrl(url)
    window.scroll({ top: 0})

    history.pushState(null, "", url);
})

window.addEventListener("popstate", async () => {
    loadUrl(location.href);
})


