const Item = require('./Item');
const Skill = require('./Skill').Skill;
const Spells = require('./Spells').Spells;
const Interface = require('./Interface');
const Get = require('./Getter');
const Recipes = require('./Recipes').Recipes;

const GuideIcons = {
    ITEM: 'items',
    WORLD_OBJECT: 'worldObjects',
    CHARACTER: 'character',
    SPELL: 'spellIcons',
};

/**
 * Cook Shrimp
 * [Shrimp icon]
 * Cooking Level 1
 * (with Fishing Level 1)
 */
const MultiSkillReqBuilder = (primarySkillLevel, secondarySkillsArray, iconType, iconID, description) => {
    let fullDesc = description;
    if (secondarySkillsArray != null) {
        if (secondarySkillsArray.length == 1) {
            fullDesc += ' \n<i>(with ' + secondarySkillsArray[0][1] + ' ' + Skill[secondarySkillsArray[0][0]].name + ')</i>';
        } else {
            for (let i = 0; i < secondarySkillsArray.length; ++i) {
                if (i == 0) {
                    fullDesc += ' \n<i>(with ' + secondarySkillsArray[i][1] + ' ' + Skill[secondarySkillsArray[i][0]].name + ', ';
                } else if (i == secondarySkillsArray.length - 1) {
                    fullDesc += 'and ' + secondarySkillsArray[i][1] + ' ' + Skill[secondarySkillsArray[i][0]].name + ')</i>';
                } else {
                    fullDesc += secondarySkillsArray[i][1] + ' ' + Skill[secondarySkillsArray[i][0]].name + ', ';
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

const MultiSkillCombatReqBuilder = (primarySkillLevel, combatLevel, iconType, iconID, description) => {
    let fullDesc = description;
    fullDesc += '\n<i>(with ' + combatLevel + ' combat level)</i>';
    return {
        level: primarySkillLevel,
        iconType,
        iconID,
        description: fullDesc,
    };
};

/**
 * Fishing Shrimp
 * [Shrimp icon]
 * Fishing Level 1
 */
const SingleSkillBuilder = (primarySkillLevel, iconType, iconID, description) => {
    return MultiSkillReqBuilder(primarySkillLevel, null, iconType, iconID, description);
}

const SingleItemSkillBuilder = (primarySkillLevel, itemID, description) => {
    return SingleSkillBuilder(primarySkillLevel, GuideIcons.ITEM, itemID, description);
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
                for (let c = 0; c < guides.length; ++c) {daaaaaaaaaaa   
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

const BuildCookingRecipesGuide = () => {
    let guides = [];
    let keys = Object.keys(Recipes);
    console.info(keys);
    for(let i = 0; i < keys.length; ++i) {
        let recipe = Recipes[keys[i]]();
        let desc = 'Mix ';
        for(let j = 0; j < recipe.itemIdsRequired.length; j++) {
            let itemToMix = Item.Item[recipe.itemIdsRequired[j]];
            desc += itemToMix.name;
            if (j < recipe.itemIdsRequired.length - 2) {
                desc += ',';
            }
            else if (j < recipe.itemIdsRequired.length - 1) {
                desc += ' and';
            }
            desc += ' ';
        }
        desc += '\nto make ' + (Item.Item[recipe.iconItemId].name);

        guides.push(SingleItemSkillBuilder(recipe.levelRequirement, recipe.iconItemId, desc));
    }
    return guides;
};

const SmeltSkillBuilder = (smeltBarInterfaceId) => {
    let interface = Interface.Interface[14].actions[smeltBarInterfaceId];
    let bar = Item.Item[interface.barId];
    return SingleSkillBuilder(interface.smithingLevel, GuideIcons.ITEM, interface.barId, 'Smelt ' + bar.name);
};

const BuildSmithingGuide = (metalName, smeltBarInterfaceId, smithingInterfaceIds) => {
    let content = [
        SmeltSkillBuilder(smeltBarInterfaceId)
    ];

    for(let i = 0; i < smithingInterfaceIds.length; ++i) {
        let interface = Interface.Interface[14].actions[smithingInterfaceIds[i]];
        let smithedItem = Item.Item[interface.smithedItemId];
        content.push(SingleSkillBuilder(interface.smithingLevel, GuideIcons.ITEM, interface.smithedItemId, 'Smith ' + smithedItem.name));
    }

    return {
        title: metalName,
        content: content
    }
};

const BuildMagicFocusGuides = () => {
    return []; //BuildGuidesFromSpells(6);
}

let skillGuide = null;

module.exports.GetSkillGuide = () => {
    if (skillGuide == null) {
        skillGuide = [{
            id: 0,
            contents: [
                {
                    title: 'Wield',
                    content: [
                        SingleItemSkillBuilder(1, 17, 'Wield copper weapons'),
                        SingleItemSkillBuilder(10, 18, 'Wield iron weapons'),
                        SingleItemSkillBuilder(15, 526, 'Wield bone dagger'),
                        SingleItemSkillBuilder(20, 19, 'Wield steel weapons'),
                        SingleItemSkillBuilder(30, 20, 'Wield nelenite weapons'),
                        SingleItemSkillBuilder(35, 532, 'Wield ogre club'),
                        SingleItemSkillBuilder(40, 273, 'Wield gothite weapons'),
                        SingleItemSkillBuilder(50, 301, 'Wield osmium weapons'),
                    ],
                }
            ]
        }, {
            id: 1,
            contents: [
                {
                    title: 'Power',
                    usesLevel: false,
                    content: [
                        {
                            description: 'Melee Power increases your damage output from melee attacks.'
                        }
                    ],
                }
            ],
        }, {
            id: 2,
            contents: [
                {
                    title: 'Wear',
                    content: [
                        SingleItemSkillBuilder(1, 25, 'Wear copper armor'),
                        SingleItemSkillBuilder(10, 26, 'Wear iron armor'),
                        SingleItemSkillBuilder(20, 27, 'Wear steel armor'),
                        SingleItemSkillBuilder(30, 28, 'Wear nelenite armor'),
                        SingleItemSkillBuilder(40, 259, 'Wear gothite armor'),
                        SingleItemSkillBuilder(50, 287, 'Wear osmium armor'),
                    ],
                }
            ]
        }, {
            id: 3,
            contents: [
                {
                    title: 'Wield',
                    content: [
                        SingleItemSkillBuilder(1, 37, 'Wield regular bows'),
                        SingleItemSkillBuilder(1, 68, 'Shoot copper arrows'),
                        SingleItemSkillBuilder(10, 38, 'Wield oak bows'),
                        SingleItemSkillBuilder(10, 69, 'Shoot iron arrows'),
                        SingleItemSkillBuilder(20, 39, 'Wield ash bows'),
                        SingleItemSkillBuilder(20, 70, 'Shoot iron arrows'),
                        SingleItemSkillBuilder(25, 558, 'Shoot wolf claw arrows'),
                        SingleItemSkillBuilder(25, 550, 'Shoot rock bolts'),
                        SingleItemSkillBuilder(30, 40, 'Wield fur bows'),
                        SingleItemSkillBuilder(30, 70, 'Shoot nelenite arrows'),
                        SingleItemSkillBuilder(35, 528, 'Wield skeleton bows'),
                        SingleItemSkillBuilder(35, 547, 'Wield anchor crossbows'),
                        SingleItemSkillBuilder(40, 319, 'Wield king maple bows'),
                        SingleItemSkillBuilder(40, 276, 'Shoot gothite arrows'),
                        SingleItemSkillBuilder(50, 321, 'Wield magic bows'),
                        SingleItemSkillBuilder(50, 304, 'Shoot gothite arrows'),
                    ],
                }
            ]
        }, {
            id: 4,
            contents: [
                {
                    title: 'Power',
                    usesLevel: false,
                    content: [
                        {
                            description: 'Range Power increases your damage output from range attacks.'
                        }
                    ],
                }
            ],
        }, {
            id: 5,
            contents: [
                {
                    title: 'Wear',
                    content: [
                        SingleItemSkillBuilder(1, 113, 'Wear copper chainmail'),
                        SingleItemSkillBuilder(10, 114, 'Wear iron chainmail'),
                        SingleItemSkillBuilder(20, 115, 'Wear steel chainmail'),
                        SingleItemSkillBuilder(30, 116, 'Wear nelenite chainmail'),
                        SingleItemSkillBuilder(40, 269, 'Wear gothite chainmail'),
                        SingleItemSkillBuilder(50, 297, 'Wear osmium chainmail'),
                        MultiSkillReqBuilder(30, [[8, 10,]], GuideIcons.ITEM, 517, 'Wear grey pelt torso'),
                        MultiSkillReqBuilder(30, [[8, 10,]], GuideIcons.ITEM, 519, 'Wear grey pelt pants'),
                        MultiSkillReqBuilder(50, [[8, 10,]], GuideIcons.ITEM, 554, 'Wear d. grey pelt torso'),
                        MultiSkillReqBuilder(50, [[8, 10,]], GuideIcons.ITEM, 556, 'Wear d. grey pelt pants'),
        
                    ],
                }
            ]
        }, {
            id: 6,
            contents: [
                {
                    title: 'Cast',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.SPELL, 0, 'Lesser Air Wound'),
                        SingleSkillBuilder(2, GuideIcons.SPELL, 1, 'Lesser Water Wound'),
                        SingleSkillBuilder(4, GuideIcons.SPELL, 2, 'Lesser Earth Wound'),
                        SingleSkillBuilder(6, GuideIcons.SPELL, 3, 'Lesser Fire Wound'),
                        SingleSkillBuilder(8, GuideIcons.SPELL, 4, 'Lesser Metal Wound'),
                        SingleSkillBuilder(10, GuideIcons.SPELL, 5, 'Air Wound'),
                        SingleSkillBuilder(12, GuideIcons.SPELL, 6, 'Water Wound'),
                        SingleSkillBuilder(14, GuideIcons.SPELL, 7, 'Earth Wound'),
                        SingleSkillBuilder(16, GuideIcons.SPELL, 8, 'Fire Wound'),
                        SingleSkillBuilder(18, GuideIcons.SPELL, 9, 'Metal Wound'),
                        SingleSkillBuilder(20, GuideIcons.SPELL, 10, 'Greater Air Wound'),
                        SingleSkillBuilder(22, GuideIcons.SPELL, 11, 'Greater Water Wound'),
                        SingleSkillBuilder(24, GuideIcons.SPELL, 12, 'Greater Earth Wound'),
                        SingleSkillBuilder(26, GuideIcons.SPELL, 13, 'Greater Fire Wound'),
                        SingleSkillBuilder(28, GuideIcons.SPELL, 14, 'Greater Metal Wound'),
                    ]
                }
            ]
        }, {
            id: 7,
            contents: [
                {
                    title: 'Power',
                    usesLevel: false,
                    content: [
                        {
                            description: 'Magic Power increases your damage output from magic attacks.'
                        }
                    ]
                }
            ],
        }, {
            id: 8,
            contents: [
                {
                    title: 'Wear',
                    content: [
                        SingleItemSkillBuilder(1, 93, 'Wear blue wizard robes'),
                        SingleItemSkillBuilder(10, 94, 'Wear green wizard robes'),
                        SingleItemSkillBuilder(20, 95, 'Wear purple wizard robes'),
                        SingleItemSkillBuilder(30, 96, 'Wear burgundy wizard robes'),
                        SingleItemSkillBuilder(35, 530, 'Wear ghostly equipment'),
                        SingleItemSkillBuilder(40, 539, 'Wear red wizard robes'),
                    ],
                }
            ]
        }, {
            id: 9, // Woodcutting
            contents: [
                {
                    title: 'Trees',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.WORLD_OBJECT, 0, 'Chop pine trees'),
                        SingleSkillBuilder(10, GuideIcons.WORLD_OBJECT, 1, 'Chop oak trees'),
                        SingleSkillBuilder(20, GuideIcons.WORLD_OBJECT, 2, 'Chop ash trees'),
                        SingleSkillBuilder(30, GuideIcons.WORLD_OBJECT, 3, 'Chop fur trees'),
                        SingleSkillBuilder(40, GuideIcons.WORLD_OBJECT, 49, 'Chop king maple trees'),
                        SingleSkillBuilder(50, GuideIcons.WORLD_OBJECT, 50, 'Chop magic trees'),
                    ]
                },
                {
                    title: 'Tools',
                    content: [
                        MultiSkillReqBuilder(1, [[0, 1]], GuideIcons.ITEM, 1, 'Use copper axes'),
                        MultiSkillReqBuilder(10, [[0, 10]], GuideIcons.ITEM, 2, 'Use iron axes'),
                        MultiSkillReqBuilder(20, [[0, 20]], GuideIcons.ITEM, 3, 'Use steel axes'),
                        MultiSkillReqBuilder(30, [[0, 30]], GuideIcons.ITEM, 4, 'Use nelenite axes'),
                        MultiSkillReqBuilder(40, [[0, 40]], GuideIcons.ITEM, 277, 'Use gothite axes'),
                        MultiSkillReqBuilder(50, [[0, 50]], GuideIcons.ITEM, 305, 'Use osmium axes'),
                    ]
                },
                {
                    title: 'Camps',
                    content: [
                        MultiSkillReqBuilder(10, [[18, 1]], GuideIcons.WORLD_OBJECT, 16, 'Build lumber camp'),
                        MultiSkillReqBuilder(20, [[18, 10]], GuideIcons.WORLD_OBJECT, 17, 'Build oak lumber camp'),
                        MultiSkillReqBuilder(30, [[18, 20]], GuideIcons.WORLD_OBJECT, 18, 'Build ash lumber camp'),
                        MultiSkillReqBuilder(40, [[18, 30]], GuideIcons.WORLD_OBJECT, 19, 'Build fur lumber camp'),
                        MultiSkillReqBuilder(50, [[18, 40]], GuideIcons.WORLD_OBJECT, 51, 'Build king maple lumber camp'),
                        MultiSkillReqBuilder(60, [[18, 50]], GuideIcons.WORLD_OBJECT, 52, 'Build magic lumber camp'),
                    ]
                },
            ],
        }, {
            id: 10, // Mining
            contents: [
                {
                    title: 'Rocks',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.WORLD_OBJECT, 4, 'Mine copper rocks'),
                        SingleSkillBuilder(1, GuideIcons.WORLD_OBJECT, 14, 'Mine clay rocks'),
                        SingleSkillBuilder(10, GuideIcons.WORLD_OBJECT, 5, 'Mine iron rocks'),
                        SingleSkillBuilder(20, GuideIcons.WORLD_OBJECT, 6, 'Mine coal rocks'),
                        SingleSkillBuilder(25, GuideIcons.WORLD_OBJECT, 80, 'Mine gold rocks'),
                        SingleSkillBuilder(30, GuideIcons.WORLD_OBJECT, 7, 'Mine nelenite rocks'),
                        SingleSkillBuilder(40, GuideIcons.WORLD_OBJECT, 47, 'Mine gothite rocks'),
                        SingleSkillBuilder(40, GuideIcons.WORLD_OBJECT, 83, 'Mine pure coal rocks'),
                        SingleSkillBuilder(50, GuideIcons.WORLD_OBJECT, 48, 'Mine osmium rocks'),
                        SingleSkillBuilder(60, GuideIcons.WORLD_OBJECT, 100, 'Mine gem rocks'),
                    ]
                },
                {
                    title: 'Tools',
                    content: [
                        MultiSkillReqBuilder(1, [[0, 1]], GuideIcons.ITEM, 9, 'Use copper pickaxes'),
                        MultiSkillReqBuilder(10, [[0, 10]], GuideIcons.ITEM, 10, 'Use iron pickaxes'),
                        MultiSkillReqBuilder(20, [[0, 20]], GuideIcons.ITEM, 11, 'Use steel pickaxes'),
                        MultiSkillReqBuilder(30, [[0, 30]], GuideIcons.ITEM, 12, 'Use nelenite pickaxes'),
                        MultiSkillReqBuilder(40, [[0, 40]], GuideIcons.ITEM, 279, 'Use gothite pickaxes'),
                        MultiSkillReqBuilder(50, [[0, 50]], GuideIcons.ITEM, 307, 'Use osmium pickaxes'),
                    ]
                },
                {
                    title: 'Camps',
                    content: [
                        MultiSkillReqBuilder(10, [[18, 1]], GuideIcons.WORLD_OBJECT, 21, 'Build copper mining camp'),
                        MultiSkillReqBuilder(10, [[18, 1]], GuideIcons.WORLD_OBJECT, 22, 'Build clay mining camp'),
                        MultiSkillReqBuilder(20, [[18, 10]], GuideIcons.WORLD_OBJECT, 23, 'Build iron mining camp'),
                        MultiSkillReqBuilder(30, [[18, 20]], GuideIcons.WORLD_OBJECT, 24, 'Build coal mining camp'),
                        MultiSkillReqBuilder(35, [[18, 25]], GuideIcons.WORLD_OBJECT, 24, 'Build gold mining camp'),
                        MultiSkillReqBuilder(40, [[18, 30]], GuideIcons.WORLD_OBJECT, 25, 'Build nelenite mining camp'),
                        MultiSkillReqBuilder(50, [[18, 40]], GuideIcons.WORLD_OBJECT, 53, 'Build gothite mining camp'),
                        MultiSkillReqBuilder(60, [[18, 50]], GuideIcons.WORLD_OBJECT, 54, 'Build osmium mining camp'),
                    ]
                },
            ],
        }, {
            id: 11,
            title: 'Hitpoints',
            contents: [
                {
                    title: 'Hitpoints (HP)',
                    usesLevel: false,
                    content: [{
                        description: 'Your hitpoints level determines your maximum health.'
                    }]
                }
            ],
        }, {
            id: 12, // Fishing
            contents: [
                {
                    title: 'Pools',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.WORLD_OBJECT, 9, 'Use Shallow Fishing Pool'),
                        SingleSkillBuilder(30, GuideIcons.WORLD_OBJECT, 102, 'Use Crap Pot Fishing Pool'),
                        SingleSkillBuilder(30, GuideIcons.WORLD_OBJECT, 57, 'Use Deep Fishing Pool'),
                        SingleSkillBuilder(70, GuideIcons.WORLD_OBJECT, 103, 'Use Hand Fishing Pool'),
                    ]
                },
                {
                    title: 'Fish',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.ITEM, 47, 'Catch raw shrimp'),
                        SingleSkillBuilder(5, GuideIcons.ITEM, 785, 'Catch raw freshwater tuna'),
                        SingleSkillBuilder(10, GuideIcons.ITEM, 48, 'Catch raw sardine'),
                        SingleSkillBuilder(20, GuideIcons.ITEM, 49, 'Catch raw herring'),
                        SingleSkillBuilder(30, GuideIcons.ITEM, 50, 'Catch raw mullet'),
                        SingleSkillBuilder(30, GuideIcons.ITEM, 900, 'Catch raw crab'),
                        SingleSkillBuilder(40, GuideIcons.ITEM, 232, 'Catch raw boxfish'),
                        SingleSkillBuilder(50, GuideIcons.ITEM, 241, 'Catch raw rockfish'),
                        SingleSkillBuilder(60, GuideIcons.ITEM, 247, 'Catch raw starslug'),
                        SingleSkillBuilder(70, GuideIcons.ITEM, 844, 'Catch raw octopus'),
                    ]
                },
                {
                    title: 'Camps',
                    content: [
                        MultiSkillReqBuilder(10, [[18, 1]], GuideIcons.WORLD_OBJECT, 20, 'Build shallow pool fishery'),
                        MultiSkillReqBuilder(30, [[18, 30]], GuideIcons.WORLD_OBJECT, 109, 'Build crab pot'),
                        MultiSkillReqBuilder(50, [[18, 40]], GuideIcons.WORLD_OBJECT, 58, 'Build deep pool fishery'),
                    ]
                },
            ],
        }, {
            id: 13, // Cooking
            contents: [
                {
                    title: 'Cook',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.ITEM, 51, 'Cook shrimp'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 754, 'Cook steak'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 734, 'Cook egg'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 740, 'Cook chicken'),
                        SingleSkillBuilder(5, GuideIcons.ITEM, 787, 'Cook freshwater Tuna'),
                        SingleSkillBuilder(8, GuideIcons.ITEM, 771, 'Cook chicken Pot Pie'),
                        SingleSkillBuilder(10, GuideIcons.ITEM, 52, 'Cook sardine'),
                        SingleSkillBuilder(10, GuideIcons.ITEM, 765, 'Cook meat pie'),
                        SingleSkillBuilder(14, GuideIcons.ITEM, 777, 'Cook cake'),
                        SingleSkillBuilder(20, GuideIcons.ITEM, 53, 'Cook herring'),
                        SingleSkillBuilder(25, GuideIcons.ITEM, 852, 'Cook octopus tentacle'),
                        SingleSkillBuilder(30, GuideIcons.ITEM, 50, 'Cook mullet'),
                        SingleSkillBuilder(35, GuideIcons.ITEM, 902, 'Cook crab'),
                        SingleSkillBuilder(40, GuideIcons.ITEM, 234, 'Cook boxfish'),
                        SingleSkillBuilder(50, GuideIcons.ITEM, 243, 'Cook rockfish'),
                        SingleSkillBuilder(60, GuideIcons.ITEM, 249, 'Cook starslug'),
                        SingleSkillBuilder(70, GuideIcons.ITEM, 846, 'Cook octopus'),
                    ]
                },
                {
                    title: 'Recipes',
                    content: [
                        ...BuildCookingRecipesGuide(),
                    ]
                },
                {
                    title: 'Prepare',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.ITEM, 748, 'Milk a cow'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 850, 'Chop octopus tentacles'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 750, 'Mill bucket of flour'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 793, 'Mill bucket of refined herbs'),
                    ]
                },
            ],
        }, {
            id: 14, // Smithing
            contents: [
                BuildSmithingGuide('Copper', 8, [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]),
                BuildSmithingGuide('Iron', 9, [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]),
                BuildSmithingGuide('Steel', 10, [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]),
                {
                    title: 'Gold',
                    content: [
                        SmeltSkillBuilder(256),
                        MultiSkillReqBuilder(5, [[15, 5]], GuideIcons.ITEM, 672, 'Cast gold ring'),
                        MultiSkillReqBuilder(20, [[15, 20]], GuideIcons.ITEM, 674, 'Cast gold amulet'),
                    ]
                },
                BuildSmithingGuide('Nelenite', 11, [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]),
                BuildSmithingGuide('Gothite', 116, [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128]),
                BuildSmithingGuide('Osmium', 129, [130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141]),
            ],
        }, {
            id: 15, // Crafting
            contents: [
                {
                    title: 'Firing',
                    content: [
                        SingleSkillBuilder(10, GuideIcons.ITEM, 77, 'Fire clay pot'),
                    ]
                },
                {
                    title: 'Spinning',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.ITEM, 92, 'Spin thread'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 783, 'Spin yarn'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 677, 'Spin silk'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 41, 'Spin bowstring'),
                        SingleSkillBuilder(20, GuideIcons.ITEM, 330, 'Spin drawstring'),
                    ]
                },
                {
                    title: 'Casting',
                    content: [
                        MultiSkillReqBuilder(5, [[21, 5]], GuideIcons.ITEM, 672, 'Cast gold ring'),
                        MultiSkillReqBuilder(20, [[21, 20]], GuideIcons.ITEM, 674, 'Cast gold amulet'),
                    ]
                },
                {
                    title: 'Threading',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.ITEM, 329, 'Sew item bag'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 87, 'Repair bag (10 Uses)'),
                        SingleSkillBuilder(10, GuideIcons.ITEM, 88, 'Repair bag (25 Uses)'),
                        SingleSkillBuilder(20, GuideIcons.ITEM, 89, 'Repair bag (50 Uses)'),
                        SingleSkillBuilder(30, GuideIcons.ITEM, 90, 'Repair bag (100 Uses)'),
                        SingleSkillBuilder(40, GuideIcons.ITEM, 537, 'Repair bag (200 Uses)'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 87, 'Upgrade bag (Max 10)'),
                        SingleSkillBuilder(10, GuideIcons.ITEM, 88, 'Upgrade bag (Max 25)'),
                        SingleSkillBuilder(20, GuideIcons.ITEM, 89, 'Upgrade bag (Max 50)'),
                        SingleSkillBuilder(30, GuideIcons.ITEM, 90, 'Upgrade bag (Max 100)'),
                        SingleSkillBuilder(40, GuideIcons.ITEM, 537,'Upgrade bag (Max 200)'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 566, 'String copper golem fragment necklace'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 566, 'String clay golem fragment necklace'),
                        SingleSkillBuilder(10, GuideIcons.ITEM, 566, 'String iron golem fragment necklace'),
                        SingleSkillBuilder(20, GuideIcons.ITEM, 566, 'String steel golem fragment necklace'),
                        SingleSkillBuilder(30, GuideIcons.ITEM, 566, 'String nelenite golem fragment necklace'),
                        SingleSkillBuilder(40, GuideIcons.ITEM, 566, 'String gothite golem fragment necklace'),
                        SingleSkillBuilder(50, GuideIcons.ITEM, 566, 'String osmium golem fragment necklace'),
                        SingleSkillBuilder(60, GuideIcons.ITEM, 566, 'String gem golem fragment necklace'),
                        SingleSkillBuilder(50, GuideIcons.ITEM, 561, 'String wolf paw necklace'),
                    ]
                },
                {
                    title: 'Chiseling',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.ITEM, 523, 'Chisel chiseled stone'),
                    ]
                },
            ]
        }, {
            id: 16, // Fletching
            contents : [
                {
                    title: 'Fletch',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.ITEM, 74, 'Fletch 5 arrow shafts (1 Log)'),
                        SingleSkillBuilder(5, GuideIcons.ITEM, 37, 'Fletch bow'),
                        SingleSkillBuilder(10, GuideIcons.ITEM, 74, 'Fletch 10 arrow shafts (1 Oak Log)'),
                        SingleSkillBuilder(15, GuideIcons.ITEM, 38, 'Fletch oak bow'),
                        SingleSkillBuilder(20, GuideIcons.ITEM, 74, 'Fletch 15 arrow shafts (1 Ash Log)'),
                        SingleSkillBuilder(25, GuideIcons.ITEM, 39, 'Fletch ash bow'),
                        SingleSkillBuilder(25, GuideIcons.ITEM, 550, 'Fletch rock bolts'),
                        SingleSkillBuilder(30, GuideIcons.ITEM, 74, 'Fletch 20 arrow shafts (1 Fur Log)'),
                        SingleSkillBuilder(35, GuideIcons.ITEM, 40, 'Fletch fur bow'),
                        SingleSkillBuilder(40, GuideIcons.ITEM, 74, 'Fletch 25 arrow shafts (1 King Maple Log)'),
                        SingleSkillBuilder(45, GuideIcons.ITEM, 319, 'Fletch king maple bow'),
                        SingleSkillBuilder(50, GuideIcons.ITEM, 74, 'Fletch 30 arrow shafts (1 Magic Log)'),
                        SingleSkillBuilder(55, GuideIcons.ITEM, 321, 'Fletch magic bow'),
                    ]
                },
            ]
        }, {
            id: 17, // Firemaking
            contents : [
                {
                    title: 'Firemaking',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.ITEM, 5, 'Light log'),
                        SingleSkillBuilder(10, GuideIcons.ITEM, 6, 'Light oak log'),
                        SingleSkillBuilder(20, GuideIcons.ITEM, 7, 'Light ash log'),
                        SingleSkillBuilder(30, GuideIcons.ITEM, 8, 'Light fur log'),
                        SingleSkillBuilder(40, GuideIcons.ITEM, 315, 'Light king maple log'),
                        SingleSkillBuilder(50, GuideIcons.ITEM, 317, 'Light magic log'),
                    ]
                }
            ]
        },{
            id: 18, // Construction
            contents : [
                {
                    title: 'Mining',
                    content: [
                        MultiSkillReqBuilder(1, [[10, 10]], GuideIcons.WORLD_OBJECT, 21, 'Build copper mining camp'),
                        MultiSkillReqBuilder(1, [[10, 10]], GuideIcons.WORLD_OBJECT, 22, 'Build clay mining camp'),
                        MultiSkillReqBuilder(10, [[10, 20]], GuideIcons.WORLD_OBJECT, 23, 'Build iron mining camp'),
                        MultiSkillReqBuilder(20, [[10, 30]], GuideIcons.WORLD_OBJECT, 24, 'Build coal mining camp'),
                        MultiSkillReqBuilder(25, [[10, 35]], GuideIcons.WORLD_OBJECT, 24, 'Build gold mining camp'),
                        MultiSkillReqBuilder(30, [[10, 40]], GuideIcons.WORLD_OBJECT, 25, 'Build nelenite mining camp'),
                        MultiSkillReqBuilder(40, [[10, 50]], GuideIcons.WORLD_OBJECT, 53, 'Build gothite mining camp'),
                        MultiSkillReqBuilder(50, [[10, 60]], GuideIcons.WORLD_OBJECT, 54, 'Build osmium mining camp'),
                    ]
                },
                {
                    title: 'Fishing',
                    content: [
                        MultiSkillReqBuilder(1, [[12, 10]], GuideIcons.WORLD_OBJECT, 20, 'Build shallow pool fishery'),
                        MultiSkillReqBuilder(30, [[12, 30]], GuideIcons.WORLD_OBJECT, 109, 'Build crab pot'),
                        MultiSkillReqBuilder(40, [[12, 50]], GuideIcons.WORLD_OBJECT, 58, 'Build deep pool fishery'),
                    ]
                },
                {
                    title: 'Woodcutting',
                    content: [
                        MultiSkillReqBuilder(1, [[9, 10]], GuideIcons.WORLD_OBJECT, 16, 'Build lumber camp'),
                        MultiSkillReqBuilder(10, [[9, 20]], GuideIcons.WORLD_OBJECT, 17, 'Build oak lumber camp'),
                        MultiSkillReqBuilder(20, [[9, 30]], GuideIcons.WORLD_OBJECT, 18, 'Build ash lumber camp'),
                        MultiSkillReqBuilder(30, [[9, 40]], GuideIcons.WORLD_OBJECT, 19, 'Build fur lumber camp'),
                        MultiSkillReqBuilder(40, [[9, 50]], GuideIcons.WORLD_OBJECT, 51, 'Build king maple lumber camp'),
                        MultiSkillReqBuilder(50, [[9, 60]], GuideIcons.WORLD_OBJECT, 52, 'Build magic lumber camp'),
                    ]
                },
                {
                    title: 'Combat',
                    content: [
                        MultiSkillCombatReqBuilder(1, 10, GuideIcons.WORLD_OBJECT, 41, 'Build copper training dummy'),
                        MultiSkillCombatReqBuilder(10, 20, GuideIcons.WORLD_OBJECT, 42, 'Build iron training dummy'),
                        MultiSkillCombatReqBuilder(20, 30, GuideIcons.WORLD_OBJECT, 43, 'Build steel training dummy'),
                        MultiSkillCombatReqBuilder(30, 40, GuideIcons.WORLD_OBJECT, 44, 'Build nelenite training dummy'),
                        MultiSkillCombatReqBuilder(40, 50, GuideIcons.WORLD_OBJECT, 55, 'Build gothite training dummy'),
                        MultiSkillCombatReqBuilder(50, 60, GuideIcons.WORLD_OBJECT, 56, 'Build osmium training dummy'),
                    ]
                },
                {
                    title: 'Upgrades',
                    content: [
                        MultiSkillReqBuilder(10, [[13, 20]], GuideIcons.WORLD_OBJECT, 32, 'Upgrade iron range'),
                        MultiSkillReqBuilder(25, [[14, 35]], GuideIcons.WORLD_OBJECT, 26, 'Upgrade steel furnace'),
                        MultiSkillReqBuilder(30, [[15, 40]], GuideIcons.WORLD_OBJECT, 27, 'Upgrade fur pottery wheel'),
                    ]
                },
            ]
        },{
            id: 19, // Alchemy
            contents : [
                {
                    title: 'Ashing',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.ITEM, 82, 'Ash pot'),
                    ]
                },
                {
                    title: 'Crush',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.ITEM, 78, 'Crush air shards'),
                        SingleSkillBuilder(3, GuideIcons.ITEM, 79, 'Crush water shards'),
                        SingleSkillBuilder(6, GuideIcons.ITEM, 80, 'Crush earth shards'),
                        SingleSkillBuilder(10, GuideIcons.ITEM, 81, 'Crush fire shards'),
                        SingleSkillBuilder(16, GuideIcons.ITEM, 493, 'Crush metal shards'),
                        SingleSkillBuilder(20, GuideIcons.ITEM, 495, 'Crush sharp shards'),
                        SingleSkillBuilder(28, GuideIcons.ITEM, 494, 'Crush force shards'),
                        SingleSkillBuilder(34, GuideIcons.ITEM, 496, 'Crush poison shards'),
                        SingleSkillBuilder(50, GuideIcons.ITEM, 499, 'Crush nature shards'),
                        SingleSkillBuilder(50, GuideIcons.ITEM, 126, 'Crush void shards'),
                        SingleSkillBuilder(70, GuideIcons.ITEM, 497, 'Crush brind shards'),
                        SingleSkillBuilder(80, GuideIcons.ITEM, 498, 'Crush soul shards'),
                    ]
                },
                {
                    title: 'Mix',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.ITEM, 83, 'Mix lesser air wound'),
                        SingleSkillBuilder(1, GuideIcons.ITEM, 127, 'Mix Fiwon teleport'),
                        SingleSkillBuilder(2, GuideIcons.ITEM, 84, 'Mix lesser water wound'),
                        SingleSkillBuilder(4, GuideIcons.ITEM, 85, 'Mix lesser earth wound'),
                        SingleSkillBuilder(6, GuideIcons.ITEM, 86, 'Mix lesser fire wound'),
                        SingleSkillBuilder(8, GuideIcons.ITEM, 702, 'Mix lesser metal wound'),
                        SingleSkillBuilder(10, GuideIcons.ITEM, 703, 'Mix air wound'),
                        SingleSkillBuilder(12, GuideIcons.ITEM, 704, 'Mix water wound'),
                        SingleSkillBuilder(14, GuideIcons.ITEM, 705, 'Mix earth wound'),
                        SingleSkillBuilder(14, GuideIcons.ITEM, 128, 'Mix Salmo teleport'),
                        SingleSkillBuilder(16, GuideIcons.ITEM, 706, 'Mix fire wound'),
                        SingleSkillBuilder(18, GuideIcons.ITEM, 707, 'Mix metal wound'),
                        SingleSkillBuilder(18, GuideIcons.ITEM, 129, 'Mix volcano teleport'),
                        SingleSkillBuilder(20, GuideIcons.ITEM, 708, 'Mix greater air wound'),
                        SingleSkillBuilder(22, GuideIcons.ITEM, 709, 'Mix greater water wound'),
                        SingleSkillBuilder(22, GuideIcons.ITEM, 130, 'Mix island teleport'),
                        SingleSkillBuilder(24, GuideIcons.ITEM, 710, 'Mix greater earth wound'),
                        SingleSkillBuilder(26, GuideIcons.ITEM, 711, 'Mix greater fire wound'),
                        SingleSkillBuilder(26, GuideIcons.ITEM, 608, 'Mix Hyrill teleport'),
                        SingleSkillBuilder(28, GuideIcons.ITEM, 712, 'Mix greater metal wound'),
                        SingleSkillBuilder(30, GuideIcons.ITEM, 609, 'Mix Bodiam teleport'),
                        SingleSkillBuilder(34, GuideIcons.ITEM, 713, 'Mix Acernis teleport'),
                        SingleSkillBuilder(38, GuideIcons.ITEM, 714, 'Mix Teragon teleport'),
                    ]
                },
            ]
        },{
            id: 20, // Thieving
            contents : [
                {
                    title: 'Thieve',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.WORLD_OBJECT, 45, 'Thieve chest'),
                        SingleSkillBuilder(10, GuideIcons.CHARACTER, 60, 'Thieve man'),
                        SingleSkillBuilder(15, GuideIcons.CHARACTER, 61, 'Thieve woman'),
                        SingleSkillBuilder(20, GuideIcons.WORLD_OBJECT, 61, 'Thieve chest'),
                        SingleSkillBuilder(25, GuideIcons.CHARACTER, 62, 'Thieve man'),
                        SingleSkillBuilder(30, GuideIcons.CHARACTER, 25, 'Thieve guard'),
                        SingleSkillBuilder(40, GuideIcons.WORLD_OBJECT, 65, 'Thieve chest'),
                        SingleSkillBuilder(50, GuideIcons.WORLD_OBJECT, 86, 'Thieve chest'),
                    ]
                }
            ]
        },{
            id: 21, // Gemcutting
            contents : [
                {
                    title: 'Cut',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.ITEM, 659, 'Cut opal'),
                        SingleSkillBuilder(6, GuideIcons.ITEM, 660, 'Cut topaz'),
                        SingleSkillBuilder(12, GuideIcons.ITEM, 661, 'Cut quartz'),
                        SingleSkillBuilder(18, GuideIcons.ITEM, 662, 'Cut jade'),
                        SingleSkillBuilder(24, GuideIcons.ITEM, 663, 'Cut amber'),
                        SingleSkillBuilder(30, GuideIcons.ITEM, 664, 'Cut sapphire'),
                        SingleSkillBuilder(36, GuideIcons.ITEM, 665, 'Cut amethyst'),
                        SingleSkillBuilder(42, GuideIcons.ITEM, 666, 'Cut emerald'),
                        SingleSkillBuilder(48, GuideIcons.ITEM, 667, 'Cut ruby'),
                        SingleSkillBuilder(54, GuideIcons.ITEM, 668, 'Cut onyx'),
                        SingleSkillBuilder(60, GuideIcons.ITEM, 669, 'Cut diamond'),
        
                    ]
                },
                {
                    title: 'Casting',
                    content: [
                        MultiSkillReqBuilder(5, [[15, 5]], GuideIcons.ITEM, 672, 'Cast gold ring'),
                        MultiSkillReqBuilder(20, [[15, 20]], GuideIcons.ITEM, 674, 'Cast gold amulet'),
                    ]
                },
            ]
        },{
            id: 22, // Environment Magic
            contents : [
                {
                    title: 'Cast',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.SPELL, 23, 'Pickup 3x3'),
                        SingleSkillBuilder(30, GuideIcons.SPELL, 24, 'Pickup 5x5'),
                    ]
                },
                {
                    title: 'Teleport',
                    content: [
                        SingleSkillBuilder(10, GuideIcons.SPELL, 15, 'Fiewon telelport'),
                        SingleSkillBuilder(14, GuideIcons.SPELL, 16, 'Salmo telelport'),
                        SingleSkillBuilder(18, GuideIcons.SPELL, 17, 'Volcano telelport'),
                        SingleSkillBuilder(22, GuideIcons.SPELL, 18, 'Island telelport'),
                        SingleSkillBuilder(26, GuideIcons.SPELL, 19, 'Hyrill telelport'),
                        SingleSkillBuilder(30, GuideIcons.SPELL, 20, 'Bodiam telelport'),
                        SingleSkillBuilder(34, GuideIcons.SPELL, 21, 'Acernis telelport'),
                    ]
                },
                {
                    title: 'Syphons',
                    content: [
                        SingleSkillBuilder(1, GuideIcons.SPELL, 40, 'Syphon air essence'),
                        SingleSkillBuilder(3, GuideIcons.SPELL, 41, 'Syphon water essence'),
                        SingleSkillBuilder(6, GuideIcons.SPELL, 42, 'Syphon earth essence'),
                        SingleSkillBuilder(10, GuideIcons.SPELL, 43, 'Syphon fire essence'),
                        SingleSkillBuilder(16, GuideIcons.SPELL, 45, 'Syphon metal essence'),
                        SingleSkillBuilder(20, GuideIcons.SPELL, 47, 'Syphon sharp essence'),
                        SingleSkillBuilder(28, GuideIcons.SPELL, 46, 'Syphon force essence'),
                        SingleSkillBuilder(34, GuideIcons.SPELL, 48, 'Syphon poison essence'),
                        SingleSkillBuilder(50, GuideIcons.SPELL, 44, 'Syphon void essence'),
                        SingleSkillBuilder(50, GuideIcons.SPELL, 51, 'Syphon nature essence'),
                        SingleSkillBuilder(70, GuideIcons.SPELL, 49, 'Syphon bind essence'),
                        SingleSkillBuilder(80, GuideIcons.SPELL, 50, 'Syphon soul essence'),
                    ]
                },
                {
                    title: 'Enchantments',
                    content: [
                        SingleSkillBuilder(12, GuideIcons.SPELL, 35, 'Enchant Goblin Outpost teleport'),
                        SingleSkillBuilder(16, GuideIcons.SPELL, 38, 'Enchant Drop Party teleport'),
                        SingleSkillBuilder(20, GuideIcons.SPELL, 39, 'Patreon Palace teleport'),
                        SingleSkillBuilder(22, GuideIcons.SPELL, 26, 'Enchant fortify ranged defense'),
                        SingleSkillBuilder(26, GuideIcons.SPELL, 27, 'Enchant fortify magic defense'),
                        SingleSkillBuilder(28, GuideIcons.SPELL, 29, 'Enchant fortify melee focus'),
                        SingleSkillBuilder(30, GuideIcons.SPELL, 28, 'Enchant fortify melee defense'),
                        SingleSkillBuilder(32, GuideIcons.SPELL, 30, 'Enchant fortify melee focus'),
                        SingleSkillBuilder(32, GuideIcons.SPELL, 36, 'Enchant volcano teleport'),
                        SingleSkillBuilder(34, GuideIcons.SPELL, 32, 'Enchant fortify melee power'),
                        SingleSkillBuilder(36, GuideIcons.SPELL, 31, 'Enchant fortify melee focus'),
                        SingleSkillBuilder(38, GuideIcons.SPELL, 33, 'Enchant fortify melee power'),
                        SingleSkillBuilder(42, GuideIcons.SPELL, 34, 'Enchant fortify melee power'),
                        SingleSkillBuilder(44, GuideIcons.SPELL, 37, 'Enchant Wizard Tower teleport'),
                        SingleSkillBuilder(65, GuideIcons.SPELL, 52, 'Enchant item collection'),
                        SingleSkillBuilder(70, GuideIcons.SPELL, 53, 'Enchant auto consume'),
        
                    ]
                },
        
            ]
        },];
    }
    return skillGuide;
};