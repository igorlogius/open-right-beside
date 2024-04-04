/*global browser */

// edge case for CTRL+T (new tab creation
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
    browser.tabs.move(newTab.id, { index: activeTab.index + 1 });
    prevTabId = newTab.id;
  }
}

browser.tabs.onActivated.addListener(onActivated);
browser.tabs.onCreated.addListener(onCreated);
