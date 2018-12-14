import { Track } from "./track";
import { TrackSymbols, CartSymbol, Location } from "./types";

export class Cart {
  static isCart(symbol: TrackSymbols): symbol is CartSymbol {
    return ["v", "^", ">", "<"].includes(symbol);
  }

  constructor(public symbol: CartSymbol, public location: Location) {}

  canMove(track: Track): boolean {
    return true;
  }

  move(track: Track): Track {
    track.trackMap[this.location.x][this.location.y + 1] = this.symbol;
    return track;
  }
}
