browser.browserAction.onClicked.addListener(() => {
  Promise.all([
    browser.windows.getCurrent(),
    browser.windows.getAll(),
  ]).then(([curr, all]) => {
    all.forEach(win => {
      if (win.id != curr.id) {
        browser.tabs.query({
          windowId: win.id,
        }).then(tabs => {
          tabs.forEach(tab => {
            if (!tab.pinned) {
              browser.tabs.remove(tab.id).then(
                () => console.log("Success"),
                () => console.log("Failure"));
            }
          });
        });
      }
    });
  });
});
