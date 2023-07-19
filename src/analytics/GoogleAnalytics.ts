interface Hosting {
    trackingId: string,
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
        //? 'installPWA': () => this.listenerFunc('installPWA', 'btn', 'install_PWA_btn'),
        'newGameBtn': () => this.listenerFunc('pressNewGameBtn', 'btn', 'press_new_game_btn'),
        'toggleFieldManager': () => this.listenerFunc('toggleFieldManager', 'switch', 'toggle_field_manager'),
        'saveNewFieldSize': () => this.listenerFunc('saveNewFieldSize', 'btn', 'save_new_field_size'),
        'field': () => this.listenerFunc('clickToCell', 'field', 'click_to_cell'),
    }

    constructor () {
        this.getScript();
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

    listenerFunc (eventName: string, element: string, description: string) {
        gtag(
            'event', 
            eventName, 
            {
                'element': element,
                'description': description,
            }
        );
    }

    checkClickedElement (event: MouseEvent) {
        const eventTarget: EventTarget | null = event.target;

        if (<string>(eventTarget as HTMLElement).id && typeof this.#analiticListners[(eventTarget as HTMLElement).id as keyof AnaliticListners] === 'function') {
            this.#analiticListners[(eventTarget as HTMLElement).id as keyof AnaliticListners]();
        }
    }

    addAnalyticsListener () {
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
