// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export enum IconFamily {
  Ionicons = 'Ionicons',
  FontAwesome6 = 'FontAwesome6',
}

interface CustomIconProps
  extends IconProps<
    ComponentProps<typeof FontAwesome6 | typeof Ionicons>['name']
  > {
  family: IconFamily;
  name: ComponentProps<typeof Ionicons | typeof FontAwesome6>['name'];
}

export function TabBarIcon({ style, family, ...rest }: CustomIconProps) {
  if (family === IconFamily.FontAwesome6) {
    return (
      <FontAwesome6 size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
    );
  }

  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
