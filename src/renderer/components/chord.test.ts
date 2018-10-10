import { getNoteheadOffsets } from "./chord";
import { StemDirection } from "../../models";

describe("getNoteheadOffsets", () => {
  describe("one notehead", () => {
    it("should point right if the stem points down", () => {
      const res = getNoteheadOffsets([3], StemDirection.DOWN);
      expect(res).toEqual([0]);
    });
    it("should point left if the stem points up", () => {
      const res = getNoteheadOffsets([-3], StemDirection.UP);
      expect(res).toEqual([-1]);
    });
  });
  describe("a second", () => {
    it("should offset the lower pitch if the stem points down", () => {
      const res = getNoteheadOffsets([3, 3.5], StemDirection.DOWN);
      expect(res).toEqual([-1, 0]);
    });
    it("should offset the lower pitch if the stem points up", () => {
      const res = getNoteheadOffsets([-3.5, -3], StemDirection.UP);
      expect(res).toEqual([-1, 0]);
    });
  });
  describe("a third", () => {
    it("should point right if the stem points down", () => {
      const res = getNoteheadOffsets([3, 4], StemDirection.DOWN);
      expect(res).toEqual([0, 0]);
    });
    it("should point left if the stem points up", () => {
      const res = getNoteheadOffsets([-4, -3], StemDirection.UP);
      expect(res).toEqual([-1, -1]);
    });
  });
});