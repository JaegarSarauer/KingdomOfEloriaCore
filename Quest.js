const QuestType = {
    QUEST: 0, 
    ACHIEVEMENT: 1,
};

const QuestCompleteState = {
    NOT_STARTED: 0,
    STARTED: 1,
    COMPLETE: 2,
};


let createTask = function(text, startingState, currentState) {
    if (startingState <= currentState && startingState != null && currentState != null) {
        let color = ( startingState == currentState ) ? 'yellow' : 'grn';
        return '<' + color + '>' + text + '</' + color + '>\n';
    }
    return '';
}

let createStartingTask = function(text, startingState, currentState) {
    if (startingState != null && currentState != null) {
        let color = (currentState <= startingState ) ? 'red' : 'grn';
        return '<' + color + '>' + text + '</' + color + '>\n';
    }
    return '';
}

let createDetailTask = function(text, startingState, currentState) {
    if (startingState != null && currentState != null && startingState == currentState && text != null) {
        return text + '\n';
    }
    return '';
}

let createOrderedTaskList = function(tasks, currentState, detailArray = []) {
    let text = '';
    if (tasks.length > 0) {
        text += createStartingTask(tasks[0], 0, currentState);
        text += createDetailTask(detailArray[0], 0, currentState);
        for(let i = 1; i < tasks.length; ++i) {
            text += createTask(tasks[i], i, currentState);
            if (i < detailArray.length) {
                text += createDetailTask(detailArray[i], i, currentState);
            }
        }
    }
    return text;
}

const Quests = [{
    id: 0,
    name: 'A Cow Murder',
    defaultState: [0], // DialogState, isComplete
    updateState: (oldStateArray, newStateArray) => {
        return newStateArray;
    },
    getStateDescription: (stateArray) => createOrderedTaskList([
        'Speak to the Child Goblin. He can be found south of Cadgwith Ranch.',
        'Bring him a Copper Dagger and a Copper Helmet',
        'He went off to fight the Bull. Check up on him, see how it went.'
    ], stateArray[0], [
        '\nNo requirements!'
    ]),
    getQuestCompleteState: (stateArray) => {
        return (stateArray[0] == 0 ? QuestCompleteState.NOT_STARTED : (stateArray[0] == 3 ? QuestCompleteState.COMPLETE : QuestCompleteState.STARTED));
    }
},{
    id: 1,
    name: 'Billy & Vixen\'s Meals',
    defaultState: [0, 0], // ReadBillyRecipe, ReadVixensRecipe
    updateState: (oldStateArray, newStateArray) => {
        return newStateArray;
    },
    getStateDescription: (stateArray) => {
        let text1 = '';
        text1 += '<b>Billy</b>\n';
        text1 += createOrderedTaskList([
            'Read Billy\'s Chicken Supreme Recipe',
            'Prepare Billy\'s Chicken Supreme Recipe',
            'Feed Billy the meal'
        ], stateArray[0]);

        let text2 = '';
        text2 += '<b>Vixen</b>\n';
        text2 += createOrderedTaskList([
            'Read Vixen\'s Gourmet Tuna Recipe',
            'Prepare Vixen\'s Gourmet Tuna Recipe',
            'Feed Vixen the meal'
        ], stateArray[1]);

        let reqText = createDetailTask('\nRequires 5 cooking & 5 fishing.', 0, Math.max(stateArray[0], stateArray[1]));
        
        return text1 + '\n' + text2 + reqText;
    },
    getQuestCompleteState: (stateArray) => {
        if (stateArray[0] == 0 && stateArray[1] == 0) {
            return QuestCompleteState.NOT_STARTED;
        }
        else if (stateArray[0] >= 3 && stateArray[1] >= 3) {
            return QuestCompleteState.COMPLETE;
        }
        else {
            return QuestCompleteState.STARTED;
        }
    }
},{
    id: 2,
    name: 'Mining Guild Exam',
    defaultState: [0], // Step in quest
    updateState: (oldStateArray, newStateArray) => {
        return newStateArray;
    },
    getStateDescription: (stateArray) => {
        let text1 = '';
        text1 += '<b>Tasks</b>\n';
        text1 += createOrderedTaskList([
            'Talk to Guide',
            'Begin Mining Guild Exam',
            'Grab a saw, 5 logs and two pickaxes',
            'Create a mining camp.',
            'Operate the camp and acquire copper ore.',
            'Speak to the guide and finish the exam.',
            'Donate items for guild initiation fee.',
        ], stateArray[0]);

        let reqText = createDetailTask('\nRequires 10 mining.', 0, stateArray[0]);
        
        return text1 + '\n' + text2 + reqText;
    },
    getQuestCompleteState: (stateArray) => {
        if (stateArray[0] == 0) {
            return QuestCompleteState.NOT_STARTED;
        }
        else if (stateArray[0] >= 7) {
            return QuestCompleteState.COMPLETE;
        }
        else {
            return QuestCompleteState.STARTED;
        }
    }
},{
    id: 3,
    name: 'Fishing Guild Exam',
    defaultState: [0], // Step in quest
    updateState: (oldStateArray, newStateArray) => {
        return newStateArray;
    },
    getStateDescription: (stateArray) => {
        let text1 = '';
        text1 += '<b>Tasks</b>\n';
        text1 += createOrderedTaskList([
            'Talk to Guide',
            'Begin Fishing Guild Exam',
            'Grab a saw, 5 logs and two fishing nets',
            'Create a fishing camp.',
            'Operate the camp and acquire raw shrimp.',
            'Speak to the guide and finish the exam.',
            'Donate items for guild initiation fee.',
        ], stateArray[0]);

        let reqText = createDetailTask('\nRequires 10 fishing.', 0, stateArray[0]);
        
        return text1 + '\n' + text2 + reqText;
    },
    getQuestCompleteState: (stateArray) => {
        if (stateArray[0] == 0) {
            return QuestCompleteState.NOT_STARTED;
        }
        else if (stateArray[0] >= 7) {
            return QuestCompleteState.COMPLETE;
        }
        else {
            return QuestCompleteState.STARTED;
        }
    }
},{
    id: 4,
    name: 'Woodcutting Guild Exam',
    defaultState: [0], // Step in quest
    updateState: (oldStateArray, newStateArray) => {
        return newStateArray;
    },
    getStateDescription: (stateArray) => {
        let text1 = '';
        text1 += '<b>Tasks</b>\n';
        text1 += createOrderedTaskList([
            'Talk to Guide',
            'Begin Woodcutting Guild Exam',
            'Grab a saw, 5 logs and two axes',
            'Create a woodcutting camp.',
            'Operate the camp and acquire logs.',
            'Speak to the guide and finish the exam.',
            'Donate items for guild initiation fee.',
        ], stateArray[0]);

        let reqText = createDetailTask('\nRequires 10 woodcutting.', 0, stateArray[0]);
        
        return text1 + '\n' + text2 + reqText;
    },
    getQuestCompleteState: (stateArray) => {
        if (stateArray[0] == 0) {
            return QuestCompleteState.NOT_STARTED;
        }
        else if (stateArray[0] >= 7) {
            return QuestCompleteState.COMPLETE;
        }
        else {
            return QuestCompleteState.STARTED;
        }
    }
}];

module.exports.QuestType = QuestType;
module.exports.QuestCompleteState = QuestCompleteState;
module.exports.Quests = Quests;