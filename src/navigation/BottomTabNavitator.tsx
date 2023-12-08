import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialIcons';
import TemplateScreen from "../screens/BottomTab/TemplateScreen/TemplateScreen";
import SettingScreen from "../screens/BottomTab/SettingScreen/SettingScreen";


const Tab = createMaterialBottomTabNavigator();


export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      shifting={true}
      // barStyle={{ backgroundColor: '#694fad' }}
      // activeColor="#e91e63"
      // barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name={"Template"}
        component={TemplateScreen}
        options={{
          tabBarLabel: '템플릿',
          tabBarIcon: ({color}) => <Icon name="library-books" color={color} size={24} />,
          tabBarColor: '#FFF099',

        }}
      />
      <Tab.Screen
        name={"Setting"}
        component={SettingScreen}
        options={{
          tabBarLabel: '세팅',
          tabBarIcon: ({color}) => <Icon name="settings" color={color} size={24} />,
          tabBarColor: '#FFF099',

        }}
      />
    </Tab.Navigator>
  );
};
