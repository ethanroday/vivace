import { StemDirection, StaffPosition } from "../../models";
import { isHalfStaffSpace } from "../../util";

const OFFSETS_BY_STEM_DIRECTION = {
  // When the stem points down, the preferred
  // notehead offset is to the right of the stem
  [StemDirection.DOWN]: [0, -1],
  // When the stem points up, the preferred
  // notehead offset is to the left of the stem
  [StemDirection.UP]: [-1, 0],
}

/**
 * Given a list of staff positions and a stem direction, return the
 * list of offsets *relative to the stem* necessary to render the noteheads correctly.
 * @param staffPositions The staff positions of noteheads to be positioned. Assumed
 * to be sorted in order of staff position ascending.
 * @param stemDirection The direction of the stem on which these noteheads will be rendered
 */
export const getNoteheadOffsets = (staffPositions: StaffPosition[], stemDirection: StemDirection) => {
  const [preferred, reversed] = OFFSETS_BY_STEM_DIRECTION[stemDirection];
  const start = stemDirection === StemDirection.UP ? 0 : staffPositions.length - 1;
  const end = stemDirection === StemDirection.UP ? staffPositions.length - 1 : 0;

  const dir = end < start ? -1 : 1;
  let notesLeft = (end - start + dir) * dir;
  let i = start;
  const offsets = new Array<number>(staffPositions.length);
  // Start from the end of the stem where there's a notehead
  // and consider each pair of noteheads
  while (notesLeft > 1) {
    // Place the first one in the preferred position
    offsets[i] = preferred;
    // If the pair is a half step, place the second in the reversed position
    if (isHalfStaffSpace(staffPositions[i], staffPositions[i + dir])) {
      offsets[i + dir] = reversed;
      i += dir;
      notesLeft -= 1;
    }
    i += dir;
    notesLeft -= 1;
  }
  // If we haven't placed the last note, place it in the preferred position
  if (notesLeft === 1) {
    offsets[i] = preferred;
  }
  return offsets;
}