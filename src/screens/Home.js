import * as React from "react";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";
import { database } from "../config/fb";
import { QuerySnapshot, collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import Book from "../components/Book";

export default function Home() {
    const navegation = useNavigation();

    const [books, setBooks] = React.useState([]);

    React.useLayoutEffect(() => {
        navegation.setOptions({
            headerRight: () => <RN.Button title="Agregar" onPress={() => navegation.navigate("Add")} ></RN.Button>
        })
    }, [])

    React.useEffect(() => {
        const collectionRef = collection(database, 'books');
        const q = query(collectionRef, orderBy("author", 'asc'));

        const unsuscribe = onSnapshot(q, querySnapshot => {
            setBooks(querySnapshot.docs.map(doc => ({
                id: doc.id,
                emoji: doc.data().emoji,
                title: doc.data().title,
                author: doc.data().author,
                year: doc.data().year,
                description: doc.data().description,
            })
            )
        )})
        return unsuscribe;
    },[])

    return(
        <>
            <RN.Text style={{textAlign:"center", marginTop:12, fontSize:20, fontWeight:"700",}}>Lista de Libros</RN.Text>
            {books.map(book => <Book key={book.id} {...book} />)}
        </>
    )
}