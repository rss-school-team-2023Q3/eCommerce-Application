import selectCountryCode from 'shared/utils/selectCountryCode';
import { describe, expect, it } from 'vitest';

describe('selectCountryCode', () => {
  it('возвращает правильный код страны для известных стран', () => {
    expect(selectCountryCode('Great Britain')).toBe('GB');
    expect(selectCountryCode('Germany')).toBe('DE');
    expect(selectCountryCode('Canada')).toBe('CA');
    expect(selectCountryCode('USA')).toBe('US');
  });
});
