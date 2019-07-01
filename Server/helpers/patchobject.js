const patchObject = (object1, object2) =>{
    let targetKeys = Object.keys(object1);
    let sourceKeys = Object.keys(object2);
    for (let index = 0; index < sourceKeys.length; index++) {
        if(targetKeys.indexOf(sourceKeys[index]) > -1) {
            object1[sourceKeys[index]] = object2[sourceKeys[index]];
        }
        
    }
}
module.exports = patchObject;
