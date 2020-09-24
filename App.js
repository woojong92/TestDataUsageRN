/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NativeModules} from 'react-native';

// if (NativeModules.DataUsageModule) {
//   // Get data usage of all installed apps in current device
//   // Parameters "startDate" and "endDate" are optional (works only with Android 6.0 or later). Declare empty object {} for no date filter.
//   NativeModules.DataUsageModule.listDataUsageByApps(
//     {
//       startDate: new Date(2017, 4, 22, 0, 0, 0, 0).getTime(), // 1495422000000 = Mon May 22 2017 00:00:00
//       endDate: new Date().getTime(),
//     },
//     (err, jsonArrayStr) => {
//       if (!err) {
//         var apps = JSON.parse(jsonArrayStr);
//         console.log(apps);
//         for (var i = 0; i < apps.length; i++) {
//           var app = apps[i];
//           console.log(
//             'App name: ' +
//               app.name +
//               '\n' +
//               'Package name: ' +
//               app.packageName +
//               '\n' +
//               'Received bytes: ' +
//               app.rx +
//               'bytes\n' +
//               'Transmitted bytes: ' +
//               app.tx +
//               'bytes\n' +
//               'Received MB: ' +
//               app.rxMb +
//               '\n' +
//               'Transmitted MB: ' +
//               app.txMb,
//           );
//         }
//       }
//     },
//   );

//   // Get data usage of specific list of installed apps in current device
//   // Example: get data usage for Facebook, YouTube and WhatsApp.
//   // Parameters "startDate" and "endDate" are optional (works only with Android 6.0 or later)
//   NativeModules.DataUsageModule.getDataUsageByApp(
//     {
//       packages: [
//         'com.facebook.katana',
//         'com.google.android.youtube',
//         'com.whatsapp',
//       ],
//       startDate: new Date(2017, 4, 22, 0, 0, 0, 0).getTime(), // 1495422000000 = Mon May 22 2017 00:00:00
//       endDate: new Date().getTime(),
//     },
//     (err, jsonArrayStr) => {
//       if (!err) {
//         var apps = JSON.parse(jsonArrayStr);
//         console.log(apps);
//         for (var i = 0; i < apps.length; i++) {
//           var app = apps[i];
//           console.log(
//             'App name: ' +
//               app.name +
//               '\n' +
//               'Package name: ' +
//               app.packageName +
//               '\n' +
//               'Received bytes: ' +
//               app.rx +
//               'bytes\n' +
//               'Transmitted bytes: ' +
//               app.tx +
//               'bytes\n' +
//               'Received MB: ' +
//               app.rxMb +
//               '\n' +
//               'Transmitted MB: ' +
//               app.txMb,
//           );
//         }
//       }
//     },
//   );

//   // Check if app has permission to access data usage by apps
//   // This way will not ask for permissions (check only)
//   // If you pass "requestPermission": "true", then app will ask for permissions.
// NativeModules.DataUsageModule.requestPermissions(
//   {requestPermission: 'false'},
//   (err, result) => {
//     var permissionObj = JSON.parse(result);
//     if (!permissionObj.permissions) {
//       Alert.alert(
//         'Give Permission',
//         'You need to enable data usage access for this app. Please, enable it on the next screen.',
//         [
//           {text: 'Cancel', style: 'cancel', onPress: () => Action.pop()},
//           {text: 'Give permission', onPress: () => this.requestPermissions()},
//           ,
//         ],
//         {cancelable: false},
//       );
//     }
//   },
// );
// }

const App: () => React$Node = () => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log('start');
    if (NativeModules.DataUsageModule) {
      // Get data usage of all installed apps in current device
      // Parameters "startDate" and "endDate" are optional (works only with Android 6.0 or later). Declare empty object {} for no date filter.
      if (NativeModules.DataUsageModule.listDataUsageByApps) {
        console.log('listDataUsageByApps yes');
      } else {
        console.log('listDataUsageByApps no');
      }

      NativeModules.DataUsageModule.listDataUsageByApps(
        {
          startDate: new Date(2017, 9, 23, 0, 0, 0, 0).getTime(), // 1495422000000 = Mon May 22 2017 00:00:00
          endDate: new Date().getTime(),
        },
        (err, jsonArrayStr) => {
          if (!err) {
            var apps = JSON.parse(jsonArrayStr);
            setValue(apps);
            console.log(apps);
            for (var i = 0; i < apps.length; i++) {
              var app = apps[i];
              console.log(
                'App name: ' +
                  app.name +
                  '\n' +
                  'Package name: ' +
                  app.packageName +
                  '\n' +
                  'Received bytes: ' +
                  app.rx +
                  'bytes\n' +
                  'Transmitted bytes: ' +
                  app.tx +
                  'bytes\n' +
                  'Received MB: ' +
                  app.rxMb +
                  '\n' +
                  'Transmitted MB: ' +
                  app.txMb,
              );
            }
          } else {
            console.log(err);
          }
        },
      );
      setTimeout(() => {
        setLoading(false);
      }, 10000);
    }
  }, []);

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  ) : (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View>
            <Text>data usage test</Text>
            {value?.map((m) => (
              <View>
                <Text>{m.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
