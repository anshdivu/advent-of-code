import * as path from "path";
import { Game } from ".";
import { Track } from "./track";
import { Cart } from "./cart";

describe("Track", () => {
  it("parse", () => {
    const filePath = path.join(__dirname, "__mock__", "input1.txt");
    const track = Track.parse(filePath);

    expect(track.location({ x: 0, y: 2 })).toBeInstanceOf(Cart);
    expect(track.location({ x: 3, y: 9 })).toBeInstanceOf(Cart);
  });

  it("findCarts", () => {
    const filePath = path.join(__dirname, "__mock__", "input1.txt");
    const track = Track.parse(filePath);

    expect(track.findCarts()).toMatchObject([
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
