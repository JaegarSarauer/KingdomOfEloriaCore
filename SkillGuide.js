const Item = require('./Item').Item;
const Skill = require('./Skill').Skill;
const Spells = require('./Spells').Spells;
const Interface = require('./Interface');
const Get = require('./Getter');

const GuideIcons = {
    ITEM: 'Items',
    WORLD_OBJECT: 'worldObjects',
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

/**
 * Fishing Shrimp
 * [Shrimp icon]
 * Fishing Level 1
 */
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

const BuildCookingRecipesGuide = () => {
    let guides = [];
    let keys = Object.keys(Get.Recipes);
    for(let i = 0; i > keys.length; ++i) {
        let recipe = Get.Recipes[keys[i]];
        let desc = 'Mix ';
        for(let j = 0; j < recipe.itemIdsRequired.length; j++) {
            let itemToMix = Item[recipe.itemIdsRequired[j]];
            desc += itemToMix.name;
            if (j != recipe.itemIdsRequired.length - 1) {
                desc += ',';
            }
            desc += ' ';
        }
        desc += 'to make ' + (Item[recipe.iconItemId].name);

        guides.push(SingleItemSkillBuilder(recipe.levelRequirement, recipe.iconItemId, desc));
    }
    return guides;
};

const SmeltSkillBuilder = (smeltBarInterfaceId) => {
    let interface = Interface.Interface[smeltBarInterfaceId];
    let bar = Item[interface.barId];
    return SingleSkillBuilder(interface.smithingLevel, GuideIcons.ITEM, interface.barId, 'Smelt ' + bar.name);
};

const BuildSmithingGuide = (metalName, smeltBarInterfaceId, smithingInterfaceIds) => {
    let content = [
        SmeltSkillBuilder(smeltBarInterfaceId)
    ];

    for(let i = 0; i < smithingInterfaceIds.length; ++i) {
        let interface = Interface.Interface[smithingInterfaceIds[i]];
        let smithedItem = Item[interface.smithedItemId];
        content.push(SingleSkillBuilder(interface.smithingLevel, GuideIcons.ITEM, interface.smithedItemId, 'Smith ' + smithedItem.name));
    }

    return {
        title: metalName,
        content: content
    }
};

const BuildMagicFocusGuides = () => {
    return BuildGuidesFromSpells(6);
}

const SkillGuides = [{
    id: 0,
    contents: [
        {
            title: 'Wield',
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
        }
    ]
}, {
    id: 1,
    contents: [

    ],
}, {
    id: 2,
    contents: [
        {
            title: 'Wear',
            content: [
                SingleItemSkillBuilder(1, 42, 'Wear copper armor'),
                SingleItemSkillBuilder(10, 43, 'Wear iron armor'),
                SingleItemSkillBuilder(20, 44, 'Wear steel armor'),
                SingleItemSkillBuilder(30, 45, 'Wear nelenite armor'),
                SingleItemSkillBuilder(40, 263, 'Wear gothite armor'),
                SingleItemSkillBuilder(50, 291, 'Wear osmium armor'),
            ],
        }
    ]
}, {
    id: 3,
    contents: [
        {
            title: 'Wield',
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
        }
    ]
}, {
    id: 4,
    contents: [
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
            ],
        }
    ]
}, {
    id: 6,
    contents: [
        {
            title: 'Cast',
            content: [
                ...BuildMagicFocusGuides(6),
            ],
        }
    ]
}, {
    id: 7,
    contents: [
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
    id: 9,
    contents: [
        {
            title: 'Items',
            content: [
                SingleSkillBuilder(1, GuideIcons.ITEM, 1, 'Use copper axes'),
                SingleSkillBuilder(10, GuideIcons.ITEM, 2, 'Use iron axes'),
                SingleSkillBuilder(20, GuideIcons.ITEM, 3, 'Use steel axes'),
                SingleSkillBuilder(30, GuideIcons.ITEM, 4, 'Use nelenite axes'),
                SingleSkillBuilder(40, GuideIcons.ITEM, 157, 'Use gothite axes'),
                SingleSkillBuilder(50, GuideIcons.ITEM, 172, 'Use osmium axes'),
            ]
        },
        {
            title: 'World Objects',
            content: [
                SingleSkillBuilder(1, GuideIcons.WORLD_OBJECT, 0, 'Chop pine trees'),
                SingleSkillBuilder(10, GuideIcons.WORLD_OBJECT, 1, 'Chop oak trees'),
                SingleSkillBuilder(20, GuideIcons.WORLD_OBJECT, 2, 'Chop ash trees'),
                SingleSkillBuilder(30, GuideIcons.WORLD_OBJECT, 3, 'Chop fur trees'),
                SingleSkillBuilder(40, GuideIcons.WORLD_OBJECT, 4, 'Chop king maple trees'),
                SingleSkillBuilder(50, GuideIcons.WORLD_OBJECT, 5, 'Chop magic trees'),
            ]
        },
    ],
}, {
    id: 10,
    contents: [
        {
            title: 'Items',
            content: [
                SingleSkillBuilder(1, GuideIcons.ITEM, 1, 'Use copper pickaxes'),
                SingleSkillBuilder(10, GuideIcons.ITEM, 2, 'Use iron pickaxes'),
                SingleSkillBuilder(20, GuideIcons.ITEM, 3, 'Use steel pickaxes'),
                SingleSkillBuilder(30, GuideIcons.ITEM, 4, 'Use nelenite pickaxes'),
                SingleSkillBuilder(40, GuideIcons.ITEM, 157, 'Use gothite pickaxes'),
                SingleSkillBuilder(50, GuideIcons.ITEM, 172, 'Use osmium pickaxes'),
            ]
        },
        {
            title: 'World Objects',
            content: [
                SingleSkillBuilder(1, GuideIcons.WORLD_OBJECT, 0, 'Mine copper rocks'),
                SingleSkillBuilder(1, GuideIcons.WORLD_OBJECT, 0, 'Mine clay rocks'),
                SingleSkillBuilder(10, GuideIcons.WORLD_OBJECT, 1, 'Mine iron rocks'),
                SingleSkillBuilder(20, GuideIcons.WORLD_OBJECT, 2, 'Mine coal rocks'),
                SingleSkillBuilder(25, GuideIcons.WORLD_OBJECT, 2, 'Mine gold rocks'),
                SingleSkillBuilder(30, GuideIcons.WORLD_OBJECT, 3, 'Mine nelenite rocks'),
                SingleSkillBuilder(40, GuideIcons.WORLD_OBJECT, 4, 'Mine gothite rocks'),
                SingleSkillBuilder(40, GuideIcons.WORLD_OBJECT, 4, 'Mine pure coal rocks'),
                SingleSkillBuilder(50, GuideIcons.WORLD_OBJECT, 5, 'Mine osmium rocks'),
                SingleSkillBuilder(60, GuideIcons.WORLD_OBJECT, 5, 'Mine gem rocks'),
            ]
        },
    ],
}, {
    id: 11,
    contents: [
    ],
}, {
    id: 12,
    contents: [
        {
            title: 'Fishing Pools',
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
        }
    ],
}, {
    id: 13,
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
            title: 'Sliced',
            content: [
                SingleSkillBuilder(1, GuideIcons.ITEM, 850, 'Slice octopus tentacles'),
            ]
        },

    ],
}, {
    id: 14,
    contents: [
        BuildSmithingGuide('Copper', 8, [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]),
        BuildSmithingGuide('Iron', 9, [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]),
        BuildSmithingGuide('Steel', 10, [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]),
        {
            title: 'Gold',
            content: [
                SmeltSkillBuilder(256),
                MultiSkillReqBuilder(5, [5, 15], GuideIcons.ITEM, 672, 'Cast gold ring'),
                MultiSkillReqBuilder(20, [20, 15], GuideIcons.ITEM, 674, 'Cast gold amulet'),
            ]
        },
        BuildSmithingGuide('Nelenite', 11, [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]),
        BuildSmithingGuide('Gothite', 116, [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128]),
        BuildSmithingGuide('Osmium', 129, [130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141]),
    ],
}, {
    id: 15,
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
                SingleSkillBuilder(1, GuideIcons.ITEM, 793, 'Spin yarn'),
                SingleSkillBuilder(1, GuideIcons.ITEM, 677, 'Spin silk'),
                SingleSkillBuilder(1, GuideIcons.ITEM, 41, 'Spin bowstring'),
                SingleSkillBuilder(20, GuideIcons.ITEM, 330, 'Spin drawstring'),
            ]
        },
        {
            title: 'Casting',
            content: [
                MultiSkillReqBuilder(5, [5, 15], GuideIcons.ITEM, 672, 'Cast gold ring'),
                MultiSkillReqBuilder(20, [20, 15], GuideIcons.ITEM, 674, 'Cast gold amulet'),
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
    id: 16,
    contents : [
        {
            title: 'Fletch',
            content: [
                SingleSkillBuilder(1, GuideIcons.ITEM, 523, 'Arrow Shafts'),
            ]
        }
    ]
}, {
    id: 17,
    contents : [
        {
            title: 'Firemaking',
            content: [
                SingleSkillBuilder(1, GuideIcons.ITEM, 523, ''),
            ]
        }
    ]
},{
    id: 18,
    name: 'Construction',
    contents : [
        {
            title: 'Fletch',
            content: [
                SingleSkillBuilder(1, GuideIcons.ITEM, 523, ''),

            ]
        }
    ]
},{
    id: 19,
    name: 'Alchemy',
    contents : [
        {
            title: 'Fletch',
            content: [
                SingleSkillBuilder(1, GuideIcons.ITEM, 523, ''),

            ]
        }
    ]
},{
    id: 20,
    name: 'Thieving',
    contents : [
        {
            title: 'Fletch',
            content: [
                SingleSkillBuilder(1, GuideIcons.ITEM, 523, ''),

            ]
        }
    ]
},{
    id: 21,
    name: 'Gemcutting',
    contents : [
        {
            title: 'Fletch',
            content: [
                SingleSkillBuilder(1, GuideIcons.ITEM, 523, ''),

            ]
        }
    ]
},{
    id: 22,
    name: 'Environment Magic',
    contents : [
        {
            title: 'Fletch',
            content: [
                SingleSkillBuilder(1, GuideIcons.ITEM, 523, ''),

            ]
        }
    ]
},];