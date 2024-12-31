import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseService } from "@spt/services/DatabaseService";

import config from "../config/config.json";
import collector from "../db/collector.json";

class Mod implements IPostDBLoadMod {

    public postDBLoad(container: DependencyContainer): void 
    {
        const logPrefix = "[RuKira Tweaks]";

        const db = container.resolve<DatabaseService>("DatabaseService").getTables();
        const items = db.templates.items;
        const keys = ["5c99f98d86f7745c314214b3", "5c164d2286f774194c5e69fa", "543be5e94bdc2df1348b4568"];

        if (config.enabled) { // Enable or disable the mod
            console.log(`${logPrefix} is enabled...`);
            for (const id in items) {
                if (config.examineAll) 
                {
                    if (config.examineAllExceptKeysAndCollector) { 
                        config.examineAllExceptCollector = false;
                        config.examineAllExceptKeys = false;
                        if (!keys.includes(items[id]._parent) && !collector.includes(id)) items[id]._props.ExaminedByDefault = true; 
                    }

                    else if (config.examineAllExceptKeys) { 
                        config.examineAllExceptCollector = false;
                        if (!keys.includes(items[id]._parent)) items[id]._props.ExaminedByDefault = true;  
                    }
                        
                    else if (config.examineAllExceptCollector) { 
                        if (!collector.includes(id)) items[id]._props.ExaminedByDefault = true;  
                    }

                    else items[id]._props.ExaminedByDefault = true;
                }
            }
            if (config.debugLogging && config.examineAllExceptKeysAndCollector) console.log(`${logPrefix} Examined set to true for ALL items except keys and collector`);
            if (config.debugLogging && config.examineAllExceptKeys) console.log(`${logPrefix} Examined set to true for ALL items except keys`);
            if (config.debugLogging && config.examineAllExceptCollector) console.log(`${logPrefix} Examined set to true for ALL items except collector`);
            if (config.debugLogging) console.log(`${logPrefix} Examined set to true for ALL items`);
            //Expand as needed
        }
        else console.log(`${logPrefix} is disabled.`);
	}
}

export const mod = new Mod();
