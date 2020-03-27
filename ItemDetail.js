const Skill = require('./Skill').Skill;

const ItemDetail = {
    GATHER: (detail) => {
        let lvl = detail.level;
        let skillName = detail.skillID != null && Skill[detail.skillID].name || detail.skillName;
        return '<req>Gather: ' + lvl + ' ' + skillName + '</req>';
    },
    INCINERATE: (detail) => {
        let lvl = detail.level;
        let skillName = detail.skillID != null && Skill[detail.skillID].name || detail.skillName;
        return '<req>Incinerate: ' + lvl + ' ' + skillName + '</req>';
    },
    USE: (detail) => {
        let lvl = detail.level;
        let skillName = detail.skillID != null && Skill[detail.skillID].name || detail.skillName;
        return '<req>Use: ' + lvl + ' ' + skillName + '</req>';
    },
    CRAFT: (detail) => {
        let lvl = detail.level;
        let skillName = detail.skillID != null && Skill[detail.skillID].name || detail.skillName;
        return '<req>Craft: ' + lvl + ' ' + skillName + '</req>';
    },
    FLETCH: (detail) => {
        let lvl = detail.level;
        let skillName = detail.skillID != null && Skill[detail.skillID].name || detail.skillName;
        return '<req>Fletch: ' + lvl + ' ' + skillName + '</req>';
    },
    EQUIP: (detail) => {
        let lvl = detail.level;
        let skillName = detail.skillID != null && Skill[detail.skillID].name || detail.skillName;
        return '<req>Equip: ' + lvl + ' ' + skillName + '</req>';
    },
    CHOP: (detail) => {
        let lvl = detail.level;
        let skillName = Skill[detail.skillID].name;
        return '<req>Chop: ' + lvl + ' ' + skillName + '</req>';
    },
    MINE: (detail) => {
        let lvl = detail.level;
        let skillName = Skill[detail.skillID].name;
        return '<req>Mine: ' + lvl + ' ' + skillName + '</req>';
    },
    FISH: (detail) => {
        let lvl = detail.level;
        let skillName = Skill[detail.skillID].name;
        return '<req>Fish: ' + lvl + ' ' + skillName + '</req>';
    },
    STEAL: (detail) => {
        let lvl = detail.level;
        let skillName = Skill[detail.skillID].name;
        return '<req>Steal: ' + lvl + ' ' + skillName + '\n</req><red>Enables Bounty! (PvP)</red>';
    },
    ITEM: (detail) => {
        return '<req>Item: ' + detail.itemName + '</req>';
    },
    BOUNTY: (detail) => {
        return '<red>Enables Bounty! (PvP)</red>';
    },
    TOOL_NAME: (detail) => {
        let itemName = detail.itemName;
        return '<req>Tool: ' + itemName + '</req>';
    },
    levelSkillDetail: (level, skillID, reqType) => {
        return {level, skillID, reqType};
    },
    levelCombatDetail: (level, skillName, reqType) => {
        return {level, skillName, reqType};
    },
    itemDetail: (itemID, reqType) => {
        return {itemID, reqType};
    },
    itemNameDetail: (itemName, reqType) => {
        return {itemName, reqType};
    },
    build: (arrayOfDetailTypes) => {
        let reqString = '';
        for (let i = 0, l = arrayOfDetailTypes.length; i < l; i++) {
            let reqType = arrayOfDetailTypes[i].reqType;

            reqString += ItemDetail[reqType](arrayOfDetailTypes[i]) + '\n';
        }
        return reqString;
    }
};

module.exports.ItemDetail = ItemDetail;