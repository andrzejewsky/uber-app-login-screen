import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    position: 'absolute',
    height: 60,
    width: 60,
    top: 60,
    left: 25,
    zIndex: 2,
  },
  forward: {
    position: 'absolute',
    zIndex: 2,
    height: 60,
    width: 60,
    right: 10,
    borderRadius: 30,
    backgroundColor: '#54575e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: '#fff',
  },
  formHeader: {
    paddingHorizontal: 25,
  },
  formHeaderText: {
    fontSize: 24,
  },
  inputContainer: {
    marginTop: 25,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 35,
    resizeMode: 'contain',
  },
  prefix: {
    fontSize: 20,
  },
  prefixText: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  footer: {
    height: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderTopWidth: 1,
    borderTopColor: '#e8e8ec',
  },
  footerText: {
    color: '#5a7fdf',
    fontWeight: 'bold',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.formHeight = new Animated.Value(150);
    this.keyboardHeight = new Animated.Value(0);
    this.forwardButtonOpacity = new Animated.Value(0);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.keyboardShown = Keyboard.addListener('keyboardWillShow', this.handleShowKeyboard);
    this.keyboardHidden = Keyboard.addListener('keyboardWillHide', this.handleHideKeyboard);
  }

  handleShowKeyboard = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration + 100,
        toValue: event.endCoordinates.height + 10,
      }),
      Animated.timing(this.forwardButtonOpacity, {
        duration: event.duration,
        toValue: 1,
      }),
    ]).start();
  };

  handleHideKeyboard = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration + 100,
        toValue: 0,
      }),
      Animated.timing(this.forwardButtonOpacity, {
        duration: event.duration,
        toValue: 0,
      }),
    ]).start();
  };

  handleExpandForm = () => {
    Animated.timing(this.formHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 500,
    }).start(() => {
      this.inputRef.current.focus();
    });
  };

  handleBack = () => {
    Keyboard.dismiss();

    Animated.timing(this.formHeight, {
      toValue: 150,
      duration: 500,
    }).start();
  };

  render() {
    const formHeaderOpacity = this.formHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [1, 0],
    });

    const formHeaderMarginTop = this.formHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [25, 100],
    });

    const backOpacity = this.formHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1],
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={{ ...styles.header, opacity: backOpacity }}>
          <TouchableOpacity onPress={this.handleBack}>
            <Icon type="FontAwesome" name="arrow-left" style={{ color: 'black' }} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{
            ...styles.forward,
            bottom: this.keyboardHeight,
            opacity: this.forwardButtonOpacity,
          }}
        >
          <Icon type="FontAwesome" name="arrow-right" style={{ color: 'white' }} />
        </Animated.View>
        <ImageBackground style={styles.imageContainer} source={require('./../../../assets/bg.jpg')}>
          <View style={styles.logoContainer}>
            <Animatable.View style={styles.logo} animation="zoomIn">
              <Text style={styles.logoText}>UBER</Text>
            </Animatable.View>
          </View>
          <Animatable.View animation="slideInUp">
            <Animated.View style={{ ...styles.form, height: this.formHeight }}>
              <Animated.View
                style={{
                  ...styles.formHeader,
                  opacity: formHeaderOpacity,
                  marginTop: formHeaderMarginTop,
                }}
              >
                <Text style={styles.formHeaderText}>Get moving with uber</Text>
              </Animated.View>
              <TouchableOpacity style={styles.inputContainer} onPress={this.handleExpandForm}>
                <Image style={styles.flag} source={require('./../../../assets/flag.jpg')} />
                <View style={styles.prefix}>
                  <Text style={styles.prefixText}>+91</Text>
                </View>
                <TextInput
                  ref={this.inputRef}
                  keyboardType="numeric"
                  style={styles.input}
                  pointerEvents="none"
                  placeholder="Enter your phone number"
                />
              </TouchableOpacity>
            </Animated.View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>or connect using a social account</Text>
            </View>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

Login.navigationOptions = {
  header: null,
};

export default Login;
