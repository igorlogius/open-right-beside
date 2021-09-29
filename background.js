browser.tabs.onCreated.addListener(async function(newTab) {

	if(newTab.pinned) { return; }
	if(newTab.windowId < 1) { return; }

	// move only works on "normal" windows
	const newTabWin = await browser.windows.get(newTab.windowId);
	if(newTabWin.type !== "normal") { return; }

	// only present if the opener tab still exists and is in the same window.
	if(newTab.openerTabId > -1){
		const openerTab = await browser.tabs.get(newTab.openerTabId);
		if(openerTab.windowId === newTab.windowId) { 
			if(openerTab.index > -1 && !openerTab.pinned) {
				await browser.tabs.move(newTab.id, { index: (openerTab.index+1) });        
				return;
			}
		}
	}

	//  
	if(!newTab.active){
		const activeTab = (await browser.tabs.query({currentWindow: true, active: true}))[0];
		if(activeTab.windowId === newTab.windowId) { 
			if(!activeTab.pinned && activeTab.index > -1) {
				browser.tabs.move(newTab.id, { index: (activeTab.index+1) });        
				return;
			}
		}
		// move to the end ... might not be the best idea, but at least it is consistent 
		browser.tabs.move(newTab.id, {index: -1});
	}

});
