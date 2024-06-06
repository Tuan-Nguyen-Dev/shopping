import React from 'react';
import {Container} from '../../components';
import {Section, Text} from '@bsdaoquang/rncomponent';

const Result = ({navigation, route}: any) => {
  return (
    <Container>
      <Section>
        <Text text="You have successfully registerd in our app and start working in it" />
      </Section>
    </Container>
  );
};

export default Result;
