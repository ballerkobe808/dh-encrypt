'use strict';

// dependencies.
const crypto = require('crypto');
const _ = require('lodash');

// params.
let algorithm = null;
let pwBuffer = null;
let ivKeyBuffer = null;
let isConfigured = false;

// logger. Defaults to console.
let logger = console;

/**
 * Configures the module.
 * @param options - The options object.
 */
exports.configure = (options) => {
  // save the algorithm.
  if (_.has(options, 'algorithm')) {
    algorithm = options.algorithm;
  }

  // save the password as a buffer.
  if (_.has(options, 'password')) {
    pwBuffer = Buffer.from(options.password, 'binary');
  }

  // save the ivKey as a buffer.
  if (_.has(options, 'ivKey')) {
    ivKeyBuffer = Buffer.from(options.ivKey, 'binary');
  }

  // save the logger reference.
  if (_.has(options, 'logger')) {
    logger = options.logger;
  }

  // set is configured if the params are set correctly.
  if (pwBuffer && ivKeyBuffer && algorithm) {
    isConfigured = true;
  }
  else {
    logger.error('Failed to configure the encryption module.');
  }
};

/**
 * Encrypts a text value.
 * @param value - The value to encrypt.
 */
exports.encrypt = (value) => {
  // dont encrypt if a null value was passed or the module is not configured.
  if (_.isUndefined(value) || _.isNull(value) || !isConfigured) {
    return null;
  }

  // create the cipher.
  try {
    let cipher = crypto.createCipheriv(algorithm, pwBuffer, ivKeyBuffer);
    // encrypt the value.
    let encryptedValue = cipher.update(value, 'utf-8', 'hex');
    encryptedValue += cipher.final('hex');

    // return the value.
    return encryptedValue;
  }
  catch (ex) {
    logger.error(ex);
    return null;
  }
};

/**
 * Decrypts a text value.
 * @param encryptedValue - The encrypted value to decrypt.
 */
exports.decrypt = (encryptedValue) => {
  // if the value is null or the module is not configured.
  if (_.isUndefined(encryptedValue) || _.isNull(encryptedValue) || !isConfigured) {
    return null;
  }

  try {
    // create the decipher.
    let decipher = crypto.createDecipheriv(algorithm, pwBuffer, ivKeyBuffer);

    // decrypt the value.
    let value = decipher.update(encryptedValue, 'hex', 'utf-8');
    value += decipher.final('utf-8');

    // return the value.
    return value;
  }
  catch (ex) {
    logger.error(ex);
    return null;
  }
};
