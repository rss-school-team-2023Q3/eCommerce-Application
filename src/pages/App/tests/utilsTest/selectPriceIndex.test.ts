import selectPriceIndex from 'shared/utils/selectPriceIndex.ts';
import { describe, expect, it } from 'vitest';

describe('selectPriceIndex', () => {
  it('should return correct currency code', () => {
    expect(selectPriceIndex('US')).toBe('$');
    expect(selectPriceIndex('CA')).toBe('$');
    expect(selectPriceIndex('DE')).toBe('€');
  });
});
