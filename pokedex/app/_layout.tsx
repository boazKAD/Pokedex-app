import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="index"
      options={{
        title: "Home",
      }}
    />
    <Stack.Screen
      name="details"
      options={{
        title: "Details Page",
        headerBackButtonDisplayMode: "minimal",
        presentation: "modal",
        sheetAllowedDetents: [0.5],
        sheetGrabberVisible: true,
        // headerShown: false,

      }}
    />
  </Stack>;
}
