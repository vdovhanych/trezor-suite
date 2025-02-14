import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { TabBar } from '@suite-native/navigation';
import { HomeStackNavigator } from '@suite-native/home';
import { SettingsStackNavigator } from '@suite-native/settings';

import { AccountsScreen } from '../dummyScreens/AccountsScreen';
import { ActionScreen } from '../dummyScreens/ActionScreen';
import { PricesScreen } from '../dummyScreens/PricesScreen';

import { RootTabsParamList, RouteTabs, rootTabsOptions } from './routes';

const Tab = createBottomTabNavigator<RootTabsParamList>();

export const RootTabNavigator = () => (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName={RouteTabs.HomeStack}
            screenOptions={{
                headerShown: false,
                unmountOnBlur: true,
            }}
            tabBar={props => <TabBar tabItemOptions={rootTabsOptions} {...props} />}
        >
            <Tab.Screen name={RouteTabs.HomeStack} component={HomeStackNavigator} />
            <Tab.Screen name={RouteTabs.Accounts} component={AccountsScreen} />
            <Tab.Screen name={RouteTabs.Action} component={ActionScreen} />
            <Tab.Screen name={RouteTabs.Prices} component={PricesScreen} />
            <Tab.Screen name={RouteTabs.SettingsStack} component={SettingsStackNavigator} />
        </Tab.Navigator>
    </NavigationContainer>
);
