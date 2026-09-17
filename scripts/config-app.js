const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class HypeTracksConfig extends HandlebarsApplicationMixin(ApplicationV2) {

    static DEFAULT_OPTIONS = {
        id: "combat-hype-tracks-config",
        tag: "form",
        window: {
            title: "Hype Tracks",
            icon: "fas fa-music",
            resizable: true
        },
        position: {
            width: 600,
            height: "auto"
        },
        form: {
            handler: HypeTracksConfig.#onSubmit
        }
    };

    static PARTS = {
        form: {
            template: "modules/combat-hype-tracks/templates/config.hbs"
        }
    };

    async _prepareContext(options) {
        const config = game.settings.get("combat-hype-tracks", "config");

        config.debug && console.log("Loading Hype Tracks config:", config);

        const actors = game.actors
            .filter(actor => actor.type === "character")
            .map(actor => ({
                id: actor.id,
                name: actor.name,
                track: config.players?.[actor.id]?.track ?? "",
                volume: config.players?.[actor.id]?.volume ?? 1
            }));

        return {
            enabled: config.enabled,
            debug: config.debug,
            actors
        };
    }

    _onRender(context, options) {
        super._onRender(context, options);

        this.element.querySelectorAll(".file-picker").forEach(button => {
            button.addEventListener("click", () => {
                const target = button.dataset.target;

                new FilePicker({
                    type: "audio",
                    current: this.element.querySelector(`[name="${target}"]`)?.value ?? "",
                    callback: path => {
                        const input = this.element.querySelector(`[name="${target}"]`);

                        if (input) {
                            input.value = path;
                        }
                    }
                }).render(true);
            });
        });
    }

    static async #onSubmit(event, form, formData) {
        config.debug && console.log("Submitting Hype Tracks config:", formData.object);

        const config = {
            enabled: formData.object.enabled ?? false,
            debug: formData.object.debug ?? false,
            players: {}
        };

        for (const actor of game.actors.filter(a => a.type === "character")) {
            const track = formData.object[`track-${actor.id}`]?.trim() ?? "";
            const volume = Number(
                formData.object[`volume-${actor.id}`] ?? 1
            );

            if (track) {
                config.players[actor.id] = {
                    track,
                    volume
                };
            }
        }

        config.debug && console.log("Saving Hype Tracks config:", config);

        await game.settings.set(
            "combat-hype-tracks",
            "config",
            config
        );

        config.debug && console.log(
            "Saved Hype Tracks config:",
            game.settings.get("combat-hype-tracks", "config")
        );

        ui.notifications.info("Hype Tracks configuration saved.");

        form.querySelector("[data-action='close']")?.click();
    }
}