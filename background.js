chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set(
    {
      people:
        "Alexander de Paula\nAntonio Schiavon\nClaudio Rosseto\nEd Biglia\nFelipe Duzzi\nFranciele Portugal\nGabriel Packer\nGeorge Rodrigues\nGustavo de Paula\nIsai\nRobinho\nRomulo Luiz Silva Garofalo\n",
    },
    function () {}
  );
});

chrome.commands.onCommand.addListener(function (command) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: command });
  });
});
