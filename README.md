Configure
================

Require and configure the module:
---------------------------------

    const dhEncrypt = require('dh-encrypt');
    dhEncrypt.configure({
      algorithm: String, // Required
      password: String, // Required
      ivKey: String, // Required
      logger: Object // Optional logger reference for custom logging. Defaults to console.
    });

Use
----

1) Encrypt a value:

        dhEncrypt.encrypt('string');
    
2) Decrypt a value: 

        dhEncrypt.decrypt('encrypted string');
    
## Example:

    let encryptedText = dhEncrypt.encrypt('test');
    console.log(dhEncrypt.decrypt(encryptedText));
    
    Prints:
    
    test
