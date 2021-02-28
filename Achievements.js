
const Category = {
    TERAGON : 0,
    SALMO : 1,
    ACERNIS : 2,
    FIEWON : 3,
    BODIAM : 4, 
    HYRILL : 5,
    USER : 7,
}

const Difficulty = {
    EASY : 0,
    MEDIUM : 1,
    HARD : 2,
}

function createAchievement(id, name, category, difficulty, description,  requirement = null) {
    return {
        id,
        name,
        goalType: GoalType.ACHIEVEMENT,
        category,
        difficulty,
        description,
        requirement
    };
}

const Achievements = [
    createAchievement(0, 'Mine copper ore', Category.TERAGON, Difficulty.EASY, 'Mine copper ore in the Teregon Mining Guild.'),
    createAchievement(1, 'Mine coal ore', Category.TERAGON, Difficulty.EASY, 'Mine copper ore in the Teregon Mining Guild.'),
    createAchievement(2, 'Go fish', Category.SALMO, Difficulty.EASY, 'Fish a shrimp in a shallow fishing pool at the Salmo Fishing Guild.'),
    createAchievement(3, 'Chop a tree!', Category.ACERNIS, Difficulty.EASY, 'Chop a tree in the Acernis Woodcutting Guild.'),
    createAchievement(4, 'Get Oak', Category.ACERNIS, Difficulty.EASY, 'Chop a oak tree in the Acernis Woodcutting Guild.'),
    createAchievement(5, 'Join a drop party', Category.HYRILL, Difficulty.EASY, 'WHACK a Pinata during a Hyrill drop party!'),
    createAchievement(6, 'Sweet tooth', Category.HYRILL, Difficulty.EASY, 'Much on some Pinata candy!'),
    createAchievement(7, 'Host a drop party', Category.HYRILL, Difficulty.EASY, 'Host a drop party in the Hyrill party room'),
    createAchievement(8, 'Visit Patreon Embassy', Category.BODIAM, Difficulty.EASY, 'Talk to Patreon Pat at the Patreon Embassy west of Bodiam.'),
    createAchievement(9, 'Smelt a Copper Full Helm', Category.TERAGON, Difficulty.EASY, 'Smelt a Copper Full Helm at the Teragon Mining Guild.'),
    createAchievement(10, 'Bake a Cake', Category.MISC, Difficulty.EASY, 'Bake a cake at a Hyrill range.'),
    createAchievement(11, 'Craft a Gold Ring', Category.HYRILL, Difficulty.EASY, 'Cast a gold ring.'),
    createAchievement(12, 'Read a Spell Scroll', Category.FIEWON, Difficulty.EASY, 'Read any spell scroll you can find!'),
    createAchievement(13, 'Bind cloth on a Obelisk', Category.HYRILL, Difficulty.EASY, 'Bind a blue cloth on the Obelisk above Hyrill'),
    createAchievement(14, 'Incinerate a item', Category.SALMO, Difficulty.EASY, 'Incinerate any item at the Volcano south of the Salmo Fishing Guild'),
    createAchievement(15, 'Thieve a NPC', Category.FIEWON, Difficulty.EASY, 'Thieve a NPC in Fiewon'),
    createAchievement(16, 'Thieve a Chest', Category.BODIAM, Difficulty.EASY, 'Thieve a Bodiam Chest'),
    createAchievement(17, 'Break the law', Category.BODIAM, Difficulty.EASY, 'Acquire a bounty in Bodiam'),
    createAchievement(18, 'Break the law', Category.BODIAM, Difficulty.EASY, 'Acquire a bounty in Bodiam'),
    createAchievement(19, 'Milk a cow', Category.HYRILL, Difficulty.EASY, 'Milk a cow at the Hyrill Farm'),
    createAchievement(20, 'Slay a goblin', Category.BODIAM, Difficulty.EASY, 'Saly a goblin in the Bodiam Orc War'),
    createAchievement(21, 'Off a Motherclucker', Category.FIEWON, Difficulty.EASY, 'Snuff one of Osaiks chickens in Fiewon'),
    createAchievement(22, 'Donate to Teragon', Category.TERAGON, Difficulty.EASY, 'Donate to the Teragon Mining Guilds\' Guild Chest'),
    createAchievement(23, 'Donate to Salmo', Category.SALMO, Difficulty.EASY, 'Donate to the Salmo Fishing Guilds\' Guild Chest'),
    createAchievement(24, 'Donate to Acernis', Category.ACERNIS, Difficulty.EASY, 'Donate to the Acernis Woodcutting Guilds\' Guild Chest'),
    createAchievement(25, 'Teleport to your guild', Category.ACERNIS, Difficulty.EASY, 'Donate to the Acernis Woodcutting Guilds\' Guild Chest'),
    createAchievement(26, 'Play The Obelisk', Category.BODIAM, Difficulty.EASY, 'Join a round of The Obelisk, in the dungeons North of Bodiam'),
    createAchievement(27, 'The Obelisk: Reach Wave 10', Category.BODIAM, Difficulty.EASY, 'Reach Wave 10 in The Obelisk.'),
    createAchievement(28, 'Mine nelenite ore', Category.TERAGON, Difficulty.MEDIUM, 'Mine nelenite ore in the Teregon Mining Guild.'),
    createAchievement(29, 'Deep fishing', Category.SALMO, Difficulty.MEDIUM, 'Fish in a deep fishing pool at the Salmo Fishing Guild.'),
    createAchievement(30, 'Cut a fur tree', Category.ACERNIS, Difficulty.MEDIUM, 'Chop down a fur tree at the Acernis Woodcutting Guild.'),
    createAchievement(31, 'The Obelisk: Reach Wave 50', Category.BODIAM, Difficulty.MEDIUM, 'Reach Wave 50 in The Obelisk.'),
    createAchievement(32, 'String a fur bow', Category.ACERNIS, Difficulty.MEDIUM, 'String a fur bow at the Acernis Woodcutting Guild.'),
    createAchievement(33, 'Open the shell chest', Category.SALMO, Difficulty.MEDIUM, 'Open the shell chest under the Salmo Fishing Guild.'),
    createAchievement(34, 'Sew a bag', Category.SALMO, Difficulty.MEDIUM, 'Sew together a bag together in Salmo.'),
    createAchievement(35, 'Sew a golem necklace', Category.TERAGON, Difficulty.MEDIUM, 'Sew together a golem necklace in Teragon.'),
    createAchievement(36, 'Cut a sapphire', Category.TERAGON, Difficulty.MEDIUM, 'Successfully cut a sapphire gem.'),
    createAchievement(37, 'Slay a orc', Category.BODIAM, Difficulty.MEDIUM, 'Slay a orc in the Bodiam Orc War.'),
    createAchievement(38, 'Slay a skeleton', Category.HYRILL, Difficulty.MEDIUM, 'Slay a skeleton in the dungeons near Hyrill.'),
    createAchievement(39, 'Slay the alpha wolf', Category.SALMO, Difficulty.MEDIUM, 'Slay the alpha wolf under the volcano.'),
    createAchievement(40, 'Mine gems', Category.TERAGON, Difficulty.HARD, 'Mine gems from the gem rock underneath the Teragon Mining Guild.'),
    createAchievement(41, 'Catch a Octopus', Category.SALMO, Difficulty.HARD, 'Catch a Octopus from the hand fishing pools at the Salmo Fishing Guild.'),
    createAchievement(42, 'Cut a magic tree', Category.ACERNIS, Difficulty.HARD, 'Chop down a magic tree at the Acernis Woodcutting Guild.'),
    createAchievement(43, 'Enchant Sapphire', Category.TERAGON, Difficulty.HARD, 'Enchant a Sapphire gem at the Teragon Mining Guild.'),
    createAchievement(44, 'Steal from the King Goblin', Category.BODIAM, Difficulty.HARD, 'Thieve from the King Goblins\' Chest south of Bodiam.'),
    createAchievement(45, 'Slay the King Goblin', Category.BODIAM, Difficulty.HARD, 'Slay the King Goblin south of Bodiam.'),
    createAchievement(46, 'The Obelisk: Reach Wave 100', Category.BODIAM, Difficulty.HARD, 'Reach Wave 100 in The Obelisk.'),
];

module.exports.Achievements = Achievements;