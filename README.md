Open new tabs right beside their opener (aka. parent) tab or beside the currently active tab

[![](https://raw.githubusercontent.com/igorlogius/igorlogius/main/geFxAddon.png)](https://addons.mozilla.org/firefox/addon/open-right-beside/)

### [Click here to report a bug, make a suggestion or ask a question](https://github.com/igorlogius/igorlogius/issues/new/choose)

<b>Short Demo Video:</b>

https://github.com/igorlogius/open-right-beside/assets/67047467/b55ab14e-73bb-4c4b-85ce-f1a03b96e306

Inspired by  "Open Tabs Next to Current" and "Always Right"
which i took a look at and found them to be a little to bi/complex. Lines of JS Code comparision:
"Open Tabs Next to Current" (166), "Always Right"  (121) and "Open Right Beside" (27). And no that is no typo. 27 Lines of code. I's so small, i'll even post it here:

<b>code of background.js:</b>
<code>
let prevTabId = null;
let actiTabId = null;

async function onActivated(activeInfo) {
    prevTabId = activeInfo.previousTabId;
    actiTabId = activeInfo.tabId;
}

async function onCreated(newTab) {
    let activeTab = null;
    if (newTab.id === actiTabId) {
        activeTab = await browser.tabs.get(prevTabId);
    } else {
        activeTab = await browser.tabs.get(actiTabId);
    }
    if (newTab.windowId === activeTab.windowId) {
        browser.tabs.move(newTab.id, {
            index: activeTab.index + 1
        });
        prevTabId = newTab.id;
    }
}

browser.tabs.onActivated.addListener(onActivated);
browser.tabs.onCreated.addListener(onCreated);
</code>

<b>Sidenote</b>
For people who think that the about:config setting now replaces this.
Let me just say, that i found this behaviour to have been inconsistent and that is why i prefer to create this solution which as of yet never let me down.

<b>Usage:</b>
<ol>
	<li>install the add-on </li>
	<li>open tabs</li>
</ol>
