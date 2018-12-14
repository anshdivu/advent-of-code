import { Track } from "./track";
import { TrackSymbols, Location, Direction } from "./types";

export class Cart {
  static isCart(symbol: TrackSymbols): symbol is Direction {
    const directions = [
      Direction.UP,
      Direction.DOWN,
      Direction.LEFT,
      Direction.RIGHT
    ];
    const cart = directions.includes(symbol as Direction);
    return cart;
  }

  constructor(public symbol: Direction, public location: Location) {}

  move(track: Track): Track {
    const location = { x: this.location.x, y: this.location.y + 1 };
    return track.updateLocation(location, this.symbol);
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

function nextLocation(symbol: Direction, { x, y }: Location) {
  switch (symbol as Direction) {
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
