import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0984E3",
    paddingVertical: 120
  },
  imageAnimal: { width: 256, height: 256, borderRadius: 10, backgroundColor: "#fff" },
  text: { width: "90%", backgroundColor: "#E67800", color: "#000", borderRadius: 16, padding: 12 },
  select: { width: 256, backgroundColor: "#fff" },
  button: { position: "absolute", top: "5%", left: "5%", backgroundColor: "#fff", padding: 12, borderRadius: 30, alignItems: "center" },
})