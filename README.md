# Memory Match

## Description
Memory Match is a simple card matching game stylized to include popular music streaming providers.

## [Live Website Link](http://memory-match.lawrkim.com)

## Technologies Used
Memory Match was built using HTML, CSS, and vanilla JavaScript.

## Functionality Overview
1. Memory match is a matching game in which a player attempts to match the images contained on "playing cards".
2. There are a total of 6, 12, or 18 cards:
    - Each card contains 1 of 9 images
    - There are two of each image allowing for 3, 6, or 9 total matches
3. The following stats are tracked:
    - Total number of games played
    - Total number of matches for the current game
    - The accuracy of the players attempts to match the cards in relation to the current game (as a percentage)
4. The cards are displayed face down and "flip" over when they are clicked.
5. Two cards can be flipped each round.
6. If the images of the two cards which are flipped over match:
    - The cards remain flipped over and the player gets 1 point for the match
    - 1 point is added to the total number of attempted matches.
    - The player's accuracy is updated
7. If the two flipped over cards do not match:
    - The cards are flipped back over
    - 1 is added to the total number of attempts
    - The players accuracy is updated
    - The player must choose two cards again to continue searching for a match.
8. After each turn, stats are displayed, including:
    - The total number of matches made
    - The accuracy calculated from the total number of matches and total number of attempts
9. Once all 9 cards have been matched:
    - A modal is shown to the player telling them they have won.
    - A button is provided which can reset the game by clicking on it.
10. Resetting the game performs the following actions:
    - All cards are flipped back over
    - The total number of matches are reset
11. Certain statistics are tracked after each game:
    - The number of games played
    - The cumulative accuracy across all games


