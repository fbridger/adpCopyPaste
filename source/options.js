/**
 * Created by SPOSMEN on 11/22/16.
 */
// Saves options to chrome.storage.sync.
function save_options() {
    var country = document.getElementById('country').value;
    chrome.storage.sync.set({
        country: country
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        country: 'ar'
    }, function (items) {
        document.getElementById('color').value = items.country;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);