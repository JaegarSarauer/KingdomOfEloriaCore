const fs = require('jsonfile');

module.exports.TestResult = TestResult = {
    PASS: 0,
    WARNING: 1,
    FAIL: 2,
};

const TestType = {
    INCINERATE_ALL_ITEMS: {
        id: 'INCINERATE_ALL_ITEMS',
        executeString: 'incinerate',
        suiteString: 'release',
    },
    KILL_ALPHA_WOLF: {
        id: 'KILL_ALPHA_WOLF',
        executeString: 'kill_alpha_wolf',
        suiteString: '',
    },
    MINE_COPPER_ORE: {
        id: 'MINE_COPPER_ORE',
        executeString: 'mine_copper',
        suiteString: 'balance',
    },
    MINE_GEM_ROCK: {
        id: 'MINE_GEM_ROCK',
        executeString: 'mine_gem',
        suiteString: 'balance',
    },
    MINE_TO_MAX: {
        id: 'MINE_TO_MAX',
        executeString: 'mine_max',
        suiteString: 'balance',
    },
    CUT_BANKED_GEMS: {
        id: 'CUT_BANKED_GEMS',
        executeString: 'cut_gems',
        suiteString: 'balance',
    },
    WALK_RANDOM: {
        id: 'WALK_RANDOM',
        executeString: 'walk',
        suiteString: '',
    },
    SET_GUILD_TIERS: {
        id: 'SET_GUILD_TIERS',
        executeString: 'set_guild_tiers',
        suiteString: 'release',
    },
    GUILD_MANAGER_CYCLE: {
        id: 'GUILD_MANAGER_CYCLE',
        executeString: 'guild_manager_cycle',
        suiteString: 'release',
    },
};
module.exports.TestType = TestType;

const TestIncinerateAllItems = require('../internal/Tests/Functional/TestIncinerateAllItems');
const TestKillAlphaWolf = require('../internal/Tests/Functional/TestKillAlphaWolf');
const TestMineCopperOre = require('../internal/Tests/Functional/TestMineCopperOre');
const TestMineToMax = require('../internal/Tests/Functional/TestMineToMax');
const TestCutBankedGems = require('../internal/Tests/Functional/TestCutBankedGems');
const TestWalkRandom = require('../internal/Tests/Functional/TestWalkRandom');
const TestMineGemRock = require('../internal/Tests/Functional/TestMineGemRock');
const TestSetGuildTiers = require('../internal/Tests/Functional/TestSetGuildTiers');
const TestGuildManagerCycle = require('../internal/Tests/Functional/TestGuildManagerCycle');

module.exports.TestTypeClassDictionary = TestTypeClassDictionary = {
    INCINERATE_ALL_ITEMS: {
        build: (parameters) => {
            return new TestIncinerateAllItems.TestIncinerateAllItems(...parameters);
        },
    },
    KILL_ALPHA_WOLF: {
        build: (parameters) => {
            return new TestKillAlphaWolf.TestKillAlphaWolf(...parameters);
        },
    },
    MINE_COPPER_ORE: {
        build: (parameters) => {
            return new TestMineCopperOre.TestMineCopperOre(...parameters);
        },
    },
    MINE_GEM_ROCK: {
        build: (parameters) => {
            return new TestMineGemRock.TestMineGemRock(...parameters);
        },
    },
    SET_GUILD_TIERS: {
        build: (parameters) => {
            return new TestSetGuildTiers.TestSetGuildTiers(...parameters);
        },
    },
    GUILD_MANAGER_CYCLE: {
        build: (parameters) => {
            return new TestGuildManagerCycle.TestGuildManagerCycle(...parameters);
        },
    },
    MINE_TO_MAX: {
        build: (parameters) => {
            return new TestMineToMax.TestMineToMax(...parameters);
        },
    },
    CUT_BANKED_GEMS: {
        build: (parameters) => {
            return new TestCutBankedGems.TestCutBankedGems(...parameters);
        },
    },
    WALK_RANDOM: {
        build: (parameters) => {
            return new TestWalkRandom.TestWalkRandom(...parameters);
        },
    },
};

const TestTypeKeys = Object.keys(TestType);

const BuildTestFromExecutionString = (executeString, userDef, advDef) => {
    for (let i = 0, le = TestTypeKeys.length; i < le; ++i) {
        if (TestType[TestTypeKeys[i]].executeString == executeString) {
            return this.TestTypeClassDictionary[TestTypeKeys[i]].build([userDef, advDef]);
        }
    }
    console.warn('Unable to run test ' + executeString);
}

const RunTestSuite = (testSuiteString, userDef, advDef, callback) => {
    let testsToRun = [];
    for (let i = 0, le = TestTypeKeys.length; i < le; ++i) {
        if (TestType[TestTypeKeys[i]].suiteString == testSuiteString) {
            testsToRun.push(this.TestTypeClassDictionary[TestTypeKeys[i]].build([userDef, advDef]));
        }
    }
    if (testsToRun.length <= 0) {
        return;
    }
    let testIndex = 0;
    const performCallback = (result, message) => {
        switch(result) {
            case 0:
                break;
            case 1:
            case 2:
                return callback(!hasFailed);
        }
        if (testsToRun.length > testIndex) {
            testsToRun[testIndex++].perform(performCallback);
        } else {
            return callback(true);
        }
    };
    testsToRun[testIndex++].perform(performCallback);
}

const writeTestResults = (fileName, dataObj, callback = () => {}) => {
    fs.writeFile('./TestResults/' + fileName, dataObj, (res) => {
        callback(res);
    });
}
module.exports.writeTestResults = writeTestResults;
module.exports.BuildTestFromExecutionString = BuildTestFromExecutionString;
module.exports.RunTestSuite = RunTestSuite;