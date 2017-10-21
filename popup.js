var browser = browser || chrome

let switchTab = (newTab, navId) => {
  let hide = document.querySelector("#" + navId).parentNode.querySelector("div").children
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
      document.querySelector("#" + tabs[i].parentElement.id + " .active").className = ""
      tabs[i].className = "active"
      switchTab(tabs[i].children[0].getAttribute("href"), tabs[i].parentElement.id)
    })
  }

  // Get settings
  browser.storage.sync.get(["mm_devMode"], settings => {
    let devMode = document.querySelector('#devMode')
    devMode.checked = settings.mm_devMode
    devMode.addEventListener('change', e => {
      settings.mm_devMode = devMode.checked
      browser.storage.sync.set(settings)
    })
  })
})
