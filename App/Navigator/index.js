import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Categories from '../Screens/Categories';
import RecpDetails from '../Screens/RecpDetails';
import Home from '../Screens/Home';
import {Assets} from '../Assets/Assets';

const NavigationDrawerStructure = props => {
  let toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer.bind(this)}>
        {/*Donute Button Image */}
        <Image source={Assets.requires.drawer} style={styles.tabBarMenue} />
      </TouchableOpacity>
    </View>
  );
};

const GoBackHome = props => {
  let GoBack = () => {
    props.navigationProps.navigate('Home');
  };

  return (
    <View>
      <TouchableOpacity
        onPress={GoBack.bind(this)}
        style={{flexDirection: 'row'}}>
        {/*Donute Button Image */}
        <Image source={Assets.requires.back} style={styles.backImage} />
        <Text style={styles.Home}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const Home_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      title: 'Home',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTitleContainerStyle: {justifyContent: 'center', width: 270},
    }),
  },
  RecpDetails: {
    screen: RecpDetails,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'transparent',
        height: 100,
      },
      headerLeftContainerStyle: {
        backgroundColor: Assets.Colors.white,
        borderRadius: 50,
        width: 35,
        height: 35,
        marginTop: 30,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },

      headerTintColor: Assets.Colors.babyblue,
    },
  },
});

const Category_StackNavigator = createStackNavigator({
  Categories: {
    screen: Categories,
    navigationOptions: ({navigation}) => ({
      title: 'Categories',
      headerLeft: <GoBackHome navigationProps={navigation} />,
      headerTitleContainerStyle: {justifyContent: 'center', width: 270},

      headerStyle: {},
    }),
  },
});

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home_StackNavigator,
    headerMode: 'none',
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  Categories: {
    screen: Category_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Categories',
    },
  },
});

const AppContainer = createAppContainer(DrawerNavigator);

const styles = StyleSheet.create({
  tabBarMenue: {
    width: 30,
    height: 30,
    marginLeft: 10,
    tintColor: 'black',
  },
  backImage: {
    width: 22,
    height: 22,
    marginLeft: 10,
  },
  Home: {
    color: Assets.Colors.babyblue,
    fontSize: 16,
  },

});

export {AppContainer};
