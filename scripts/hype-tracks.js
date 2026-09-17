import { registerSettings } from "./settings.js";

Hooks.once("init", () => {
    registerSettings();
});

Hooks.once("ready", () => {
    preloadHypeTracks();
});

let currentHypeTrack = null;

export async function preloadHypeTracks() {
    const config = game.settings.get("combat-hype-tracks", "config");

    if (!config.enabled) return;

    const tracks = Object.values(config.players ?? {})
        .map(player => player.track)
        .filter(Boolean);

    for (const track of tracks) {
        config.debug && console.log(`Preloading hype track: ${track}`);

        try {
            await foundry.audio.AudioHelper.preloadSound(track);
        } catch (error) {
            console.error(
                `Failed to preload hype track: ${track}`,
                error
            );
        }
    }
}

function stopHypeTrack() {
    if (!currentHypeTrack) return;

    currentHypeTrack.stop();
    currentHypeTrack = null;
}

async function playHypeTrack(config) {
    stopHypeTrack();

    if (!config?.track) return;

    // FIXME: somewhat fragile but...
    if (currentHypeTrack === config.track) {
        return;
    }

    currentHypeTrack = await foundry.audio.AudioHelper.play({
        src: config.track,
        volume: config.volume || 1,
        loop: false
    }, true);
}

Hooks.on("combatTurnChange", async (combat, prior, current) => {
    const isActiveGM = game.user.isGM && game.users.activeGM?.id === game.user.id;

    if (!isActiveGM) return;

    stopHypeTrack();

    const combatant = combat.combatant;
    const actor = combatant?.actor;
    
    if (!actor) {
        config.debug && console.log("No actor found");
        return;
    }

    config.debug && console.log("Actor ID: ", actor.id);

    const settings = game.settings.get("combat-hype-tracks", "config");

    if (!settings || !settings.enabled) {
        config.debug && console.log("Settings not found or disabled");
        return;
    }

    config.debug && console.log("SETTINGS: ", settings);

    const config = settings.players[actor.id];

    config.debug && console.log("CONFIG: ", config);

    // const track = getTrackForCombatant(combatant);
    // const track = actor.getFlag("combat-hype-tracks", "track");
    if (!config || !config.track) {
        config.debug && console.log("No config/track for actor");
        stopHypeTrack();
        return;
    }

    config.debug && console.log(`Playing hype track for ${actor.name}: ${config.track}`);

    playHypeTrack(config);
});
