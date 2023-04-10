export const postalCodeFormatter = (postalCodeCleanedValue: string) => {
    const postalCodeBlocksArray = [postalCodeCleanedValue.slice(0,2), postalCodeCleanedValue.slice(2,5), postalCodeCleanedValue.slice(5)]
    
      if(postalCodeBlocksArray[1].length >= 1) postalCodeBlocksArray[1] = '.' + postalCodeBlocksArray[1] 
      if(postalCodeBlocksArray[2].length >= 1) postalCodeBlocksArray[2] = '-' + postalCodeBlocksArray[2]
    return postalCodeBlocksArray.join('');
 }

 export const cellphoneFormatter = (cellphoneNumber: string) => {
    const cleanedValue = cellphoneNumber.replace(/[^\d]/g, '');
    const cellphoneBlocksArray = [cleanedValue.slice(0,2), cleanedValue.slice(2,3), cleanedValue.slice(3,7), cleanedValue.slice(7)]

    if(cellphoneBlocksArray[0].length >= 1) cellphoneBlocksArray[0] = '(' + cellphoneBlocksArray[0]
    if(cellphoneBlocksArray[1].length >= 1) cellphoneBlocksArray[1] =  ') ' + cellphoneBlocksArray[1]
    if(cellphoneBlocksArray[2].length >= 1) cellphoneBlocksArray[2] =  ' ' + cellphoneBlocksArray[2]
    if(cellphoneBlocksArray[3].length >= 1) cellphoneBlocksArray[3] =  '-' + cellphoneBlocksArray[3]

    return cellphoneBlocksArray.join('');
 }

 export const cpfFormatter = (cpfNumber: string) => {
    const cleanedValue = cpfNumber.replace(/[^\d]/g, '');
    const cpfBlocksArray = [cleanedValue.slice(0,3), cleanedValue.slice(3,6), cleanedValue.slice(6,9), cleanedValue.slice(9)]
    
    for(let i = 1; i < 3; i++){
      if(cpfBlocksArray[i].length >= 1) cpfBlocksArray[i] = '.' + cpfBlocksArray[i] 
     }
     if(cpfBlocksArray[3].length >= 1) cpfBlocksArray[3] = '-' + cpfBlocksArray[3]
    return cpfBlocksArray.join('');
 }