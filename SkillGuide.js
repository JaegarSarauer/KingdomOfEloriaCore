const Item = require('./Item').Item;
const Skill = require('./Skill').Skill;
const Spells = require('./Spells').Spells;

const GuideIcons = {
    ITEM: 'Items',
    WORLD_OBJECT: 'worldObjects',
    SPELL: 'spellIcons',
};

const MultiSkillReqBuilder = (primarySkillLevel, secondarySkillsArray, iconType, iconID, description) => {
    let fullDesc = description;
    if (secondarySkillsArray != null) {
        if (secondarySkillsArray.length == 1) {
            description += ' (with ' + secondarySkillsArray[0][1] + ' ' + Skill[secondarySkillsArray[0][0]].name + ')';
        } else {
            for (let i = 0; i < secondarySkillsArray.length; ++i) {
                if (i == 0) {
                    description += ' (with ' + secondarySkillsArray[i][1] + ' ' + Skill[secondarySkillsArray[i][0]].name + ', ';
                } else if (i == secondarySkillsArray.length - 1) {
                    description += 'and ' + secondarySkillsArray[i][1] + ' ' + Skill[secondarySkillsArray[i][0]].name + ')';
                } else {
                    description += secondarySkillsArray[i][1] + ' ' + Skill[secondarySkillsArray[i][0]].name + ', ';
                }
            }
        }
    }
    return {
        level: primarySkillLevel,
        iconType,
        iconID,
        description: fullDesc,
    };
};

const SingleSkillBuilder = (primarySkillLevel, iconType, iconID, description) => {
    return MultiSkillReqBuilder(primarySkillLevel, null, iconType, iconID, description);
}

const SingleItemSkillBuilder = (primarySkillLevel, itemID, description) => {
    return SingleSkillBuilder(primarySkillLevel, GuideIcons.ITEM, Item[itemID].spriteIndex, description);
}

const BuildGuidesFromSpells = (skillID) => {
    let guides = [];
    for (let i = 0; i < Spells.length; ++i) {
        for (let j = 0; j < Spells[i].magicLevelReq.length; ++j) {
            if (Spells[i].magicLevelReq[j][0] == skillID) {
                let primaryLevel = Spells[i].magicLevelReq[j][1];
                let levelReqs = Object.assign({}, Spells[i].magicLevelReq);
                let inserted = false;
                levelReqs.splice(j, 1);
                for (let c = 0; c < guides.length; ++c) {
                    if (guides[c].level > primaryLevel) {
                        guides.splice(c, 0, MultiSkillReqBuilder(primaryLevel, levelReqs, GuideIcons.SPELL, Spells[i].spellIconIndex, 'Cast ' + Spells[i].name.toLowerCase()));
                        inserted = true;
                        break;
                    }
                }
                if (!inserted) {
                    guides.push(MultiSkillReqBuilder(primaryLevel, levelReqs, GuideIcons.SPELL, Spells[i].spellIconIndex, 'Cast ' + Spells[i].name.toLowerCase()))
                }
            }
        }
    }
    return guides;
}

const BuildMagicFocusGuides = () => {
    return BuildGuidesFromSpells(6);
}

const SkillGuides = [{
    id: 0,
    content: [
        SingleItemSkillBuilder(1, 17, 'Wield copper weapons'),
        SingleItemSkillBuilder(10, 18, 'Wield iron weapons'),
        SingleItemSkillBuilder(15, 526, 'Wield bone weapons'),
        SingleItemSkillBuilder(20, 19, 'Wield steel weapons'),
        SingleItemSkillBuilder(30, 20, 'Wield nelenite weapons'),
        SingleItemSkillBuilder(35, 532, 'Wield ogre weapons'),
        SingleItemSkillBuilder(40, 273, 'Wield gothite weapons'),
        SingleItemSkillBuilder(50, 301, 'Wield osmium weapons'),
    ],
}, {
    id: 1,
    content: [
    ],
}, {
    id: 2,
    content: [
        SingleItemSkillBuilder(1, 42, 'Wear copper armor'),
        SingleItemSkillBuilder(10, 43, 'Wear iron armor'),
        SingleItemSkillBuilder(20, 44, 'Wear steel armor'),
        SingleItemSkillBuilder(30, 45, 'Wear nelenite armor'),
        SingleItemSkillBuilder(40, 263, 'Wear gothite armor'),
        SingleItemSkillBuilder(50, 291, 'Wear osmium armor'),
    ],
}, {
    id: 3,
    content: [
        SingleItemSkillBuilder(1, 33, 'Wield regular bows'),
        SingleItemSkillBuilder(1, 68, 'Shoot copper arrows'),
        SingleItemSkillBuilder(10, 43, 'Wield oak bows'),
        SingleItemSkillBuilder(10, 69, 'Shoot iron arrows'),
        SingleItemSkillBuilder(20, 44, 'Wield ash bows'),
        SingleItemSkillBuilder(20, 70, 'Shoot iron arrows'),
        SingleItemSkillBuilder(25, 44, 'Shoot wolf claw arrows'),
        SingleItemSkillBuilder(25, 44, 'Shoot rock bolts'),
        SingleItemSkillBuilder(30, 45, 'Wield fur bows'),
        SingleItemSkillBuilder(30, 70, 'Shoot nelenite arrows'),
        SingleItemSkillBuilder(35, 528, 'Wield skeleton bows'),
        SingleItemSkillBuilder(35, 547, 'Wield anchor crossbows'),
        SingleItemSkillBuilder(40, 319, 'Wield king maple bows'),
        SingleItemSkillBuilder(40, 276, 'Shoot gothite arrows'),
        SingleItemSkillBuilder(50, 321, 'Wield magic bows'),
        SingleItemSkillBuilder(50, 304, 'Shoot gothite arrows'),
    ],
}, {
    id: 4,
    content: [
    ],
}, {
    id: 5,
    content: [
        SingleItemSkillBuilder(1, 113, 'Wear copper chainmail'),
        SingleItemSkillBuilder(10, 114, 'Wear iron chainmail'),
        SingleItemSkillBuilder(20, 115, 'Wear steel chainmail'),
        SingleItemSkillBuilder(30, 116, 'Wear nelenite chainmail'),
        SingleItemSkillBuilder(40, 269, 'Wear gothite chainmail'),
        SingleItemSkillBuilder(50, 297, 'Wear osmium chainmail'),
    ],
}, {
    id: 6,
    content: [
        ...BuildMagicFocusGuides(6),
    ],
}, {
    id: 7,
    content: [
    ],
}, {
    id: 8,
    content: [
        SingleItemSkillBuilder(1, 93, 'Wear blue wizard robes'),
        SingleItemSkillBuilder(10, 94, 'Wear green wizard robes'),
        SingleItemSkillBuilder(20, 95, 'Wear purple wizard robes'),
        SingleItemSkillBuilder(30, 96, 'Wear burgundy wizard robes'),
        SingleItemSkillBuilder(35, 530, 'Wear ghostly equipment'),
        SingleItemSkillBuilder(40, 539, 'Wear red wizard robes'),
    ],
}, {
    id: 9,
    content: [
        SingleSkillBuilder(1, GuideIcons.ITEM, 1, 'Use copper axes'),
        SingleSkillBuilder(1, GuideIcons.WORLD_OBJECT, 0, 'Chop pine trees'),
        SingleSkillBuilder(10, GuideIcons.ITEM, 2, 'Use iron axes'),
        SingleSkillBuilder(10, GuideIcons.WORLD_OBJECT, 1, 'Chop oak trees'),
        SingleSkillBuilder(20, GuideIcons.ITEM, 3, 'Use steel axes'),
        SingleSkillBuilder(20, GuideIcons.WORLD_OBJECT, 2, 'Chop ash trees'),
        SingleSkillBuilder(30, GuideIcons.ITEM, 4, 'Use nelenite axes'),
        SingleSkillBuilder(30, GuideIcons.WORLD_OBJECT, 3, 'Chop fur trees'),
        SingleSkillBuilder(40, GuideIcons.ITEM, 157, 'Use gothite axes'),
        SingleSkillBuilder(40, GuideIcons.WORLD_OBJECT, 4, 'Chop king maple trees'),
        SingleSkillBuilder(50, GuideIcons.ITEM, 172, 'Use osmium axes'),
        SingleSkillBuilder(50, GuideIcons.WORLD_OBJECT, 5, 'Chop magic trees'),
    ],
}, {
    id: 10,
    content: [
        SingleSkillBuilder(1, GuideIcons.ITEM, 1, 'Use copper pickaxes'),
        SingleSkillBuilder(1, GuideIcons.WORLD_OBJECT, 0, 'Mine copper rocks'),
        SingleSkillBuilder(1, GuideIcons.WORLD_OBJECT, 0, 'Mine clay rocks'),
        SingleSkillBuilder(10, GuideIcons.ITEM, 2, 'Use iron pickaxes'),
        SingleSkillBuilder(10, GuideIcons.WORLD_OBJECT, 1, 'Mine iron rocks'),
        SingleSkillBuilder(20, GuideIcons.ITEM, 3, 'Use steel pickaxes'),
        SingleSkillBuilder(20, GuideIcons.WORLD_OBJECT, 2, 'Mine coal rocks'),
        SingleSkillBuilder(25, GuideIcons.WORLD_OBJECT, 2, 'Mine gold rocks'),
        SingleSkillBuilder(30, GuideIcons.ITEM, 4, 'Use nelenite pickaxes'),
        SingleSkillBuilder(30, GuideIcons.WORLD_OBJECT, 3, 'Mine nelenite rocks'),
        SingleSkillBuilder(40, GuideIcons.ITEM, 157, 'Use gothite pickaxes'),
        SingleSkillBuilder(40, GuideIcons.WORLD_OBJECT, 4, 'Mine gothite rocks'),
        SingleSkillBuilder(40, GuideIcons.WORLD_OBJECT, 4, 'Mine pure coal rocks'),
        SingleSkillBuilder(50, GuideIcons.ITEM, 172, 'Use osmium pickaxes'),
        SingleSkillBuilder(50, GuideIcons.WORLD_OBJECT, 5, 'Mine osmium rocks'),
        SingleSkillBuilder(60, GuideIcons.WORLD_OBJECT, 5, 'Mine gem rocks'),
    ],
}, {
    id: 11,
    content: [
    ],
}, {
    id: 12,
    content: [
    ],
}];