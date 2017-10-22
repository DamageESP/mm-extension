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

  function setSettingValue(setting, value) {
    let elem = document.querySelector("#" + setting)
    if (elem.tagName == "A") {
      elem.innerHTML = value ? "on" : "off"
    }
    if (elem.tagName == "INPUT") {
      if (elem.getAttribute("type") == "checkbox") {
        elem.checked = value
      } else {
        elem.value = value
      }
    }
  }

  // Foreach setting
  let settingElems = document.querySelectorAll(".setting")
  for (let i = 0; i < settingElems.length; i++) {
    // Set setting values
    browser.storage.sync.get(settingElems[i].id, settings => {
      let isDefined = settings.hasOwnProperty(settingElems[i].id)
      if (isDefined) {
        setSettingValue(settingElems[i].id, settings[settingElems[i].id])
      } else {
        let defaults = {
          general_moneyTimer: 'on',
          general_playButton: 'off',
          casinos_slowTimer: 10,
          casinos_slowAmount: 800000,
          hilo_exitOn: 1000000,
          advanced_devMode: false
        }
        setSettingValue(settingElems[i].id, defaults[settingElems[i].id])
      }
    })

    // Listen to settings changes
    let eventType
    if (settingElems[i].tagName == "A") eventType = "click"
    else if (settingElems[i].tagName == "INPUT") eventType = "change"
    settingElems[i].addEventListener(eventType, e => {
      let elem = document.querySelector("#" + settingElems[i].id)
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
      browser.storage.sync.set({
        [settingElems[i].id]: newVal
      })
    })
  }
})
