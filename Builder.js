class CharacterBuilder {
    CharacterBuilder(id, name, modelName) {
        this.id = id
        this.name = name
        this.modelName = modelName
        this.equipmentModel = [null, null, null, null, null]
        this.spriteIndex = 0 // deprecated?
        this.animations = [] // deprecated?
    }

    

    overOverride(modelOverrideName) {
        this.modelOverrideName = modelOverrideName;
    }

    guildType(entityGuildType) {
        this.entityGuildType = entityGuildType;
    }

    skillLevels(stats) {
        this.stats = stats;
    }

    actionListLists(actionsLists) {
        this.actions = actionsLists;
    }

    useActionsList(useActions) {
        this.useActions = useActions;
    }

    itemDropTables(drops) {
        this.drops = drops;
    }

    setIsGuard(guildTypeGuarded) {
        this.isGuard = true;
        this.guildType(guildTypeGuarded);
    }

    onStartHook(loop) {
        this.behaviorLoop = loop;
    }

    modelParameters(modelParams) {
        this.modelParams = modelParams;
    }

    onSet(func) {
        if (func) {
            func(this);
        }
    }

    toJSON() {
        return {
            id : this.id,
            name : this.name,
            modelName : this.modelName,
            spriteIndex : this.spriteIndex,
            animations : this.animations,
            equipmentModel : this.equipmentModel,

            stats : this.stats,
            actions : this.animations,
            behaviorLoop : this.behaviorLoop,
            combatStyle : this.combatStyle,
            attackRange : this.attackRange,
            modelParams : this.modelParams,
            entityGuildType : this.entityGuildType,
            modelOverrideName : this.modelOverrideName
        };
    }
}

module.exports.CharacterBuilder = CharacterBuilder;
