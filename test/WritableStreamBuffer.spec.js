const WritableStreamBuffer = require('../src/WritableStreamBuffer');

const simpleString = 'This is a String!';
const binaryData = (() => {
  const data = Buffer.alloc(64);

  for (let idx = 0; idx < data.length; idx++) {
    data[idx] = idx;
  }

  return data;
})();

const largeBinaryData = () => {
  const data = Buffer.alloc(WritableStreamBuffer.DEFAULT_INITIAL_SIZE + 1, 'a');

  return data;
};

describe('WritableStreamBuffer', () => {
  let buffer;

  beforeEach(() => {
    buffer = new WritableStreamBuffer();
  });

  it('returns an empty string on call to getContentsAsString() when empty', () => {
    expect(buffer.getContentsAsString()).toBe('');
  });

  describe('when writing a simple string', () => {
    beforeEach(() => {
      buffer.write(simpleString);
    });

    it('should have a backing buffer of correct length', () => {
      expect(buffer.size()).toBe(simpleString.length);
    });

    it('should have a default max size', () => {
      expect(buffer.maxSize()).toBe(WritableStreamBuffer.DEFAULT_INITIAL_SIZE);
    });

    it('contents should be correct', () => {
      expect(buffer.getContentsAsString()).toEqual(simpleString);
    });
  });

  describe('when writing a large binary blob', () => {
    beforeEach(() => {
      buffer.write(largeBinaryData());
    });

    it('should have a backing buffer of correct length', () => {
      expect(buffer.size()).toEqual(largeBinaryData().length);
    });

    it('should have a larger backing buffer max size', () => {
      expect(buffer.maxSize()).toEqual(WritableStreamBuffer.DEFAULT_INITIAL_SIZE + WritableStreamBuffer.DEFAULT_INCREMENT_AMOUNT);
    });

    it('contents are valid', () => {
      expect(buffer.getContentsAsString()).toBe(largeBinaryData().toString());
    });
  });

  describe('with a different initial size and increment amount', () => {
    beforeEach(() => {
      buffer = new WritableStreamBuffer({
        incrementAmount: 321,
        initialSize: 62
      });
    });

    it('has the correct initial size', () => {
      expect(buffer.maxSize()).toEqual(62);
    });

    it('after data is written has correct initial size + custom increment amount', () => {
      buffer.write(binaryData);
      expect(buffer.maxSize()).toEqual(321 + 62);
    });
  });

  it('When WritableStreamBuffer is written in two chunks buffer contents are correct', () => {
    buffer = new WritableStreamBuffer();
    buffer.write(simpleString);
    buffer.write(simpleString);
    expect(buffer.getContentsAsString()).toEqual(simpleString + simpleString);
  });
});

