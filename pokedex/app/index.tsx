import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";

interface Pockemon {
  name: string;
  image: string;
  imageBack: string;
  types: PockemonType[];
}
interface PockemonType {
  type: {
    name: string;
    url: string;
  };
}
const colorsByType = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  bug: "#A8B820",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  rock: "#B8A038",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};
export default function Index() {
  const [pockemons, setPockemonData] = useState<Pockemon[]>([]);
  const [loading, setLoading] = useState(true);

  console.log("Pockemons:", JSON.stringify(pockemons[0], null, 2));
  useEffect(() => {
    fetchPockemonData();
  }, []);

  async function fetchPockemonData() {
    try {
      setLoading(true);
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10"
      );
      const data = await response.json();

      const detailedPockemons = await Promise.all(
        data.results.map(async (pockemon: any) => {
          const res = await fetch(pockemon.url);
          const details = await res.json();
          return {
            name: details.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        })
      );

      setPockemonData(detailedPockemons);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  // Show loading indicator
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading Pokémon...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {pockemons.map((pockemon) => (
        <Link key={pockemon.name} 
        href={{pathname:"/details", params:{name:pockemon.name}}}
        style={{
            // @ts-ignore
            backgroundColor: colorsByType[pockemon.types[0].type.name] + 50,
            padding: 20,
            borderRadius: 20,
          }}>
          
          <View>
            <Text style={styles.name}>{pockemon.name}</Text>
            <Text style={styles.type}>{pockemon.types[0].type.name}</Text>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: 'space-around',
                // alignItems: 'center'
              }}
            >
              <Image
                source={{ uri: pockemon.image }}
                style={{ width: 150, height: 150 }}
              />
              <Image
                source={{ uri: pockemon.imageBack }}
                style={{ width: 150, height: 150 }}
              />
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
});
