import React from 'react';
import { IconNames } from './Tabs';
import { icons } from 'lucide-react-native';
import { motifySvg } from 'moti/svg';
import { MotiProps } from 'moti';

interface MotiIconProps extends MotiProps {
  name: IconNames;
  size?: number;
}

const MotiIcon: React.FC<MotiIconProps> = ({ name, size = 16, ...rest }) => {
  const IconComponent = motifySvg<any>(icons[name])();
  return <IconComponent size={size} {...rest} />;
};

export default MotiIcon;
