import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
    title: {
        default: "Enable Copy — Reclaim Your Clipboard",
        template: "%s | Enable Copy",
    },
    description:
        "Enable Copy is a free, open-source browser extension that removes copy restrictions from any website. Paste freely. Always.",
    keywords: [
        "enable copy",
        "browser extension",
        "copy paste",
        "remove copy protection",
        "clipboard",
        "open source",
        "chrome extension",
        "firefox extension",
    ],
    authors: [{ name: "Enable Copy" }],
    creator: "Enable Copy",
    publisher: "Enable Copy",
    metadataBase: new URL("https://enablecopy.vercel.app"),
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://enablecopy.vercel.app",
        siteName: "Enable Copy",
        title: "Enable Copy — Reclaim Your Clipboard",
        description:
            "A free, open-source browser extension that removes copy restrictions from any website.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Enable Copy — Reclaim Your Clipboard",
        description:
            "A free, open-source browser extension that removes copy restrictions from any website.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export const viewport: Viewport = {
    themeColor: "#050505",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap"
                rel="stylesheet"
            />
        </head>
            <body className="antialiased">{children}</body>
        </html>
    );
}