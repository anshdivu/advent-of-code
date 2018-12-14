import * as fs from "fs";
import { Cart } from "./cart";
import { TrackSymbols, Location } from "./types";

export class Track {
  static parse(fileName: string) {
    const content = fs.readFileSync(fileName, "utf-8");

    const trackMap = content
      .split("\n")
      .map(str => str.split("")) as TrackSymbols[][];

    return new Track(trackMap);
  }

  constructor(public trackMap: TrackSymbols[][]) {}

  display() {
    return this.trackMap.map(row => row.join("")).join("\n");
  }

  updateLocation(loc: Location, updatedSymbol: TrackSymbols) {
    this.trackMap[loc.x][loc.y] = updatedSymbol;
    return this;
  }

  location(loc: Location) {
    const symbol = this.trackMap[loc.x][loc.y] as TrackSymbols;
    return { x: loc.x, y: loc.y, symbol };
  }

  findCarts() {
    const nestedCarts = this.trackMap.map((row, x) => findCartsInRow(row, x));
    return ([] as Cart[]).concat(...nestedCarts);
  }
}

function findCartsInRow(row: TrackSymbols[], x: Location["x"]): Cart[] {
  return row
    .map((symbol, y) => {
      if (Cart.isCart(symbol)) return new Cart(symbol, { x, y });
    })
    .filter(obj => obj) as Cart[];
}
