/* eslint-disable no-unused-expressions */
/* eslint-disable no-tabs */
import { expect } from 'chai';

import inputValidation from '../../Server/helpers/inputValidation';

describe('Email Validation', () => {
	const validEmail = inputValidation.validateEmail('nwodochristian@gmail.com');
	const invalidEmail = inputValidation.validateEmail('nwodochristiangmail.com');
	it('should return true', () => {
		expect(validEmail).to.be.true;
	});
	it('should return false', () => {
		expect(invalidEmail).to.be.false;
	});
});

describe('Password validation', () => {
	const validPassword = inputValidation.validatePassword('hdjksiejsh65');
	const invalidPassword = inputValidation.validatePassword('djh');
	it('valid passowrd should return true', () => {
		expect(validPassword).to.be.true;
	});
	it('invalid password should return false', () => {
		expect(invalidPassword).to.be.false;
	});
});

describe('Phone number validation', () => {
	const validPhone = inputValidation.validatePhone('08056985458');
	const invalidPhone = inputValidation.validatePassword('54824');
	it('valid phone number should return true', () => {
		expect(validPhone).to.be.true;
	});
	it('invalid phone number should return false', () => {
		expect(invalidPhone).to.be.false;
	});
});
describe('First Name', () => {
	const validName = inputValidation.validateFirstName('Emeka');
	const invalidName = inputValidation.validateFirstName('a');
	it('Valid first name should return true', () => {
		expect(validName).to.be.true;
	});
	it('invalid first name should return false', () => {
		expect(invalidName).to.be.false;
	});
});

describe('Last Name', () => {
	const validName = inputValidation.validateFirstName('Nwodo');
	const invalidName = inputValidation.validateFirstName('a');
	it('Valid last name should return true', () => {
		expect(validName).to.be.true;
	});
	it('invalid last name should return false', () => {
		expect(invalidName).to.be.false;
	});
});

describe('Address', () => {
	const validAddress = inputValidation.validateAddress('no 3 Maxwells street');
	const invalidAddress = inputValidation.validateAddress('no 3');
	it('Valid address should return true', () => {
		expect(validAddress).to.be.true;
	});
	it('invalid address should return false', () => {
		expect(invalidAddress).to.be.false;
	});
});

describe('Admin Type', () => {
	const validAdminType = inputValidation.validateAdmin(false);
	const invalidAdminType = inputValidation.validateAdmin('no');
	it('Valid admin type should return true', () => {
		expect(validAdminType).to.be.true;
	});
	it('invalid admin type should return false', () => {
		expect(invalidAdminType).to.be.false;
	});
});

describe('Property Status', () => {
	const emptyStatus = inputValidation.validateSatus('');
	const validPropertyStatus = inputValidation.validateSatus('sold');
	const invalidPropertyStatus = inputValidation.validateSatus('how far');
	it('Empty property status should return available as default', () => {
		expect(emptyStatus).to.equal('available');
	});
	it('Valid property status should return status', () => {
		expect(validPropertyStatus).to.equal('sold');
	});
	it('invalid property status should return false', () => {
		expect(invalidPropertyStatus).to.be.false;
	});
});

describe('Price validation', () => {
	const validPice = inputValidation.validatePrice(2587);
	const invalidPice = inputValidation.validatePrice('gjjjkf');
	it('Valid price should return true', () => {
		expect(validPice).to.be.true;
	});
	it('invalid price should return false', () => {
		expect(invalidPice).to.be.false;
	});
});

describe('State validation', () => {
	const validState = inputValidation.validateState('Enugu');
	const invalidState = inputValidation.validateState(8542);
	it('Valid state should return true', () => {
		expect(validState).to.be.true;
	});
	it('invalid state should return false', () => {
		expect(invalidState).to.be.false;
	});
});

describe('City validation', () => {
	const validCity = inputValidation.validateCity('Nsukka');
	const invalidCity = inputValidation.validateCity(8542);
	it('Valid city should return true', () => {
		expect(validCity).to.be.true;
	});
	it('invalid city should return false', () => {
		expect(invalidCity).to.be.false;
	});
});

describe('Type validation', () => {
	const validType = inputValidation.validateType('2 Bedroom flat');
	const invalidType = inputValidation.validateType('bedroom');
	it('valid type should return true', () => {
		expect(validType).to.be.true;
	});
	it('invalid type should return false', () => {
		expect(invalidType).to.be.false;
	});
});

describe('Image validation', () => {
	const req = {
		file: true,
		size: '200kb',
		file_type: 'png',
		file_name: 'my_duplex',
		file_path: 'C:/Users/user/Desktop',
	};
	const result = inputValidation.validateImageUrl(req);
	it('valid image should return true', () => {
		expect(result).to.be.true;
	});
});
