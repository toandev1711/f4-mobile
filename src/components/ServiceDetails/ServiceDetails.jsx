// ServiceDetails.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ServiceDetails = ({
  pickup,
  destination,
  onPickupPress,
  onDestinationPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.detailItem} onPress={onPickupPress}>
      <Text style={styles.label}>Điểm đón</Text>
      <Text style={styles.value}>{pickup}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.detailItem} onPress={onDestinationPress}>
      <Text style={styles.label}>Điểm đến</Text>
      <Text style={styles.value}>{destination}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  detailItem: {
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    color: "#636e72",
    marginBottom: 6,
    fontWeight: "500",
  },
  value: {
    fontSize: 15,
    color: "#2d3436",
    fontWeight: "600",
  },
});

export default ServiceDetails;
