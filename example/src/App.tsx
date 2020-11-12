import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform
} from 'react-native';

import {CameraKitGallery, CameraKitCamera} from '../../src';

import CameraScreen from './CameraScreen';
import AlbumsScreen from './AlbumsScreen';
import GalleryScreen from './GalleryScreen';
import BarcodeScreen from './BarcodeScreen';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      example: undefined
    };
  }

  componentDidMount () {
    // super.componentDidMount()
    this.askAllPermissions()
  }

  render() {
    if (this.state.example) {
      const Example = this.state.example;
      return <Example />;
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Welcome to Camera Kit
          </Text>
          <Text style={{ fontSize: 40 }}>📷</Text>
        </View>


        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.setState({ example: BarcodeScreen })}>
            <Text style={styles.buttonText}>
              Barcode scanner Screen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.setState({ example: CameraScreen })}>
            <Text style={styles.buttonText}>
              Camera Screen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.setState({ example: AlbumsScreen })}>
            <Text style={styles.buttonText}>
              Albums Screen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.setState({ example: GalleryScreen })}>
            <Text style={styles.buttonText}>
              Gallery Screen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onCheckCameraAuthoPressed()}>
            <Text style={styles.buttonText}>
              Camera Autotization Status
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onCheckGalleryAuthoPressed()}>
            <Text style={styles.buttonText}>
              Photos Autotization Status
            </Text>
          </TouchableOpacity>
        </View>

      </View>

    );
  }

  async onCheckCameraAuthoPressed() {
    const success = await CameraKitCamera.checkDeviceCameraAuthorizationStatus();
    if (success) {
      Alert.alert('You have permission 🤗')
    }
    else {
      Alert.alert('No permission 😳')
    }
  }

  async onCheckGalleryAuthoPressed() {
    const success = await CameraKitGallery.checkDevicePhotosAuthorizationStatus();
    if (success) {
      Alert.alert('You have permission 🤗')
    }
    else {
      Alert.alert('No permission 😳')
    }
  }

  askAllPermissions = async () => {
    if (Platform.OS === 'android') {
      if (await this.requestCameraPermission()) {
        if (await this.requestExternalWritePermission()) {
          if (await this.requestExternalReadPermission()) {
            // setIsPermitted(true);
          } else alert('READ_EXTERNAL_STORAGE permission denied');
        } else alert('WRITE_EXTERNAL_STORAGE permission denied');
      } else alert('CAMERA permission denied');
    } else {
      // setIsPermitted(true);
    }
  };

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  requestExternalWritePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      alert('Write permission err', err);
    }
    return false;
  };

  requestExternalReadPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Read Storage Permission',
          message: 'App needs Read Storage Permission',
        },
      );
      // If READ_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      alert('Read permission err', err);
    }
    return false;
  };
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headerContainer: {
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100
  },
  headerText: {
    color: 'black',
    fontSize: 24
  },
  buttonText: {
    color: 'blue',
    marginBottom: 20,
    fontSize: 20
  }
});
