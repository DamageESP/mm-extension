var browser = browser || chrome

document.addEventListener('DOMContentLoaded', () => {
  browser.storage.sync.get(["mm_devMode"], settings => {
    let devMode = document.querySelector('#devMode')
    devMode.checked = settings.mm_devMode ? true : null
    devMode.addEventListener('change', e => {
      settings.mm_devMode = devMode.checked
      browser.storage.sync.set(settings)
    })
  })
})
