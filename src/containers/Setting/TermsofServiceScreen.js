import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';
import {colors} from '../../styles';

const TermsofServiceScreen = ({navigation, route, myWallets, current}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={{margin: 20}}>
        <Text>Effective date: April 30, 2020</Text>
        <Text>
          Dear User, Thank you for choosing PRN wallet as your crypto assets
          wallet. PRN wallet Inc. (the “Company”, “we”, “our” or “us”) welcomes
          you (the “User(s)”, or “you”) to our crypto wallet service known as
          PRN wallet(The “Service”). We hereby remind you that you must
          carefully read the full content of this agreement before using our
          mobile application “PRN wallet”. You must make sure that you fully
          understand the whole agreement and evaluate the risks of using PRN
          wallet on your own. You may use the Service only in accordance with
          the following terms and conditions.
        </Text>
        <Text style={{fontWeight: '700', fontSize: 20}}>
          1. Acceptance of the Terms
        </Text>
        <Text>
          By accessing or using PRN wallet(the “Service”) you acknowledge that
          you have read and understood the following terms of use and you agree
          to be bound by them and to comply with all the laws and regulations
          regarding your use of the Service, and you acknowledge that these
          terms constitute a binding and enforceable legal contract between PRN
          wallet Inc. and you. IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT
          USE, DOWNLOAD OR ACCESS DAPP POCKET. The Service is not allowed for
          use by individuals who are under the age of eighteen (18) years old.
        </Text>
        <Text style={{fontWeight: '700', fontSize: 20}}>
          2. PRN wallet Services
        </Text>
        <Text>
          Import/Create an account: The Service enables Users to import or
          create an account of Ethereum. Manage assets: Users may manage crypto
          assets by transferring, receiving or purchasing Ether or converting
          tokens within the Service. Purchase Ether: Users may purchase Ether by
          credit card payment through certain platforms coordinated with Dapp
          Pocket. Convert tokens: Users may convert a variety of tokens on the
          blockchain in the Service. Transaction History: Users may check out
          their own transaction records, which are public information on the
          blockchain system, within the Service. Browsing decentralized
          applications(Dapps): Users may use the Service to visit and browse the
          services provided by Dapps. Using Dapps: Users may access and use the
          services of Dapps. YOU ACKNOWLEDGE AND AGREE THAT THE USE OF THE
          SERVICE IS ENTIRELY AT YOUR OWN RISK.
        </Text>
        <Text style={{fontWeight: '700', fontSize: 20}}>
          3. User Rights and Obligations
        </Text>
        <Text>
          Users shall bear sole responsibility to take care of their own mobile
          devices and back up the PIN code and Recovery Phrase somewhere safe in
          addition to the Service itself. The Company will not be able to
          recover the wallet or trace back your PIN code or Recovery Phrase for
          you if your mobile device is lost. Due to the irreversible nature of
          crypto currency protocols, transactions can neither be cancelled nor
          reversed once they have been sent. When you use the Service to
          transfer tokens, you shall be solely responsible for the consequences
          of your mishandling of the transfer and the Company will not be able
          to cancel or rollback any transactions you made. Users shall fully
          understand that PRN wallet do not have the responsibility to do the
          due diligence on any service provided by third-party-developed Dapps
          or Smart Contracts. You shall check the official blockchain system or
          other blockchain tools when you receive an alert such as “transaction
          failed” or “mining overtime” in order to avoid repetitive transfer. If
          you fail to follow this instruction, you shall bear the losses and
          expenses occurred due to any repetitive transfer and the Company will
          not be able to rollback the transfer.
        </Text>
        <Text style={{fontWeight: '700', fontSize: 20}}>4. Risks</Text>
        <Text>
          You understand and acknowledge that the blockchain technology is a
          field of innovation where the laws and regulations are not fully
          established. You may be faced with material risks including
          instability of technology or failure for token exchange. You also
          understand that tokens have much higher volatility comparing to other
          financial assets. You shall hold or dispose of the tokens in a
          reasonable way and corresponding to your financial status and risk
          preferences. You also acknowledge that the market information is
          captured from exchanges by the Service and may not represent the
          latest or the best quotation of each token. If you fail to comply with
          this Agreement or fail to follow the instructions, tips or rules on
          the website or on the page of the transaction or payment, the Company
          does not guarantee successful transfer of the Tokens and the Company
          shall not be held liable for any of the consequences of such failure.
          If you have already received the payment in the Service or third-party
          wallet, you understand that transactions on blockchain are
          irreversible and irrevocable. You shall assume the liabilities and
          consequences of your transactions. When you use third-party-developed
          DApps and Smart Contracts integrated in the Service, Company strongly
          suggest you read the terms of use, privacy policy, and other relevant
          documents and information of such third-party-developed DApps and
          Smart Contracts carefully, get familiar with the counterparty and the
          product information and evaluate the risks before you make
          transactions on such DApps or Smart Contracts. You understand that
          such transactions and corresponding contractual relationship are
          between you and your counterparty, instead of the Company. The Company
          shall not be held liable for any risks, responsibilities, losses or
          expenses occurred due to such transactions. When you transfer your
          tokens to another wallet address, it is your sole responsibility to
          make sure that your counterparty is a person with full capacity for
          civil acts and decide whether you shall transact with him/her. In
          order to avoid potential security risks, we suggest you use the
          Service in a secured network environment.
        </Text>
        <Text style={{fontWeight: '700', fontSize: 20}}>5. Privacy Policy</Text>
        <Text>
          We takes our users’ privacy seriously and our Privacy Policy located
          at Privacy Policy explains what information we collect and how we
          collect, share and use personal information. If you do not agree our
          Privacy Policy, you shall stop using the Service right away.
        </Text>
        <Text style={{fontWeight: '700', fontSize: 20}}>
          6. Intellectual Property
        </Text>
        <Text>
          PRN wallet is a mobile application developed and owned by PRN wallet
          Inc. and Inc. and protected by international copyright, patent and
          other intellectual property or proprietary rights laws. All contents,
          including trademarks, logos, graphics, videos, audios, articles,
          archives, information and this agreement, displayed in PRN wallet are
          owned by the Company or the third party licensors. No one shall use,
          reproduce, modify, decompile, distribute or issue the above-mentioned
          application and contents without prior written consent from the
          Company or the third party licensors.
        </Text>
        <Text style={{fontWeight: '700', fontSize: 20}}>
          7. Notifications of Changes
        </Text>
        <Text>
          The company reserves the right to modify or replace these conditions
          at any time. Your continued use of the Service signifies your
          acceptance of any adjustment to these terms. If you do not agree with
          the modifications, you shall cease to use PRN wallet immediately. Use
          of PRN wallet by you after any modification to this agreement
          constitutes your acceptance of this agreement as modified. 8.
          Disclaimer and Limitation of Liability This site and its components
          are offered for informational purposes only; this site shall not be
          responsible or liable for the accuracy, usefulness or availability of
          any information transmitted or made available via the site, and shall
          not be responsible or liable for any error or omissions in that
          information. Due to the decentralized feature of blockchain and the
          safety of Users’ crypto assets, the Company do not have any
          responsibility to store or backup Users’ PIN code or Recovery Phrase.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => ({
  myWallets: state.wallet.myWallets,
  current: state.wallet.current,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TermsofServiceScreen);
