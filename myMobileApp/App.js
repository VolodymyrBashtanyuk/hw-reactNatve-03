// import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useCallback, useEffect} from 'react';
import * as Font from 'expo-font';
import {
  DancingScript_400Regular,
  DancingScript_500Medium,
  DancingScript_600SemiBold,
  DancingScript_700Bold,
} from '@expo-google-fonts/dancing-script';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, useWindowDimensions } from 'react-native';

// SplashScreen.preventAutoHideAsync();

const data = {
    email: '',
    password: ''
}



export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [colectData, setColectData] = useState(data);  
  const [appIsReady, setAppIsReady] = useState(false);

  const {height, width} = useWindowDimensions();


  // useEffect(() => {
  //   const onChange = () => {
  //     // const width = Dimensions.get('window').width;
  //     width
  console.log("width", width)
  console.log("height", height)
  //   }
  //   // Dimensions.addEventListener("change", onChange);
  //   // return () => {
  //   //   Dimensions.removeEventListener("change", onChange);
  //   // }
  // },[])


  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ DancingScript_400Regular , DancingScript_500Medium, DancingScript_600SemiBold, DancingScript_700Bold});
      }
      catch {
        // handle error
      }
      finally {
        setAppIsReady(true);
      }
    })();
  }, []);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

 
  const keyboardHide= () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(colectData);
    setColectData(data);
  }

  const keyboardVanish = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
  }
  


  return (
   
       <TouchableWithoutFeedback onPress={keyboardVanish} >

    <View style={styles.container} onLayout={onLayoutRootView} >
        <ImageBackground style={styles.image} source={require('./assets/images/image-app.jpeg')}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

    
            <View style={{ ...styles.form, marginBottom: isShowKeyboard ? 50 : 10, marginHorizontal: width > 800 ? 50 : 20,}}>
              <View style={styles.header}>
                <Text style={styles.headerTitle  }>Registration form</Text>
              </View>
              <View>
                <Text style={styles.imputTitle}>Email adress</Text>
                <TextInput
                  style={styles.input}
                  textAlign={'center'}
                  value={colectData.email}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setColectData((prevState) => ({...prevState, email: value}))}
                  />
              </View>
              <View style={{marginTop: 20}}>
                <Text style={styles.imputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  textAlign={'center'}
                  secureTextEntry={true}
                  value={colectData.password}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setColectData((prevState) => ({...prevState, password: value}))}
                />
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={ keyboardHide}>
                  <Text style={styles.btnTitle}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </ImageBackground>

    </View>
      </TouchableWithoutFeedback>
     
      


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    resizeMode: 'cover',
  },
  form: {
    // marginHorizontal: Dimensions.get("window").width > 800 ? 50: 20,
    // marginBottom: 50,
    // width: width > 800 ? 60: 20,

  },
  header: {
    alignItems: 'center',
    marginBottom: 80,
  },
  headerTitle: {
    fontFamily:'DancingScript_700Bold',
    color: '#f0f8ff',
    fontSize: 45,
    
  },
  imputTitle: {
    fontFamily: 'DancingScript_400Regular',
    fontSize: 30,
    color: '#f0f8ff', 
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#f0f8ff',
    height: 40,
    borderRadius: 10,
    color: '#f0f8ff',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 30,
    borderRadius: 10,
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: '#1e90ff',
        
      },
      android: {
        backgroundColor: '#0000ff',

      }
    })

  },
  btnTitle: {
        fontFamily:'DancingScript_700Bold',
    color: '#f0f8ff',
    fontSize: 30,
  }
});
