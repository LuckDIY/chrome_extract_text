chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF"
    })
})

let init = true;

// 点击图标监听事件
chrome.action.onClicked.addListener(async (tab) => {
    const preState = await chrome.action.getBadgeText({tabId: tab.id})
    const nextState = preState === 'ON' ? 'OFF' : 'ON';

    //更新状态
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState
    });

    //如果nextState为ON,我们在当前页面加载嵌入js
    if (nextState === 'ON' && init) {
        await chrome.scripting.executeScript({
            target: {
                tabId: tab.id,
            },
            files:['content-script.js']
        })
        init = !init;
    }

    //发送事件消息
    await chrome.tabs.sendMessage(tab.id, {
        extension: nextState
    })
})

