var browser = browser || chrome

browser.browserAction.onClicked.addListener(function(tab) {
  console.log(tab)
  browser.tabs.open({
      select: true,
      url: 'popup.html?tabId=' + tab.id + '&mobile=1'
  });
});