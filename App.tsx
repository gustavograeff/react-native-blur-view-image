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
import portraitImage from './src/assets/portrait.jpg';
import squareImage from './src/assets/square.jpg';
import { ImageBlur, ImageBlurView } from './src/components/ImageBlur';

const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
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

        <Text style={styles.description}>Full width blur</Text>
        <ImageBlur
          src={portraitImage}
          aspectRatio="portrait"
          blurShapes={[
            {
              children: (
                <ImageBlurView style={{ padding: 16 }}>
                  <Text style={styles.imageText}>Some content</Text>
                </ImageBlurView>
              ),
              position: { left: 0, right: 0 },
            },
          ]}
        />

        <Text style={styles.description}>Full height blur</Text>
        <ImageBlur
          src={squareImage}
          aspectRatio="square"
          blurShapes={[
            {
              children: (
                <ImageBlurView style={{ height: '100%', padding: 16 }}>
                  <Text style={styles.imageText}>Some content</Text>
                </ImageBlurView>
              ),
              position: { top: 0, bottom: 0 },
            },
          ]}
        />

        <Text style={styles.description}>Full width / height blur</Text>
        <ImageBlur
          src={squareImage}
          aspectRatio="square"
          blurShapes={[
            {
              children: (
                <ImageBlurView style={{ height: '100%', padding: 16 }}>
                  <Text style={styles.imageText}>Some content</Text>
                </ImageBlurView>
              ),
              position: { top: 0, bottom: 0, left: 0, right: 0 },
            },
          ]}
        />

        <Text style={styles.description}>Multiple ImageBlurView</Text>
        <ImageBlur
          src={landscapeImage}
          aspectRatio="landscape"
          blurShapes={[
            {
              children: (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    padding: 8,
                  }}
                >
                  <View>
                    <View>
                      <Text style={styles.imageText}>Text 1</Text>
                      <Text style={styles.imageText}>Text 2</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        columnGap: 4,
                        marginTop: 8,
                      }}
                    >
                      <ImageBlurView
                        style={{ padding: 16, alignSelf: 'flex-start' }}
                        containerProps={{
                          style: { borderRadius: 9999 },
                        }}
                      >
                        <TouchableOpacity>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              columnGap: 4,
                              alignSelf: 'flex-start',
                            }}
                          >
                            <Image source={plusIcon} style={styles.image} />
                            <Text style={styles.imageText}>
                              The greater label
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </ImageBlurView>
                      <ImageBlurView
                        style={{ padding: 16, alignSelf: 'flex-start' }}
                        containerProps={{
                          style: { borderRadius: 9999 },
                        }}
                      >
                        <TouchableOpacity>
                          <View
                            style={{
                              alignSelf: 'flex-start',
                            }}
                          >
                            <Text style={styles.imageText}>Small label</Text>
                          </View>
                        </TouchableOpacity>
                      </ImageBlurView>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.imageText}>Text 3</Text>
                    <Text style={styles.imageText}>Text 4</Text>
                  </View>
                </View>
              ),
              position: { left: 20, right: 20, bottom: 20 },
            },
          ]}
        />

        <Text style={styles.description}>Multiple blur shapes</Text>
        <ImageBlur
          src={portraitImage}
          aspectRatio="portrait"
          blurShapes={[
            {
              children: (
                <ImageBlurView
                  containerProps={{
                    style: {
                      borderTopLeftRadius: 8,
                      borderBottomRightRadius: 30,
                    },
                  }}
                  style={{
                    padding: 16,
                    alignSelf: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={styles.imageText}>Shape 1</Text>
                </ImageBlurView>
              ),
              position: { left: '10%', top: '20%' },
            },
            {
              children: (
                <ImageBlurView
                  containerProps={{
                    style: {
                      borderTopLeftRadius: 8,
                      borderBottomRightRadius: 30,
                    },
                  }}
                  style={{
                    padding: 16,
                    alignSelf: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={styles.imageText}>Shape 2</Text>
                </ImageBlurView>
              ),
              position: { right: '10%', bottom: '20%' },
            },
          ]}
        />

        <Text style={styles.description}>Custom blur props</Text>
        <ImageBlur
          src={portraitImage}
          aspectRatio="portrait"
          blurShapes={[
            {
              children: (
                <ImageBlurView
                  containerProps={{
                    blurRadius: 3,
                    overlay: { backgroundColor: 'blue', opacity: 0.3 },
                    style: {
                      borderTopLeftRadius: 8,
                      borderBottomRightRadius: 30,
                    },
                  }}
                  style={{
                    padding: 16,
                    alignSelf: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={styles.imageText}>Custom blur props</Text>
                </ImageBlurView>
              ),
              position: { left: 20, top: '20%' },
            },
          ]}
        />
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
