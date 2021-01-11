/** Functions used */
import {createPassword, sleep, strengthIndicator} from "./functions.js";

/** Three data types used are boolean, string, and int */


/** Array data type */
let createButton = document.getElementsByClassName("createButton")[0];


let generateButton = document.getElementsByClassName("generateButton")[0];
let buttonContainer = document.getElementById('main');

let createContainer = document.getElementById('createContainer');

let createSubmit = document.getElementsByClassName('submitButton')[0];

let textBox = document.getElementById('passwordInput');

let strengthBoxes = document.getElementsByClassName('strengthBoxes');

let passwordExistsContainer = document.getElementById('passwordExistsContainer');

let fillPassword = document.getElementsByClassName('fillPassword')[0];
let editPassword = document.getElementsByClassName('editPassword')[0];

let optionsButton = document.getElementsByClassName('options_button_logo')[0];

let noPasswordText = document.getElementById("noPassword");
let generateContainer = document.getElementsByClassName("generateContainer")[0];
let generatedPasswordText = document.getElementById("generatedPasswordText");
let generateSubmit = document.getElementsByClassName("generateSubmit")[0];

/** On extension load- find existing password */
window.addEventListener('load', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.getSelected(null, function (tab) {
            var tabLink = tabs[0].url;
            var url = new URL(tabs[0].url);
            tabLink = url.hostname;

            chrome.storage.sync.get(tabLink, function (result) {
                var inputFound = true;
                /** Conditionals */
                if (inputFound) {
                    if (typeof result[tabLink] === 'undefined') {
                        buttonContainer.classList.add('shown');
                        buttonContainer.classList.remove('hidden');
                        console.log("buttonContainer shown");
                    } else {
                        passwordExistsContainer.classList.remove('hidden');
                        passwordExistsContainer.classList.add('shown');
                        console.log("already in system: " + tabLink);
                    }
                }
                else{
                    noPasswordText.classList.add('shown');
                    noPasswordText.classList.remove('hidden');
                }
            });
        });
    });
});

/**
 * Finds number of password tags on web page, returns false if none are present, true if more than 0 present
 */
function executeLoad(){
    let returnv = false;
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.executeScript(null, {
            code: 'var x = document.querySelectorAll("input[type=password]").length > 0; x'
        }, function (result) {
            console.log(result[0]);
            returnv = result[0];
            return returnv;
        });
    });
    return returnv;
}
/** Create Password button onclick- moves to password creation menu */
createButton.onclick = function (element) {
    buttonContainer.classList.add('hidden');
    buttonContainer.classList.remove('shown');
    createContainer.classList.add('shown');
    createContainer.classList.remove('hidden');
}

/** Generate Password button onclick- moves to generated password menu */
generateButton.onclick = function (element) {
    buttonContainer.classList.add('hidden');
    buttonContainer.classList.remove('shown');
    generateContainer.classList.remove('hidden');
    generateContainer.classList.add('shown');

    generatedPasswordText.value = createPassword(15);
}

/** Edit password button click- shows create password/generate password menu */
editPassword.onclick = function (element) {
    passwordExistsContainer.classList.add('hidden');
    passwordExistsContainer.classList.remove('shown');
    buttonContainer.classList.add('shown');
    buttonContainer.classList.remove('hidden');
}




/** Generate submit button click- places generated password in storage and onto web page */
generateSubmit.onclick = function (element) {
    generateSubmit.innerText = "Success!";
    let generatedPassword = generatedPasswordText.value;
    console.log(generatedPassword);
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.getSelected(null, function (tab) {
            var passwordDict = {};
            var tabLink = tabs[0].url;
            var url = new URL(tabs[0].url);
            tabLink = url.hostname;
            passwordDict[tabLink] = generatedPassword;
            chrome.storage.sync.set(passwordDict, function () {
                chrome.storage.sync.get([tabLink], function (result) {
                    console.log("Successfully saved");
                });
            });
        });
        chrome.tabs.executeScript(  //code to run inside tab (change text in input box)
            tabs[0].id,
            {
                code: 'document.querySelectorAll("input[type=password]")[0].value = "' + generatedPassword + '";'
                // code: 'for(const input in document.querySelectorAll("input[type=password]"){ input.value = "' + createdPassword + '";}'
            });
    });
    // sleep(1750).then(() => window.close());
}
/** Navigate to options page */
optionsButton.onclick = function (element) {
    console.log("settings");
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}

function getPassword(url, tabs) {
    let tabLink = url.hostname;
    chrome.storage.sync.get(tabLink, function (result) {
        console.log(result[tabLink]);
        // return result[tabLink];
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.executeScript(  //code to run inside tab (change text in input box)
                tabs[0].id,
                {
                    code: 'document.querySelectorAll("input[type=password]")[0].value = "' + result[tabLink] + '";'
                }
            );
        });
    });
}

/** Fills existing password on web page */
fillPassword.onclick = function (element) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.getSelected(null, function (tab) {
            var pageUrl = new URL(tabs[0].url);
            getPassword(pageUrl, tabs);

        });
    });
}

/** User input is taken on popup, output displayed is the password in the system and on the web page */

/** Adds created password to storage and places on web page */
createSubmit.onclick = function (element) {
    createSubmit.innerText = "Success!";
    let createdPassword = textBox.value;
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.getSelected(null, function (tab) {
            // let tabLink = tab.url;
            var passwordDict = {};
            var tabLink = tabs[0].url;
            var url = new URL(tabs[0].url);
            tabLink = url.hostname;
            passwordDict[tabLink] = createdPassword;
            // console.log(passwordDict);
            chrome.storage.sync.set(passwordDict, function () {
                chrome.storage.sync.get([tabLink], function (result) {
                    console.log("Successfully saved");
                });
            });
        });

        chrome.tabs.executeScript(  //code to run inside tab (change text in input box)
            tabs[0].id,
            {
                code: 'document.querySelectorAll("input[type=password]")[0].value = "' + createdPassword + '";'
                // code: 'for(const input in document.querySelectorAll("input[type=password]"){ input.value = "' + createdPassword + '";}'
            });
    });
    sleep(1750).then(() => window.close());
}

/** Changes password strength indicator colors */
textBox.onkeyup = function () {
    let createdPassword = textBox.value;
    /** Loop */
    for (let i = 0; i <= 4; i++) {
        if (strengthIndicator(createdPassword)[i] === 1) {
            strengthBoxes[i].style.backgroundColor = "rgba(0,255,0,0.5)";
        } else {
            strengthBoxes[i].style.backgroundColor = "rgba(255,0,0,0.5)";
        }
    }
}
