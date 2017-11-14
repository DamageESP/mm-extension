var browser = browser || chrome

var settings = defaultSettings
browser.storage.sync.get(null, customSettings => {
  for(key in customSettings) {
    settings[key] = customSettings[key]
  }
  addSettingsNode(settings)
  addBundle(settings)
})

function addSettingsNode(settings) {
  settings.version = 'v1.7'
  let settingsNode = document.createElement('input')
  settingsNode.type = "hidden"
  settingsNode.id = "mm_settings"
  settingsNode.value = JSON.stringify(settings)
  document.getElementsByTagName('body')[0].append(settingsNode)
}

function addBundle(settings) {
  var env = ''
  if (settings.advanced_devMode) {
    env = "https://localhost:8080"
  } else {
    env = "https://rawgit.com/NiciusB/MegaMegamagnate/master/dist"
  }
  $.ajax({
    dataType: "script",
    cache: true,
    url: env + '/app.bundle.js'
  })
}
