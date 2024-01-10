import * as React from "react";
import * as RN from "react-native";
import EmojiPicker from "rn-emoji-keyboard";
import { database } from "../config/fb";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Add() {
    const navegation = useNavigation();

    const [isOpen, setIsOpen] = React.useState(false);

    const [newItem, setNewItem] = React.useState({
        emoji: "⚛️",
        title: "",
        author: "",
        year: "",
        description: "",
        createAt: new Date(),
    })

    const onSend = async () => {
        await addDoc(collection(database, "books"), newItem);
        navegation.goBack();
    }

    const handlePick = (emojiObject) => {
        setNewItem({
            ...newItem,
            emoji: emojiObject.emoji,
        });

        /* Ejemplo emojiObject = {
            "emoji": "",
            "name": "red heart",
            "slug": "red_heart",
        }
        */
    }

    return(
        <RN.View style={styles.container}>
            <RN.Text style={styles.title}>Agregar Nuevo Libro</RN.Text>
            <RN.Text style={styles.emoji} onPress={() => setIsOpen(true)}>{newItem.emoji}</RN.Text>
            <EmojiPicker
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <RN.TextInput 
                onChangeText={(text) => setNewItem({...newItem, title:text})}
                placeholder="Nombre del Libro"
                style={styles.inputContainer}
            />
            <RN.TextInput 
                onChangeText={(text) => setNewItem({...newItem, author:text})}
                placeholder="Nombre del Autor"
                style={styles.inputContainer}
            />
            <RN.TextInput 
                onChangeText={(text) => setNewItem({...newItem, year:text})}
                placeholder="Año de la Publicación"
                style={styles.inputContainer}
            />
            <RN.TextInput 
                onChangeText={(text) => setNewItem({...newItem, description:text})}
                placeholder="Descripción del Libro"
                style={styles.inputContainer}
            />
            <RN.Button title="Publicar" onPress={onSend} />
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
    },
    inputContainer: {
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
    },
    emoji: {
        fontSize: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        marginVertical: 6
    }
})