const editingMemory = {};

//on icon click, set appropriate mode and icon
chrome.browserAction.onClicked.addListener(function(tab) {
  editingMemory[tab.id] = !editingMemory[tab.id];
  setAppropriateBadge(tab.id);
  
  chrome.tabs.executeScript(null, {
    file: "toggleEditingMode.js"
  });
});

//on tab change, set appropriate icon
chrome.tabs.onActivated.addListener(function(activeInfo) {
  setAppropriateBadge(activeInfo.tabId);
});

//on tab URL change, ask about appropriate icon
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  chrome.tabs.sendMessage(tabId, 'CHECK_DESIGN_MODE', {}, (designModeState) => {
    editingMemory[tabId] = designModeState;
    setAppropriateBadge(tabId);
  });
});

//helper for setting appropriate tab for a given tabId
function setAppropriateBadge(tabId) {
  if(editingMemory[tabId]) {
    chrome.browserAction.setBadgeBackgroundColor({
      color: [0, 190, 0, 255]
    });
    chrome.browserAction.setBadgeText({
      text: "ON"
    });
  }
  else {
    chrome.browserAction.setBadgeBackgroundColor({
      color: [190, 0, 0, 255]
    });
    chrome.browserAction.setBadgeText({
      text: "OFF"
    });
  }
};

//set initial icon
chrome.tabs.query({
  active: true,
  windowType: 'normal', 
  currentWindow: true
}, function(d) {
  const tabId = d[0].id;
  chrome.tabs.sendMessage(tabId, 'CHECK_DESIGN_MODE', {}, (designModeState) => {
    editingMemory[tabId] = designModeState;
    setAppropriateBadge(tabId);
  });
});
