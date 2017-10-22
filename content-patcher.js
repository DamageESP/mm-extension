var browser = browser || chrome

browser.storage.sync.get(null, settings => {
  settings.version = 'v1.0'
  var env = ''
  if (settings.advanced_devMode) {
    env = "https://localhost:8080"
  } else {
    env = "https://raw.githubusercontent.com/NiciusB/MegaMegamagnate/master/dist"
  }

  let settingsNode = document.createElement('input')
  settingsNode.type = "hidden"
  settingsNode.id = "mm_settings"
  settingsNode.value = JSON.stringify(settings)
  let bundle = document.createElement("script")
  bundle.type = "text/javascript"
  bundle.src = env + '/app.bundle.js'
  document.getElementsByTagName('body')[0].append(settingsNode, bundle)
})
