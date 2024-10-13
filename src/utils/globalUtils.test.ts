import {
  formatKey,
  isValidInput,
  getTextColorNovaGroupColor,
} from './globalUtils';

describe('formatKey', () => {
  test('replaces hyphens with spaces', () => {
    expect(formatKey('hello-world')).toBe('hello world');
  });

  test('replaces underscores with spaces', () => {
    expect(formatKey('hello_world')).toBe('hello world');
  });

  test('replaces both hyphens and underscores with spaces', () => {
    expect(formatKey('hello-world_test')).toBe('hello world test');
  });

  test('returns the same string if no hyphen or underscore', () => {
    expect(formatKey('hello world')).toBe('hello world');
  });

  test('handle empty string', () => {
    expect(formatKey('')).toBe('');
  });

  test('handles multiple consecutive hyphens and underscores', () => {
    expect(formatKey('hello--world__test')).toBe('hello  world  test');
  });
});

describe('isValidInput', () => {
  test('should return true for a string within the specified range', () => {
    expect(isValidInput('HelloWorld', 5, 50)).toBe(true);
  });

  test('should return false for a string shorter than the minimum length', () => {
    expect(isValidInput('Hi', 5, 50)).toBe(false);
  });

  test('should return false for a string longer than the maximum length', () => {
    expect(isValidInput('a'.repeat(51), 5, 50)).toBe(false);
  });

  test('should return true for a string exactly at the minimum length', () => {
    expect(isValidInput('Hello', 5, 50)).toBe(true);
  });

  test('should return true for a string exactly at the maximum length', () => {
    expect(isValidInput('a'.repeat(50), 5, 50)).toBe(true);
  });

  test('should use default min and max values if not provided', () => {
    expect(isValidInput('HelloWorld')).toBe(true);
    expect(isValidInput('Hi')).toBe(false);
    expect(isValidInput('a'.repeat(51))).toBe(false);
  });
});

describe('getTextColorNovaGroupColor', () => {
  test('should return "success" for "en:1-unprocessed-or-minimally-processed-foods"', () => {
    expect(
      getTextColorNovaGroupColor(
        'en:1-unprocessed-or-minimally-processed-foods'
      )
    ).toBe('success');
  });

  test('should return "warning" for "en:2-processed-culinary-ingredients "', () => {
    expect(
      getTextColorNovaGroupColor('en:2-processed-culinary-ingredients ')
    ).toBe('warning');
  });

  test('should return "failure" for "en:4-ultra-processed-food-and-drink-products"', () => {
    expect(
      getTextColorNovaGroupColor('en:4-ultra-processed-food-and-drink-products')
    ).toBe('failure');
  });

  test('should be case insensitive for matching input', () => {
    expect(
      getTextColorNovaGroupColor(
        'En:1-Unprocessed-Or-Minimally-Processed-Foods'
      )
    ).toBe('success');
  });

  test('should return an empty string for unknown input', () => {
    expect(getTextColorNovaGroupColor('unknown-value')).toBe('');
  });

  test('should return an empty string for empty input', () => {
    expect(getTextColorNovaGroupColor('')).toBe('');
  });
});
