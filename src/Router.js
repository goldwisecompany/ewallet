import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
      options={setStackOptions('PRN')}
    />
    <Stack.Screen
      name="Scanner"
      component={ScannerScreen}
      options={setStackOptions('Scanner')}
    />
    <Stack.Screen
      name="Send"
      component={SendScreen}
      options={setStackOptions('Send')}
    />
    <Stack.Screen
      name="Receive"
      component={ReceiveScreen}
      options={setStackOptions('Receive')}
    />
    <Stack.Screen
      name="TransactionHistory"
      component={TransactionHistoryScreen}
      options={setStackOptions('Transaction History')}
    />
  </Stack.Navigator>
);

const CommunityStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="News"
      component={NewsScreen}
      options={setStackOptions('News')}
    />
  </Stack.Navigator>
);

const EcosystemStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Ecosystem"
      component={EcosystemScreen}
      options={setStackOptions('Ecosystem')}
    />
    <Stack.Screen
      name="EcoBlogs"
      component={EcoBlogsScreen}
      options={setStackOptions('Ecosystem Blogs')}
    />
    <Stack.Screen
      name="EcoDetail"
      component={EcoDetailScreen}
      options={setStackOptions('Blog')}
    />
  </Stack.Navigator>
);

const SettingStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Setting"
      component={SettingScreen}
      options={setStackOptions('Setting')}
    />
    <Stack.Screen
      name="WalletManagement"
      component={WalletManagementScreen}
      options={setStackOptions('Wallet Management')}
    />
    <Stack.Screen
      name="Currency"
      component={CurrencyScreen}
      options={setStackOptions('Currency')}
    />
    <Stack.Screen
      name="RecoveryPhrase"
      component={RecoveryPhraseScreen}
      options={setStackOptions('Recovery Phrase')}
    />
    <Stack.Screen
      name="PinCode"
      component={PinCodeScreen}
      options={setStackOptions('Input PinCode')}
    />
    <Stack.Screen
      name="TermsofService"
      component={TermsofServiceScreen}
      options={setStackOptions('Terms of Service')}
    />
    <Stack.Screen
      name="PrivacyPolicy"
      component={PrivacyPolicyScreen}
      options={setStackOptions('Privacy Policy')}
    />
    <Stack.Screen
      name="Faq"
      component={FaqScreen}
      options={setStackOptions('FAQ')}
    />
    <Stack.Screen
      name="AboutUs"
      component={AboutUsScreen}
      options={setStackOptions('About Us')}
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
      }}
    />
    <Tab.Screen name="News" component={CommunityStack} />
    <Tab.Screen name="Ecosystem" component={EcosystemStack} />
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
          options={setStackOptions('Create Account')}
        />
        <LaunchStack.Screen
          name="ImportWallet"
          component={ImportWalletScreen}
          options={setStackOptions('Import Wallet')}
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
