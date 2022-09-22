let validUrl = false;

async function onClickButton(){
    let url = document.getElementById('input-url-send').value;
    fetch('/send', { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({URL: url})}).then(res => {
        if (res.status == 400){
            document.getElementById('url-shorted').textContent = "Not valid URL"
            validUrl = false;
            return;
        }
        res.json().then(json => {
            document.getElementById('url-shorted').textContent = json.URL;
            validUrl = true;
        })
    })
}

function copyToClipboard(){
    if (validUrl == false) return;
    navigator.clipboard.writeText(document.getElementById('url-shorted').textContent);

    let modal = document.getElementById("modalid");
    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
    }, 1000)
}