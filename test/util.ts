export interface TestCase<U extends any[], V> {
  args: U;
  expected: V;
}
export type TestNameGetter<U extends any[], V> = (testCase: TestCase<U, V>) => string;

const getTestNameDefault = <U extends any[], V>({ args, expected }: TestCase<U, V>) =>
  `${JSON.stringify(args)} expects ${JSON.stringify(expected)}`

export const makeTestCaseFactory = <U extends any[], V>(fn: (...args: U) => V, getTestName: TestNameGetter<U, V> = getTestNameDefault) => {
  function factory(expected: V, ...args: U): TestCase<U, V> {
    return { args, expected }
  }
  function run({ args, expected }: TestCase<U, V>) {
    it(getTestName({ args, expected }), () => expect(fn(...args)).toEqual(expected))
  }
  function runAll(...testCases: TestCase<U, V>[]) {
    testCases.forEach(run)
  }
  return { factory, run, runAll }
}