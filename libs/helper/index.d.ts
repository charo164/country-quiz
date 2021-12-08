/// <reference types="node" />

declare module '@charo164/helper' {
  class Time {
    start(): void;

    end(): void;

    _time(): number;

    nowString(): string;
  }

  class Text {
    cyan(msg: string): string;

    darkGray(msg: string): string;

    green(msg: string): string;

    red(msg: string): string;
  }

  export const txt: Text;
  
  export const time: Time;

  export function loadingAnimation(text?: string, chars?: string[], delay?: number): NodeJS.Timer;

  export function clearLine(): void;

  export function debug(namespace: string, msg: string): void;

  export function clearLineAndDebug(namespace: string, msg: string): void;
}
