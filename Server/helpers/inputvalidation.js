/* eslint-disable no-plusplus */
/* eslint-disable no-tabs */
import users from '../db/users';

const validateEmail = (email) => {
	
	const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(email);
};
const validatePassword = (password) => {
	if (typeof password !== 'string') {
		return false;
	}
	return true;
};

const validatePhone = (phone) => {
	const myPhoneRegex = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i;
	return myPhoneRegex.test(phone);
};
const validateFirstName = (name) => {
	if (typeof name !== 'string') {
		return false;
	}
	return true;
};
const validateLastName = (name) => {
	if (typeof name !== 'string') {
		return false;
	}
	return true;
};
const validateAddress = (address) => {
	if (typeof address !== 'string') {
		return false;
	}
	return true;
};
const validateAdmin = (user) => {
	if (typeof user !== 'boolean' && user !== 'false' && user !== true) {
		return false;
	}
	return true;
};

const validateSatus = (status) => {
	if (typeof status !== 'string' || status === '') {
		return 'available';
	}
	if (status === 'available' || status === 'sold') {
		return status;
	}

	return false;
};
const validatePrice = (price) => {
	if (isNaN(price)) {
		return false;
	}

	return true;
};

const validateState = (state) => {
	if (typeof state !== 'string' || state.length < 4) {
		return false;
	}

	return true;
};
const validateCity = (city) => {
	if (typeof city !== 'string') {
		return false;
	}

	return true;
};
const validateType = (type) => {
	if (typeof type !== 'string' || type.length < 12) {
		return false;
	}

	return true;
};
const validateImageUrl = (req) => {
	if (!req.file) {
		return false;
	}

	return true;
};


export default {
	validateEmail,
	validatePassword,
	validatePhone,
	validateFirstName,
	validateLastName,
	validateAddress,
	validateAdmin,
	validateSatus,
	validatePrice,
	validateState,
	validateCity,
	validateType,
	validateImageUrl,


};
