import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {productRef} from '../../firebase/firebaseConfig';
import {ProductModel, SubProduct} from '../../models/ProductModel';
import firestore from '@react-native-firebase/firestore';
import {Container, TextComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import ImageSwiper from './components/ImageSwiper';
import {useStatusBar} from '../../utils/useStatusBar';
import {Badge, Button, Row, Section} from '@bsdaoquang/rncomponent';
import {Back} from 'iconsax-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../constants/colors';

const ProductDetail = ({navigation, route}: any) => {
  const {id} = route.params;
  const [productDetail, setProductDetail] = useState<ProductModel>();
  const [subProducts, setSubProducts] = useState<SubProduct[]>([]);
  const [subProductSelected, setSubProductSelected] = useState<SubProduct>();

  useEffect(() => {
    getProductDetail();
    getSubProducts();
  }, [id]);

  const getProductDetail = () => {
    productRef.doc(id).onSnapshot((snap: any) => {
      if (snap.exists) {
        setProductDetail({
          id,
          ...snap.data(),
        });
      } else {
        setProductDetail(undefined);
      }
    });
  };

  const getSubProducts = async () => {
    try {
      const snap = await firestore()
        .collection('subProducts')
        .where('productId', '==', id)
        .get();

      if (snap.empty) {
        setSubProducts([]);
        setSubProductSelected(undefined);
      } else {
        const items: SubProduct[] = [];

        snap.forEach((item: any) => {
          items.push({
            id: item.id,
            ...item.data(),
          });
        });
        setSubProducts(items);
        setSubProductSelected(items[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[globalStyles.container]}>
      <View style={[globalStyles.container]}>
        <Section
          styles={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            padding: 20,
            zIndex: 5,
          }}>
          <Row justifyContent="space-between">
            <TouchableOpacity
              style={[
                globalStyles.center,
                {
                  backgroundColor: colors.black,
                  borderRadius: 100,
                  padding: 0,
                  width: 38,
                  height: 38,
                },
              ]}
              onPress={() => navigation.goBack()}>
              <MaterialIcons
                style={{marginLeft: 8}}
                name="arrow-back-ios"
                size={22}
                color={colors.white}
              />
            </TouchableOpacity>
            <Badge count={99} overflowCount={10}>
              <TouchableOpacity
                style={[
                  globalStyles.center,
                  {
                    backgroundColor: colors.white,
                    borderRadius: 100,
                    padding: 0,
                    width: 38,
                    height: 38,
                  },
                ]}
                onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons
                  name="shopping"
                  size={22}
                  color={colors.black}
                />
              </TouchableOpacity>
            </Badge>
          </Row>
        </Section>
        {subProductSelected && (
          <ImageSwiper files={subProductSelected?.files} />
        )}
      </View>
      <View style={[globalStyles.container, globalStyles.center]}>
        <TextComponent text="content" />
        {subProducts.length > 0 &&
          subProducts.map(item => (
            <TouchableOpacity
              onPress={() => {
                setSubProductSelected(item);
              }}
              style={{
                width: 20,
                height: 20,
                borderRadius: 100,
                backgroundColor: item.color,
                borderColor: 'coral',
                borderWidth: 1,
              }}
              key={item.id}
            />
          ))}
      </View>
    </View>
  );
};

export default ProductDetail;
