// ELEMENTS
chrome.storage.local.get(['HideDistractions'])
    .then((result) => {
        const socials = result.HideDistractions;
        
        // CONDICIONALS
        if (socials.facebook && window.location.href.includes("facebook.com")) hideFacebook();
    })
    .catch((error) => {
        console.error(error);
    })

// FUNCTIONS
function hideFacebook() {
    setTimeout(() => {
        const stories = document.querySelector('div[aria-label="Stories"]');
        console.log(stories);

        stories.remove();
    }, 10000);
}


function hideInstagram() {

}

function hideYoutube() {

}

function hideTwitter() {

}

function hideReddit() {

}

function hideNetflix() {

}

