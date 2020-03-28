
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
};
module.exports.TestType = TestType;

const TestIncinerateAllItems = require('../internal/Tests/TestIncinerateAllItems');
const TestKillAlphaWolf = require('../internal/Tests/TestKillAlphaWolf');
const TestMineCopperOre = require('../internal/Tests/TestMineCopperOre');

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
    }
};

const TestTypeKeys = Object.keys(TestType);

module.exports.BuildTestFromExecutionString = BuildTestFromExecutionString = (executeString, userDef, advDef) => {
    for (let i = 0, le = TestTypeKeys.length; i < le; ++i) {
        if (TestType[TestTypeKeys[i]].executeString == executeString) {
            return this.TestTypeClassDictionary[TestTypeKeys[i]].build([userDef, advDef]);
        }
    }
    console.warn('Unable to run test ' + executeString);
}