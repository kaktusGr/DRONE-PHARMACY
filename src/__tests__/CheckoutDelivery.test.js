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
            jest.setSystemTime(new Date('2024-08-28T00:00:00Z'));
        })

        it('should be defined', () => {
            expect(getDay).toBeDefined();
            expect(getDay).not.toBeUndefined();
        })

        it('should return correct "today" day (WED)', () => {
            expect(getDay('today')).toBe('WED');
        })

        it('should return correct "tomorrow" (THU)', () => {
            expect(getDay('tomorrow')).toBe("THU");
        })

        it('should return correct "dayAfterTomorrow" day (FRI)', () => {
            expect(getDay('dayAfterTomorrow')).toBe('FRI');
        })

        it('should throw error for invalid value', () => {
            expect(() => getDay('invalidValue')).toThrow('Invalid value provided');
            expect(() => getDay('invalidValue')).toThrow(Error);
        })
    })

    describe('setDateAfterTomorrow function', () => {
        it('should be defined', () => {
            expect(setDateAfterTomorrow).toBeDefined();
            expect(setDateAfterTomorrow).not.toBeUndefined();
        })

        it('should return correct date (August 30)', () => {
            jest.setSystemTime(new Date('2024-08-28T00:00:00Z'));
            expect(setDateAfterTomorrow()).toBe('August 30');
        })

        it('should return correct date (September 1)', () => {
            jest.setSystemTime(new Date('2024-08-30T00:00:00Z'));
            expect(setDateAfterTomorrow()).toBe('September 1');
        })
    })
})
