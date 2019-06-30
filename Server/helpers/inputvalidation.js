const users = require('../db/users');
const properties = require('../db/properties');

const validateEmail = (email) => {
    for (let index = 0; index < users.length; index++) {
      if (users[index].email == email) {
           return false;
    }
  }
  
    
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    const  validatePassword = (password) => {
      const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
      return mediumRegex.test(password);
    }
  
    const  validatePhone = (phone) => {
      const myPhoneRegex = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i;
      return myPhoneRegex.test(phone);
    }
    const validateFirstName = (name) =>{
      if (typeof name !== 'string' || name.length < 2) {
        return false;
      }
      return true;
    }
    const validateLastName = (name) =>{
      if (typeof name !== 'string' || name.length < 2) {
        return false;
      }
      return true;
    }
    const validateAddress = (address) =>{
      if (typeof address !== 'string' || address.length < 10) {
        return false;
      }
      return true;
    }
    const validateAdmin = (user) =>{
      if (typeof user !== 'boolean' && user !== 'false' && user !== true) {
        return false;
     }
      return true;
    }

    const validateSatus = (status) => {
        if(typeof status !== 'string' || status === ''){
            return 'available';
        }
        else {
            return status;
        }
        }
        const validatePrice = (price) => {
            if(typeof parseFloat(price) !== 'number') {
                return false;
            }
            else{
                return true;
            }
              
        }
      
        const  validateState = (state) => {
          if(typeof state !== 'string'){
              return false;
          }
          else{
              return true;
          }
        }
        const  validateCity = (city) => {
          if(typeof city !== 'string'){
              return false;
          }
          else{
              return true;
          }
        }
        const  validateType = (type) => {
          if(typeof type !== 'string'){
              return false;
          }
          else{
              return true;
          }
        }
        const  validateImageUrl = (imgUrl) => {
          if(typeof imgUrl !== 'string' || imgUrl.length < 5){
              return false;
          }
          else{
              return true;
          }
        }
        
         const validateUniqueness = (imgUrl2) => {
            for(let index = 0; index < properties.length; index++){
              if (imgUrl2 === properties[index].image_url) {
                  return false;
              }
            }
            return true;
         };
         
module.exports = {
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
    validateUniqueness,


}