import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function MapScreen() {
  const handleGoBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <Pressable onPress={handleGoBack} style={styles.backButton}>
          <ThemedText style={styles.backButtonText}>← 뒤로</ThemedText>
        </Pressable>
        <ThemedText style={styles.title}>폐의약품 수거함 위치</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.mapContainer}>
        <ThemedText style={styles.mapPlaceholder}>
          🗺️ 지도가 여기에 표시됩니다
        </ThemedText>
        <ThemedText style={styles.infoText}>
          가까운 폐의약품 수거함을 찾고 있습니다...
        </ThemedText>
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
    backgroundColor: '#e8f4f8',
    margin: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d0e8f0',
    borderStyle: 'dashed',
  },
  mapPlaceholder: {
    fontSize: 24,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#5a6c7d',
    textAlign: 'center',
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
