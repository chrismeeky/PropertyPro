/* eslint-disable no-tabs */

/* this function will patch the first parameter using the second */
/**
 * 
 * @param {object} object1 [target object]
 * @param {object} object2 [source object]
 */
const patchObject = (object1, object2) => {
	const target = object1;
	const source = object2;
	const targetKeys = Object.keys(target);
	const sourceKeys = Object.keys(source);
	for (let index = 0; index < sourceKeys.length; index += 1) {
		if (targetKeys.indexOf(sourceKeys[index]) > -1) {
			target[sourceKeys[index]] = source[sourceKeys[index]];
		}
	}
};
export default patchObject;

