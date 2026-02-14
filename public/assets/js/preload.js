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
    const title = temp.querySelector('title')?.textContent || document.title;

    cache.set(url, { content, title });
}

document.body.addEventListener("mouseover", (e) => {
    const link = e.target.closest("a");
    if (!link || link.target === "_blank") return;

    preload(link.href);
});

async function loadUrl(url){
    let cached = cache.get(url);

    if (!cached) {
        await preload(url);
        cached = cache.get(url);
    }


    container.innerHTML = cached.content;

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
    window.initImages();
    window.initToolTips();
    document.title = cached.title;
    umami.track();
}

document.body.addEventListener("click", async (e) => {
    const link = e.target.closest("a");
    if (!link || link.target === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    const url = link.href;

    loadUrl(url)
    window.scroll({ top: 0})

    history.pushState(null, "", url);
})

window.addEventListener("popstate", async () => {
    loadUrl(location.href);
})


