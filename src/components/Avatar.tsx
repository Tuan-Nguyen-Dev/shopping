import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';

type Props = {
  uid?: string;
};

const Avatar = (props: Props) => {
  return (
    <View>
      <Image
        src="https://2.bp.blogspot.com/-qBqESO1dW-c/XM61SwtelVI/AAAAAAAAK2Q/p4l87RKuF3UhEAIxL6fkXiI3nH295DZYgCLcBGAs/s1600/anh-gai-xinh-viet-nam+29.jpg"
        style={[globalStyles.avatar]}
      />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({});
