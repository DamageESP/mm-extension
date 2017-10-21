var browser = browser || chrome
var currentUrl = window.location.pathname.split('/').splice(1)

if (currentUrl[currentUrl.length - 2] == 'play') {
  browser.storage.sync.get(["mm_autoclick", "mm_slowMode", "mm_salirEnBote"], settings => {
    casinos.auto = settings.mm_autoclick
    casinos.slowMode = settings.mm_slowMode
    casinos.salirEnBote = settings.mm_salirEnBote
  })
  var casinos = {
    slowMode: false,
    salirEnBote: false,
    auto: false,
    slowCounter: 0,
    lastTs: new Date() * 1,
    interval() {
      setTimeout(casinos.interval, 500);
      var casinoCerrado = $('.tablaerror').length > 0;
      var delta = new Date() * 1 - casinos.lastTs;
      casinos.lastTs = new Date() * 1;
      if (!casinoCerrado && casinos.auto) {
        var bote = parseInt(document.querySelector('#mbote').innerHTML.split('.').join(''))
        if (casinos.salirEnBote && bote <= 20000) {
          alert('Bote!!');
          document.location = '/casino/list';
          return;
        }
        if (casinos.slowMode && bote < 800000) {
          var slowCounterMinValue = 10000;
        } else {
          var slowCounterMinValue = 500;
        }
        casinos.slowCounter += delta;
        if (casinos.slowCounter >= slowCounterMinValue) {
          casinos.slowCounter = 0;
          document.querySelector(".botonapostar img").click()
        }
      }
    }
  }
  casinos.interval()
  browser.runtime.onConnect.addListener(socket => {
    socket.onMessage.addListener(msg => {
      if (typeof msg.mm_autoclick != "undefined") casinos.auto = msg.mm_autoclick
      if (typeof msg.mm_salirEnBote != "undefined") casinos.salirEnBote = msg.mm_salirEnBote
      if (typeof msg.mm_slowMode != "undefined") casinos.slowMode = msg.mm_slowMode
    })
  })
}

if (currentUrl[currentUrl.length - 1] == 'hilo') {

}
//let env = "https://rawgit.com/NiciusB/MegaMegamagnate/master/dist"
let env = "https://localhost:8080"
if (currentUrl[0] !== "") {
  let bundle = document.createElement("script")
  bundle.type = "text/javascript"
  bundle.src = env+'/app.bundle.js'
  document.getElementsByTagName('body')[0].append(bundle)
}
