import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {productRef} from '../../firebase/firebaseConfig';
import {ProductModel, SubProduct} from '../../models/ProductModel';
import firestore from '@react-native-firebase/firestore';
import {Container, TextComponent} from '../../components';
import ImageSwiper from './components/ImageSwiper';
import {useStatusBar} from '../../utils/useStatusBar';
import {
  Badge,
  Button,
  Col,
  globalStyles,
  Row,
  Section,
  Space,
} from '@bsdaoquang/rncomponent';
import {Add, Back, Minus, TickSquare} from 'iconsax-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';

const ProductDetail = ({navigation, route}: any) => {
  const {id} = route.params;
  const [productDetail, setProductDetail] = useState<ProductModel>();
  const [subProducts, setSubProducts] = useState<SubProduct[]>([]);
  const [subProductSelected, setSubProductSelected] = useState<SubProduct>();
  const [count, setCount] = useState(1);
  const [sizeSelected, setSizeSelected] = useState('');

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
            <Badge count={0}>
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
        {subProductSelected && subProductSelected.files.length > 0 && (
          <ImageSwiper files={subProductSelected?.files} />
        )}
      </View>
      <ScrollView style={[globalStyles.container]}>
        {productDetail && subProductSelected && (
          <Section styles={{paddingVertical: 12}}>
            <Row>
              <Col>
                <TextComponent
                  text={productDetail?.title}
                  font={fontFamilies.RobotoBold}
                  size={20}
                />
                <TextComponent
                  text={productDetail.type}
                  color={colors.gray2}
                  styles={{paddingVertical: 8}}
                />
              </Col>
              <View>
                <Row
                  styles={{
                    backgroundColor: colors.gray2,
                    padding: 6,
                    borderRadius: 100,
                  }}>
                  <TouchableOpacity
                    disabled={subProductSelected.quantity === 0}
                    style={{paddingHorizontal: 12}}
                    onPress={() => setCount(count + 1)}>
                    <Add size={24} color={colors.dark} />
                  </TouchableOpacity>
                  <TextComponent
                    text={count.toString()}
                    size={16}
                    font={fontFamilies.poppinsRegular}
                  />
                  <TouchableOpacity
                    disabled={count === 1}
                    onPress={() => setCount(count - 1)}
                    style={{paddingHorizontal: 12}}>
                    <Minus
                      size={24}
                      color={count === 1 ? colors.gray : colors.dark}
                    />
                  </TouchableOpacity>
                </Row>
                <Space height={12} />
                <TextComponent
                  text={`${
                    subProductSelected.quantity > 0 ? 'Avalible' : 'Unavalible'
                  } in stock`}
                  font={fontFamilies.RobotoMedium}
                  styles={{textAlign: 'center'}}
                />
              </View>
            </Row>
            <Space height={20} />
            <Row>
              <Col>
                <View>
                  <TextComponent
                    font={fontFamilies.RobotoBold}
                    text="Size"
                    size={18}
                  />
                  <Space height={10} />
                  <Row wrap="wrap" justifyContent="flex-start">
                    {subProductSelected.size &&
                      subProductSelected.size.length > 0 &&
                      subProductSelected.size.map((itemSize, index) => (
                        <Button
                          color={
                            itemSize === sizeSelected ? colors.black : undefined
                          }
                          styles={{
                            minWidth: 50,
                            height: 50,
                            paddingHorizontal: 0,
                            marginRight:
                              index < subProductSelected.size.length - 1
                                ? 12
                                : 0,
                          }}
                          textStyleProps={{
                            fontSize: 16,
                          }}
                          key={itemSize}
                          inline
                          isShadow={false}
                          title={itemSize}
                          onPress={() => setSizeSelected(itemSize)}
                        />
                      ))}
                  </Row>
                </View>
              </Col>
              <View
                style={[
                  globalStyles.shadow,
                  {
                    marginHorizontal: 12,
                    padding: 12,
                    borderRadius: 100,
                    backgroundColor: 'white',
                  },
                ]}>
                {subProducts.length > 0 &&
                  subProducts.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => {
                        setSubProductSelected(item);
                      }}
                      style={[
                        globalStyles.center,
                        {
                          width: 24,
                          height: 24,
                          borderRadius: 100,
                          backgroundColor: item.color,
                          marginVertical: 2,
                        },
                      ]}>
                      {item.color === subProductSelected.color && (
                        <MaterialCommunityIcons
                          name="check"
                          size={18}
                          color={'white'}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
              </View>
            </Row>

            <Space height={20} />
            <View>
              <TextComponent
                font={fontFamilies.RobotoBold}
                text="Description"
                size={18}
              />
              <Space height={10} />
              <TextComponent
                text={productDetail.description}
                numberOfLine={4}
                styles={{textAlign: 'justify'}}
                color={colors.gray2}
              />
            </View>
          </Section>
        )}
      </ScrollView>
      <Section styles={{backgroundColor: 'white'}}>
        <Row>
          <Col>
            <TextComponent text="Total price:" size={12} color={colors.gray2} />
            <TextComponent
              text={`$123.00`}
              size={30}
              font={fontFamilies.poppinsBold}
            />
          </Col>
          <Col>
            <Button
              icon={
                <MaterialCommunityIcons
                  name="shopping"
                  size={18}
                  color={colors.white}
                />
              }
              inline
              onPress={() => {}}
              color={colors.black}
              title="Add to cart"
            />
          </Col>
        </Row>
      </Section>
    </View>
  );
};

export default ProductDetail;
