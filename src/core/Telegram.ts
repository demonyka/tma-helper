class TelegramCore {
    private readonly webApp?: any;

    constructor() {
        if (typeof window === "undefined") {
            console.error("[TMA Helper] Window object not found (non-browser environment)");
            return;
        }

        const tg = (window as any).Telegram?.WebApp;
        if (!tg) {
            console.error(
                "[TMA Helper] Telegram WebApp SDK not detected. Please include:\n" +
                '<script src="https://telegram.org/js/telegram-web-app.js"></script>'
            );
            return;
        }

        this.webApp = tg;
        console.log("[TMA Helper] ✅ Telegram SDK initialized.");
    }

    /** Telegram WebApp initData (string, signed) */
    get initData(): string | undefined {
        return this.webApp?.initData;
    }

    /** Unsafe initData object (not verified) */
    get initDataUnsafe(): Record<string, any> | undefined {
        return this.webApp?.initDataUnsafe;
    }

    /** Telegram WebApp instance */
    get instance(): any | undefined {
        return this.webApp;
    }

    /** Checks if Telegram WebApp is available */
    get isAvailable(): boolean {
        return !!this.webApp;
    }

    get safeAreaInset(): { top: number; bottom: number; left: number; right: number } | undefined {
        return this.webApp?.safeAreaInset;
    }

    /** Content safe area insets */
    get contentSafeAreaInset(): { top: number; bottom: number; left: number; right: number } | undefined {
        return this.webApp?.contentSafeAreaInset;
    }

    /** Close the WebApp */
    close(): void {
        this.webApp?.close();
    }

    /** Hide the WebApp */
    hide(): void {
        this.webApp?.hide();
    }

    /** Expand the WebApp to full height */
    expand(): void {
        this.webApp?.expand();
    }

    /** Disable vertical swipes for expanding/closing */
    disableVerticalSwipes(): void {
        this.webApp?.disableVerticalSwipes();
    }

    /** Enable vertical swipes for expanding/closing */
    enableVerticalSwipes(): void {
        this.webApp?.enableVerticalSwipes();
    }

    /** Enable confirmation dialog on WebApp close */
    enableClosingConfirmation(): void {
        this.webApp?.enableClosingConfirmation();
    }

    /** Disable confirmation dialog on WebApp close */
    disableClosingConfirmation(): void {
        this.webApp?.disableClosingConfirmation();
    }

    /** Lock orientation */
    lockOrientation(): void {
        this.webApp?.lockOrientation();
    }

    /** Lock orientation */
    unlockOrientation(): void {
        this.webApp?.unlockOrientation();
    }

    /** Hide the back button */
    hideBackButton(): void {
        this.webApp?.BackButton?.hide();
    }

    /** Show the back button */
    showBackButton(): void {
        this.webApp?.BackButton?.show();
    }

    /**
     * Set a callback function for back button click
     * @param callback - function to call on back button click
     */
    onBackButtonClick(callback: () => void): void {
        this.webApp?.BackButton?.onClick(callback);
    }

    /**
     * Trigger haptic feedback
     * @param style - impact style ("light", "medium", "heavy")
     */
    hapticFeedback(style: string): void {
        this.webApp?.HapticFeedback?.impactOccurred(style);
    }

    /**
     * Open a link in Telegram
     * @param url - Telegram link (t.me/...)
     */
    openTelegramLink(url: string): void {
        this.webApp?.openTelegramLink(url);
    }

    /**
     * Open a link.
     * Uses openTelegramLink if the URL is a Telegram link (t.me/...), otherwise openLink.
     * @param url - URL to open
     */
    openLink(url: string): void {
        if (!this.webApp || !url) return;

        const isTelegramLink = /^https?:\/\/t\.me|^t\.me/i.test(url);
        isTelegramLink
            ? this.webApp.openTelegramLink(url)
            : this.webApp.openLink(url);
    }

    /** Request fullscreen mode */
    requestFullscreen(): void {
        this.webApp?.requestFullscreen();
    }

    /** Exit fullscreen mode */
    exitFullscreen(): void {
        this.webApp?.exitFullscreen();
    }


    /**
     * Open an invoice
     * @param url - invoice URL
     * @param callback - callback with status
     */
    openInvoice(url: string, callback?: (status: any) => void): void {
        this.webApp?.openInvoice(url, (status: any) => {
            if (callback) callback(status);
        });
    }

    /**
     * Set the header color
     * @param color - color in #RRGGBB format
     */
    setHeaderColor(color: string): void {
        this.webApp?.setHeaderColor(color);
    }

    isVersionAtLeast(version: string): boolean {
        return this.webApp?.isVersionAtLeast(version);
    }
}

export const Telegram = new TelegramCore();
export default Telegram;