/**
 * 
 * @param {array} data [array containing property objects]
 */
const refineData = (data) => {
	const properties = data;
	properties.forEach((property) => {
		const prop = property;
		prop.price = parseFloat(prop.price)
	});
	return properties;
}
export default refineData;