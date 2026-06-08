import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../static/tailwind.css";

const ToggleCard = ({
    title,
    description,
    enabled,
    onToggle,
}: {
    title: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
}) => {
    return (
        <div
            onClick={onToggle}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition"
        >
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-white/50">{description}</p>
            </div>
            <div className="relative w-8 h-4 rounded-full bg-white">
                <div
                    className={`absolute top-px left-px size-3.5 rounded-full bg-black transition-transform ${
                        enabled ? "translate-x-4" : ""
                    }`}
                />
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const [enableCopy, setEnableCopy] = useState(false);
    const [infinityMode, setInfinityMode] = useState(false);

    useEffect(() => {
        chrome.storage.local.get(["infinityMode", "enableCopy"], (result) => {
            setInfinityMode(Boolean(result.infinityMode));
            setEnableCopy(Boolean(result.enableCopy));
        });
    }, []);

    const toggleCopy = async () => {
        const nextValue = !enableCopy;
        setEnableCopy(nextValue);

        await chrome.storage.local.set({ enableCopy: nextValue });

        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });

        if (!tab.id) return;

        chrome.runtime.sendMessage({
            type: "TOGGLE_COPY",
            enabled: nextValue,
            tabId: tab.id,
        });
    };

    const toggleInfinity = async () => {
        const nextValue = !infinityMode;
        setInfinityMode(nextValue);

        await chrome.storage.local.set({ infinityMode: nextValue });

        if (nextValue) {
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true,
            });
            if (tab.id) {
                chrome.runtime.sendMessage({
                    type: "TOGGLE_COPY",
                    enabled: true,
                    tabId: tab.id,
                });
            }
        }
    };

    return (
        <div className="w-[320px] h-105 bg-zinc-950 text-white p-4 flex items-center justify-center">
            <div className="w-full h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden">

                <div className="p-4 border-b border-white/10 flex items-start gap-4 justify-between">
                    <div>
                        <h1 className="text-lg font-semibold">Enable Copy</h1>
                        <p className="text-xs text-white/50">
                            Unlock restrictions on any website
                        </p>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full border ${
                        enableCopy || infinityMode
                            ? "border-green-500/30 text-green-400 bg-green-500/10"
                            : "border-red-500/30 text-red-400 bg-red-500/10"
                    }`}>
                        {enableCopy || infinityMode ? "ON" : "OFF"}
                    </div>
                </div>

                <div className="p-4 flex-1 flex flex-col gap-3">
                    <ToggleCard
                        title="Enable Copy"
                        description="Enable selection, copy & right click"
                        enabled={enableCopy}
                        onToggle={toggleCopy}
                    />
                    <ToggleCard
                        title="Infinity Mode"
                        description="Keep protection bypass always active"
                        enabled={infinityMode}
                        onToggle={toggleInfinity}
                    />
                    <p className="text-xs text-white/60 mt-2">
                        Version {chrome.runtime.getManifest().version}
                    </p>
                </div>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => chrome.tabs.reload()}
                        className="w-full rounded-lg bg-white text-black text-sm font-medium py-2 hover:bg-white/90 transition"
                    >
                        Reload
                    </button>
                </div>
            </div>
        </div>
    );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<App />);