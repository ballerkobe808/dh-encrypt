Configure
================

#### Require and configure the module:

    var dhEncrypt = require('dh-encrypt');
    dhEncrypt.configure('<algorithm>', '<password>', 'iv');

Use
================

#### 1) Encrypt a value:

    dhEncrypt.encrypt('something');
    
#### 2) Decrypt a value: 

    dhEncrypt.decrypt('hexvalue');
    
#### Example:

    var encryptedText = dhEncrypt.encrypt('test');
    console.log(dhEncrypt.decrypt(encryptedText));
    
    Prints:
    
    test
    