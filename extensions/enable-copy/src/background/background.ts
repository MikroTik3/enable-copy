chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ infinityMode: false });
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === "TOGGLE_COPY") {
        const { enabled, tabId } = message;

        chrome.tabs.sendMessage(
            tabId,
            { type: enabled ? "ENABLE_COPY" : "DISABLE_COPY" },
            () => {
                if (chrome.runtime.lastError) {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId },
                            files: ["contentScript.js"],
                        },
                        () => {
                            if (chrome.runtime.lastError) return;
                            chrome.tabs.sendMessage(tabId, {
                                type: enabled ? "ENABLE_COPY" : "DISABLE_COPY",
                            });
                        }
                    );
                }
            }
        );

        sendResponse({ ok: true });
        return true;
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status !== "complete") return;

    chrome.storage.local.get(["infinityMode"], ({ infinityMode }) => {
        if (!infinityMode) return;

        chrome.tabs.sendMessage(
            tabId,
            { type: "ENABLE_COPY" },
            () => {
                if (chrome.runtime.lastError) {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId },
                            files: ["contentScript.js"],
                        },
                        () => {
                            if (chrome.runtime.lastError) return;
                            chrome.tabs.sendMessage(tabId, {
                                type: "ENABLE_COPY",
                            });
                        }
                    );
                }
            }
        );
    });
});