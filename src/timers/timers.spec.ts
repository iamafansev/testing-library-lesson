import {fakeLongTask} from './fakeLongTask';

describe('Timers', () => {
    const onSuccessMock = jest.fn();

    beforeAll(() => {
        jest.useFakeTimers();
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    afterAll(() => {
        jest.useRealTimers();
    });

    test('Mock timer', () => {
        expect(onSuccessMock).not.toBeCalled();
        fakeLongTask(onSuccessMock);
        jest.runAllTimers();
        expect(onSuccessMock).toBeCalledTimes(1);
    })
    
    test('Mock timer by time', () => {
        expect(onSuccessMock).not.toBeCalled();
        fakeLongTask(onSuccessMock);
        jest.advanceTimersByTime(15000);
        expect(onSuccessMock).not.toBeCalled();
        jest.advanceTimersByTime(15000);
        expect(onSuccessMock).toBeCalledTimes(1);
    })
});