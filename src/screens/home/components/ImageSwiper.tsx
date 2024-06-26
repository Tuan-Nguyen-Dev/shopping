import React, {useState} from 'react';
import {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {FileModel} from '../../../models/FileModel';
import Swiper from 'react-native-swiper';
import {globalStyles} from '../../../styles/globalStyles';
import {sizes} from '../../../constants/sizes';

interface Props {
  files: FileModel[];
}

const ImageSwiper: FC<Props> = props => {
  const {files} = props;

  return (
    <Swiper
      style={{zIndex: -1}}
      loop={false}
      dotColor="black"
      activeDotColor="white"
      paginationStyle={{
        marginBottom: 20,
      }}
      activeDot={
        <View
          style={[
            globalStyles.center,
            {
              width: 16,
              height: 16,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 12,
            },
          ]}>
          <View
            style={{
              width: 8,
              height: 8,
              backgroundColor: 'white',
              borderRadius: 10,
            }}
          />
        </View>
      }>
      {files.length > 0 &&
        files.map(img => (
          <Image
            source={{uri: img.downloadUrl}}
            key={img.path}
            style={{
              flex: 1,
              width: '100%',
              height: sizes.height * 0.5,
              resizeMode: 'cover',
            }}
          />
        ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ImageSwiper;
