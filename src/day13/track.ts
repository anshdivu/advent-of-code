import * as fs from "fs";
import { Cart } from "./cart";
import { TrackSymbols, Location, SegmentSymbol } from "./types";
import * as shortid from "shortid";

export class Track {
  static parse(fileName: string) {
    const content = fs.readFileSync(fileName, "utf-8");

    const trackMap = content
      .split("\n")
      .map((str, x) =>
        str
          .split("")
          .map((sym, y) => parseSymbol(sym as TrackSymbols, { x, y }))
      );

    return new Track(trackMap);
  }

  constructor(public trackMap: { symbol: TrackSymbols }[][]) {}

  display() {
    return this.trackMap
      .map(row => row.map(obj => obj.symbol).join(""))
      .join("\n");
  }

  updateLocation(
    loc: Location,
    updatedSymbol:
      | Cart
      | {
          symbol: TrackSymbols;
          location: Location;
        }
  ) {
    if (Cart.isCart(updatedSymbol.symbol)) {
      this.trackMap[loc.x][loc.y] = updatedSymbol as Cart;
    }

    this.trackMap[loc.x][loc.y] = updatedSymbol;
    return this;
  }

  location(loc: Location) {
    const val = this.trackMap[loc.x][loc.y];
    if (Cart.isCart(val.symbol)) {
      return val as Cart;
    }
    return { location: loc, ...val };
  }

  findCarts() {
    const nestedCarts = this.trackMap.map(findCartsInRow);
    return ([] as Cart[]).concat(...nestedCarts);
  }
}

function findCartsInRow(row: ({ symbol: TrackSymbols })[]) {
  return row.filter(obj => obj instanceof Cart) as Cart[];
}

function parseSymbol(symbol: TrackSymbols, location: Location) {
  if (Cart.isCart(symbol)) {
    return new Cart(symbol, location, shortid.generate());
  }

  return { symbol };
}
