// HIDE FUNCTIONS
function hideFacebook() {
    const stories = document.querySelector('div[aria-label="Stories"]');
    const feed = document.querySelector('div[role="feed"]');

    if (stories) stories.remove();
    if (feed && location.pathname == "/") feed.remove();
    if (window.location.href.includes("/watch")) window.location.replace("https://facebook.com");
}

function hideInstagram() {
    const main = document.querySelector('main div div:nth-child(1) > div');
    const explore = document.querySelector('.x1iyjqo2.xh8yej3 div:nth-child(3)');
    const reels = document.querySelector('.x1iyjqo2.xh8yej3 div:nth-child(4)');

    if (main) main.remove();
    if (explore) explore.remove();
    if (reels) reels.remove();
    if (window.location.href.includes("/reels") || window.location.href.includes("/explore")) {
        window.location.replace("https://instagram.com");
    }
}

function hideYoutube() {
    if (window.location.href.includes("/shorts") || location.href == "https://www.youtube.com/") {
        window.location.replace("https://www.youtube.com/feed/subscriptions");
    }

    const homeMenu = document.querySelector('#items a[title="Home"]');
    const shortsMenu = document.querySelector('#items a[title="Shorts"]');
    const related = document.querySelector('#related');

    if (homeMenu) homeMenu.remove();
    if (shortsMenu) shortsMenu.remove();
    if(related) related.remove();
}

function hideTiktok() {
    window.location.replace("https://google.com");
}

function hideNetflix() {
    const content = document.querySelector('#appMountPoint');
    if (content) content.remove();
    window.location.replace("https://google.com");
}

// CONDICIONALS
function handlerHide(socials) {
    if (socials.facebook && window.location.href.includes("facebook.com")) hideFacebook();
    if (socials.youtube && window.location.href.includes("youtube.com")) hideYoutube();
    if (socials.instagram && window.location.href.includes("instagram.com")) hideInstagram();
    if (socials.netflix && window.location.href.includes("netflix.com")) hideNetflix();
    if (socials.tiktok && window.location.href.includes("tiktok.com")) hideTiktok();
}

// GET 
async function getSocials() {
    const result = await chrome.storage.local.get(['HideDistractions']);
    return result.HideDistractions;
}

// MUTATION OBSERVER
let previousURL = "";
const observer = new MutationObserver((mutations) => {
    if (location.href != previousURL) {
        getSocials().then(data => {
            setTimeout(() => { handlerHide(data) }, 600);
        });
        previousURL = location.href;
    }
});

observer.observe(document, { childList: true, subtree: true });