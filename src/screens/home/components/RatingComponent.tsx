import {Row, Space} from '@bsdaoquang/rncomponent';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Rating} from 'react-native-ratings';
import {TextComponent} from '../../../components';
import {useNavigation} from '@react-navigation/native';

type Props = {
  productId: string;
};

const RatingComponent = (props: Props) => {
  const {productId} = props;
  const navigation: any = useNavigation();
  return (
    <Row
      justifyContent="flex-start"
      onPress={() => navigation.navigate('RatingScreen')}>
      <Rating startingValue={5} readonly ratingCount={5} imageSize={18} />
      <Space width={8} />
      <TextComponent text={`(20 revirews)`} size={14} />
    </Row>
  );
};

export default RatingComponent;

const styles = StyleSheet.create({});
