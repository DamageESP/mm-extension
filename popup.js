var browser = browser || chrome

document.addEventListener('DOMContentLoaded', () => {
  browser.storage.sync.get(["mm_devMode"], settings => {
    let devMode = document.querySelector('#devMode')
    settings.mm_devMode ? devMode.checked = true : null
    devMode.addEventListener('change', e => {
      settings.mm_devMode = devMode.checked
      browser.storage.sync.set(settings)
    })
  })
})
