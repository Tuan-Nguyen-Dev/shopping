import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Tabbar,
  Text,
} from '@bsdaoquang/rncomponent';
import React, {useEffect, useState} from 'react';
import {FC} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import firestore from '@react-native-firebase/firestore';
import {productRef} from '../../../firebase/firebaseConfig';
import {ProductModel} from '../../../models/ProductModel';
import {ProductItem, TextComponent} from '../../../components';
import {sizes} from '../../../constants/sizes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
interface Props {}

const PopularProduct: FC<Props> = props => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const navigation: any = useNavigation();
  useEffect(() => {
    productRef
      .orderBy('rate')
      .limit(10)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log(`Product not found`);
        } else {
          const items: ProductModel[] = [];
          snap.forEach((item: any) => {
            items.push({
              id: item.id,
              ...item.data(),
            });
          });
          setProducts(items);
        }
      });
  }, []);

  return (
    <View style={{marginTop: 16}}>
      <Tabbar
        title="Popular Products"
        tabbarStylesProps={{paddingHorizontal: 16}}
        titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 18}}
        renderSeemore={<Text text="View all" color={colors.gray2} />}
        onSeeMore={() => {}}
      />

      {products.length > 0 &&
        products.map(item => (
          <Card
            key={item.id}
            onPress={() => navigation.navigate('ProductDetail', {id: item.id})}>
            <Row>
              <Image
                source={{uri: item.imageUrl}}
                style={{width: 80, height: 80, borderRadius: 8}}
              />
              <Space width={8} />
              <Col styles={{paddingHorizontal: 12}}>
                <TextComponent
                  text={item.title}
                  font={fontFamilies.poppinsBold}
                  size={16}
                />
                <TextComponent text={item.type} color={colors.gray2} />
                <Row justifyContent="flex-start">
                  <AntDesign name="star" color={colors.success} size={20} />
                  <Space width={8} />
                  <TextComponent text={`${item.rate}`} />
                </Row>
              </Col>
              <TextComponent
                text={`$${item.price}`}
                font={fontFamilies.poppinsSemiBold}
                size={18}
              />
            </Row>
          </Card>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PopularProduct;
