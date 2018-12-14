import { Track } from "./track";

export class Game {
  static tick(initialTrack: Track) {
    const carts = initialTrack.findCarts();
    return carts.reduce((track, cart) => {
      if (cart.canMove(track)) {
        return cart.move(track);
      }

      throw cart;
    }, initialTrack);
  }
}
