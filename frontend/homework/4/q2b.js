// function codeString(input) {
function codeString(input) {

    // remove extra spaces
    const trimInput = input.trim();
  
    const codeMap = {
      'a': '4',
      'e': '3',
      'i': '1',
      'o': '0',
      's': '5'
    };
  
    // regex for specifing all the characters to be changed /g for global 
    return trimInput.replace(/[aeios]/g, match => codeMap[match]);
  }
  
  const code1 = codeString("javascript is cool ");
  const code2 = codeString("programming is fun");
  const code3 = codeString(" become a coder");
  
  console.log(code1);
  console.log(code2);
  console.log(code3);
  