var browser = browser || chrome
let socket

browser.tabs.query({active: true, currentWindow: true}, tabs => {
  if (tabs[0].url.split('/')[2] == "www.megamagnate.net") {
    browser.tabs.executeScript(null, {
      file: "content-patcher.js"
    })
    socket = browser.tabs.connect(tabs[0].id)
    socket.onMessage.addListener(msg => {
      document.querySelector('#socket').innerHTML = msg
    })
  }
})

document.addEventListener('DOMContentLoaded', () => {
  browser.storage.sync.get(["mm_autoclick", "mm_slowMode", "mm_salirEnBote"], settings => {
    let autoClickBtn = document.querySelector('#autoclick')
    let slowMode = document.querySelector('#slowMode')
    let salirEnBote = document.querySelector('#salirEnBote')
    settings.mm_autoclick ? autoClickBtn.innerHTML = "stop autoclick" : null
    settings.mm_slowMode ? slowMode.checked = true : null
    settings.mm_salirEnBote ? salirEnBote.checked = true : null
    autoClickBtn.addEventListener('click', e => {
      e.preventDefault()
      if (!settings.mm_autoclick) {
        autoClickBtn.innerHTML = "stop autoclick"
        settings.mm_autoclick = true
      } else {
        autoClickBtn.innerHTML = "start autoclick"
        settings.mm_autoclick = false
      }
      autoclickStatus()
    })
    slowMode.addEventListener('change', e => {
      settings.mm_slowMode = slowMode.checked
      autoclickStatus()
    })
    salirEnBote.addEventListener('change', e => {
      settings.mm_salirEnBote = salirEnBote.checked
      autoclickStatus()
    })
    function autoclickStatus() {
      browser.storage.sync.set(settings)
      socket.postMessage(settings)
    }
  })
})
