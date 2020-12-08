const Recipes =  {
    Dough : () => {
        return  {
            name: 'Mix Dough',
            itemIdsRequired : [746, 750, 732],
            newItemIds:  [744, 744, 760], 
            xp : 10,
            levelRequirement : 4,
            iconItemId : 760,
        }
    },
    ChickenSupreme: () => {
        return {
            name: 'Prepare Chicken Supreme',
            itemIdsRequired : [740, 793],
            newItemIds:  [795, 744], 
            xp : 50,
            levelRequirement : 5,
            iconItemId : 795,
        };
    },
    GourmetTuna: () => {
        return {
            name: 'Gourmet Tuna',
            itemIdsRequired : [787, 793],
            newItemIds:  [797, 744], 
            xp : 50,
            levelRequirement : 5,
            iconItemId : 797,
        };
    },
    UncookedChickenPotPie : () => {
        return  {
            name: 'Prepare Chicken Pot Pie',
            itemIdsRequired : [761, 760, 740],
            newItemIds:  [769], 
            xp : 15,
            levelRequirement : 8,
            iconItemId : 769,
        }
    },
    UncookedMeatPie : () => {
        return  {
            name: 'Prepare Meat Pie',
            itemIdsRequired : [761, 760, 754],
            newItemIds:  [763], 
            xp : 20,
            levelRequirement : 10,
            iconItemId : 763,
        }
    },
    UncookedCake : () => {
        return  {
            name: 'Prepare Cake',
            itemIdsRequired : [761, 760, 732, 748],
            newItemIds:  [775, 744], 
            xp : 25,
            levelRequirement : 14,
            iconItemId : 775,
        }
    },
};

module.exports.Recipes = Recipes;