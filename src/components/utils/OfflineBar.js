import {
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import { Dimensions } from "react-native";
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { SafeAreaView } from "react-native-safe-area-context";
  
  export default function OfflineBar() {
    const { width } = Dimensions.get("window");

    const styles = StyleSheet.create({
      offLineBar: {
        width: width,
        backgroundColor: 'red',
      },
      safeArea: {
        width: width,
        paddingHorizontal: 10,
        paddingVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      },
      offlineText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 12
      }
    });
  
    return (
            <View style={styles.offLineBar}>
      <SafeAreaView style={styles.safeArea}>
                <Ionicons name="cloud-offline-outline" size={12} color="#fff" />
                <Text style={styles.offlineText}>Your device is currently offline</Text>
                </SafeAreaView>
            </View>
    );
  }
  