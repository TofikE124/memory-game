// services/SoundService.js

import { Sound } from "../constants/sounds";

class SoundService {
  sounds: Record<string, HTMLAudioElement[]>;

  constructor() {
    this.sounds = {};
  }

  addSound(sound: Sound) {
    if (!this.sounds[sound.url]) {
      this.sounds[sound.url] = [new Audio(sound.url)];
    } else if (this.sounds[sound.url].length < 2) {
      this.sounds[sound.url].push(new Audio(sound.url));
    }
  }

  play(sound: Sound) {
    this.addSound(sound);
    const availableSound = this.sounds[sound.url].find((audio) => audio.paused);
    if (availableSound) {
      availableSound.play();
    }
  }

  pause(sound: Sound) {
    if (this.sounds[sound.url]) {
      this.sounds[sound.url].forEach((audio) => {
        if (!audio.paused) {
          audio.pause();
        }
      });
    }
  }

  stop(sound: Sound) {
    if (this.sounds[sound.url]) {
      this.sounds[sound.url].forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  }

  resume(sound: Sound) {
    if (this.sounds[sound.url]) {
      const pausedSound = this.sounds[sound.url].find((audio) => audio.paused);
      if (pausedSound) {
        pausedSound.play();
      }
    }
  }
}

// Singleton instance
const soundService = new SoundService();
export default soundService;
