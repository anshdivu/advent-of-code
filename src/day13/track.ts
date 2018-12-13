import * as fs from "fs";

interface Segment {
  x: number;
  y: number;
  symbol: "|" | "-" | "/" | "\\" | "+" | " ";
}

interface Location {
  x: number;
  y: number;
}

export default class Track {
  static parse(fileName: string) {
    const content = fs.readFileSync(fileName, "utf-8");
    const trackMap = content.split("\n").map(str => str.split(""));

    return new Track(trackMap);
  }

  constructor(private trackMap: string[][]) {}

  location({ x, y }: Location) {
    const symbol = this.trackMap[x][y];

    return { x, y, symbol } as Segment;
  }
}
