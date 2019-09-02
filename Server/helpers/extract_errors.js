/* eslint-disable no-tabs */
/**
 * 
 * @param {object} errors [Joi errors]
 */
const extractErrors = (errors) => {
	const errorMessage = errors.details;
	let allMessage = '';
	errorMessage.forEach((err) => {
		allMessage += err.message + ', ';
	});
	return allMessage;
};
export default extractErrors;