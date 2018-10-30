const ipc = require('electron').ipcRenderer;
ipc.on('message', (event, message) => {
  console.log(message); // logs out "Hello second window!"
  var x = document.getElementsByClassName('message')
  for (var i = 0; i < x.length; i++) {
    console.log("appending to element", x[i], message)
    var div= document.createElement('div')
    div.textContent = message
    x[i].appendChild(div)
  }
})
ipc.on('populate', (event, message) => {
  console.log("populating", message); // logs out "Hello second window!"
  document.getElementById('secondary').innerHTML = message
  bindevents()
})

var bindevents = function(){
  var x = document.getElementsByClassName("input")
  for (var i = 0; i < x.length; i++) {
    x[i].addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        console.log(event)
        ipc.send('message', event.srcElement.value)// Do work
        event.srcElement.value=""
      }
    })
  }
}

window.onload = bindevents
