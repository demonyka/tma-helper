class TMAHelper {
    private webApp?: any;

    constructor() {
        this.checkEnvironment();
    }

    private checkEnvironment() {
        if (typeof window === "undefined") {
            console.error("[TMA Helper] Window object not found. Are you in a browser?");
            return;
        }

        if ((window as any).Telegram && (window as any).Telegram.WebApp) {
            this.webApp = (window as any).Telegram.WebApp;
            console.log("[TMA Helper] ✅ Telegram WebApp detected and ready.");
        } else {
            console.error(
                "[TMA Helper] ❌ Telegram WebApp not detected. Make sure the Telegram SDK script is loaded:\n" +
                'Add <script src="https://telegram.org/js/telegram-web-app.js"></script> before your app runs.'
            );
        }
    }

    public getWebApp() {
        return this.webApp;
    }
}

const tmaHelper = new TMAHelper();

export { TMAHelper, tmaHelper };
export default tmaHelper;