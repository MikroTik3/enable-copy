const UNLOCK_EVENTS = [
    "copy",
    "cut",
    "paste",
    "contextmenu",
    "selectstart",
    "mousedown",
    "mouseup",
    "keydown",
    "keyup",
];

let isActive = false;
let injectedStyle: HTMLStyleElement | null = null;

const stopPropagation = (e: Event) => {
    e.stopImmediatePropagation();
};

function injectCSS() {
    if (injectedStyle) return;

    injectedStyle = document.createElement("style");
    injectedStyle.id = "__enable-copy-style__";
    injectedStyle.textContent = `
        * {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
        }
    `;
    document.documentElement.appendChild(injectedStyle);
}

function removeCSS() {
    if (injectedStyle) {
        injectedStyle.remove();
        injectedStyle = null;
    }
    const existing = document.getElementById("__enable-copy-style__");
    if (existing) existing.remove();
}

function enableCopy() {
    if (isActive) return;
    isActive = true;

    for (const event of UNLOCK_EVENTS) {
        document.addEventListener(event, stopPropagation, {
            capture: true,
            passive: false,
        });
    }

    document.oncopy = null;
    document.oncut = null;
    document.onpaste = null;
    document.oncontextmenu = null;

    if (document.body) {
        document.body.oncopy = null;
        document.body.oncut = null;
        document.body.onpaste = null;
        document.body.oncontextmenu = null;
    }

    injectCSS();

    const originalAddEventListener = EventTarget.prototype.addEventListener;
    (EventTarget.prototype as any).__originalAddEventListener =
        originalAddEventListener;

    EventTarget.prototype.addEventListener = function (
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ) {
        if (UNLOCK_EVENTS.indexOf(type as string) !== -1) {
            const wrapped = (e: Event) => {};
            return originalAddEventListener.call(this, type, wrapped, options);
        }
        return originalAddEventListener.call(this, type, listener, options);
    };
}

function disableCopy() {
    if (!isActive) return;
    isActive = false;

    for (const event of UNLOCK_EVENTS) {
        document.removeEventListener(event, stopPropagation, {
            capture: true,
        });
    }

    removeCSS();

    if ((EventTarget.prototype as any).__originalAddEventListener) {
        EventTarget.prototype.addEventListener = (
            EventTarget.prototype as any
        ).__originalAddEventListener;
        delete (EventTarget.prototype as any).__originalAddEventListener;
    }
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "ENABLE_COPY") {
        enableCopy();
    } else if (message.type === "DISABLE_COPY") {
        disableCopy();
    }
});

chrome.storage.local.get(["infinityMode"], ({ infinityMode }) => {
    if (infinityMode) {
        enableCopy();
    }
});