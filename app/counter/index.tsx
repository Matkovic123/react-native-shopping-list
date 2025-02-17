import { intervalToDuration, isBefore } from "date-fns";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import { TimeSegment } from "../../components/TimeSegment";

//10s from now
const timeStamp = Date.now() + 10 * 1000;

type CountdownStatus = {
  isOverdue: boolean;
  distance: ReturnType<typeof intervalToDuration>;
};

export default function CounterScreen() {
  const [countdownStatus, setCountdownStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(timeStamp, Date.now());
      const distance = intervalToDuration(
        isOverdue
          ? { start: timeStamp, end: Date.now() }
          : { start: Date.now(), end: timeStamp },
      );
      setCountdownStatus({ isOverdue, distance });
    }, 1000);
    return () => clearInterval(intervalId); // basically onUnmount
  }, []);

  console.log(countdownStatus);

  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Scheduled Notification from your app",
        },
        trigger: {
          type: SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });
      console.log(result);
    } else {
      if (Device.isDevice) {
        Alert.alert(
          "Unable to schedule notification. enable notification permissions in settings for Expo Go",
        );
      }
    }
  };
  return (
    <View
      style={[
        styles.container,
        countdownStatus.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {countdownStatus.isOverdue ? (
        <Text
          style={[
            styles.heading,
            countdownStatus.isOverdue ? styles.whiteText : undefined,
          ]}
        >
          Time is up
        </Text>
      ) : (
        <>
          <Text>Due in...</Text>
        </>
      )}
      <View style={styles.row}>
        <TimeSegment
          unit="Days"
          number={countdownStatus.distance.days || 0}
          textStyle={countdownStatus.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Hours"
          number={countdownStatus.distance.hours || 0}
          textStyle={countdownStatus.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Minutes"
          number={countdownStatus.distance.minutes || 0}
          textStyle={countdownStatus.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Seconds"
          number={countdownStatus.distance.seconds || 0}
          textStyle={countdownStatus.isOverdue ? styles.whiteText : undefined}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={scheduleNotification}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  row: { flexDirection: "row", marginBottom: 22 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 24 },
  containerLate: {
    backgroundColor: theme.colorRed,
  },
  whiteText: {
    color: theme.colorWhite,
  },
});
