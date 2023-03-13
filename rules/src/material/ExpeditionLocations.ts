export enum LocationType {
  Place = 1, // Green dot on the board
  Road, // Path between 2 dots on the board
  Hand, // The player hand of cards
  PlacesDeck, // The deck of cards
  CommonPlacesArea, // The 6 cards which are a common goal for players
  TokenArea, // Area where a player keep their tokens during the setup
  TicketArea, // Area where a player keep their tickets
  TicketStock, // Stock of tickets
  ArrowsStock, // Stock of arrows
  PlayerPlacesArea, // The cards in front of the player, when the location has been visited
  Card // When a goal with a token is fulfilled the token goes on the card
}
