import { StemDirection, StaffPosition } from "../../models";
import { isHalfStaffSpace } from "../../util";

/**
 * Given a list of staff positions and a stem direction, return the
 * list of offsets *relative to the stem* necessary to render the noteheads correctly.
 * @param staffPositions The staff positions of noteheads to be positioned. Assumed
 * to be sorted in order of staff position ascending.
 * @param stemDirection The direction of the stem on which these noteheads will be rendered
 */
export const getNoteheadOffsets = (staffPositions: StaffPosition[], stemDirection: StemDirection) => {
  const preferred = stemDirection === StemDirection.UP ? -1 : 0;
  const reversed = stemDirection === StemDirection.UP ? 0 : -1;
  const start = stemDirection === StemDirection.UP ? 0 : staffPositions.length - 1;
  const end = stemDirection === StemDirection.UP ? staffPositions.length - 1 : 0;

  const dir = end < start ? -1 : 1;
  let left = (end - start + dir) * dir;
  let i = start;
  const offsets = new Array<number>(staffPositions.length);
  while (left > 1) {
    offsets[i] = preferred;
    if (isHalfStaffSpace(staffPositions[i], staffPositions[i + dir])) {
      offsets[i + dir] = reversed;
      i += dir;
      left -= 1;
    }
    i += dir;
    left -= 1;
  }
  if (left === 1) {
    offsets[i] = preferred;
  }
  return offsets;
}