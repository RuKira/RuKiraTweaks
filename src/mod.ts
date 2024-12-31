import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseService } from "@spt/services/DatabaseService";

import config from "../config/config.json";

class Mod implements IPostDBLoadMod {

    public postDBLoad(container: DependencyContainer): void 
    {
        const logPrefix = "[RuKira Tweaks]";

        const db = container.resolve<DatabaseService>("DatabaseService").getTables();
        const items = db.templates.items;

        if (config.enabled) { // Enable or disable the mod
            console.log(`${logPrefix} is enabled...`);
            for (const id in items) {
                if (config.examineAll) items[id]._props.ExaminedByDefault = true;
                if (config.debugLogging) console.log(`${logPrefix} ExaminedByDefault set to true for item ${id}`);
                // Expand as needed
            }
        }
        else console.log(`${logPrefix} is disabled.`);
	}
}

export const mod = new Mod();
