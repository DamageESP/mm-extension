var browser = browser || chrome

let switchTab = (newTab, navId) => {
  let hide = document.querySelector("#" + navId).parentNode.querySelector("div").children
  for (let i = 0; i < hide.length; i++) {
    hide[i].style.display = "none"
    if (i == hide.length - 1) document.querySelector(newTab).style.display = ""
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

  // Settings change
  let settingElems = document.querySelectorAll(".setting")
  for (let i = 0; i < settingElems.length; i++) {
    console.log(settingElems[i].tagName);
    let eventType
    if (settingElems[i].tagName == "A") {
      eventType = "click"
    }
    if (settingElems[i].tagName == "INPUT") {
      eventType = "change"
    }
    settingElems[i].addEventListener(eventType, e => {
      changeSetting(settingElems[i].id)
    })
  }
  let changeSetting = (setting) => {
    let elem = document.querySelector("#" + setting)
    let newVal
    if (elem.tagName == "A") {
      newVal = elem.innerHTML == 'on' ? false : true
      elem.innerHTML = newVal ? 'on' : 'off'
    }
    if (elem.tagName == "INPUT") {
      if (elem.getAttribute("type") == "checkbox") {
        newVal = elem.checked
      } else {
        newVal = elem.value
      }
    }
    console.log(setting, newVal);
    setting = {
      [setting]: newVal
    }
    browser.storage.sync.set(setting)
  }
  browser.storage.sync.get(null, settings => {
    console.log(settings)
    for (setting in settings) {
      let elem = document.querySelector("#" + setting)
      if (elem.tagName == "A") {
        elem.innerHTML = settings[setting] ? "on" : "off"
      }
      if (elem.tagName == "INPUT") {
        if (elem.getAttribute("type") == "checkbox") {
          elem.checked = settings[setting]
        } else {
          elem.value = settings[setting]
        }
      }
    }
  })
})
