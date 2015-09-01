'use strict';

// dependencies.
var crypto = require('crypto');
var stringUtilities = require('dh-node-utilities').StringUtils;
var _ = require('underscore');

// encryption and decryption params.
var password = null;
var iv = null;
var algorithm = null;

/**
 * Configures the module.
 * @param algorithm
 * @param password
 * @param iv
 */
exports.configure = function(alg, pw, ivKey) {
  // save the params.
  algorithm = alg;
  password = pw;
  iv = ivKey;

  // check if all params are set.
  if (isConfigured()) {
    // build the cipher and decipher.
    var testCipher = crypto.createCipheriv(alg, new Buffer(pw, 'binary'), new Buffer(ivKey, 'binary'));
    var testDecipher = crypto.createDecipheriv(alg, new Buffer(pw, 'binary'), new Buffer(ivKey, 'binary'));
    return true;
  }
  else {
    return false;
  }
};

/**
 * Encrypts a text value.
 * @param value
 * @param callback
 * @returns {*}
 */
exports.encrypt = function (value) {
  if (_.isUndefined(value) || _.isNull(value)) {
    return null;
  }

  var cipher = crypto.createCipheriv(algorithm, new Buffer(password, 'binary'), new Buffer(iv, 'binary'));
  var encryptedValue = cipher.update(value, 'utf-8', 'hex');
  encryptedValue += cipher.final('hex');
  return encryptedValue;
};

/**
 * Decrypts a text value.
 * @param encryptedValue
 * @param callback
 * @returns {*}
 */
exports.decrypt = function (encryptedValue) {
  if (_.isUndefined(encryptedValue) || _.isNull(encryptedValue)) {
    return null;
  }

  var decipher = crypto.createDecipheriv(algorithm, new Buffer(password, 'binary'), new Buffer(iv, 'binary'));
  var value = decipher.update(encryptedValue, 'hex', 'utf-8');
  value += decipher.final('utf-8');
  return value;
};

/**
 * Checks if all the params are set.
 * @returns {boolean}
 */
function isConfigured() {
  if (stringUtilities.isEmpty(algorithm) || stringUtilities.isEmpty(iv) || stringUtilities.isEmpty(password)) {
    return false;
  }

  return true;
}