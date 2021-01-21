import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface Props extends SvgProps {
  color?: string;
}

const RightArrow = (props: Props) => (
  <Svg width={8} height={16} {...props}>
    <Path
      d="M1.238 1c-.103.012-.19.114-.22.257-.03.144.003.3.083.392l5.264 6.457-5.264 6.457a.42.42 0 0 0-.1.25c-.007.1.013.2.057.276.044.078.108.125.177.13.068.006.136-.03.186-.098l5.49-6.736A.447.447 0 0 0 7 8.106a.447.447 0 0 0-.09-.278L1.422 1.092c-.05-.065-.117-.098-.183-.091h0z"
      stroke={props.color ? props.color : '#929DA0'}
      fill="none"
      fillRule="evenodd"
    />
  </Svg>
);

export default RightArrow;
