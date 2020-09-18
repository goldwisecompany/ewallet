import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Locale
import Locale from 'ewallet/src/locales';

// Launch
import SplashScreen from './containers/Launch/SplashScreen';
import LaunchScreen from './containers/Launch/LaunchScreen';
import CreateAccountScreen from './containers/Launch/CreateAccountScreen';
import ImportWalletScreen from './containers/Launch/ImportWalletScreen';
import LoadingScreen from './containers/Launch/LoadingScreen';

// Wallet
import WalletScreen from './containers/Wallet/WalletScreen';
import ScannerScreen from './containers/Wallet/ScannerScreen';
import SendScreen from './containers/Wallet/SendScreen';
import ReceiveScreen from './containers/Wallet/ReceiveScreen';
import TransactionHistoryScreen from './containers/Wallet/TransactionHistoryScreen';

// Community
import NewsScreen from './containers/Community/NewsScreen';

// Ecosystem
import EcosystemScreen from './containers/Ecosystem/EcosystemScreen';
import EcoBlogsScreen from './containers/Ecosystem/EcoBlogsScreen';
import EcoDetailScreen from './containers/Ecosystem/EcoDetailScreens';

// Setting
import SettingScreen from './containers/Setting/SettingScreen';
import WalletManagementScreen from './containers/Setting/WalletManagementScreen';
import CurrencyScreen from './containers/Setting/CurrencyScreen';
import RecoveryPhraseScreen from './containers/Setting/RecoveryPhraseScreen';
import PinCodeScreen from './containers/Setting/PinCodeScreen';
import TermsofServiceScreen from './containers/Setting/TermsofServiceScreen';
import PrivacyPolicyScreen from './containers/Setting/PrivacyPolicyScreen';
import FaqScreen from './containers/Setting/FaqScreen';
import AboutUsScreen from './containers/Setting/AboutUsScreen';
import ResetPinCodeScreen from './containers/Setting/ResetPinCode';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {colors, fonts} from './styles';

const setStackOptions = title => ({
  title,
  headerStyle: {backgroundColor: colors.mainLight},
  headerTintColor: '#fff',
  headerTitleStyle: {fontWeight: fonts.weight.heavy},
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
});

const WalletStack = ({navigation, route}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Wallet"
      component={WalletScreen}
      options={setStackOptions('PRNC')}
    />
    <Stack.Screen
      name="Scanner"
      component={ScannerScreen}
      options={setStackOptions(Locale.TEXT__SCANNER)}
    />
    <Stack.Screen
      name="Send"
      component={SendScreen}
      options={setStackOptions(Locale.TEXT__SEND)}
    />
    <Stack.Screen
      name="Receive"
      component={ReceiveScreen}
      options={setStackOptions(Locale.TEXT__RECEIVE)}
    />
    <Stack.Screen
      name="TransactionHistory"
      component={TransactionHistoryScreen}
      options={setStackOptions(Locale.TEXT__TRANSACTION_HISTORY)}
    />
  </Stack.Navigator>
);

const CommunityStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="News"
      component={NewsScreen}
      options={setStackOptions(Locale.TEXT__NEWS)}
    />
  </Stack.Navigator>
);

const EcosystemStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Ecosystem"
      component={EcosystemScreen}
      options={setStackOptions(Locale.TEXT__ECOSYSTEM)}
    />
    <Stack.Screen
      name="EcoBlogs"
      component={EcoBlogsScreen}
      options={setStackOptions(
        `${Locale.TEXT__ECOSYSTEM} ${Locale.TEXT__BLOGS}`,
      )}
    />
    <Stack.Screen
      name="EcoDetail"
      component={EcoDetailScreen}
      options={setStackOptions(Locale.TEXT__BLOGS)}
    />
  </Stack.Navigator>
);

const SettingStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Setting"
      component={SettingScreen}
      options={setStackOptions(Locale.TEXT__SETTING)}
    />
    <Stack.Screen
      name="WalletManagement"
      component={WalletManagementScreen}
      options={setStackOptions(Locale.TEXT__WALLET_MANAGEMENT)}
    />
    <Stack.Screen
      name="Currency"
      component={CurrencyScreen}
      options={setStackOptions(Locale.TEXT__CURRENCY)}
    />
    <Stack.Screen
      name="RecoveryPhrase"
      component={RecoveryPhraseScreen}
      options={setStackOptions(Locale.TEXT__RECOVERY_PHRASE)}
    />
    <Stack.Screen
      name="PinCode"
      component={PinCodeScreen}
      options={setStackOptions(Locale.TEXT__INPUT_PASSWORD)}
    />
    <Stack.Screen
      name="TermsofService"
      component={TermsofServiceScreen}
      options={setStackOptions(Locale.TEXT__TERMS_OF_SERVICE)}
    />
    <Stack.Screen
      name="PrivacyPolicy"
      component={PrivacyPolicyScreen}
      options={setStackOptions(Locale.TEXT__PRIVACY_POLICY)}
    />
    <Stack.Screen
      name="Faq"
      component={FaqScreen}
      options={setStackOptions(Locale.TEXT__FAQ)}
    />
    <Stack.Screen
      name="AboutUs"
      component={AboutUsScreen}
      options={setStackOptions(Locale.TEXT__ABOUT_US)}
    />
    <Stack.Screen
      name="ResetPinCode"
      component={ResetPinCodeScreen}
      options={setStackOptions(Locale.TEXT__RESET_PASSWORD)}
    />
  </Stack.Navigator>
);

const MainTabStack = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        if (route.name !== 'Ecosystem') {
          const icons = {
            Wallet: 'ios-wallet',
            News: 'md-paper',
            Setting: 'ios-settings',
          };
          return <Icon name={icons[route.name]} size={30} color={color} />;
        }
        return <Icon2 name={'react'} size={30} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.mainLight,
      inactiveTintColor: colors.mainDark,
    }}>
    <Tab.Screen
      name="Wallet"
      component={WalletStack}
      options={({route}) => {
        if (
          route.state &&
          route.state.routes[route.state.index].name === 'Scanner'
        ) {
          return {
            tabBarVisible: false,
          };
        }
        return {
          tabBarLabel: Locale.TEXT__WALLET,
        };
      }}
    />
    <Tab.Screen
      name="News"
      component={CommunityStack}
      options={{tabBarLabel: Locale.TEXT__NEWS}}
    />
    <Tab.Screen
      name="Ecosystem"
      component={EcosystemStack}
      options={{tabBarLabel: Locale.TEXT__ECOSYSTEM}}
    />
    <Tab.Screen
      name="Setting"
      component={SettingStack}
      options={({route}) => {
        if (
          route.state &&
          (route.state.routes[route.state.index].name === 'PinCode' ||
            route.state.routes[route.state.index].name === 'RecoveryPhrase')
        ) {
          return {
            tabBarVisible: false,
          };
        }
        return {
          tabBarLabel: Locale.TEXT__SETTING,
        };
      }}
    />
  </Tab.Navigator>
);

const LaunchStack = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Router = props => {
  return (
    <NavigationContainer>
      <LaunchStack.Navigator>
        <LaunchStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <LaunchStack.Screen
          name="Launch"
          component={LaunchScreen}
          options={{headerShown: false}}
        />
        <LaunchStack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={setStackOptions(Locale.TEXT__CREATE_ACCOUNT)}
        />
        <LaunchStack.Screen
          name="ImportWallet"
          component={ImportWalletScreen}
          options={setStackOptions(Locale.TEXT__WALLET_IMPORT)}
        />
        <LaunchStack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{headerShown: false}}
        />
        <LaunchStack.Screen
          name="Main"
          component={MainTabStack}
          options={{headerShown: false}}
        />
      </LaunchStack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  wallet: state.wallet,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Router);
