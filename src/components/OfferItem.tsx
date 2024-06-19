import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OfferModel} from '../models/OfferModel';
import firestore from '@react-native-firebase/firestore';
import {FileModel} from '../models/FileModel';
import {sizes} from '../constants/sizes';
import TextComponent from './TextComponent';
import {fontFamilies} from '../constants/fontFamilies';
import {colors} from '../constants/colors';
import {Button, Row} from '@bsdaoquang/rncomponent';

type Props = {
  item: OfferModel;
};

const OfferItem = (props: Props) => {
  const {item} = props;

  const renderOffChildren = () => (
    <>
      <TextComponent
        type="title"
        size={25}
        font={fontFamilies.poppinsBold}
        text={`${item.percent}% Off`}
      />
      <TextComponent color={colors.gray2} size={16} text={item.title} />
      <TextComponent
        size={16}
        text={`With code:${item.discount}`}
        styles={{paddingVertical: 12}}
      />
      <Row justifyContent="flex-start">
        <Button
          styles={{paddingHorizontal: 20}}
          color={colors.dark}
          size="small"
          title="Get now"
          onPress={() => {}}
        />
      </Row>
    </>
  );
  return item.imageUrl ? (
    <ImageBackground
      source={{uri: item.imageUrl}}
      style={localStyles.container}
      imageStyle={{flex: 1, resizeMode: 'cover', borderRadius: 20}}>
      {renderOffChildren()}
    </ImageBackground>
  ) : (
    <View style={localStyles.container}>{renderOffChildren()}</View>
  );
};

export default OfferItem;

const localStyles = StyleSheet.create({
  container: {
    width: sizes.width * 0.7,
    minHeight: 100,
    marginRight: 16,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
