var browser = browser || chrome

browser.pageAction.onClicked.addListener(() => {
  browser.tabs.create({
      url: 'popup.html?mobile=1'
  });
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (typeof tab !== 'undefined' && /^https:\/\/www\.megamagnate\.net\//.test(tab.url)) {
    browser.pageAction.show(tabId);
  }
});