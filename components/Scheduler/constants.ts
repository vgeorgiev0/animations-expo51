import { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';

export const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;
export const _spacing = 10;
export const _color = '#ececec';
export const _borderRadius = 16;
export const _startHour = 8;
export const _damping = 14;
export const _entering = FadeInDown.springify().damping(_damping);
export const _exiting = FadeOut.springify().damping(_damping);
export const _layout = LinearTransition.springify().damping(_damping);
