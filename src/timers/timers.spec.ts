import { fakeLongTask } from "./fakeLongTask";

describe("Timers", () => {
  const onSuccessMock = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("Mock timer", () => {
    expect(onSuccessMock).not.toHaveBeenCalled();
    fakeLongTask(onSuccessMock);
    jest.runAllTimers();
    expect(onSuccessMock).toHaveBeenCalledTimes(1);
  });

  test("Mock timer by time", () => {
    expect(onSuccessMock).not.toHaveBeenCalled();
    fakeLongTask(onSuccessMock);
    jest.advanceTimersByTime(15000);
    expect(onSuccessMock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(15000);
    expect(onSuccessMock).toHaveBeenCalledTimes(1);
  });
});
