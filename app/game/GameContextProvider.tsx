"use effect";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Grid, Player } from "../constants/GameOptions";
import { GameTheme } from "../constants/MenuOptions";
import { generateGrid } from "../utils/gridGenerator";
import { generatePlayers } from "../utils/playersGenerator";

interface GameContextType {
  grid: Grid;
  gameNumberClicked: (i: number, j: number) => void;
  players: Player[];
  currentTurn: number;
}

export const GameContext = createContext<GameContextType>(
  {} as GameContextType
);

interface Props {
  theme: GameTheme;
  playersNumber: number;
  gridSize: "4" | "6";
  children: ReactNode;
}

const GameContextProvider = ({
  gridSize,
  theme,
  playersNumber,
  children,
}: Props) => {
  const [grid, setGrid] = useState<Grid>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  // Grid Intialization
  useEffect(() => {
    const generatedGrid = generateGrid(parseInt(gridSize), theme);
    setGrid(generatedGrid);
  }, [gridSize, theme]);

  useEffect(() => {
    const generatedPlayers = generatePlayers(playersNumber);
    setPlayers(generatedPlayers);
  }, [playersNumber]);

  // Turn Intialization
  const [currentTurn, setCurrentTurn] = useState(0);

  // Selection Initialization
  const [firstSelection, setFirstSelection] = useState<[number, number] | null>(
    null
  );
  const [secondSelection, setSecondSelection] = useState<
    [number, number] | null
  >(null);

  // Handle Selection Change
  useEffect(() => {
    if (!firstSelection || !secondSelection) return;

    const [row1, col1] = firstSelection;
    const [row2, col2] = secondSelection;

    if (grid[row1][col1].value == grid[row2][col2].value) handleRight();
    else handleWrong();
  }, [secondSelection]);

  // Functions
  const gameNumberClicked = (i: number, j: number) => {
    if (grid[i][j].flipped) return;
    if (!firstSelection) {
      setFirstSelection([i, j]);
      setFlipped(i, j, true);
    } else if (!secondSelection) {
      setSecondSelection([i, j]);
      setFlipped(i, j, true);
    }
  };

  const setFlipped = (i: number, j: number, flipped: boolean) => {
    setGrid((prevGrid) => {
      prevGrid[i][j].flipped = flipped;
      return prevGrid;
    });
  };

  const handleRight = () => {
    setFirstSelection(null);
    setSecondSelection(null);
    increaseCurrentPlayerScore();
  };

  const handleWrong = () => {
    if (!firstSelection || !secondSelection) return;
    const HIDE_DELAY = 1500;
    const [row1, col1] = firstSelection;
    const [row2, col2] = secondSelection;
    setTimeout(() => {
      setFlipped(row1, col1, false);
      setFlipped(row2, col2, false);
      setFirstSelection(null);
      setSecondSelection(null);
      setCurrentTurn((prevTurn) => (prevTurn + 1) % playersNumber);
    }, HIDE_DELAY);
  };

  const increaseCurrentPlayerScore = () => {
    players[currentTurn].score++;
    setPlayers(players);
  };

  return (
    <GameContext.Provider
      value={{ grid, gameNumberClicked, players, currentTurn }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
