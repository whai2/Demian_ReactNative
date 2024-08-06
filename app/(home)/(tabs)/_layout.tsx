import { Redirect, Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import useAuth from '@/hooks/zustand/useAuth';

export default function TabLayout() {
  const { userToken } = useAuth();
  
  if (!userToken) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: '',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myProfile"
        options={{
          title: 'MyProfile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
        />
    </Tabs>
  )
}