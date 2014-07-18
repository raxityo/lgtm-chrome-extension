// Saves options to chrome.storage
var config = {
  shortcut: "10076",
  text: "LGTM. :+1:"
};
function save_options() {
  config.text = document.getElementById("text").value;

  chrome.storage.sync.set(config, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(config, function(items) {
    config = items;
    document.getElementById("text").value = items.text;
    document.getElementById("shortcutarea").innerText = getStringByShortcutCode(items.shortcut);
  });
}
document.getElementById("getShortcut").addEventListener('click',createShortcut);
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

var specialKeyCodes = {46:"Del", 112:"F1", 113:"F2", 114:"F3", 115:"F4", 116:"F5", 117:"F6", 118:"F7", 119:"F8", 120:"F9", 121:"F10", 122:"F11", 123:"F12"};

function getStringByShortcutCode(shortcutCode)
{
  var shortcut = '';
   
  if(shortcutCode !== undefined && shortcutCode.length >= 4)
  {
    shortcut += shortcutCode.charAt(0) == '1' ? 'CTRL+' : '';
    shortcut += shortcutCode.charAt(1) == '1' ? 'SHIFT+' : '';
    shortcut += shortcutCode.charAt(2) == '1' ? 'ALT+' : '';
    var key = shortcutCode.substring(3);
    
    if(!specialKeyCodes[key])
      shortcut += String.fromCharCode(key);
    else
      shortcut += specialKeyCodes[key];
  }
  
  return shortcut;
}

function keyDownEventListener(e)
{
  if(e.which == 27)
  {
    var shortcuts = shortcutsGetter();
    var shortcutCode = shortcuts['shortcutarea'];
    document.getElementById('shortcutarea').innerText = getStringByShortcutCode(shortcutCode);
    document.removeEventListener('keydown', keyDownEventListener);
    return;
  }

  if(!(e.which >= 48 && e.which <= 57 || e.which >= 65 && e.which <= 90 || specialKeyCodes[e.which] != null))
    return;
    
  var shortcutCode = (+e.ctrlKey) + '' + (+e.shiftKey) + '' + (+e.altKey) + e.which;
  
  document.getElementById('shortcutarea').innerText = getStringByShortcutCode(shortcutCode);
  config.shortcut = shortcutCode;
  document.removeEventListener('keydown', keyDownEventListener);
}

function createShortcut()
{
  document.addEventListener('keydown', keyDownEventListener);
  document.getElementById('shortcutarea').innerText = "Press shortcut keys";
}