import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import AppText from "./AppText/Text";
import colors from "../config/colors";

function Card({ title, description, price, imageUrl, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: imageUrl,
          }}
        />

        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.price}>{price} €</AppText>
          <AppText style={styles.description}>{description}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 4,
    borderColor: colors.light,
    borderRadius: 10,

    marginHorizontal: 10,
    marginBottom: 10,
    overflow: "hidden",
  },

  detailsContainer: {
    padding: 10,
  },
  image: {
    height: 200,
    width: "100%",
  },
  price: {
    fontWeight: "bold",
    marginBottom: 7,
  },
  description: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    color: colors.primary,
    fontSize: 20,
    marginBottom: 7,
  },
});

export default Card;
