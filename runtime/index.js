export default class Refraction {
    constructor(renderer) {
        this.renderer = renderer;

        this.createContext = [];
        this.components = [];

        this.mounted = false;
        this.unmountHandlers = [];
    }

    register(name, Component) {
        this.components.push({ name, Component });
    }

    context(context) {
        this.createContext = context.hasOwnProperty('keys')
            ? () => context
            : context;

        this.reload();
    }

    reload() {
        const context = this.createContext();

        this.components = context.keys().map(filename => {
            const name = filename
                .substr(2, filename.length - 5)
                .replace('/', '.');

            return {
                name,
                component: () => context(filename).default,
            };
        });

        if (this.mounted) {
            this.mount();
        }
    }

    mount() {
        this.unmount();

        this.unmountHandlers = this.components.reduce((allUnmountHandlers, { name, component }) => {
            const containers = document.querySelectorAll(`[data-component=${name}]`);

            const unmountHandlers = [...containers].map(container => {
                const Component = component();
                const props = JSON.parse(container.dataset.props);

                return this.renderer({ container, Component, props });
            });

            return [...allUnmountHandlers, ...unmountHandlers];
        }, []);

        this.mounted = true;
    }

    unmount() {
        this.unmountHandlers.forEach(handler => {
            handler();
        });

        this.unmountHandlers = [];

        this.mounted = false;
    }
}
