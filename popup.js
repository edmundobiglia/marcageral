const saveBtn = document.getElementById("save");

saveBtn.focus();

chrome.storage.local.get("people", function (items) {
  if (items.people) {
    document.getElementById("people").value = items.people;
  }

  saveBtn.addEventListener("click", () => {
    const people = document.getElementById("people").value;

    chrome.storage.local.set(
      {
        people: people,
      },
      function () {
        chrome.tabs.executeScript({
          file: "content.js",
        });
      }
    );

    window.close();
  });
});
