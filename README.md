# 2048 Assist

A 2048 game guide. It solves what it thinks is the best move for you to play. The board must set manually.

This is a fork of the [2048-AI](https://github.com/ovolve/2048-AI) project, which was originally an AI for the game [2048](https://github.com/gabrielecirulli/2048). This version has been modified to function as a manual gameplay assistant.

## Features

*   **Best Move Hints:** The AI calculates and displays the next best move.
*   **Automatic Last Tile:** If a move results in only one empty cell, the game will automatically place a '2' in that cell and instantly provide the next hint.
*   **Configurable Board:** You can manually edit the tiles on the board to create custom scenarios.
    *   **Left-click** on a cell to double its value.
    *   **Right-click** on a cell to halve its value (or remove it if the value is 2).
