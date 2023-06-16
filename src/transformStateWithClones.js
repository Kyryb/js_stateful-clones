'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];
  const currentState = Object.assign({}, state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;
      case 'clear':
        clearObject(currentState);
        break;
      case 'removeProperties':
        removeProperties(currentState, keysToRemove);
        break;
      default:
        return 'Uknown action was found';
    }

    statesArray.push({ ...currentState });
  }

  return statesArray;
}

function clearObject(target) {
  for (const key in target) {
    delete target[key];
  }
}

function removeProperties(target, properties) {
  for (const key of properties) {
    delete target[key];
  }
}

module.exports = transformStateWithClones;
