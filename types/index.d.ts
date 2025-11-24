declare type TextRenderProps = {
    text: string
    className?: string
    weight?: number
}

declare type FontWeightConfig = {
    min: number;
    max: number;
    base: number;
};

declare type SetHoverText = (
    container: HTMLElement | null,
    type: HoverTextType
) => (() => void) | void;

declare type FontWeightMap = Record<string, FontWeightConfig>;

declare type HoverTextType = keyof FontWeightMap;

declare type SetHoverText = (container: HTMLElement | null, type: HoverTextType) => void;

declare type DockItemProps = {
    id: string,
    name: string
    iconSrc: string
    isOpen: boolean,
}

declare type MouseMoveHandler = (e: MouseEvent) => void;
declare type VoidFn = () => void;

declare interface WindowState {
  isOpen: boolean;
  zIndex: number;
  data?: unknown; // or replace with custom type
}

declare type WindowKey = keyof typeof WINDOW_CONFIG;

declare type WindowMap = Record<WindowKey, WindowState>;

declare interface WindowStore {
  windows: WindowMap;
  nextZIndex: number;

  openWindow: (key: WindowKey, data?: unknown) => void;
  closeWindow: (key: WindowKey) => void;
  focusWindow: (key: WindowKey) => void;
}

declare type WindowControlProps = {
  target: WindowKey;
};

declare type LocationKey = keyof typeof locations;
declare type LocationValue = (typeof locations)[LocationKey];

declare interface LocationStore {
  activeLocation: LocationValue;
  setActiveLocation: (location: LocationValue | null) => void;
  resetActiveLocation: () => void;
}

declare type LocationItem = {
  id: number;
  name: string;
  icon: string;
  kind: string; // "folder" | "file" kalau mau strict
  position?: string;
  windowPosition?: string;
  fileType?: string;
  href?: string;
  description?: string[];
  imageUrl?: string;
  children?: LocationItem[];
};

declare type RenderListProps = {
  items: LocationValue[];
  title?: string
  className?: string
  activeLocation?:LocationValue
  onClick?: (item: LocationValue) => void;
};