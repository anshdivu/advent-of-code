import { Track } from "./track";
import { Cart } from "./cart";

export class Game {
  static run(track: Track) {
    try {
      const updatedTrack = this.tick(track);
      this.run(updatedTrack);
    } catch (error) {
      if (error instanceof Cart) {
        return error.location;
      }

      throw error;
    }
  }

  static tick(initialTrack: Track) {
    const carts = initialTrack.findCarts();
    return carts.reduce((track, cart) => {
      if (cart.isHit(track)) {
        throw cart;
      }

      return cart.move(track);
    }, initialTrack);
  }
}
