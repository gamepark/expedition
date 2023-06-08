export enum LocationType {
  Place = 1, // The circles on the board
  Road, // Path between 2 places on the board
  Hand, // The player hand of cards
  Deck, // The deck of cards
  CommonObjectives, // The 6 cards which are a common goal for players
  PlayerArea, // Area in front of the player, with tickets, tokens & cards for accomplished objectives
  ArrowsStock, // Stock of arrows
  Card, // When a goal with a token is fulfilled the token goes on the card,
  Board, // The board location
  TicketStock // The stock of tickets
}
