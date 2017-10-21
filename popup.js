var browser = browser || chrome

let switchTab = newTab => {
  let hide = document.querySelector("#content").children
  for (let i = 0; i < hide.length; i++) {
    hide[i].style.display = "none"
    if (i == hide.length - 1) document.querySelector(newTab).style.display = "block"
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // Nav
  let tabs = document.querySelectorAll("nav span")
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', e => {
      document.querySelector(".active").className = ""
      e.target.className = "active"
      switchTab(tabs[i].children[0].getAttribute("href"))
    })
  }

  // Get settings
  browser.storage.sync.get(["mm_devMode"], settings => {
    let devMode = document.querySelector('#devMode')
    settings.mm_devMode ? devMode.checked = true : null
    devMode.addEventListener('change', e => {
      settings.mm_devMode = devMode.checked
      browser.storage.sync.set(settings)
    })
  })
})
