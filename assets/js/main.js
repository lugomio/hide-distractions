// ELEMENTS
const toggles = document.querySelectorAll('#hide-distractions .toggle');

chrome.storage.local.get(["HideDistractions"]).then((result) => {
    if (!result.HideDistractions) {
        chrome.storage.local.set({
            "HideDistractions": {
                facebook: false,
                instagram: false,
                youtube: false,
                twitter: false,
                reddit: false,
                netflix: false
            }
        });
    }
});

startToggles();

//FUNCTIONS
function toggleClick(e) {
    const social = e.target.dataset.social;
    toggleSocial(social);

    e.target.classList.toggle('active');
}

function startToggles() {
    toggles.forEach(toggle => {
        getSocial(toggle.dataset.social).then((result) => {
            if (result) toggle.classList.add('active');
        });
    });
}

function toggleSocial(social) {
    chrome.storage.local.get(["HideDistractions"]).then((result) => {
        const socials = result.HideDistractions;
        socials[social] = !socials[social];
        chrome.storage.local.set({ "HideDistractions": socials });
    });
}

function getSocial(social) {
    return chrome.storage.local.get(["HideDistractions"]).then((result) => {
        return result.HideDistractions[social];
    });
}


// EVENTS
toggles.forEach((toggle) => {
    toggle.addEventListener('click', toggleClick);
})