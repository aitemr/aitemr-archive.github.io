import { blendColors } from '../utils/blendColors';

const theme = {
  font: "'Ubuntu Mono', monospace",
  day: {
    colors: {
      backgroundColor: '#ffffff',
      white: '#ffffff',
      grey: '#8c8c8c',

      fontColor: '#04143a',
      gradientFirst: '#ff7676',
      gradientSecond: '#f54ea2',

      primaryColor: blendColors('#ff7676', '#f54ea2', 0.5),
      gradient: `linear-gradient(45deg, #ff7676 0%, #f54ea2 100%)`
    }
  },
  dark: {
    colors: {
      backgroundColor: '#292b36',
      white: '#ffffff',
      grey: '#8c8f96',

      fontColor: '#ffffff',
      gradientFirst: '#ff7676',
      gradientSecond: '#f54ea2',

      primaryColor: blendColors('#ff7676', '#f54ea2', 0.5),
      gradient: `linear-gradient(45deg, #ff7676 0%, #f54ea2 100%)`
    }
  }
};

export default theme;
