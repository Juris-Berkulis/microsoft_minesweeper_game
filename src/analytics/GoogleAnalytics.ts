interface Hosting {
    trackingId: `G-${string}`,
};

interface Hostings {
    netlify: Hosting,
    vercel: Hosting,
    surge: Hosting,
};

interface AnaliticListners {
    [key: string]: () => void,
};

declare let gtag: Function;

export default class GoogleAnalytics {
    #hostings: Hostings = {
        netlify: {
            trackingId: 'G-YDE6V2N1W0',
        },
        vercel: {
            trackingId: 'G-M22397J416',
        },
        surge: {
            trackingId: 'G-JFJFVSLMNS',
        },
    }

    #analiticListners: AnaliticListners = {
        'homeView': () => this.listenerFunc('homeViewIsOpened', 'page', 'home_view_is_opened'),
        'settingsView': () => this.listenerFunc('settingsViewIsOpened', 'page', 'settings_view_is_opened'),
        'btnForAppInstallingAsPWA': () => this.listenerFunc('pressBtnForPWA', 'btn', 'press_btn_for_PWA'),
        'newGameBtn': () => this.listenerFunc('newGameByBtn', 'btn', 'new_game_by_btn'),
        'toggleFieldManager': () => this.listenerFunc('toggleFieldManager', 'switch', 'toggle_field_manager'),
        'saveNewFieldSizeBtn': () => this.listenerFunc('saveNewFieldSize', 'btn', 'save_new_field_size'),
        'serviceWorkerMessageClosedBtn': () => this.listenerFunc('SWMessageCloseByBtn', 'btn', 'press_btn_for_service_worker_message_closing'),
        'copyBtn': () => this.listenerFunc('pressCopyBtn', 'btn', 'press_copy_btn'),
    }

    constructor () {
        if (this.isStartGoogleAnalytics()) {
            this.getScript();
        }
    }

    isStartGoogleAnalytics (): boolean {
        return !location.hostname.includes('localhost')
    }

    getDomen (): string {
        return location.hostname.split('.')[1]
    }

    getTrackingId (): string | null {
        const hostingOptions = this.#hostings[this.getDomen() as keyof Hostings];

        if (hostingOptions) {
            return hostingOptions.trackingId
        } else {
            return null
        }
    }

    getScript1 (trackingId: string): HTMLScriptElement {
        const script: HTMLScriptElement = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;

        return script
    }

    getScript2 (trackingId: string): HTMLScriptElement {
        const script: HTMLScriptElement = document.createElement("script");
        script.textContent = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}');
        `;

        return script
    }

    listenerFunc (eventName: string, element: string, description: string): void {
        gtag(
            'event', 
            eventName, 
            {
                'element': element,
                'description': description,
            }
        );
    }

    static listenerFuncStatic (eventName: string, element: string, description: string): void {
        if (!location.hostname.includes('localhost')) {
            gtag(
                'event', 
                eventName, 
                {
                    'element': element,
                    'description': description,
                }
            );
        }
    }

    checkClickedElement (event: MouseEvent): void {
        if (navigator.onLine !== false) { //* - undefined тоже подходит (на случай, если "navigator.onLine" не поддерживается).
            const eventTarget: EventTarget | null = event.target;

            if (<string>(eventTarget as HTMLElement).id && typeof this.#analiticListners[(eventTarget as HTMLElement).id as keyof AnaliticListners] === 'function') {
                this.#analiticListners[(eventTarget as HTMLElement).id as keyof AnaliticListners]();
            }
        }
    }

    addAnalyticsListener (): void {
        window.addEventListener('click', (event: MouseEvent) => this.checkClickedElement(event), {capture: true});
    }

    getScript (): void {
        const trackingId: string | null = this.getTrackingId();
        
        if (trackingId) {
            document.head.insertAdjacentElement("beforeend", this.getScript1(trackingId));
            document.head.insertAdjacentElement("beforeend", this.getScript2(trackingId));

            this.addAnalyticsListener();
        }
    }
};

export const sendActionIntoGoogleAnalytics = (eventName: string, element: string, description: string): void => {
    if (navigator.onLine !== false) { //* - undefined тоже подходит (на случай, если "navigator.onLine" не поддерживается).
        GoogleAnalytics.listenerFuncStatic(eventName, element, description);
    }
};
