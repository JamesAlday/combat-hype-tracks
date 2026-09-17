# Combat Hype Tracks

A lightweight Foundry VTT module that plays a configurable audio track when a player character's turn begins in combat.

Combat Hype Tracks is a small replacement for the Combat Hype Tracks feature formerly provided by the archived [Maestro](https://github.com/death-save/maestro) module. It is intentionally much simpler: tracks are configured per actor and stored as world settings, with audio files selected through Foundry's native File Picker.

## Features

* Play a configurable track when a player's turn begins.
* Configure tracks independently for each Player Character.
* Set an individual volume for each track.
* Select audio using Foundry's native File Picker.
* Master enable/disable switch.
* Configured tracks are preloaded to reduce playback latency.


## Installation

### From GitHub

This module is currently under development and may not yet be available through the Foundry VTT package browser.

To install directly from GitHub:

1. Open **Game Settings → Manage Modules → Install Module**.
2. Enter the module's GitHub manifest URL.
3. Install the module.
4. Enable **Combat Hype Tracks** in your world.

The manifest URL will be:

```text
https://raw.githubusercontent.com/jamesalday/combat-hype-tracks/main/module.json
```

### Development / Manual Installation

Clone or download the repository into your Foundry `Data/modules` directory:

Then restart Foundry and enable the module.

## Configuration

After enabling the module, open:

**Game Settings → Configure Settings → Module Settings → Combat Hype Tracks**

The configuration window lists Player Character actors in the world.

For each character you can configure:

* **Track** — the audio file to play.
* **Volume** — playback volume from `0` to `1`.

There is also a master **Enable Combat Hype Tracks** setting.

The **Debug** setting controls console logging - enable it to see more of what the module is doing in your console.

## Current Scope

This module is deliberately small.

It currently focuses on:

> **One character → one track → one volume → play at turn start.**

It does not attempt to reproduce all of Maestro's functionality.

### Not currently supported

* Multiple tracks per character
* Playlists
* Track sequencing
* Random track selection
* Conditional tracks
* Track history
* Crossfading
* Combat-specific configuration
* Non-player-character tracks
* Advanced audio controls
* In-game player configuration

These may be considered later if they prove useful.

## Requirements

* Foundry Virtual Tabletop **v14**
* A game system supported by Foundry v14
* Audio files accessible through Foundry's normal file/audio system

## Status

**Early development / testing**

This project exists primarily as a lightweight replacement for the Combat Hype Tracks functionality that was previously available in Maestro.

Expect breaking changes while the module is being developed and tested.

## License

MIT

## Credits

Inspired by the Combat Hype Tracks functionality from the archived [Maestro](https://github.com/death-save/maestro) module by Death Save.

Combat Hype Tracks is an independent implementation using Foundry VTT's current APIs.
