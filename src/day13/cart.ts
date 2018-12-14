import { Track } from "./track";
import { TrackSymbols, Location, Direction, SegmentSymbol } from "./types";

// export enum Path {
//   Straight = "|" | "-",
//   Curve = "/" | "\\",
//   Intersection = "+"
// }

export class Cart {
  static isCart(direction: TrackSymbols): direction is Direction {
    const directions = [
      Direction.UP,
      Direction.DOWN,
      Direction.LEFT,
      Direction.RIGHT
    ];
    return directions.includes(direction as Direction);
  }

  constructor(
    public symbol: Direction,
    public location: Location,
    public id: string,
    public previousSymbol?: TrackSymbols
  ) {}

  update(nextPosition: { symbol: TrackSymbols; location: Location }) {
    return new Cart(
      this.symbol,
      nextPosition.location,
      this.id,
      nextPosition.symbol
    );
  }

  move(track: Track): Track {
    // find next location
    // if straight path  => move straight
    // if curved path  => curve
    // if intersection  => calc turn by intersectionCount
    const next = nextLocation(this.symbol, this.location);
    const nextPosition = track.location(next);

    switch (nextPosition.symbol) {
      case "|":
      case "-":
        return this.moveStraight(track, nextPosition);

      case "/":
      case "\\":
        return this.moveCurved(track, nextPosition);

      case "+":
        return this.moveIntersection(track, nextPosition);
    }

    throw "unreachable";
  }
  moveIntersection(
    track: Track,
    nextPosition: { symbol: TrackSymbols; location: Location }
  ): Track {
    throw new Error("Method not implemented.");
  }
  moveCurved(
    track: Track,
    nextPosition: { symbol: TrackSymbols; location: Location }
  ): Track {
    throw new Error("Method not implemented.");
  }

  moveStraight(
    track: Track,
    nextPosition: {
      symbol: TrackSymbols;
      location: Location;
    }
  ): Track {
    const newCart = this.update(nextPosition);

    switch (this.symbol) {
      case Direction.UP:
        // const t1 = track.updateLocation(this.location,this.previousSymbol || Direction.UP);
        return track.updateLocation(nextPosition.location, newCart);

      case Direction.DOWN:
      case Direction.RIGHT:
      case Direction.LEFT:
        return track.updateLocation(nextPosition.location, newCart);
    }
  }
  // up (^), down (v), left (<), or right (>)
  // (On your initial map, the track under each cart is a straight path matching the direction the cart is facing.)
  // Tracks consist of straight paths (| and -), curves (/ and \), and intersections (+).
  // Curves connect exactly two perpendicular pieces of track;
  isHit(track: Track) {
    const next = nextLocation(this.symbol, this.location);
    const nextPosition = track.location(next);
    return Cart.isCart(nextPosition.symbol);
  }
}

function nextLocation(direction: Direction, { x, y }: Location) {
  switch (direction) {
    case Direction.UP:
      return { x: x - 1, y: y };

    case Direction.DOWN:
      return { x: x + 1, y: y };

    case Direction.RIGHT:
      return { x: x, y: y + 1 };

    case Direction.LEFT:
      return { x: x, y: y - 1 };
  }
}
