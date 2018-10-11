import { makeTestCaseFactory } from '../../../test/util';
import { getNoteheadOffsets } from "./chord";
import { StemDirection } from "../../models";

describe("getNoteheadOffsets", () => {
  
  const { factory, runAll } = makeTestCaseFactory(
    getNoteheadOffsets,
    ({ args, expected }) => `${args[0]} with stem direction ${args[1]} expects ${expected}`
  );

  describe("one notehead", () => runAll(
    factory([0], [3], StemDirection.DOWN),
    factory([-1], [-3], StemDirection.UP)
  ));

  describe("seconds", () => runAll(
    factory([-1, 0], [3, 3.5], StemDirection.DOWN),
    factory([-1, 0], [-3.5, -3], StemDirection.UP)
  ));

  describe("thirds", () => runAll(
    factory([0, 0], [3, 4], StemDirection.DOWN),
    factory([-1, -1], [-4, -3], StemDirection.UP)
  ));

  describe("three-note clusters", () => runAll(
    factory([0, -1, 0], [3, 3.5, 4], StemDirection.DOWN),
    factory([-1, 0, -1], [-4, -3.5, -3], StemDirection.UP),
  ));
});