import { blendColors } from '../utils/blendColors';

const theme = {
  font: "'Ubuntu Mono', monospace",
  day: {
    colors: {
      backgroundColor: '#FFFFFF',
      white: '#FFFFFF',
      grey: '#8c8c8c',

      fontColor: '#04143A',
      gradientFirst: '#7BC7C9',
      gradientSecond: '#7BC7C9',

      primaryColor: blendColors('#7BC7C9', '#7BC7C9', 1),
      gradient: `linear-gradient(45deg, #7BC7C9 0%, #7BC7C9 100%)`
    }
  },
  dark: {
    colors: {
      backgroundColor: '#393F4C',
      white: '#FFFFFF',
      grey: '#8C8F96',

      fontColor: '#FFFFFF',
      gradientFirst: '#7BC7C9',
      gradientSecond: '#7BC7C9',

      primaryColor: blendColors('#7BC7C9', '#7BC7C9', 1),
      gradient: `linear-gradient(45deg, #7BC7C9 0%, #7BC7C9 100%)`
    }
  }
};

export default theme;
