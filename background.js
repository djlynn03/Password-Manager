

// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({"userKey": generate}, function() {
//         chrome.storage.sync.get('userKey', function (data){
//             console.log("key created: " + data);
//         });
//     });
chrome.runtime.onInstalled.addListener(function() {
    console.log("installed");

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {schemes: ['http', 'https']},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});