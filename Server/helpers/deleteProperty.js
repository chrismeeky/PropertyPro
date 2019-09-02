/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-tabs */
/**
 * 
 * @param {array} properties [all properties]
 * @param {integer} id [property id]
 * @param {object} res [response]
 */
const deleteProperty = (properties, id, res) => {
	let propertyIndex;
	properties.map((result, index) => {
		if (result.id === parseInt(id, 10)) {
			propertyIndex = index;
			properties.splice(propertyIndex, 1);
			return res.status(200).json({
				status: 'success',
				data: {
					message: `property with an id: ${id} has been deleted successfully`,
				},
			});
		}
	});
};

export default deleteProperty;
