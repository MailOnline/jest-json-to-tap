/* eslint-disable promise/prefer-await-to-callbacks, callback-return */
/* NOTE: The original logic of this class comes from https://github.com/samcday/node-stream-buffer/blob/master/lib/writable_streambuffer.js */
const {Writable} = require('stream');

const DEFAULT_INITIAL_SIZE = 8 * 1024;
const DEFAULT_INCREMENT_AMOUNT = 8 * 1024;

const dataSize = Symbol('size');
const dataBuffer = Symbol('buffer');
const incrementAmount = Symbol('incrementAmount');

class WritableStreamBuffer extends Writable {
  constructor (opts = {}) {
    super(opts);

    this[dataBuffer] = Buffer.alloc(opts.initialSize || DEFAULT_INITIAL_SIZE);
    this[dataSize] = 0;
    this[incrementAmount] = opts.incrementAmount || DEFAULT_INCREMENT_AMOUNT;
  }

  size () {
    return this[dataSize];
  }

  maxSize () {
    return this[dataBuffer].length;
  }

  increaseBufferIfNecessary (incomingDataSize) {
    const buffer = this[dataBuffer];
    const size = this[dataSize];
    const increment = this[incrementAmount];

    if (buffer.length - size < incomingDataSize) {
      const factor = Math.ceil((incomingDataSize - (buffer.length - size)) / increment);
      const newBuffer = Buffer.alloc(buffer.length + increment * factor);

      buffer.copy(newBuffer, 0, 0);
      this[dataBuffer] = newBuffer;
    }
  }

  _write (chunk, encoding, callback) {
    try {
      this.increaseBufferIfNecessary(chunk.length);

      const buffer = this[dataBuffer];
      const size = this[dataSize];

      chunk.copy(buffer, size, 0);
      this[dataSize] += chunk.length;
      callback();
    } catch (error) {
      callback(error);
    }
  }

  getContentsAsString (encoding) {
    const buffer = this[dataBuffer];
    const size = this[dataSize];
    const data = buffer.toString(encoding || 'utf8', 0, size);
    const dataLength = Buffer.byteLength(data);

    if (dataLength < size) {
      buffer.copy(buffer, 0, dataLength);
    }

    this[dataSize] -= dataLength;

    return data;
  }
}

WritableStreamBuffer.DEFAULT_INITIAL_SIZE = DEFAULT_INITIAL_SIZE;
WritableStreamBuffer.DEFAULT_INCREMENT_AMOUNT = DEFAULT_INCREMENT_AMOUNT;
module.exports = WritableStreamBuffer;

