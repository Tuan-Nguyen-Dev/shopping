import React, {useEffect, useState} from 'react';
import {Button, Tabbar, Text} from '@bsdaoquang/rncomponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {FlatList, View} from 'react-native';
import {colors} from '../../../constants/colors';
import {categoriesRef} from '../../../firebase/firebaseConfig';
import {CategoryModel} from '../../../models/CategoryModel';

const CategoriesList = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  useEffect(() => {
    categoriesRef.onSnapshot(snap => {
      if (snap.empty) {
        console.log(`Categories not found`);
      } else {
        const items: CategoryModel[] = [];
        snap.forEach((item: any) => {
          items.push({
            id: item.id,
            ...item.data(),
          });
        });
        setCategories(items);
      }
    });
  }, []);

  return (
    <View style={{marginTop: 16}}>
      <Tabbar
        title="Categories"
        tabbarStylesProps={{paddingHorizontal: 16}}
        titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 18}}
        renderSeemore={<Text text="View all" color={colors.gray2} />}
        onSeeMore={() => {}}
      />

      {categories.length > 0 && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={categories}
          renderItem={({item, index}) => (
            <View
              key={item.id}
              style={{
                marginLeft: 16,
                marginRight: index === categories.length - 1 ? 16 : 0,
              }}>
              <Button
                title={item.title}
                onPress={() => {}}
                color={colors.dark}
                styles={{
                  paddingVertical: 4,
                  paddingHorizontal: 20,
                }}
                inline
              />
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

export default CategoriesList;
