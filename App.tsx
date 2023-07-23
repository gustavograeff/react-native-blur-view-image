import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import plusIcon from './src/assets/icons/plus.png';
import landscapeImage from './src/assets/landscape.jpg';
import { ImageBlur, ImageBlurView } from './src/components/ImageBlur';

const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.description}>
          Only ImageBlurView will be blurred
        </Text>
        <ImageBlur
          src={landscapeImage}
          aspectRatio="landscape"
          blurShapes={[
            {
              children: (
                <View>
                  <Text style={styles.imageText}>Some text</Text>
                  <ImageBlurView
                    style={styles.plusButtonWrapper}
                    containerProps={{ style: { borderRadius: 9999 } }}
                  >
                    <TouchableOpacity style={styles.image}>
                      <Image source={plusIcon} style={styles.image} />
                    </TouchableOpacity>
                  </ImageBlurView>
                </View>
              ),
              position: { left: 20, top: 20 },
            },
          ]}
        />
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  description: {
    fontSize: 20,
  },
  imageText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  image: {
    height: 10,
    width: 10,
  },
  plusButtonWrapper: {
    alignSelf: 'flex-start',
    padding: 12,
    marginTop: 4,
  },
});
