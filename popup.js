const checkbox = document.getElementById('showPlaceholder');

// Load the current setting when the popup opens
chrome.storage.sync.get(['showPlaceholder'], function(result) {
  // Default to true if not set
  checkbox.checked = result.showPlaceholder === undefined ? true : !!result.showPlaceholder;
});

// Save the setting when the checkbox changes
checkbox.addEventListener('change', function() {
  chrome.storage.sync.set({showPlaceholder: checkbox.checked}, function() {
    console.log('Show placeholder setting saved:', checkbox.checked);
    // Optional: Send a message to content script to update immediately
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   chrome.tabs.sendMessage(tabs[0].id, {action: "settingChanged", showPlaceholder: checkbox.checked});
    // });
  });
}); 