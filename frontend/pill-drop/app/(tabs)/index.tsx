import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const handleLocationSearch = () => {
    router.push('/map');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <ThemedView style={styles.headerContainer}>
          <ThemedView style={styles.logoSection}>
            <Image
              source={require('@/assets/images/partial-react-logo.png')}
              style={styles.logo}
            />
            <ThemedText style={styles.appName}>버려요약</ThemedText>
          </ThemedView>
          <ThemedView style={styles.pointSection}>
            <ThemedText style={styles.pointLabel}>내 포인트</ThemedText>
            <ThemedText style={styles.pointValue}>1,250P</ThemedText>
          </ThemedView>
        </ThemedView>
      }>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">내 주변 폐의약품 수거함</ThemedText>
        <Pressable onPress={handleLocationSearch} style={styles.locationButton}>
          <ThemedText style={styles.locationButtonText}>위치 찾기</ThemedText>
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">약템프를 찍어보자</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">건강하게 버리고, 똑똑하게 쓰는 법</ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">생분해 비닐 사용 시 환경오염 5% 감소 효과!</ThemedText>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    height: 40,
    width: 40,
    borderRadius: 8,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  pointSection: {
    alignItems: 'flex-end',
  },
  pointLabel: {
    fontSize: 12,
    color: '#5a6c7d',
    marginBottom: 2,
  },
  pointValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  locationButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  locationButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
