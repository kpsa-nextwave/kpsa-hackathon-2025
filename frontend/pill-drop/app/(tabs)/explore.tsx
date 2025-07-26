import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function TabTwoScreen() {
  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>폐의약품 수거함 지도</title>
        <script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID"></script>
        <style>
            body { margin: 0; padding: 0; }
            #map { width: 100%; height: 100vh; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            var map = new naver.maps.Map('map', {
                center: new naver.maps.LatLng(37.5665, 126.9780),
                zoom: 15
            });

            // 폐의약품 수거함 위치 (샘플 데이터)
            var locations = [
                {lat: 37.5665, lng: 126.9780, name: "서울시청 약국", addr: "서울 중구 세종대로 110"},
                {lat: 37.5651, lng: 126.9895, name: "명동 건강약국", addr: "서울 중구 명동길 74"},
                {lat: 37.5700, lng: 126.9870, name: "종로 메디약국", addr: "서울 종로구 종로 51"},
                {lat: 37.5620, lng: 126.9830, name: "남산 온누리약국", addr: "서울 중구 남산공원길 105"}
            ];

            locations.forEach(function(location) {
                var marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(location.lat, location.lng),
                    map: map,
                    title: location.name,
                    icon: {
                        content: '<div style="background: #35C8BA; color: white; padding: 8px; border-radius: 50%; width: 20px; height: 20px; text-align: center; font-size: 12px; font-weight: bold;">💊</div>',
                        size: new naver.maps.Size(36, 36),
                        anchor: new naver.maps.Point(18, 18)
                    }
                });

                var infoWindow = new naver.maps.InfoWindow({
                    content: '<div style="padding:10px; min-width:200px;"><strong>' + location.name + '</strong><br>' + location.addr + '<br><span style="color: #35C8BA;">폐의약품 수거함 운영</span></div>'
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
        <ThemedText style={styles.headerTitle}>내 주변 폐의약품 수거함</ThemedText>
        <ThemedText style={styles.headerSubtitle}>가까운 수거함을 찾아보세요</ThemedText>
      </ThemedView>
      <WebView
        source={{ html: mapHTML }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: '#35C8BA',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  webview: {
    flex: 1,
  },
});
