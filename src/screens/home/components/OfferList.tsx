import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {localDataNames} from '../../../constants/localDataNames';
import {collectionNames} from '../../../constants/collectionNames';
import {OfferModel} from '../../../models/OfferModel';
import {TextComponent} from '../../../components';
import OfferItem from '../../../components/OfferItem';

const OfferList = () => {
  const [offers, setOffers] = useState<OfferModel[]>([]);
  useEffect(() => {
    const time = new Date().getTime();
    firestore()
      .collection(collectionNames.offers)
      .where('startAt', '<=', time)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log('Offer active not found');
        } else {
          const items: OfferModel[] = [];
          snap.forEach((item: any) => {
            items.push({
              id: item.id,
              ...item.data(),
            });
          });
          setOffers(items);
        }
      });
  }, []);

  // console.log('offers', offers);

  return (
    <>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={offers}
        renderItem={({item, index}) => <OfferItem item={item} key={item.id} />}
      />
    </>
  );
};

export default OfferList;

const styles = StyleSheet.create({});
