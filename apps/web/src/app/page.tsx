import { Spotlight } from "@/components/spotlight";

export default function HomePage() {
      return (
            <div className="min-h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
                  <Spotlight />

                  <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                              Reclaim Your Clipboard.
                              <br />
                              Copy Without Limits.
                        </h1>

                        <p className="mt-4 font-normal text-base text-neutral-300 max-w-2xl text-center mx-auto">
                              Enable Copy is a free and open-source browser extension that removes
                              copy, paste, text selection, and right-click restrictions from websites.
                              Access the content you need, when you need it.
                        </p>

                        <div className="mt-8 flex items-center justify-center gap-4">
                              <a href="https://chromewebstore.google.com/" rel="noopener noreferrer" target="_blank" className="flex cursor-pointer bg-neutral-900 px-4 py-2 font-medium text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring ring-white/20 ring-offset-2 ring-offset-neutral-900 transition-all duration-200 ring-inset hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset] hover:ring-white/40 active:scale-98 dark:bg-white dark:text-black dark:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)_inset] dark:ring-black/20 dark:ring-offset-white dark:hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)_inset] dark:hover:ring-black/50 h-14 w-full items-center justify-center rounded-lg text-center text-base sm:w-52">
                                    Add to Chrome
                              </a>

                              <a href="https://github.com/MikroTik3/enable-copy" rel="noopener noreferrer" target="_blank" className="flex h-14 w-full items-center justify-center rounded-lg border border-transparent bg-white text-base font-medium text-black shadow-sm ring-1 shadow-black/10 ring-black/10 transition duration-150 active:scale-98 sm:w-52 dark:border-neutral-600 dark:bg-black dark:text-white">
                                    View on GitHub
                              </a>
                        </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors duration-200">
                        Made with ❤️ by{" "}
                        <a href="https://github.com/MikroTik3" className="underline" target="_blank" rel="noopener noreferrer">
                              @MikroTik3
                        </a>
                  </div>

            </div>
      )
}