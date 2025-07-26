import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [points, setPoints] = useState(1250);
  const [completedStamps, setCompletedStamps] = useState(3);
  const [canCertify, setCanCertify] = useState(true);

  const handleLocationSearch = () => {
    router.push('/(tabs)/explore');
  };

  const handleMedicineDisposal = () => {
    router.push('/medicine-disposal');
  };

  const handlePointStore = () => {
    router.push('/point-store');
  };

  const handleCertification = () => {
    if (!canCertify) {
      Alert.alert('인증 불가', '오늘은 이미 인증을 완료했습니다.\n내일 다시 시도해주세요.');
      return;
    }

    // 스탬프 인증 로직
    const newStamps = completedStamps + 1;
    const earnedPoints = 50; // 인증당 50 포인트

    setCompletedStamps(newStamps);
    setPoints(prev => prev + earnedPoints);
    setCanCertify(false);

    if (newStamps === 10) {
      Alert.alert(
        '축하합니다! 🎉', 
        `스탬프 10개를 모두 모았습니다!\n보너스 200 포인트를 받았습니다!`,
        [
          {
            text: '확인',
            onPress: () => {
              setPoints(prev => prev + 200);
              setCompletedStamps(0); // 스탬프 초기화
              setCanCertify(true);
            }
          }
        ]
      );
    } else {
      Alert.alert(
        '인증 완료! ✅',
        `폐의약품 수거함 인증이 완료되었습니다.\n+${earnedPoints} 포인트를 획득했습니다!`
      );
    }
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
            <ThemedText style={styles.pointValue}>P {points.toLocaleString()}</ThemedText>
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
        <ThemedText type="subtitle">주요 서비스</ThemedText>
        <ThemedView style={styles.actionButtonsContainer}>
          <Pressable onPress={handleMedicineDisposal} style={styles.actionButton}>
            <ThemedText style={styles.actionButtonText}>폐의약품 분리배출</ThemedText>
          </Pressable>
          <Pressable onPress={handlePointStore} style={styles.actionButton}>
            <ThemedText style={styles.actionButtonText}>포인트 상점</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">약템프를 찍어보자</ThemedText>
        <ThemedText style={styles.stampProgress}>
          {canCertify ? '오늘 인증이 가능합니다!' : '인증은 하루 한 번만 참여 할 수 있어요.'}
        </ThemedText>
        <ThemedView style={styles.stampGrid}>
          {Array.from({ length: 10 }, (_, index) => (
            <ThemedView 
              key={index} 
              style={[
                styles.stampSlot,
                index < completedStamps && styles.completedStamp
              ]}
            >
              <ThemedText style={styles.stampNumber}>{index + 1}</ThemedText>
              {index < completedStamps && (
                <ThemedText style={styles.stampIcon}>✓</ThemedText>
              )}
            </ThemedView>
          ))}
          <Pressable 
            style={[
              styles.certificationButton,
              !canCertify && styles.disabledButton
            ]}
            onPress={handleCertification}
            disabled={!canCertify}
          >
            <ThemedText style={[
              styles.certificationButtonText,
              !canCertify && styles.disabledButtonText
            ]}>
              {canCertify ? '폐의약품 수거함 인증' : '오늘 인증 완료'}
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.lastStepContainer}>
        <ThemedView style={styles.lastStepTitle}>
          <ThemedText type="subtitle">건강하게 버리고, 똑똑하게 쓰는 법</ThemedText>
        </ThemedView>
        
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedView style={styles.tipItem}>
            <ThemedText type="defaultSemiBold" style={styles.tipNumber}>04</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.tipText}>
              생분해 비닐 사용 시 환경오염 5% 감소 효과!
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.tipItem}>
            <ThemedText type="defaultSemiBold" style={styles.tipNumber}>05</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.tipText}>
              폐의약품 안전 처리로 토양 오염 방지!
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.tipItem}>
            <ThemedText type="defaultSemiBold" style={styles.tipText}>
              재활용 포장재 사용으로 탄소 발자국 감소!
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.tipItem}>
            <ThemedText type="defaultSemiBold" style={styles.tipText}>
              올바른 의약품 분리배출로 수질 보호!
            </ThemedText>
          </ThemedView>
        </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'center',
    width: 78,
    height: 32,
    flexShrink: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'rgba(107, 107, 107, 1)',
  },
  pointValue: {
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    backgroundColor: '#eeeeee',
    gap: 8,
    marginBottom: -16,
    marginHorizontal: -32,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  lastStepContainer: {
    backgroundColor: '#eeeeee',
    gap: 8,
    marginBottom: -16,
    marginHorizontal: -32,
    paddingVertical: 16,
  },
  lastStepTitle: {
    paddingHorizontal: 32,
    backgroundColor: '#eeeeee',
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
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#35C8BA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  certificationButton: {
    backgroundColor: '#35C8BA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: '5%',
    width: '90%',
    alignItems: 'center',
    marginTop: 16,
  },
  certificationButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  completedStamp: {
    backgroundColor: '#35C8BA',
    borderColor: '#35C8BA',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  disabledButtonText: {
    color: '#666666',
  },
  horizontalScroll: {
    height: 150,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  tipItem: {
    backgroundColor: '#7d7d7d',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#7d7d7d',
    minWidth: 160,
    minHeight: 150,
    justifyContent: 'flex-end',
  },
  tipNumber: {
    fontSize: 16,
    color: '#35C8BA',
    textAlign: 'left',
  },
  tipText: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'left',
    maxWidth: 200,
  },
  stampGrid: {
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  stampSlot: {
    width: 48,
    height: 48,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  stampNumber: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  stampIcon: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
    position: 'absolute',
  },
  stampProgress: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    marginTop: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
