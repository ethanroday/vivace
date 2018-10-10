import { StaffPosition } from "./models";

export const isHalfStaffSpace = (pos1: StaffPosition, pos2: StaffPosition) => Math.abs(pos1-pos2) === 0.5;
export const isWholeStaffSpace = (pos1: StaffPosition, pos2: StaffPosition) => Math.abs(pos1-pos2) === 1;