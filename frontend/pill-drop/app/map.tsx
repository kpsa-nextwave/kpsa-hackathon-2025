import Constants from 'expo-constants';
import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function MapScreen() {
  const handleGoBack = () => {
    router.back();
  };

  // 네이버 지도 웹 버전 HTML
  const naverMapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <title>폐의약품 수거함 위치</title>
        <script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${Constants.expoConfig?.extra?.naverMapClientId || 'your_client_id'}"></script>
        <style>
            body { margin: 0; padding: 0; }
            #map { width: 100%; height: 100vh; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            var map = new naver.maps.Map('map', {
                center: new naver.maps.LatLng(37.5666805, 126.9784147),
                zoom: 15
            });

            // 폐의약품 수거함 마커들
            var locations = [
                {
                    position: new naver.maps.LatLng(37.5676805, 126.9774147),
                    title: '서울대학교병원',
                    content: '<div style="padding:10px;"><b>서울대학교병원</b><br/>폐의약품 수거함<br/>0.5km</div>'
                },
                {
                    position: new naver.maps.LatLng(37.5656805, 126.9794147),
                    title: '종로구 보건소',
                    content: '<div style="padding:10px;"><b>종로구 보건소</b><br/>폐의약품 수거함<br/>1.2km</div>'
                },
                {
                    position: new naver.maps.LatLng(37.5646805, 126.9804147),
                    title: '마이약국',
                    content: '<div style="padding:10px;"><b>마이약국</b><br/>폐의약품 수거함<br/>1.8km</div>'
                }
            ];

            locations.forEach(function(location, index) {
                var marker = new naver.maps.Marker({
                    position: location.position,
                    map: map,
                    title: location.title,
                    icon: {
                        content: '<div style="background-color: #007AFF; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold;">💊</div>',
                        size: new naver.maps.Size(40, 40),
                        anchor: new naver.maps.Point(20, 40)
                    }
                });

                var infoWindow = new naver.maps.InfoWindow({
                    content: location.content
                });

                naver.maps.Event.addListener(marker, 'click', function() {
                    if (infoWindow.getMap()) {
                        infoWindow.close();
                    } else {
                        infoWindow.open(map, marker);
                    }
                });
            });
        </script>
    </body>
    </html>
  `;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <Pressable onPress={handleGoBack} style={styles.backButton}>
          <ThemedText style={styles.backButtonText}>← 뒤로</ThemedText>
        </Pressable>
        <ThemedText style={styles.title}>폐의약품 수거함 위치</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.mapContainer}>
        <WebView
          source={{ html: naverMapHTML }}
          style={styles.map}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        />
      </ThemedView>
      
      <ThemedView style={styles.locationList}>
        <ThemedText style={styles.listTitle}>가까운 수거함</ThemedText>
        
        <ThemedView style={styles.locationItem}>
          <ThemedText style={styles.locationName}>서울대학교병원</ThemedText>
          <ThemedText style={styles.locationDistance}>0.5km</ThemedText>
          <ThemedText style={styles.locationAddress}>서울특별시 종로구 대학로 101</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.locationItem}>
          <ThemedText style={styles.locationName}>종로구 보건소</ThemedText>
          <ThemedText style={styles.locationDistance}>1.2km</ThemedText>
          <ThemedText style={styles.locationAddress}>서울특별시 종로구 종로 1-1</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.locationItem}>
          <ThemedText style={styles.locationName}>마이약국</ThemedText>
          <ThemedText style={styles.locationDistance}>1.8km</ThemedText>
          <ThemedText style={styles.locationAddress}>서울특별시 종로구 세종로 1-1</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d0e8f0',
  },
  map: {
    flex: 1,
  },
  locationList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  locationItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  locationDistance: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 12,
    color: '#5a6c7d',
  },
});
