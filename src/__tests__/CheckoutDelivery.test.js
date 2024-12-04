const { getDay, setDateAfterTomorrow } = require('../components/CheckoutDelivery');

describe('Checkout delivery:', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
    })

    afterAll(() => {
        jest.useRealTimers();
    })

    describe('getDay function', () => {
        beforeAll(() => {
            jest.setSystemTime(new Date('2024-08-28T00:00:00'));
        })

        it('should be defined', () => {
            expect(getDay).toBeDefined();
            expect(getDay).not.toBeUndefined();
        })

        it('should return correct "today" day (WED)', () => {
            expect(getDay('today')).toBe('WED');
        })

        it('should return correct "tomorrow" day (THU)', () => {
            expect(getDay('tomorrow')).toBe('THU');
        })

        it('should return correct "dayAfterTomorrow" day (FRI)', () => {
            expect(getDay('dayAfterTomorrow')).toBe('FRI');
        })

        it('should return correct day when crossing the end of the month', () => {
            jest.setSystemTime(new Date('2024-08-31T00:00:00'));
            expect(getDay('today')).toBe('SAT');
            expect(getDay('tomorrow')).toBe('SUN');
            expect(getDay('dayAfterTomorrow')).toBe('MON');
        })

        it('should return correct day in leap year', () => {
            jest.setSystemTime(new Date('2024-02-28T00:00:00'));
            expect(getDay('tomorrow')).toBe('THU');
            expect(getDay('dayAfterTomorrow')).toBe('FRI');
        })

        it('should throw error for invalid value', () => {
            expect(() => getDay('invalidValue')).toThrow('Invalid value provided');
            expect(() => getDay('invalidValue')).toThrow(Error);
            expect(() => getDay('today', 'invalidValue')).toThrow();
        })
    })

    describe('setDateAfterTomorrow function', () => {
        it('should be defined', () => {
            expect(setDateAfterTomorrow).toBeDefined();
            expect(setDateAfterTomorrow).not.toBeUndefined();
        })

        it('should return a string for date value', () => {
            expect(typeof setDateAfterTomorrow()).toBe('string');
        })

        it('should return correct date (August 30)', () => {
            jest.setSystemTime(new Date('2024-08-28T00:00:00'));
            expect(setDateAfterTomorrow()).toMatch(/^August\s30$/);
        })

        it('should return correct date (September 1)', () => {
            jest.setSystemTime(new Date('2024-08-30T00:00:00'));
            expect(setDateAfterTomorrow()).toMatch(/^September\s1$/);
        })

        it('should return correct date (September 2) in another timezone', () => {
            jest.setSystemTime(new Date('2024-08-30T23:00:00-04:00'));
            expect(setDateAfterTomorrow()).toMatch(/^September\s2$/);
        })

        it('should return correct date when crossing the end of the year', () => {
            jest.setSystemTime(new Date('2024-12-30T00:00:00'));
            expect(setDateAfterTomorrow()).toMatch(/^January\s1$/);
        })

        it('should throw error for unnecessary argument', () => {
            expect(() => setDateAfterTomorrow('invalidValue')).toThrow();
        })
    })
})
