
import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect, useContext } from "react";
import { View, Text,Platform, TouchableOpacity, StyleSheet, Settings, Pressable } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { CameraView } from "expo-camera";
import { Accelerometer } from "expo-sensors";
import { LightBobContext, LightBobProvider } from "../LightBobContext/LightBobContext";
import { Themes } from "./themes";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
  RewardedInterstitialAd,
  RewardedAdEventType,
  AdEventType
  
} from "react-native-google-mobile-ads";
import * as Notifications from 'expo-notifications';
import mobileAds from "react-native-google-mobile-ads";
import { registerForPushNotificationsAsync } from '@/utils/notificationService';  

export default function HomeScreen() {
  const THRESHOLD = 1.8 // Adjust this value based on sensitivity needs
  const router = useRouter();
  const switchButton = require("../assets/images/switch.png");
  // const [isOn, setIsOn] = useState(false);
  const { isOn, toggleLight } = useContext(LightBobContext);
  const lastShake =  useRef(0);
  const { theme } = useContext(LightBobContext);

  // Themes for the app 
  // const themes: Record<string, { stroke: string; background: string; switchBackgroundColor: string; toggleBackgroundColor: string; bulb: string; shadow: string }> = {
  //   default:{
  //     stroke: "#3cff5c",
  //     background: "#071a0c",
  //     switchBackgroundColor: "#1c2b22",
  //     toggleBackgroundColor: "#151515",
  //     bulb: "#3cff5c",
  //     shadow: "#3cff5c"
  //   },
  //   blue: {
  //     stroke: "#3c9cff",
  //     background: "#0c1a2b",
  //     switchBackgroundColor: "#1c2b22",
  //     toggleBackgroundColor: "#151515",
  //     bulb: "#3c9cff",
  //     shadow: "#3c9cff"
  //   },
  // }
  // const currentTheme = themes[theme as string] || themes["default"];
      
  // Register for push notifications on app load
    useEffect(()=>{
    (async () => {
      const token = await registerForPushNotificationsAsync();
      console.log("Push notification token:", token);

      if(token) {
        await Notifications.cancelAllScheduledNotificationsAsync();
        
        // Schedule a test notification
        await Notifications.scheduleNotificationAsync(
          {
            content: {
              title: "Flashlight App",
              body: "Hi! It's getting dark 🌜 🌘 🌚 outside. Don't forget to turn on your flashlight when needed. Let's stay safe!",
              sound: 'default',
            },
            trigger: { 
              type: Notifications.SchedulableTriggerInputTypes.DAILY,
              hour:18,
              minute:30,
              // seconds: 5,
              // repeats: true
            }
          }
        )
      }
      
    })()
  }, [])  


  
  const shakeMode = () => {
    try{
      if (lastShake.current === 0){
        // First shake detected, turn on the light
        // toggleLight();
        lastShake.current = Date.now();
        console.log("Shake detected: Light turned on");

      }

    } catch (e){
    console.error("Error setting up shake detection:", e);
  }
  }
 
      useEffect(() => {
          Accelerometer.setUpdateInterval(300); // Adjust the update interval as needed
      
          const subscription = Accelerometer.addListener((data)=>{
            const { x, y, z } = data;

            const totalAccelerationForce = Math.abs(x + y + z);
            const now  = Date.now();

            if(totalAccelerationForce > THRESHOLD && (now - lastShake.current) > 1000){
              toggleFlashlight();
              lastShake.current = now;
            }
          });
          return () => subscription.remove();
        }, [isOn]);







  // Ads section
   const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-1195350826022925/4550563259";
  
  // Rewarded Interstitial setup 1
  const adUnitIdRewarded = __DEV__
    ? TestIds.REWARDED_INTERSTITIAL
    : "ca-app-pub-1195350826022925/2850608390";

  // Rewarded Interstitial setup 2
  const adUnitIdRewardedLightTurnedOff = __DEV__
    ? TestIds.REWARDED_INTERSTITIAL
    : "ca-app-pub-1195350826022925/8313119802";

    const bannerRef = React.useRef<BannerAd>(null);

     // Rewarded Interstitial setup
  const rewardedInterstitial = React.useRef(
    RewardedInterstitialAd.createForAdRequest(adUnitIdRewarded, {
      keywords: ["flashlight", "utility"],
    })
  ).current;

  // Rewarded Interstitial setup for light turned off (optional, can be used for different rewards or logic)
  const rewardedInterstitialLightOff = React.useRef(
    RewardedInterstitialAd.createForAdRequest(adUnitIdRewardedLightTurnedOff, {
      keywords: ["flashlight", "utility"],
    })
  ).current;

    const [loaded, setLoaded] = React.useState(false);
    const [lightOffAdLoaded, setLightOffAdLoaded] = React.useState(false);

  React.useEffect(() => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        console.log("Rewarded interstitial ad loaded");
      }
    );
    const unsubClosed = rewardedInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded(false);
        rewardedInterstitial.load(); // reload next ad
      }
    );
   

    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward:", reward);
      }
    );

    rewardedInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubClosed();
    };
  }, [rewardedInterstitial]);

  // Rewarded Interstitial setup for light turned off 
    React.useEffect(() => {
    const unsubscribeLoaded =   rewardedInterstitialLightOff.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLightOffAdLoaded(true);
        console.log("Rewarded interstitial ad loaded");
      }
    );

     const unsubClosed = rewardedInterstitialLightOff.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLightOffAdLoaded(false);
        rewardedInterstitialLightOff.load(); // Preload the next ad when one is closed
        console.log("Rewarded interstitial ad closed, loading next ad");
      }
    );

    const unsubscribeEarned = rewardedInterstitialLightOff.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward:", reward);
      }
    );

    rewardedInterstitialLightOff.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubClosed();
    };
  }, [rewardedInterstitialLightOff]);

  // Banner reload for iOS foreground
  useForeground(() => {
    if (Platform.OS === "ios" && bannerRef.current) {
      try {
        bannerRef.current.load();
      } catch (e) {
        console.log("Banner reload error", e);
      }
    }
  });

    const toggleFlashlight = async () => {
    // setIsOn(previousState => !previousState);
    try{
      if (!isOn) {
        if (loaded) {
         await rewardedInterstitial.show();
         toggleLight(); // Toggle light after showing ad
        } else {
          console.log("Ad not loaded yet, toggling light without ad");
          toggleLight();
        }
      } else {
        if (lightOffAdLoaded) {
         toggleLight(); // Toggle light before showing ad to reflect immediate feedback
         await rewardedInterstitialLightOff.show();
        } else {
          console.log("Light off ad not loaded yet, toggling light without ad");
          toggleLight();
        }
      }
     
    } catch (e){
      console.error("Error showing rewarded interstitial ad:", e);
      toggleLight(); // Fallback to toggling light if ad fails
    }
  };


  useEffect(() => {
    mobileAds()
     .setRequestConfiguration({
      testDeviceIdentifiers: ["EMULATOR"], // or your real device ID later
    })
    .then(() => {
      mobileAds().initialize()
      console.log("Mobile Ads initialized");
    });
  }, []);

  return (
  
    <View style={[styles.container, { backgroundColor: isOn ? Themes.darkBrownTheme.background : Themes.default.background }]}>
      <StatusBar style="light" />
      <CameraView
        style={{display: "none"}}
        enableTorch={isOn}
        />
      {/* Top Icons */}
      <View style={styles.topRow}>
        {/* <TouchableOpacity onPress={() => router.push("/settings")} style={styles.iconCircle}>
          <Text>⚙️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/gift")} style={styles.iconCircle}>
          <Text>🎁</Text>
          <View style={styles.dot} />
        </TouchableOpacity> */}
      </View>

      {/* Center Glow Area */}
      <View style={styles.center}>
        
        {/* Dotted ellipse */}
        <Svg height="300" width="300" style={{ position: "absolute" }}>
          <Ellipse
            cx="150"
            cy="150"
            rx="120"
            ry="120"
            // stroke="#3cff5c"
            stroke={isOn ? Themes.darkBrownTheme.stroke : Themes.default.stroke}
            strokeWidth="5"
            fill="none"
            strokeDasharray="520,89"
          />
          
        </Svg>
        <Svg height="200" width="200" style={{  position: "absolute", alignSelf: "center" }}>
            <Ellipse
              cx="100"
              cy="100"
              rx="80"
              ry="80"
              // stroke="#3cff5c"
              stroke={isOn ? Themes.darkBrownTheme.stroke : Themes.default.stroke}
              strokeWidth="2"
              fill="none"
              strokeDasharray="3,8"
            />
          </Svg>
          


        {/* Bulb */}
        <TouchableOpacity onPress={()=>{toggleFlashlight()}} style={[styles.bulb, { backgroundColor: isOn ? Themes.darkBrownTheme.bulb : Themes.default.bulb }, {shadowColor: isOn ? Themes.darkBrownTheme.shadow : Themes.default.shadow}
          , isOn ? {shadowOffset: Themes.darkBrownTheme.shadowOffset, shadowRadius: Themes.darkBrownTheme.shadowRadius, elevation: Themes.darkBrownTheme.elevation, boxShadow: Themes.darkBrownTheme.boxShadow} : {}
        ]} >
            <Image source={switchButton} style={{ width: 100, height: 100, alignSelf: "center" }} />
        </TouchableOpacity>

        {/* </View> */}
      </View>

      {/* Bottom Button */}
      <Pressable onPress={shakeMode} style={styles.bottom}>
        <View style={[styles.toggle, { backgroundColor: isOn ? Themes.darkBrownTheme.toggleBackgroundColor : Themes.default.toggleBackgroundColor }]}>
          <Text style={{ color: isOn ? Themes.darkBrownTheme.shakeText : Themes.default.shakeText, fontWeight: "bold" }}>Shake</Text>
          <View style={styles.switch}>
            <Text style={{ color: "#151515", fontWeight: "bold" }} >{isOn ? "On" : "Off"}</Text>
          </View>
        </View>
      </Pressable>
      {/* blew will be a banner ad */}
      <View style={{ height: 60, marginHorizontal: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
        {Platform.OS !== "web" && (
          <BannerAd
            ref={bannerRef}
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
              networkExtras: { collapsible: "bottom" },
            }}
            onAdLoaded={() => console.log("Banner loaded")}
            onAdFailedToLoad={(e) => console.log("Banner failed:", e)}
          />
        )}
      </View>

    </View>
  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#071a0c",
    // backgroundColor: {isOn ? Themes.darkBrownTheme.stroke : Themes.default.stroke},
    justifyContent: "space-between",
    paddingVertical: 40,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1c2b22",
    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4cff6a",
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  bulb: {
    width: 120,
    height: 120,
    justifyContent: "center",
    borderRadius: 100, //60
    // backgroundColor: "#3cff5c",
    // shadowColor: "#3cff5c",
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 20,
  },

  bottom: {
    alignItems: "center",
  },

  toggle: {
    flexDirection: "row",
    // backgroundColor: "#4cff6a",
    padding: 6,
    borderRadius: 25,
    alignItems: "center",
    gap: 10,
  },

  switch: {
    backgroundColor: "#baffc5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

 


});