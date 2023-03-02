// function returnMessage (messageText) {
//     return { "Server message" : messageText };
// };

// function testInputValidity (receivedInputs, requiredInputKeys) {
//     if (Object.entries(receivedInputs).length > requiredInputKeys.length) {
//         return "Too much input entries";
//     }
//     const missingInputKeys = [];
//     requiredInputKeys.forEach( requiredKey => {
//         if ( (requiredKey in receivedInputs) && (!receivedInputs.requiredKey) ) return
//         else missingInputKeys.push(requiredKey);
//     });
//     if (missingInputKeys.length) return missingInputKeys.join(", ");    
//     return null;
// };

// module.exports = { returnMessage, testInputValidity };