const AccountVersion = [{
    id: 0, //versionID
    upgrade: (userDef) => {}
}, {
    id: 1,
    upgrade: (userDef) => {
        userDef.forEachAdventurer((adv) => {
            // UNCOMMENT WHEN RELEASE IS READY
            // const obInterfaces = [27];
            // adv.appearanceState.setEntityAtSlot(1);
            // adv.interfaces.enableInterfaces(obInterfaces);
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
            upgrade(userDef);
        }
    }
    return upgraded;
}

const LatestVersion = AccountVersion.length - 1;

module.exports.upgradeAccount = upgradeAccount;
module.exports.LatestVersion = LatestVersion;
//module.exports.AccountVersion = AccountVersion;