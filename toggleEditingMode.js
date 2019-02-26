if(document.designMode == 'on') {
  document.body.contentEditable = 'false';
  document.designMode = 'off';
}
else {
  document.body.contentEditable = 'true';
  document.designMode = 'on';
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message === 'CHECK_DESIGN_MODE') {
    const designMode = document.designMode == 'on' && document.body.contentEditable == 'true';
    sendResponse(designMode);
  }
});