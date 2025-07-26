import { Redirect } from 'expo-router';

export default function Index() {
  // 로그인 페이지로 리다이렉트
  return <Redirect href="/login" />;
}
