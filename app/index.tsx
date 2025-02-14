import { useState } from "react";
import { StyleSheet, TextInput, View, FlatList, Text } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";

type ShoppingListItemType = {
  id: string;
  name: string;
};

export default function App() {
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);

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
    <FlatList
      data={shoppingList}
      renderItem={({ item }) => <ShoppingListItem name={item.name} />}
      stickyHeaderIndices={[0]}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.textInput}
          placeholder="e.g. Coffee"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
    >
      {shoppingList.map((item) => (
        <ShoppingListItem key={item.id} name={item.name} />
      ))}
    </FlatList>
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
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});
