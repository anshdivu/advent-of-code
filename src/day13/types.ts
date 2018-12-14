export type CartSymbol = "^" | "v" | "<" | ">";
export type SegmentSymbol = "|" | "-" | "/" | "\\" | "+" | " ";

export type TrackSymbols = SegmentSymbol | CartSymbol;
export interface Location {
  x: number;
  y: number;
}
