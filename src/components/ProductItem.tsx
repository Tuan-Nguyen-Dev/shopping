import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {ProductModel} from '../models/ProductModel';
import {globalStyles, Space} from '@bsdaoquang/rncomponent';
import TextComponent from './TextComponent';
import {sizes} from '../constants/sizes';
import {fontFamilies} from '../constants/fontFamilies';
import {colors} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';

type Props = {
  product: ProductModel;
  styles?: StyleProp<ViewStyle>;
  index?: number;
};

const ProductItem = (props: Props) => {
  const {product, styles, index} = props;
  const navigation: any = useNavigation();

  const WIDTH = (sizes.width - 48) / 2;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', {id: product.id})}
      style={[
        {
          width: (sizes.width - 48) / 2,
          marginLeft: index ? (index % 2 !== 0 ? 16 : 0) : 0,
          marginBottom: 16,
        },
        styles,
      ]}>
      <Image
        source={{uri: product.imageUrl}}
        style={{
          flex: 1,
          width: WIDTH,
          height: WIDTH,
          maxWidth: 200,
          maxHeight: 200,
          borderRadius: 12,
          resizeMode: 'cover',
        }}
      />
      <Space height={8} />
      <View style={[globalStyles.center]}>
        <TextComponent
          text={product.title}
          size={18}
          numberOfLine={1}
          font={fontFamilies.poppinsBold}
        />
        <TextComponent
          text={product.type}
          color={colors.gray2}
          numberOfLine={1}
        />
        <TextComponent
          text={`$${product.price}`}
          size={20}
          font={fontFamilies.poppinsSemiBold}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
