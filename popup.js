document.getElementById('clickBtn').addEventListener('click', function () {
    const text = document.getElementById('linkText').value.trim();
    if (!text) {
        alert("Please enter link text to click.");
        return;
    }

    chrome.tabs.query({}, function (tabs) {
        if (!tabs.length) return alert("No open tabs found.");

        tabs.forEach(tab => {
            if (!tab.id || !tab.url.startsWith("http")) return; // avoid system tabs

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (linkText) => {
                    const links = Array.from(document.querySelectorAll('a'));
                    const found = links.find(a => a.textContent.trim() === linkText);
                    if (found) {
                        found.click();
                    }
                },
                args: [text]
            });
        });
    });
});
