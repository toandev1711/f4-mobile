import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header1 from '../../components/Header1/Header1';
import ServiceCards from '../../components/ServiceCards/ServiceCards';
import QuickAccess from '../../components/QuickAccess/QuickAccess';
import DriverPromotion from '../../components/DriverPromotion/DriverPromotion';
import Promotions from '../../components/Promotions/Promotions';
import Suggestions from '../../components/Suggestions/Suggestions';
import Footer from '../../components/Footer/Footer';

const HomeScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Header1 />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <ServiceCards />
          <QuickAccess />
          <DriverPromotion />
          <Promotions />
          <Suggestions />
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    marginHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    maxWidth: 480,
    alignSelf: 'center',
    // paddingBottom: 60, 
  },
});

export default HomeScreen;