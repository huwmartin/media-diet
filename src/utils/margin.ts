import {spacing} from '../theme';

interface SpacingMap {
  [K: string]: number;
}

const sizes: SpacingMap = spacing;

interface Margin {
  margin?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const calculateMargin = (margin?: string): Margin => {
  if (!margin) {
    return {};
  }

  const trimmedMargin = margin.trim();
  if (!trimmedMargin) {
    return {};
  }

  const margins: number[] = trimmedMargin
    .split(' ')
    .filter(Boolean)
    .map((sizeStr: string) => {
      if (Object.keys(sizes).includes(sizeStr)) {
        return sizes[sizeStr];
      } else {
        return 0;
      }
    });

  switch (margins.slice(0, 4).length) {
    case 1:
      return {
        margin: margins[0],
      };
    case 2:
      return {
        marginTop: margins[0],
        marginRight: margins[1],
        marginLeft: margins[1],
        marginBottom: margins[0],
      };
    case 3:
      return {
        marginTop: margins[0],
        marginRight: margins[1],
        marginLeft: margins[1],
        marginBottom: margins[2],
      };
    case 4:
      return {
        marginTop: margins[0],
        marginRight: margins[1],
        marginBottom: margins[2],
        marginLeft: margins[3],
      };
    default:
      return {};
  }
};
