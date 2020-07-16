const fs = require('jsonfile');

module.exports.TestResult = TestResult = {
    PASS: 0,
    WARNING: 1,
    FAIL: 2,
};

const TestType = {
    INCINERATE_ALL_ITEMS: {
        id: 'INCINERATE_ALL_ITEMS',
        executeString: 'incinerate'
    },
    KILL_ALPHA_WOLF: {
        id: 'KILL_ALPHA_WOLF',
        executeString: 'kill_alpha_wolf'
    },
    MINE_COPPER_ORE: {
        id: 'MINE_COPPER_ORE',
        executeString: 'mine_copper'
    },
    MINE_GEM_ROCK: {
        id: 'MINE_GEM_ROCK',
        executeString: 'mine_gem'
    },
    MINE_TO_MAX: {
        id: 'MINE_TO_MAX',
        executeString: 'mine_max'
    },
    CUT_BANKED_GEMS: {
        id: 'CUT_BANKED_GEMS',
        executeString: 'cut_gems'
    },
    WALK_RANDOM: {
        id: 'WALK_RANDOM',
        executeString: 'walk'
    },
};
module.exports.TestType = TestType;

const TestIncinerateAllItems = require('../internal/Tests/TestIncinerateAllItems');
const TestKillAlphaWolf = require('../internal/Tests/TestKillAlphaWolf');
const TestMineCopperOre = require('../internal/Tests/TestMineCopperOre');
const TestMineToMax = require('../internal/Tests/TestMineToMax');
const TestCutBankedGems = require('../internal/Tests/TestCutBankedGems');
const TestWalkRandom = require('../internal/Tests/TestWalkRandom');
const TestMineGemRock = require('../internal/Tests/TestMineGemRock');

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

const writeTestResults = (fileName, dataObj, callback = () => {}) => {
    fs.writeFile('./TestResults/' + fileName, dataObj, (res) => {
        callback(res);
    });
}
module.exports.writeTestResults = writeTestResults;
module.exports.BuildTestFromExecutionString = BuildTestFromExecutionString;