export type SegmentSymbol = "|" | "-" | "/" | "\\" | "+" | " ";

export type TrackSymbols = SegmentSymbol | Direction;
export interface Location {
  x: number;
  y: number;
}

export enum Direction {
  UP = "^",
  DOWN = "v",
  LEFT = "<",
  RIGHT = ">"
}
