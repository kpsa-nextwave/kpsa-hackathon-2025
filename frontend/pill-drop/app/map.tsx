import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native"; // 추가

const BUTTONS = [
  { label: "약국", keyword: "약국" },
  { label: "우체통", keyword: "우체국" },
  { label: "공공기관", keyword: "공공기관" },
  { label: "어린이집", keyword: "어린이집" },
];

export default function KakaoMapScreen() {
  const navigation = useNavigation(); // 네비게이션 객체 가져오기

  React.useEffect(() => {
    navigation.setOptions({
      title: "내 주변 폐의약품 수거함", // 헤더 제목 변경
    });
  }, [navigation]);

  const [selected, setSelected] = useState(0);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        html, body, #map {
          height: 100%;
          margin: 0;
          padding: 0;
        }
      </style>
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=98aa55cc0691e15498051fef4f56cd0a&libraries=services&autoload=false"></script>
    </head>
    <body>
      <div id="map"></div>
      <script>
        kakao.maps.load(function () {
          var container = document.getElementById('map');
          var options = {
            center: new kakao.maps.LatLng(37.364049, 126.718033),
            level: 3
          };
          var map = new kakao.maps.Map(container, options);

          // 기본 마커
          var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(37.364049, 126.718033),
            map: map
          });
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      {/* 지도 WebView */}
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        style={{ flex: 1 }}
        onError={(e) => console.log("WebView error:", e.nativeEvent)}
        onHttpError={(e) => console.log("HTTP error:", e.nativeEvent)}
      />
      {/* 상단 버튼 영역 - 지도 위에 오버레이로 배치 */}
      <View style={styles.buttonOverlay}>
        <View style={styles.buttonContainer}>
          {BUTTONS.map((btn, idx) => (
            <TouchableOpacity
              key={btn.label}
              style={[styles.button, selected === idx && styles.buttonSelected]}
              onPress={() => setSelected(idx)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.buttonText,
                  selected === idx && styles.buttonTextSelected,
                ]}
              >
                {btn.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 18, // 상태바/헤더 고려
    zIndex: 10,
    backgroundColor: "transparent",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "transparent",
    gap: 8,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2,
  },
  buttonSelected: {
    backgroundColor: "#fff",
    borderColor: "#444",
    elevation: 4,
  },
  buttonText: {
    color: "#444",
    fontWeight: "bold",
    fontSize: 15,
  },
  buttonTextSelected: {
    color: "#444",
  },
});
