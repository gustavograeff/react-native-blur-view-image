import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  fitAvailableSpace: { height: '100%', width: '100%' },
  sticked: {
    position: 'absolute',
  },
  blurShapeContainer: {
    overflow: 'hidden',
  },
  hide: { opacity: 0 },
});

export default styles;
