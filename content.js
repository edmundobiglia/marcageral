let selectAllState = true;

chrome.runtime.onMessage.addListener((message) => {
  const callback = (e) => {
    if (e.target.closest("label").classList.contains("checked")) {
      setTimeout(() => {
        e.target.closest("label").classList.remove("checked");
      }, 0);
    }
  };

  let validDocument = document.getElementById("view_todo_iframe")
    ? document.getElementById("view_todo_iframe").contentWindow.document
    : document;

  validDocument
    .getElementsByClassName("list-picker push--top")[0]
    .addEventListener("click", callback);

  if (message.message === "checkall") {
    Array.from(
      validDocument.querySelectorAll(".list-picker-item__details strong")
    ).forEach((strong_element) => {
      if (selectAllState) {
        strong_element.parentNode.parentNode.querySelector(
          "input[type=checkbox]"
        ).checked = false;

        strong_element.parentNode.parentNode.classList.remove("checked");
      } else {
        strong_element.parentNode.parentNode.querySelector(
          "input[type=checkbox]"
        ).checked = true;

        strong_element.parentNode.parentNode.classList.add("checked");
      }
    });
    selectAllState = !selectAllState;
  } else {
    chrome.storage.local.get("people", function (items) {
      if (!items.people) return;

      const all_people = items.people.split("\n");

      Array.from(
        validDocument.querySelectorAll(".list-picker-item__details strong")
      )
        .map((strong_element) => {
          strong_element.parentNode.parentNode.querySelector(
            "input[type=checkbox]"
          ).checked = false;

          strong_element.parentNode.parentNode.classList.remove("checked");

          return strong_element;
        })
        .filter((strong_element) =>
          all_people.includes(strong_element.textContent)
        )
        .forEach((strong_element) => {
          strong_element.parentNode.parentNode.querySelector(
            "input[type=checkbox]"
          ).checked = true;

          strong_element.parentNode.parentNode.classList.add("checked");
        });
    });
  }
});
