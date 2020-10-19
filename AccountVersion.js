const ItemState = require('../def/interface/ItemStateDef');
const MapManager = require('../manager/MapManager');
const StepStartTutorialTimer = require('../internal/Steps/StepStartTutorialTimer');
const StepTypeClassDictionary = require('./Step');
const StateType = require('../internal/State').StateType;

// NOTE: upgrade for a ID means upgrading to that ID
const AccountVersion = [{
    id: 0, //versionID
    upgradeData: (userDef) => userDef, // all accounts start at zero
    onUpgradeComplete: (userDef)  => userDef,
}, {
    id: 1,
    upgradeData: (userDef)  => userDef,
    onUpgradeComplete: (userDef) => {
        // Upgrading from 0 to 1 means upgrading pre-customization. Force a customization
        
        let shirtIdsToMigrate = [];
        for(let i = 331; i <= 473; i += 2 ) {
            shirtIdsToMigrate.push(i);
        }
        let pantIdsToMigrate = [];
        for(let i = 475; i <= 491; i += 2 ) {
            pantIdsToMigrate.push(i);
        }

        // Add Alpha shirt to bank
        userDef.bank.addItem(725, 1, null);

        // Replace all tomes of collection with enchanted opals.
        for (let i = 0, le = userDef.bank.items.length; i < le; ++i) {
            let item = userDef.bank.items[i];
            if (item == null) {
                continue;
            }
            if (item.id == 327) {
                let tomeState = item.getStateObject();
                let gemState = ItemState.ItemStates.ENCHANTED_GEM_ITEM_ID.build(12, tomeState.itemID, tomeState.charges, 2);
                userDef.bank.setEntityAtSlot(item.slotID, [659, item.itemAmount, gemState.itemStateDef]);
            }
        }

        const obInterfaces = [0, 5, 9, 10, 16, 17, 21, 22, 27];
        userDef.forAllAdventurers((adv) => {
            // Replace all tomes of collection with enchanted opals.
            for (let i = 0, le = adv.inventory.items.length; i < le; ++i) {
                let item = adv.inventory.items[i];
                if (item == null) {
                    continue;
                }
                if (item.id == 327) {
                    let tomeState = item.getStateObject();
                    let gemState = ItemState.ItemStates.ENCHANTED_GEM_ITEM_ID.build(12, tomeState.itemID, tomeState.charges, 2);
                    adv.inventory.setEntityAtSlot(item.slotID, [659, item.itemAmount, gemState.itemStateDef]);
                }
            }

            // Migrate colored shirts from armor chest layer to clothing chest layer
            if (adv.equipment.equipmentSlots[3] != null && shirtIdsToMigrate.includes(adv.equipment.equipmentSlots[3].id)) {
                adv.equipment.equipmentSlots[9] = adv.equipment.equipmentSlots[3];
                adv.equipment.equipmentSlots[3] = null;
            }

            // Migrate colored pants from armor pants layer to clothing pants layer
            if (adv.equipment.equipmentSlots[4] != null && pantIdsToMigrate.includes(adv.equipment.equipmentSlots[4].id)) {
                adv.equipment.equipmentSlots[10] = adv.equipment.equipmentSlots[4];
                adv.equipment.equipmentSlots[4] = null;
            }

            // Customize adventurer UI
            let tutorialState = adv.state.getState(4);
            if (tutorialState != 1) {
                adv.appearanceState.setEntityAtSlot(1);
                adv.interfaces.enableInterfaces(obInterfaces);
            }
        })
    },
}, {
    id: 2,
    upgradeData: (userDef)  => userDef,
    onUpgradeComplete: (userDef) => {
        userDef.forAllAdventurers((adv) => {
            // If you had not completed the tutorial, reset to the new tutorial
            let tutorialState = adv.state.getState(4);
            if (tutorialState > 0) {
                if (adv.mapID != 2) {
                    MapManager.i.changeMap(adv, 2);
                }
                adv.setPosition(272, 72);
                adv.state.setEntityAtSlot(4, [1]);

                let step = new StepStartTutorialTimer.StepStartTutorialTimer(null, StepTypeClassDictionary.StepType.OPEN_SHOP_INTERFACE, adv, adv, {});
                step._perform([]);
                
                let tutorialStateDef = StateType[4].state[1];
                if (tutorialStateDef.dialogID != null) {
                    adv.dialog.showDialog(tutorialStateDef.dialogID);
                    adv.interfaces.enableInterfaces([13, 17]);
                } 
            }
        })
    },
}, 
{
    id: 3,
    upgradeData: (userDef)  => userDef,
    onUpgradeComplete: (userDef) => {
        // This migration is to fix tutorial/quest bugs.
        // These were caused by having non-first adventurers do the quest and/or tutorial work.
        if (user.adventurers.length > 1) {
            userDef.forAllAdventurers((adv) => {
                // Set the tutorial to complete
                adv.state.setEntityAtSlot(4, [0]);
            });
        }
    },
}
];

const upgradeAccount = (userDef) => {
    let upgradesCompleted = [];
    for (let i = userDef.accountVersion, le = AccountVersion.length; i < le; ++i) {
        let version = AccountVersion[i];
        if (version.id > userDef.accountVersion) {
            userDef.accountVersion = version.id;
            version.upgradeData(userDef);
            upgradesCompleted.push(version);
        }
    }
    return upgradesCompleted;
}

const LatestVersion = AccountVersion.length - 1;

module.exports.upgradeAccount = upgradeAccount;
module.exports.LatestVersion = LatestVersion;
//module.exports.AccountVersion = AccountVersion;