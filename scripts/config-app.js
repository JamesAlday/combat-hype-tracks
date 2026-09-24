const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class HypeTracksConfig extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
        id: "combat-hype-tracks-config",
        tag: "form",
        window: {
            title: "Combat Hype Tracks",
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

    constructor(options = {}) {
        super(options);
        const config = game.settings.get("combat-hype-tracks", "config");
        this.players = structuredClone(config.players ?? {});
    }

    async _prepareContext(options) {
        const config = game.settings.get("combat-hype-tracks", "config");

        config.debug && console.log("Loading Hype Tracks config:", config);

        const configuredIds = Object.keys(this.players);

        const actors = configuredIds
            .map(id => {
                const actor = game.actors.get(id);
                if (!actor) return null;

                const player = this.players[id];

                return {
                    id: actor.id,
                    name: actor.name,
                    track: player.track ?? "",
                    volume: player.volume ?? 1
                };
            })
            .filter(Boolean);
        
        config.debug && console.log("Configured actors:", actors);
        
        const availableActors = game.actors
            .filter(actor => 
                actor.type === "character" &&
                !configuredIds.includes(actor.id)
            )
            .map(actor => ({
                id: actor.id,
                name: actor.name,
            }))
        
        config.debug && console.log("Available actors:", availableActors);

        return {
            enabled: config.enabled,
            debug: config.debug,
            actors,
            availableActors
        };
    }

    _onRender(context, options) {
        super._onRender(context, options);

        // Filepicker - audio file path selector
        const isForge = typeof ForgeVTT !== "undefined" && ForgeVTT.usingTheForge;
        this.element.querySelectorAll(".file-picker").forEach(button => {
            button.addEventListener("click", () => {
                const target = button.dataset.target;

                new FilePicker({
                    type: "audio",
                    activeSource: isForge ? "forgevtt" : "data",
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

        // Remove Player
        this.element.querySelectorAll(".remove-player").forEach(button => {
            button.addEventListener("click", () => {
                const actorId = button.dataset.actorId;

                delete this.players[actorId];

                this.render();
            });
        });

        // Add Player
        this.element.querySelector(".add-player")?.addEventListener("click", () => {
            const select =
                this.element.querySelector("[name='add-player']");

            const actorId = select?.value;

            if (!actorId) return;

            this.#addPlayer(actorId);
        });

        // Volume Slider
        this.element.querySelectorAll(".volume-slider").forEach(slider => {
            slider.addEventListener("input", () => {
                const target = slider.dataset.target;
                const number = this.element.querySelector(`[name="${target}"]`);

                if (number) {
                    number.value = slider.value;
                }
            });
        });

        // Volume Number Input
        this.element.querySelectorAll(".volume-number").forEach(number => {
            number.addEventListener("input", () => {
                const slider = this.element.querySelector(
                    `.volume-slider[data-target="${number.name}"]`
                );

                if (slider) {
                    slider.value = number.value;
                }
            });
        });
    }

    #addPlayer(actorId) {
        if (this.players[actorId]) return;

        this.players[actorId] = {
            track: "",
            volume: 1
        };

        this.render();
    }

    static async #onSubmit(event, form, formData) {
        const config = {
            enabled: formData.object.enabled ?? false,
            debug: formData.object.debug ?? false,
            players: {}
        };

        config.debug && console.log("Submitting Hype Tracks config:", formData.object);

        for (const actorId of Object.keys(this.players)) {
            const track = formData.object[`track-${actorId}`]?.trim() ?? "";
            const volume = Number(formData.object[`volume-${actorId}`] ?? 1);

            config.players[actorId] = {
                track,
                volume
            };
        }

        config.debug && console.log("Saving Combat Hype Tracks config:", config);

        await game.settings.set(
            "combat-hype-tracks",
            "config",
            config
        );

        config.debug && console.log(
            "Saved Combat Hype Tracks config:",
            game.settings.get("combat-hype-tracks", "config")
        );

        ui.notifications.info("Combat Hype Tracks configuration saved.");

        form.querySelector("[data-action='close']")?.click();
    }
}