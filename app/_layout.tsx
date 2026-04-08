import { Stack } from "expo-router";
import { Camera, CameraView } from "expo-camera";
import { useContext,  useEffect, useState } from "react";
import { LightBobContext, LightBobProvider } from "../LightBobContext/LightBobContext";
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible until we hide it

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldSetBadge: true,
    shouldShowList: true,
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldVibrate: true,
    shouldShowBanner: true,
  })
})

const requestPermissions = async () => {
  try{
    const { status } = await Camera.requestCameraPermissionsAsync();
    if(status !== "granted"){
      console.warn("Camera permissions not granted");
    }
  } catch (error) {
    console.error("Error requesting camera permissions:", error);
  }
}

export default function RootLayout() {

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    requestPermissions();

    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        SplashScreen.setOptions({
          duration: 2500,
          fade: true,
        })
      } catch (e){
        console.warn(e);
      }finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  // Accessing the context to control the flashlight state
  // const { isOn, toggleLight } = useContext(LightBobContext);
  const { isOn } = useContext(LightBobContext);
  

  return (
    <LightBobProvider>
      <CameraView style={{ display: "none"}} enableTorch={isOn}  />
      <Stack
        screenOptions={{
          headerShown:false
        }}
      />
    </LightBobProvider>
  );
}
