// src/screens/HomeScreen.jsx
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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header1 />
        <ServiceCards />
        <QuickAccess />
        <DriverPromotion />
        <Promotions />
        <Suggestions />
        <Footer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    maxWidth: 480,
    alignSelf: 'center',
    //paddingBottom: 60, // Để tránh TabBar che nội dung
  },
});

export default HomeScreen;