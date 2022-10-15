// File: src/types/font-face.d.ts
// Spec: https://www.w3.org/TR/css-font-loading/
export {}

declare global {
  const FontFace: FontFace;

  interface Document {
    fonts: FontFaceSet
  }

  type CSSOMString = string;
  type FontFaceLoadStatus = 'unloaded' | 'loading' | 'loaded' | 'error';
  type FontFaceSetStatus = 'loading' | 'loaded';

  class FontFace extends FontFaceDescriptors {
    constructor(family: string, source: string | ArrayBuffer, descriptors?: FontFaceDescriptors): FontFace;
    readonly status: FontFaceLoadStatus;
    readonly loaded: Promise<FontFace>;
    variationSettings: CSSOMString;
    display: CSSOMString;
    load(): Promise<FontFace>;
  }

  interface FontFaceDescriptors {
    family: CSSOMString;
    style: CSSOMString;
    weight: CSSOMString;
    stretch: CSSOMString;
    unicodeRange: CSSOMString;
    variant: CSSOMString;
    featureSettings: CSSOMString;
  }

  interface FontFaceSet extends Iterable<FontFace> {
    readonly status: FontFaceSetStatus;
    readonly ready: Promise<FontFaceSet>;
    add(font: FontFace): void;
    check(font: string, text?: string): boolean; // throws exception
    load(font: string, text?: string): Promise<FontFace[]>
    delete(font: FontFace): void;
    clear(): void;
  }
}