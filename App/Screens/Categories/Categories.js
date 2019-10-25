import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {Assets, Height, Width} from '../../Assets/Assets';
import {readData} from '../../FirebaseHelper/firebaseHelper';
const categories = props => {
  let [data, setData] = useState();
  let [error, setError] = useState();
  useEffect(() => {
    readData(setData, setError, 'categories');
  }, []);

  let renderItem = item => {
    return (
      <>
        <TouchableOpacity style={styles.itemContainer}>
          <Image source={{uri: item.photo_url}} style={styles.image} />

          <Text style={styles.name}>{item.name}</Text>
          <Text style={{marginTop: 10}}> {item.recipes} recipes</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <>
      <View style={styles.container}>
        {data ? (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => renderItem(item)}
          />
        ) : (
          <View style={styles.indicator}>
            {!error ? (
              <ActivityIndicator color={Assets.Colors.babyblue} size="large" />
            ) : (
              <Text>{error}</Text>
            )}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Assets.calcWidth(90),
    alignSelf: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 22,
    textAlign: 'center',
  },
  itemContainer: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: Assets.Colors.brownGrey,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: '100%',
    borderRadius: 20,
    resizeMode: 'stretch',
  },
  indicator: {
    width: Width,
    height: Height,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default categories;
