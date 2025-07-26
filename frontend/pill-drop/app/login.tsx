import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // 간단한 로그인 로직 (실제로는 서버 인증 필요)
    if (email && password) {
      // 로그인 성공 시 메인 페이지로 이동
      router.replace('/(tabs)');
    } else {
      Alert.alert('로그인 실패', '이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleSignUp = () => {
    Alert.alert('회원가입', '회원가입 기능은 준비 중입니다.');
  };

  const handleGuestLogin = () => {
    // 비회원으로 메인 페이지로 이동
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.logoSection}>
        <ThemedText style={styles.appTitle}>버려요약</ThemedText>
        <ThemedText style={styles.subtitle}>폐의약품 안전 수거 서비스</ThemedText>
      </ThemedView>

      <ThemedView style={styles.formSection}>
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>이메일</ThemedText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="이메일을 입력하세요"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>비밀번호</ThemedText>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호를 입력하세요"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
          />
        </ThemedView>

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <ThemedText style={styles.loginButtonText}>로그인</ThemedText>
        </Pressable>

        <Pressable style={styles.signUpButton} onPress={handleSignUp}>
          <ThemedText style={styles.signUpButtonText}>회원가입</ThemedText>
        </Pressable>

        <Pressable style={styles.guestButton} onPress={handleGuestLogin}>
          <ThemedText style={styles.guestButtonText}>비회원으로 입장하기</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.footerSection}>
        <ThemedText style={styles.footerText}>
          건강한 환경을 위한 첫걸음{'\n'}폐의약품 올바른 처리
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#35C8BA',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formSection: {
    width: '100%',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#35C8BA',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#35C8BA',
  },
  signUpButtonText: {
    color: '#35C8BA',
    fontSize: 16,
    fontWeight: '600',
  },
  guestButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  guestButtonText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  footerSection: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});
