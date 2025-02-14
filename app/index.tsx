import { useState } from "react";
import { StyleSheet, TextInput, View, ScrollView } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";

type ShoppingListItemType = {
  id: string;
  name: string;
};

const initialList: ShoppingListItemType[] = [
  { id: "1", name: "Coffee" },
  { id: "2", name: "Tea" },
  { id: "3", name: "Milk" },
];

export default function App() {
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] = useState(initialList);

  const handleSubmit = () => {
    if (value) {
      setShoppingList([
        { id: new Date().toTimeString(), name: value },
        ...shoppingList,
      ]);
    }
    setValue("");
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    >
      <TextInput
        value={value}
        onChangeText={setValue}
        style={styles.textInput}
        placeholder="e.g. Coffee"
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      {shoppingList.map((item) => (
        <ShoppingListItem key={item.id} name={item.name} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 12,
  },
  contentContainer: {
    paddingTop: 12,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  },
});
