import * as path from "path";
import { Game } from ".";
import { Track } from "./track";

describe("Track", () => {
  it("parse", () => {
    const filePath = path.join(__dirname, "__mock__", "input1.txt");
    const track = Track.parse(filePath);

    expect(track.location({ x: 0, y: 2 })).toEqual({ x: 0, y: 2, symbol: ">" });
    expect(track.location({ x: 3, y: 9 })).toEqual({ x: 3, y: 9, symbol: "v" });
  });

  it("findCarts", () => {
    const filePath = path.join(__dirname, "__mock__", "input1.txt");
    const track = Track.parse(filePath);

    expect(track.findCarts()).toEqual([
      { location: { x: 0, y: 2 }, symbol: ">" },
      { location: { x: 3, y: 9 }, symbol: "v" }
    ]);
  });

  it("Game", () => {
    const filePath = path.join(__dirname, "__mock__", "input1.txt");
    const track = Track.parse(filePath);
    const newTrack = Game.tick(track);
    console.log(newTrack.display());
  });
});
