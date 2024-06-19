import React, {useState} from 'react';
import {Container, TextComponent} from '../../components';
import {Button, Input, Row, Section, Space} from '@bsdaoquang/rncomponent';
import Avatar from '../../components/Avatar';
import {HambergerMenu, SearchNormal1, Setting4} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import {ScrollView, View} from 'react-native';
import OfferList from './components/OfferList';
import ArrivalsProduct from './components/ArrivalsProduct';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [offset, setOffset] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>();
  return (
    <Container isScroll={false}>
      <Section>
        <Row justifyContent="space-between" styles={{paddingTop: 16}}>
          <Button
            color="black"
            onPress={() => {}}
            styles={{width: 48, height: 48}}
            icon={<HambergerMenu size={20} color="white" />}
          />
          <Avatar />
        </Row>
      </Section>

      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <Section>
            <TextComponent text="Welcome" type="title" size={24} />
            <TextComponent
              text="Our fashion app"
              type="title"
              size={18}
              color={colors.gray2}
            />
          </Section>
          <Section>
            <Row>
              <View style={{flex: 1}}>
                <Input
                  disable
                  prefix={<SearchNormal1 size={20} color={colors.dark} />}
                  placeholder="Search"
                  placeholderColor={colors.gray2}
                  value=""
                  onChange={() => {}}
                />
              </View>
              <Space width={12} />
              <Button
                color="black"
                onPress={() => {}}
                styles={{width: 48, height: 48}}
                icon={<Setting4 variant="TwoTone" size={20} color="white" />}
              />
            </Row>
          </Section>
        </>

        <OfferList />
        <Space height={20} />
        <TextComponent text="adads" />
        <Space height={20} />
        <ArrivalsProduct />
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
