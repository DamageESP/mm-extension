var browser = browser || chrome

var settings = defaultSettings
browser.storage.sync.get(null, customSettings => {
  for (key in customSettings) {
    settings[key] = customSettings[key]
  }
  addBundle(settings)
})

function addBundle(settings) {
  var env = ''
  if (settings.advanced_devMode) {
    env = "https://localhost:8080"
  } else {
    env = "https://rawgit.com/NiciusB/MegaMegamagnate/master/dist"
  }

  settings.version = 'v1.7'
  var script = document.createElement('script')
  script.textContent = 'var mmm_settings = JSON.parse(\'' + JSON.stringify(settings) + '\');';
  document.getElementsByTagName('body')[0].append(script)
  script.remove()

  $.ajax({
    dataType: "script",
    cache: true,
    url: env + '/app.bundle.js'
  })
}
