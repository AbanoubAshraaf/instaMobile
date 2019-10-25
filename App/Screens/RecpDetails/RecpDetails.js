import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from 'react-native';
import {Assets, Height, Width} from '../../Assets/Assets';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const RecpDetails = props => {
  let [data, setData] = useState();
  let [index, setIndex] = useState(0);

  useEffect(() => {
    setData(props.navigation.state.params.item);
  }, [data, props.navigation.state.params.item]);

  let renderContent = data => {
    return (
      <>
        <View style={styles.itemContainer}>
          <View style={styles.image}>
            <Carousel
              data={data.photosArray}
              onSnapToItem={index => {
                setIndex(index);
              }}
              renderItem={({item}) => {
                return <Image source={{uri: item}} style={styles.image} />;
              }}
              sliderWidth={Width}
              itemWidth={Width}
              loop={true}
              autoplay={true}
            />
            <Pagination
              dotsLength={data.photosArray.length}
              activeDotIndex={index}
              containerStyle={{position: 'absolute', bottom: 10,alignSelf:'center'}}
              dotColor={Assets.Colors.white}
              inactiveDotColor={Assets.Colors.white}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
          <Text style={styles.title}>{data.title}</Text>

          <Text style={styles.categoryId}>{data.categoryId.toUpperCase()}</Text>

          <Text style={{fontSize: 16, marginTop: 10}}>{data.time} minute</Text>

          <TouchableOpacity style={styles.ingredients}>
            <Text style={{color: Assets.Colors.babyblue}}>
              View ingredients
            </Text>
          </TouchableOpacity>
          <Text style={styles.description}>{data.description}</Text>
        </View>
      </>
    );
  };
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <ScrollView style={styles.container}>
        {data ? (
          renderContent(data)
        ) : (
          <View style={styles.indicator}>
            <ActivityIndicator color={Assets.Colors.babyblue} size="large" />
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -110,
  },
  itemContainer: {
    flex: 1,
    minHeight: Assets.calcHeight(100),
    borderWidth: 0.5,
    borderColor: Assets.Colors.brownGrey,
    borderRadius: 20,
    alignItems: 'center',
    paddingBottom: '5%',
  },
  ingredients: {
    borderColor: Assets.Colors.babyblue,
    borderWidth: 1,
    width: '70%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    height: 330,
    width: '100%',
    resizeMode: 'stretch',
  },
  description: {
    fontSize: 16,
    width: '80%',
    lineHeight: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },

  categoryId: {
    fontSize: 14,
    color: Assets.Colors.babyblue,
    marginTop: 20,
    fontWeight: 'bold',
  },
  indicator: {
    width: Width,
    height: Height,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default RecpDetails;
