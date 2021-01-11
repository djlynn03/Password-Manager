let clearStorageButton = document.getElementById("clearStorage");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let buttonWidth = getComputedStyle(clearStorageButton).width;

clearStorageButton.onclick = function (element){
    if(window.confirm("Are you sure you want to clear the storage?")){
        chrome.storage.sync.clear();
        clearStorageButton.innerText = "Success!";
        // clearStorageButton.style.width = buttonWidth;
        sleep(1750).then(() => clearStorageButton.innerText = "Clear Storage");
    }

}
