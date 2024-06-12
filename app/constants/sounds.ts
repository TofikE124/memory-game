export enum SoundType {
  CARD_FLIP = "Card Flip",
  CORRECT = "Correct",
}

export interface Sound {
  url: string;
}

export const sounds: Record<SoundType, Sound> = {
  [SoundType.CARD_FLIP]: { url: "/sounds/card-flip.mp3" },
  [SoundType.CORRECT]: { url: "/sounds/correct.mp3" },
};
