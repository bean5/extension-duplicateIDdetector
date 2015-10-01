//got this from https://developer.chrome.com/extensions/options
// Saves options to chrome.storage
function save_options() {
  chrome.storage.sync.set({
    allow_dynamic_checking: document.getElementById('allow_dynamic_checking').value === 'true',
    whitelisted_urls: document.getElementById('whitelisted_urls').value,
    blacklisted_urls: document.getElementById('blacklisted_urls').value,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      window.location.reload();
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = false.
  chrome.storage.sync.get({
    //websites
    allow_dynamic_checking: true,
    whitelisted_urls: '',
    blacklisted_urls: '',
  }, function(items) {
    //websites
    document.getElementById('allow_dynamic_checking').value = items.allow_dynamic_checking;
    document.getElementById('whitelisted_urls').value = items.whitelisted_urls;
    document.getElementById('blacklisted_urls').value = items.blacklisted_urls;

    document.getElementById('loading').style.display = "none";
    document.getElementById('loaded').style.display = "inherit";
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
