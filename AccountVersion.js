// NOTE: upgrade for a ID means upgrading to that ID
const AccountVersion = [{
    id: 0, //versionID
    upgrade: (userDef) => userDef // all accounts start at zero
}, {
    id: 1,
    upgrade: (userDef) => {
        // Upgrading from 0 to 1 means upgrading pre-customization. Force a customization
        
        const obInterfaces = [0, 5, 9, 10, 16, 17, 21, 22, 27];
        userDef.forAllAdventurers((adv) => {
            let tutorialState = adv.state.getState(4);
            if (tutorialState == 0) {
                adv.appearanceState.setEntityAtSlot(1);
                adv.interfaces.enableInterfaces(obInterfaces);
            }
        })
    }
}];

const upgradeAccount = (userDef) => {
    let upgraded = false;
    for (let i = 0, le = AccountVersion.length; i < le; ++i) {
        let version = AccountVersion[i];
        if (version.id > userDef.accountVersion) {
            userDef.accountVersion = version.id;
            upgraded = true;
            version.upgrade(userDef);
        }
    }
    return upgraded;
}

const LatestVersion = AccountVersion.length - 1;

module.exports.upgradeAccount = upgradeAccount;
module.exports.LatestVersion = LatestVersion;
//module.exports.AccountVersion = AccountVersion;