# Combat Hype Tracks for Foundry VTT

## Overview

Combat Hype Tracks is a system agnostic module for Foundry Virtual Tabletop (Foundry VTT) designed for use with Foundry's combat tracker feature.

---

## Features


---

## Installation

1. Download or clone this repository into your Foundry VTT `Data/modules` directory.
2. Restart your Foundry VTT server.
3. Enable the **Combat Hype Tracks** module in your game world via the **Manage Modules** menu.
4. Select the directory containing character files via the **Configure Settings** menu.

---

## Usage

**Ensure the module is enabled and the GM is logged in.**

### Create Characters
1. Create characters for your game on (Dhole's House)[https://dholeshouse.org/] and export them to a JSON file
2. Put these files into the directory you specified in the module settings.
3. Create a Character in Foundry with a name matching the JSON file

### Reset Skills Macro
1. The module will automatically create a macro named **Amnesia: Reset Skills** in the Macro Directory.
2. Drag the macro into your Macro Hotbar and click the macro to open the dialog.
3. Select one or more characters from the list and click **Reset** to reset their skills to base values.

### Skill Reveal
- Players whose skills are at base values will have their hidden value revealed once they click on the skill name on their character sheet.
- This feature is automatically enabled when the module is active.

### Debug Mode
- Go to **Game Settings > Configure Settings > Module Settings > Amnesia**.
- Toggle the **Debug Mode** setting to enable or disable debug logs.
- This will print out more console logs if you are having issues getting it to work.

---

## Compatibility

- **System**: Call of Cthulhu 7th Edition (CoC7e) 8.x (tested against v8.15)
- **Foundry VTT Version**: Compatible with Foundry VTT version 13 and above (tested against v14.365).

---

## Support

If you encounter any issues or have feature requests, please open an issue on the module's GitHub repository.

---

## License

This module is distributed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for more details.