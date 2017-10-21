var browser = browser || chrome

browser.storage.sync.get(["mm_devMode"], settings => {
  var env = ''
  if (settings.mm_devMode) {
    env = "https://localhost:8080"
  } else {
    env = "https://rawgit.com/NiciusB/MegaMegamagnate/master/dist"
  }

  let bundle = document.createElement("script")
  bundle.type = "text/javascript"
  bundle.src = env + '/app.bundle.js'
  document.getElementsByTagName('body')[0].append(bundle)
})
