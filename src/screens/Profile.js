/* eslint-disable react-native/no-inline-styles */
import {COLORS, FONTS, SIZES, dummyData, icons} from '../constants';
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {HeaderBar} from '../components';
import {MainLayout} from '.';
import React from 'react';

const SectionTitle = ({title}) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
      }}>
      <Text style={{color: COLORS.lightGray3, ...FONTS.h4}}>{title}</Text>
    </View>
  );
};

const Setting = ({title, type, onPress, value}) => {
  if (type === 'button') {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
        }}
        onPress={onPress}>
        <Text style={{flex: 1, color: COLORS.white, ...FONTS.h3}}>{title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              marginRight: SIZES.radius,
              color: COLORS.lightGray3,
              ...FONTS.h3,
            }}>
            {value}
          </Text>
          <Image
            style={{width: 15, height: 15, tintColor: COLORS.white}}
            source={icons.rightArrow}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{flex: 1, color: COLORS.white, ...FONTS.h3}}>{title}</Text>
        <Switch value={value} onValueChange={v => onPress(v)} />
      </View>
    );
  }
};

const Profile = () => {
  const [faceId, setFaceId] = React.useState(true);

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.black,
        }}>
        <HeaderBar title="Profile" />
        <ScrollView>
          <View style={{flexDirection: 'row', marginTop: SIZES.radius}}>
            <View style={{flex: 1}}>
              <Text style={{color: COLORS.white, ...FONTS.h3}}>
                {dummyData.profile.email}
              </Text>
              <Text style={{color: COLORS.lightGray3, ...FONTS.body4}}>
                {dummyData.profile.id}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={icons.verified} style={{width: 25, height: 25}} />
              <Text
                style={{
                  color: COLORS.lightGreen,
                  marginLeft: SIZES.base,
                  ...FONTS.body4,
                }}>
                Verified
              </Text>
            </View>
          </View>
          <SectionTitle title="APP" />
          <Setting
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log('Pressed')}
          />
          <Setting
            title="Appearance"
            value="Dark"
            type="button"
            onPress={() => console.log('Pressed')}
          />
          <SectionTitle title="ACCOUNTS" />
          <Setting
            title="Payment Currency"
            value="USD"
            type="button"
            onPress={() => console.log('Pressed')}
          />
          <Setting
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log('Pressed')}
          />
          <SectionTitle title="SECURITY" />
          <Setting
            title="Face ID"
            value={faceId}
            type="switch"
            onPress={value => setFaceId(value)}
          />
          <Setting
            title="Password Setting"
            value=""
            type="button"
            onPress={() => console.log('Pressed')}
          />
          <Setting
            title="Change Password"
            value=""
            type="button"
            onPress={() => console.log('Pressed')}
          />
          <Setting
            title="2-Factor Authentication"
            value=""
            type="button"
            onPress={() => console.log('Pressed')}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
