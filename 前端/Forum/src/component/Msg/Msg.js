import './Msg.css'

let Msg = function(txt, timeout=3000) {
    let msgDiv = document.createElement('DIV');
    let content = document.createTextNode(txt);
    msgDiv.classList.add('m-msg');
    msgDiv.appendChild(content);
    msgDiv.style.animationDuration = timeout / 1000 + 's';
    document.body.appendChild(msgDiv);
    setTimeout(function () {
      document.body.removeChild(msgDiv);
    }, timeout);
}

export default Msg