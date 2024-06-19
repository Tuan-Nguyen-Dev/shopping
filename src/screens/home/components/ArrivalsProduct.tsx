import {Button, Row, Tabbar, Text} from '@bsdaoquang/rncomponent';
import React, {useEffect, useState} from 'react';
import {FC} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import firestore from '@react-native-firebase/firestore';
import {productRef} from '../../../firebase/firebaseConfig';
import {ProductModel} from '../../../models/ProductModel';
import {ProductItem, TextComponent} from '../../../components';
import {sizes} from '../../../constants/sizes';

interface Props {}

const ArrivalsProduct: FC<Props> = props => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  useEffect(() => {
    productRef
      .orderBy('createdAt')
      .limitToLast(10)
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
        title="New Arrivals"
        tabbarStylesProps={{paddingHorizontal: 16}}
        titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 18}}
        renderSeemore={<Text text="View all" color={colors.gray2} />}
        onSeeMore={() => {}}
      />

      {products.length > 0 && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={products}
          renderItem={({item, index}) => (
            <View
              key={item.id}
              style={{
                marginLeft: 16,
                marginRight: index === products.length - 1 ? 16 : 0,
              }}>
              <ProductItem key={item.id} product={item} />
            </View>
          )}
        />
        // <Row
        //   wrap="wrap"
        //   styles={{
        //     flex: 1,
        //     width: sizes.width,
        //     paddingBottom: 200,
        //     justifyContent: 'space-between',
        //     alignItems: 'center',
        //     paddingHorizontal: 16,
        //   }}>
        //   {products.map((product, index) => (
        //     <ProductItem key={product.id} product={product} />
        //   ))}
        // </Row>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ArrivalsProduct;
