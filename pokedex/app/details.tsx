import { useLocalSearchParams } from "expo-router";
import { use, useEffect, useState } from "react";
import {
  Image,
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";

export default function Details() {

    const params = useLocalSearchParams();
    console.log("Details Page Params:", params.name);

    useEffect(() => {}, []);
    async function fetchPockemonByName(name: string) {
        try {
            
        } catch (error) {
            
        }
    }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
        <Text>Details Page</Text>
        <Text>More details about the Pokémon will be displayed here.</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({});
