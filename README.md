Open new tabs right beside their opener (aka. parent) tab or beside the currently active tab

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

<b>Notes:</b>
<ol>
    <li><b>Permissions:</b>
        This add-on tries to use the minimal number of required permissions to successfully fullfill its intended purpose.
        If you think this could be improved please let me know by opening an issue and i will try to look into it.
        More Details on the individual permission can be found here: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions
    </li>
    <li><b>Cost/Payment:</b>
        This Add-on is and forever will be subscription and payment free to use for everyone however they like.
        If you are feeling generous you can send me a tip via my bitcoin address 35WK2GqZHPutywCdbHKa9BQ52GND3Pd6h4
    </li>
    <li><b>Stars/Reviews:</b>
        If you found this add-on useful leave some stars or a review so others have an  easier time finding it.
    </li>
    <li><b>Bugs, Suggestions or Requests:</b>
        If you have any issues (for example a site it does not work but you think it should) or have improvement suggestions or a feature request please open an issue at the Support Site
    </li>
</ol>

