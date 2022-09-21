async function onClickButton(){
    let url = document.getElementById('input-url-send').value;
    await fetch('/send', { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({URL: url})})
}