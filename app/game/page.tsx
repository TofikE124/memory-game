import { Metadata } from "next";
import { Difficulty, GameTheme } from "../constants/MenuOptions";
import PageContent from "./PageContent";

interface SearchParams {
  theme: GameTheme;
  playersNumber: "1" | "2" | "3" | "4";
  gridSize: "4" | "6";
  difficulty: Difficulty;
}

interface Props {
  searchParams: SearchParams;
}

const Page = ({
  searchParams: { gridSize, playersNumber, theme, difficulty },
}: Props) => {
  return (
    <PageContent
      difficulty={difficulty}
      gridSize={gridSize}
      theme={theme}
      playersNumber={playersNumber}
    ></PageContent>
  );
};

export async function generateMetadata({
  searchParams: { gridSize },
}: Props): Promise<Metadata> {
  return {
    title: `Game of ${gridSize}x${gridSize}`,
    description: `Memory Game with ${gridSize}x${gridSize} grid`,
  };
}

export default Page;
