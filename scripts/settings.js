import { HypeTracksConfig } from "./config-app.js";

export function registerSettings() {

    game.settings.register("combat-hype-tracks", "config", {
        name: "Combat Hype Tracks Configuration",
        hint: "Configuration for combat hype tracks.",
        scope: "world",
        config: false,
        type: Object,
        default: {
            enabled: true,
            players: {}
        }
    });

    game.settings.registerMenu("combat-hype-tracks", "configMenu", {
        name: "Combat Hype Tracks",
        label: "Configure Combat Hype Tracks",
        hint: "Configure which player characters have hype tracks.",
        icon: "fas fa-music",
        type: HypeTracksConfig,
        restricted: true
    })
}
