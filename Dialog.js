const Dialogs = Object.freeze([{
    id: 0,
    title: '<b>Welcome to Guilds of Gods!</b>',
    message: '<b>\tGetting Started</b>\n' + 
    'Use your left and right mouse buttons to move and interact with the world and your items.\n\n' + 
    ' - The menu on the right has controls and stats for your adventurer. Here you will find your inventory, stats, equipment, and combat settings.\n' + 
    ' - The menu on the left has controls and settings for your account. Game and chat messages appear here.\n\n' + 
    
    '<b>\tObjective</b>\n' +
    'Follow the arrow to find <note>Osaik</note> and help him get back to the city of <note>Fiewon</note>!\n', 
    continueSteps: [[
        buildStep(StepType.SHOW_DIRECTION_ARROW, {params: [134, 71]}),
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.SET_CHARACTER_STATE, {params: [4, 2]}),
    ]],
}, {
    id: 1,
    title: '<b>Osaik</b>',
    message: 'Hello! You found me.  I am here to get you prepared for the dungeons.\nWe are currently digging towards the ruins as we speak. Now is the time to get prepared before we hit the entrance!\n' +
    'Here is some equipment, we could use the help once you get stronger, but for now you should just try to stay alive. You can talk to the bankers in the town you walked by ' +
    'to deposit your extra items.\n\n' +
    
    '<note>[Osaik gives you a set of copper armor and a lot of coins.]</note>\n\n' +
    
    'If combat isn’t your thing, we could always use more resources to support our guards. You can use camps to automate your resource collection once you get some experience in your chosen trades. You’ll need this saw to build one.\n\n' +
    
    '<note>[Osaik also gives you a saw.]</note>\n\n' +
    
    'Once you get 10,000 coins, you can buy your 2nd adventurer. The larger the party, the stronger.\nTalk to me if you need any more help!',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.CHECK_CHARACTER_STATE, {params: [4, 2]}),
        buildStep(StepType.SHOW_DIRECTION_ARROW, {params: [-1]}),
        buildStep(StepType.SET_CHARACTER_STATE, {params: [4, 0]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [13, 1]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [21, 1]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [42, 1]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [29, 1]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [0, 100]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [118, 1]}),
    ]],
},{
    id: 2,
    title: '<b>Osaik</b>',
    message: 'Hello again! What can I help you with?',
    continueSteps: [[
        buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, {params: [[241, 242, 243, 244, 245, 246, 247, 248, 249, 250]] }),
    ]]
}, {
    id: 3,
    title: '<b>Mysterious Man</b>',
    message: 'Hello. I can help alter the magic of some objects, for a fee of course.\n\n'+
    'Hand me a tome and have 1,000 coins on you and I will redirect the focus of the tome.',
}, {
    id: 4,
    title: '<b>Cavern Supervisor</b>',
    message: 'We have uncovered a cavern but our entrance has woken up some creatures. We need your help fighting them off.\n\n' +
    'We found an obelisk in the centre of the cavern with some interesting artifacts around it.' +    
    'It appears that the obelisk has been placed there as some sort of offering table. It feeds off the energy of the creatures.\n\n' +
    'We need you to go in there and protect the obelisk and repair it while we try and find out more about it.' +
    'If the obelisk is destroyed, the cavern will collapse. You will need to get out in time if things get too difficult.' +
    'Be careful in there! If you die, you will lose your items.',
},{
    id: 5,
    title: '<b>Death</b>',
    message: 'Why hello there, peculiar human.\n\n' +
    'Nice to see you finally bit the bullet.' +    
    'I\'ve been watching you closely. It was just yesterday you were nothing but a young lad.\n\n' +
    'Honestly, I\'ve grown quite fond of you. For the time being, I have chosen to spare you.' +
    'Next time your adventurer reaches 0 hitpoints, you will die and then simply wake up back in your home town.' +
    'I\'ll show you mercy, but your fellow humans may not be so kind. They will steal your possesions.' +
    'Remember to eat food when you are injured, and don\'t fight things you can\'t handle!\n\n' +   
    'Right click a character before you attack it to see its combat level. If it is much higher than yours, stay away!\n\n' + 
    'Next time you die, you will drop all the items in your inventory except for your most valuable one.\n' +
    'Until we meet again, my child.',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.TELEPORT, {params: [0, 20, 32, 22, 39, 0] }),
    ]]
}, {
    id: 6,
    title: '<b>A Citizen</b>',
    message: 'Good day...',
}, {
    id: 7,
    title: '<b>Mysterious Man</b>',
    message: 'I see you have become a very skilled adventurer! Would you like to buy a weildable standard to display your great achievment?\n\n' +
    'An adventurer of your talent should have no problem paying 100,000 coins, right? ...',
    continueSteps: [[
        buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, {params: [[207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227]] }),
    ]]
}, {
    id: 8, // Sandwich
    title: '<b>Sandwich</b>',
    message: 'In Memoriam: Sandwich (10/19 - to be determined)\n\n' +
    'The 2nd most handsome boy to grace our shores. Shout outs to NPC, finalroge, Stv, Inspiria and Knox.\n' +
    'You could have all beaten me here if you had stuck it out!\n' +
    'Remember the rats...',
}, {
    id: 9, // Red500
    title: '<b>Redd</b>',
    message: 'Guilds of Gods is everything I love about Runescape and Incremental Games but put together into one game,\n' +
   'It deserves all my money, as thanks for the fun I\'ve had and will have.\n' +
    '\n...\n\n' +
    'Remember how we crashed the server in the early days by messing with burnt fish? lmao',
}, {
    id: 10, // AidenCanadian
    title: '<b>Aiden</b>',
    message: 'Fancy seeing you here! I\'m just looking for a nice Maple Tree. Been craving some syrup.\n\n' +
    'I\'m sure I saw one around here somewhere!',
}, {
    id: 11, // WSM_Orange
    title: '<b>WeSkillNow</b>',
    message: 'As the first Twitch streamer to ever stream this game, and as a long term Patreoner, this game is the best game ever!\n\n' +
    'It is the sequel that RS Classic deserved! WAY better than RS3!\n\n' +
    '...\n\n' +
    'Oh, how did I become immortalized in this amazing game? Through Patreon! Big donors and long-term donors both get NPCs like me!\n\n\n' +
    'Just make sure to fill in the form the devs send you or they might just make your message whatever they choose... ;)\n\n' +
    'I am Twitch.tv\'s WeSkillNow and I technically approved this message!',
}, {
    id: 12, // MilkN2Sugars
    title: '<b>Thomas</b>',
    message: 'When you know the best strategies, training your skills is easy-peasy! ',
},
{
    id: 13,
    title: '<b>Osaik</b>',
    message: '<b>OW!</b> It bit me! That damn mouserat bit me!\n\n' +
    '<note>[...]</note>\n\n' +
    'Oh hi! Where did you come from? Nevermind that, the damn mouserat bit me. Can you get me some food so I can heal up?\n\n' +

    '<note>[Osaik gives you a fishing net.]</note>\n\n' +

    'Find a shallow fishing pool along the beach and catch some shrimp for me, will ya?',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.CHECK_CHARACTER_STATE, {params: [4, 2]}),
        buildStep(StepType.SHOW_DIRECTION_ARROW, {params: [152, 86]}), // Fishing pool
        buildStep(StepType.SET_CHARACTER_STATE, {params: [4, 3]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [117, 1]}), // Fishing net
    ]],
},
{
    id: 14,
    title: '<b>Osaik</b>',
    message: 'I can’t eat raw shrimp, you need to cook it first..\n\n' +

    '<note>[Osaik gives you a copper axe and a matchbox.]</note>\n\n' +

    'Find a tree and chop it down for logs of wood. Afterwards, use the matchbox on the wood to light a fire. Use the raw shrimp on the fire to try and cook them.',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.CHECK_CHARACTER_STATE, {params: [4, 3]}),
        buildStep(StepType.SHOW_DIRECTION_ARROW, {params: [125, 78]}), // Tree
        buildStep(StepType.SET_CHARACTER_STATE, {params: [4, 4]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [1, 1]}), // Copper axe
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [46, 1]}), // Matchboxes
    ]],
},
{
    id: 15,
    title: '<b>Osaik</b>',
    message: 
    'Thank you for the shrimp, this will do the trick!\n\n' +
    
    '<note>[Osaik eats the shrimp. He is healed.]</note>\n\n' +

    'I don’t know about you, but I’m sick of this island. I have teleports that can get us to <note>Fiewon</note>, but they are locked in my safe. The stupid mouserat ate my key earlier. Can you get it back for me?\n\n' +
    
    '<note>[Osaik gives you a copper dagger.]</note>\n\n' +
    
    'Kill the mouserat and get my key back for me.',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.CHECK_CHARACTER_STATE, {params: [4, 4]}),
        buildStep(StepType.SHOW_DIRECTION_ARROW, {params: [-1]}),
        buildStep(StepType.SET_CHARACTER_STATE, {params: [4, 5]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [13, 1]}), // Copper dagger
    ]],
},
{
    id: 16,
    title: '<b>Osaik</b>',
    message: 'Thank you. Now that I can get into my safe, let me get you your teleport.\n\n' +
    
    '<note>[Osaik gives you a Fiewon Teleport.]</note>\n\n' +
    
    'Use it to get to the land of Eloria. I’ll meet you on the other side.',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.CHECK_CHARACTER_STATE, {params: [4, 5]}),
        buildStep(StepType.SHOW_DIRECTION_ARROW, {params: [-1]}), // Tree
        buildStep(StepType.SET_CHARACTER_STATE, {params: [4, 6]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [729, 1]}), // Fiewon teleport
    ]],
}, {
    id: 17,
    title: '<b>Osaik</b>',
    message: 'Where is my shrimp?\n\n' +
    'Get it by fishing in a fishing pool, they are all along the beach.',
}, {
    id: 18,
    title: '<b>Osaik</b>',
    message: 'I told you to cook a shrimp first.\n\n' +
    'Find a tree and chop it down for logs of wood. Afterwards, use the matchbox on the wood to light a fire. Use the raw shrimp on the fire to try and cook them.\n\n' +
    'Try not to burn it or you will have to try again.',
}, {
    id: 19,
    title: '<b>Osaik</b>',
    message: ' Did you find my key yet?\n\n' + 
    'The mouserat ate it. He was scurrying around here somewhere...',
}, {
    id: 20,
    title: '<b>Osaik</b>',
    message: 'I\'m ready to go to Eloria whenever you are. Just use the Fiewon Teleport I gave you.',
}, {
    id: 21,
    title: '<b>The Land of Eloria</b>',
    message: '<note>You hear the guards whisper of the return of Osaik and gleam info on his whereabouts.</note>',
    continueSteps: [[
        buildStep(StepType.SHOW_DIRECTION_ARROW, {params: [25, 8]}),
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
    ]],
}, {
    id: 22,
    title: '<b>Osaik</b>',
    message: 'Thank you for helping me off that wretched island.\n\n' +
    'I don\'t believe I properly introduced myself. My name is <note>Osaik</note>. I am one of the first adventurers to set foot on Eloria, the place you now call home.\n\n' +
    'Eloria is rich in natural resources and culture. A new world awaits you my friend.',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.SHOW_DIALOG, {
            params: [40],
            stepResultPass: 'END_ACTION',
            stepResultFail: 'END_ACTION',
        })
    ]],
}, {
    id: 23,
    title: '<b>Osaik</b>', // <How do I make tools and armor?>
    message: 'Armor, axes and pickaxes are all smithed from ores found in the land of Eloria. Making such tools uses a combination of two skills, Mining and Smithing.\n\n' +
    'To mine, you will want to wield a pickaxe and find a rock. When you are new to mining, you will want to acquire a copper pickaxe and then click on a copper rock to mine it.\n\n'+
    'Once you have enough ore, you will smith them into bars. Bring the ores to a furnace and click on the furnace. Furnaces are often found in Metalsmith Stores within the cities.\n\n'+
    'Then you use a hammer on an anvil to smith it into whatever you desire. You can buy a hammer at a General Store.\n\n',
},{
    id: 24,
    title: '<b>Osaik</b>', // <How do I make bows and arrows?>
    message: 'Bows and arrows are fletched from trees found in grassy areas. Creating bows and arrows is a multi-step process. Creating unstrung bows and arrow shafts, however, only required Woodcutting and Fletching.\n\n' +
    'To woodcut, you will want to wield an axe and find a tree. When you are new to woodcutting, you will want to acquire a copper axe and then click on a regular tree to mine it. Once you have logs, you will fletch them into bows or arrow shafts. Use a knife on the log to fletch it. Knives can be purchased from a General Store.\n\n'+
    'To turn an unstrung bow into a bow, you must string it with a bowstring, which are created by spinning flax. Flax can be around around the lands.\n\n'+
    'To turn arrow shafts into arrows, you must first put feathers on the arrow shafts, which can be acquired by slaying chickens. You must then put arrow heads onto the shafts. Ask me about making tools and armor to learn how to make arrowheads.',
},{
    id: 25,
    title: '<b>Osaik</b>', // <How do I learn magic?>
    message: 'Magic can is learnt by acquiring spell scrolls and studying them. Once you read a spell scroll, it crumbles into dust, but the spell is permanently added to your Spell Book.\n\n' +
    'Once a spell is learned, you can find it in your Spell Book, a tab found in the menu on the right. To use a spell, carry the appropriate essence in your inventory and then click on the spell in your spell book. If it is a combat spell, it will be equipped activated and used once you get into a fight.\n\n' +
    'Both spell scrolls and essence can be dropped by enemies upon being slain, or acquired through thieving chests. You can also be create essence with essence shards.',
},{
    id: 26,
    title: '<b>Osaik</b>', // <Where do I store my items?>
    message: 'You can store your items safely at a bank. Banks are found in nearly every town in Eloria.\n\n' +

    'To deposit your items into a bank, talk to a Banker. Bankers will let you deposit  or withdraw all your items.\n' +
    'Items in your bank are stored safely. If you die in combat, items on your person will fall to the ground, while items in your bank will be safe.\n\n' +
    
    'Items can be deposited or withdrawn normally or as notes. To toggle between noted, check the Note/Item toggle in the upper right  of the bank menu.',
},{
    id: 27,
    title: '<b>Osaik</b>', // <How can I make money?>
    message: 'Money can be made by selling items to stores and market stalls or trading directly with players.\n' + 
    'Items can be acquired by gathering resources such as mining or woodcutting, creating items from resources such as through smithing, fletching or crafting. They can also be dropped by slain enemies in combat, or stolen through thieving NPCs and chests.\n\n' +
    
    'Many players suggest stealing items through thieving as it is a highly profitable way to make money, but it comes with high risk.',
},{
    id: 28,
    title: '<b>Osaik</b>', // <What is thieving?>
    message: 'Thieving is one of the best sources of Coins and Cloth in the game currently. It consists of 2 activities: Pickpocketting certain NPCs, and opening Chests.\n\n' +

    'Opening a chest, or uncommonly failing a pickpocket will earn the player a bounty skull. This means that thieving is a somewhat risky activity. Not only will this allow another player within your level range to attack you, it means that guards in town will attack you on sight.\n\n' +
    
    'Thieving is a high risk, high reward activity. Proceed with caution, it\'s not exactly encouraged around here... but Eloria is the new wild west. People don\'t exactly trust The Emperor\'s guards anyway...',
}, {
    id: 29,
    title: '<b>Osaik</b>', // <What are notes and where can I redeem them?>
    message: 'Notes are an IOU that the bank accept at a 1:1 rate with the described item.\n\n' +

    'Items can often take up a lot of space in your inventory. Notes are a way of carrying many of the same item, while having each item only take up spot in your inventory.\n\n' +

    'If you wish to use an item that is noted, you must deposit it into your bank and withdraw the item normally. To toggle between withdrawing and depositing noted items, check the Note/Item toggle in the upper right  of the bank menu.',
}, {
    id: 30,
    title: '<b>Osaik</b>', // <How does crafting work?>
    message: 'Crafting provides a number of benefits to other skills in Guilds of Gods - it is required for creating magic combat armors, spinning flax for bowstrings for fletching and drawstrings for making bags as well as the creation of Pots for alchemy. These uses, plus its relative ease to train means it is a great skill to work on early for a new player.\n\n' +
    
    'Crafting relies on tools such as Needles and Threads, which can be purchased from Crafting Stores. It often requires using a spinning wheel or pottery wheel, which can be found in most Crafting Stores.\n\n' +
    
    'Cloth can be crafted into wizard robes, clay crafted into claypots, and flax into bowstrings. Each of these tools is very useful for other skills.',
}, {
    id: 31,
    title: '<b>Osaik</b>', // <How can I connect with other adventurers?>
    message: 'In the menu on the left, there is a \'Chat\' tab which allows you to talk to all players who are currently online.\n\n' +
    
    'Below that is the \'Friends List\' tab, which lets you add other adventurers as friends.\n' +
    'Friends can see when each other is online and talk to each other privately.',
}, {
    id: 32,
    title: '<b>Osaik</b>', // <I want to learn more>
    message: 'My brother <note>Kiaso</note> is more experienced than myself.\n\n' +
    
    'You can find him in his house east of the Fishing Guild, which is the city east of us. Just exit Fiewon heading south, and when the path forks, continue on the north east paths.',
},
////// Kiaso
{
    id: 33,
    title: '<b>Kiaso</b>',
    message: 'Hello, I am Kiaso, brother of Osaik.\n\n' +
    'What can I help you with today?',
    continueSteps: [[
        buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, {params: [[251, 252, 253, 254, 255]] }),
    ]]
}, {
    id: 34,
    title: '<b>Kiaso</b>', // <How can I expand my party?>
    message: 'You can purchase new adventurers to expand your party with gold.\n\n' +
    'The top menu bar shows your currently selected adventurer, their health and their status.\n\n' + 
    'On that bar, you will see a price listed. That is the cost of your next adventurer. You can purchase up to four adventurers, making your max party size of five adventurers.',
}, {
    id: 35,
    title: '<b>Kiaso</b>', // '<What are camps and how do they work?>
    message: 'Camps are structures which allow you to automate resource collection and combat training, freeing you up to playing on other adventurers while the camp autopilots the adventurer operating it. They are built through the Construction skill and can be created for mining, woodcutting, fishing and combat.\n\n' +
    'To create a camp, you must have a saw, five logs and the appropriate tool related to the camp you are building. For example, a woodcutting camp would require an axe while a training dummy would require a platebody. You first select your saw, then use it on the logs to create the camp.\n\n' +
    'As an example, if you wish to create a copper ore mining camp, you would need a copper pickaxe, five regular logs and a saw. Creating higher tier camps requires higher tier wood and higher tier tools.',
}, {
    id: 36,
    title: '<b>Kiaso</b>', // <What are PvP bounties and how do they work?>
    message: 'Bounties allows for adventurers to fight in player vs player combat. You cannot fight players unless you both have bounties.\n\n' +
    'A white skull over a players head means they are a lawful player who is willing to duel. To get your own white skull, you must talk to The Emperor in Hyrill and request a PvP Bounty.\n\n' +
    'A red skull depicts an unlawful player. This player was either caught thieving or thieved from chests. Red skulls cannot initiate a fight with white skulls, however a white skull can initiate a fight with red skulls. Red skulled players will be attacked by guards on sight.\n\n' +
    'Bountied players can only fight other plays with similar combat levels.',
}, {
    id: 37,
    title: '<b>Kiaso</b>', // <What are bags?>
    message: '<note>Bags</note> allow you to hold multiple of an unstackable item in a single slot in your inventory. This allows similar benefits to noted items, however items in a bag can be withdrawn and deposited without going to a bank, letting you hold many items in your inventory at once.\n\n' +
    'Bags can be crafted through sewing multiple cloth together with thread and a drawstring. To create a tier 1 bag, you need three blue cloth, three threads, a needle and a drawstring. Additional cloth can be sewn onto the bag to provide additional storage capacity.',
}, {
    id: 38,
    title: '<b>Kiaso</b>', // <What are Tomes of Collection?>
    message: 'A <note>Tome of Collection</note> is a item that will automatically collect other items dropped by enemies you slay. This allows you to pick up many unstackable items while in combat, even if you are not present to pick them up yourself.\n\n' +
    'Each Tome of Collection collects a single type of item, randomly chosen upon creation. Rumor has it, <note>The Mysterious Man</note> in Hyrill has the ability to redirect the energy of the tome, letting it collect a different item.',
},
{
    id: 39,
    title: '<b>Osaik</b>',
    message: 'You don\'t expect me to eat a burnt shrimp, do you?...\n\n' +
    'Try again until you get me one that isn\'t burnt.',
},
{
    id: 40,
    title: '<b>Osaik</b>',
    message: 'Before you go, I can\'t let you leave here without the proper gear. There are dangerous creatures around, you must be adequately protected if you choose to wander off the beaten path.\n\n' +

    '<note>[Osaik gives you a set of copper armor]</note>\n\n' +

    'People in Eloria make money through various professions. If slaying monsters is not you\'re thing, you might prefer woodcutting or mining among other professions.\n' +
    'You will want to get yourself some more tools. Just south of here is Fiewon, you can buy whatever you need at the General Store.\n\n' + 
    
    '<note>[Osaik gives you a lot of coins]</note>\n\n' +

    'If you ever need assistance, please ask me. I am eager to help!',
    continueSteps: [[
        buildStep(StepType.SHOW_DIRECTION_ARROW, {params: [-1]}),
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.SET_CHARACTER_STATE, {params: [4, 0]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [13, 1]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [21, 1]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [42, 1]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [29, 1]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [0, 100]}),
    ]],
},
{
    id: 41,
    title: '<b>Child Goblin</b>',
    message: 'mean bull go! No nice, hurt me! go!\n' +
    'help me make bull go away\n\n' +

    'get me brown knife and brown helmet i give you squiggly lines no understand\n\n' +

    '<note>Child Goblin has requested a Copper Dagger and Copper Helmet</note>',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.ASSERT_GOAL_STATES, {params: [0, [0], ['EQUALS']]}),
        buildStep(StepType.SET_USER_GOAL_STATE, {params: [0, [1]]}),
    ]],
},
{
    id: 42,
    title: '<b>Child Goblin</b>',
    message: 'ouuuu knife stabby stabby!\n\n' + 

    '<note>Child Goblin takes the Copper Dagger and Copper Helmet</note>\n\n' +
    
    'bull go byebye',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.ASSERT_GOAL_STATES, {params: [0, [1], ['EQUALS']]}),
        buildStep(StepType.SET_USER_GOAL_STATE, {params: [0, [2]]}),
        buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [13, 1]}),
        buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [21, 1]}),
        buildStep(StepType.MAKE_CLOSEST_NPC_ATTACK_CLOSEST_NPC, {params: [76, 77]}),
    ]],
},
{
    id: 43,
    title: '<b>Child Goblin</b>',
    message: 'thank you!\n' +
    'mean bull no more...\n\n' +
    
    'here squiggly no understand you have\n\n' +

    '<note>Child Goblin has given you a 3x3 Item Pickup Scroll</note>',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.ASSERT_GOAL_STATES, {params: [0, [2], ['EQUALS']]}),
        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [727, 1]}), // 3x3 Item Pickup Scroll
        buildStep(StepType.SET_USER_GOAL_STATE, {params: [0, [3]]}),
        buildStep(StepType.SHOW_DIALOG, {params: [46]})
    ]],
},
{
    id: 44,
    title: '<b>Child Goblin</b>',
    message: 'bull came back!\n' +
    'killing bull fun!',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.MAKE_CLOSEST_NPC_ATTACK_CLOSEST_NPC, {params: [76, 77]}),
    ]],
},
{
    id: 45,
    title: '<b>Child Goblin</b>',
    message: 'where brown knife and helmet?\n\n' +

    'get me stabby so bull go away forever.\n\n' +
    
    '<note>Child Goblin has requested a Copper Dagger and Copper Helmet</note>',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
    ]],
},
{
    id: 46,
    title: '<b>Child Goblin</b>',
    message: 'bye bye!\n',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
    ]],
},
{
    id: 47, // Default cat pet dialog
    title: '<b>Cat</b>',
    message: 'Meow!\n',
    continueSteps: [[buildStep(StepType.SHOW_DEFAULT_INTERFACES)]],
},
{
    id: 48, // Billys 'pet' dialog
    title: '<b>Billy</b>',
    message: 'Meow!\n\n<note>Billy begins to purr</note>',
    continueSteps: [[buildStep(StepType.SHOW_DEFAULT_INTERFACES),]],
},
{
    id: 49, // Vixens 'pet' dialog
    title: '<b>Vixen</b>',
    message: 'Purr! <3\n\n<note>Vixen looks happy</note>',
    continueSteps: [[buildStep(StepType.SHOW_DEFAULT_INTERFACES),]],
},
{
    id: 50, 
    title: '<b>Chicken Supreme Recipe</b>',
    message: '<b>Ingredients</b>\n' +
             '* Raw Chicken\n' +
             '* Herbs\n\n' +
             
             '<b>Steps</b>\n' +
             '* Pick Herbs from the <note>Herb Farmer</b>. Follow the river bank.\n' +
             '* Turn Herbs into Buckets of Refined Herbs\n' +
             '* Get Raw Chicken by killing a Chicken from a farm. There are farms east of the river.\n' +
             '* Cook Raw Chicken into Chicken\n' +
             '* Season Chicken with Buckets of Refined Herbs',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
    ]],
},
{
    id: 51, 
    title: '<b>Gourmet Tuna Recipe</b>',
    message: '<b>Ingredients</b>\n' +
             '* Raw Freshwater Tuna\n' +
             '* Herbs\n\n' +
             
             '<b>Steps</b>\n' +
             '* Pick Herbs from the <note>Herb Farmer</b>. Follow the river bank.\n' +
             '* Turn Herbs into Buckets of Refined Herbs\n' +
             '* Fish Raw Freshwater Tuna from <note>Freshwater Freddy</b>\'s backyard. He lives east of the Woodcutting Guild.\n' +
             '* Cook Raw Freshwater Tuna into Freshwater Tuna\n' +
             '* Season Freshwater Tuna with Buckets of Refined Herbs',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
    ]],
},
{
    id: 52, 
    title: '<b>Vio\'s Plaque</b>',
    message: '<b>Vio</b>\n\n' +
             'Home Sweet Home',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
    ]],
},
{
    id: 53, 
    title: '<b>Billy</b>',
    message: '<note>You observe Billy wandering around. He appears safe and gentle.</note>\n\n' + 
    
              '<i>I wonder what treats he likes.</i>',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
    ]],
},
{
    id: 54, 
    title: '<b>Billy</b>',
    message: '<note>You notice Billy playing with a small rock.</note>\n\n' + 
    
             '<i>He looks bored. I should finish making his Chicken Surpeme.</i>',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
    ]],
},
{
    id: 55, 
    title: '<b>Billy</b>',
    message: 'Meow!\n\n' +
    
             '<note>You give Billy the Chicken Supreme</note>\n\n' +
             
             '<i>He seems to love the stuff!</i>' ,
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.ASSERT_GOAL_STATES, {
            params: [1, [3, 3], ['EQUALS', 'EQUALS'] ],
            stepResultPass: 'NEXT_STEP',
            stepResultFail: 'NEXT_STEP_LIST',
        }),
        buildStep(StepType.SHOW_DIALOG, {
            params: [56], // Quest-complete dialog
            stepResultPass: 'END_ACTION',
            stepResultFail: 'END_ACTION',
        })
    ]],
},
{
    id: 56, 
    title: '<b>Billy & Vixen\'s Quest Complete</b>',
    message: 'You have successfully fed <note>Billy</note> and <note>Vixen</note> their favorite meals!\n\n' +
             
             '<note>You have been awarded 5,000 fishing experience</note>\n' + 
             '<note>You have been awarded 10,000 cooking experience</note>\n',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.ASSERT_GOAL_STATES, {
            params: [1, [3, 3], ['EQUALS', 'EQUALS'] ],
            stepResultFail: 'END_ACTION',
        }),
        buildStep(StepType.GIVE_XP, { params: [12, 5000] }),
        buildStep(StepType.GIVE_XP, { params: [13, 10000] }),
        buildStep(StepType.SET_USER_GOAL_STATE, { params: [1, [4, 4]] })
    ]],
},
{
    id: 57, 
    title: '<b>Vixen</b>',
    message: '<note>You observe Vixen playing in the grass. She appears to be a sweet kitty.</note>\n\n' + 
    
             '<i>I wonder what treats she likes.</i>',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
    ]],
},
{
    id: 58, 
    title: '<b>Vixen</b>',
    message: '<note>You notice Vixen watching the ants crawl by.</note>\n\n' + 
    
             '<i>She looks unamused. I should finish making her Gourmet Tuna.</i>',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
    ]],
},
{
    id: 59, 
    title: '<b>Vixen</b>',
    message: 'Meeooowwww\n\n' +
    
            '<note>You give Vixen the Gourmet Tuna</note>\n\n' +
            
            '<i>Looks like she loves it! I\'ve never seen such a happy kitty!</i>',
    continueSteps: [[
        buildStep(StepType.SHOW_DEFAULT_INTERFACES),
        buildStep(StepType.ASSERT_GOAL_STATES, {
            params: [1, [3, 3], ['EQUALS', 'EQUALS'] ],
            stepResultPass: 'NEXT_STEP',
            stepResultFail: 'NEXT_STEP_LIST',
        }),
        buildStep(StepType.SHOW_DIALOG, {
            params: [56], // Quest-complete dialog
            stepResultPass: 'END_ACTION',
            stepResultFail: 'END_ACTION',
        })
    ]],
},]);

module.exports.Dialogs = Dialogs;