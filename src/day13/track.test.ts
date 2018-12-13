import Track from "./track";
import * as path from "path";

describe("Track", () => {
  it("parse", () => {
    const filePath = path.join(__dirname, "__mock__", "input1.txt");
    const track = Track.parse(filePath);

    expect(track.location({ x: 0, y: 2 })).toEqual({ x: 0, y: 2, symbol: ">" });
    expect(track.location({ x: 3, y: 9 })).toEqual({ x: 3, y: 9, symbol: "v" });
  });
});
