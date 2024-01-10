import * as React from "react";
import * as RN from "react-native";
import { database } from "../config/fb";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

export default function Book({
    id,
    title,
    author,
    year,
    description,
    emoji,
}) {

    const [textTitle, onChangeTextTitle] = React.useState(title);
    const [textAuthor, onChangeTextAuthor] = React.useState(author);
    const [textYear, onChangeTextYear] = React.useState(year);
    const [textDescription, onChangeTextDescription] = React.useState(description);

    async function UpdateUser() {
        const ref = doc(database, 'books', id)
        await updateDoc(ref, {
            title: textTitle,
            author: textAuthor,
            year: textYear,
            description: textDescription,
        }).then(() => {
            handleCloseEdit();
            alert("Libro Actualizado Correctamente!");
        })
    }

    const onDelete = () => {
        const docRef = doc(database, "books", id);
        deleteDoc(docRef)
        .then(() => {
            alert("Libro Eliminado Correctamente!");
        }).catch((error) => {
            alert(error.message)
        });
    }

    const [modalVisible, setModalVisible] = React.useState(false);

    const handleShowDetails = () => {
        setModalVisible(true);
    };

    const handleCloseDetails = () => {
        setModalVisible(false);
    };

    const [showEditModal, setShowEditModal] = React.useState(false);

    const handleShowEdit = () => {
        setShowEditModal(true);
    };

    const handleCloseEdit = () => {
        setShowEditModal(false);
    };

    return (
        <RN.View style={styles.bookContainer}>
            <RN.View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <AntDesign onPress={onDelete} name="delete" size={24} />
            </RN.View>
            <RN.Text style={styles.emoji} >{emoji}</RN.Text>
            <RN.Text style={styles.title} >{title}</RN.Text>
            <RN.Text style={styles.author} >{author}</RN.Text>
            <RN.TouchableOpacity style={styles.button} onPress={handleShowDetails}>
                <RN.Text style={styles.buttonText}>Ver Detalles</RN.Text>
                    <RN.Modal
                        style={styles.card}
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <RN.View style={styles.modal}>
                            <RN.Text style={styles.emoji}>{emoji}</RN.Text>
                            <RN.Text style={styles.cardTitle}>Titulo del Libro: {title}</RN.Text>
                            <RN.Text style={styles.cardTitle}>Autor del Libro: {author}</RN.Text>
                            <RN.Text style={styles.cardTitle}>Año de Publicación {year}</RN.Text>
                            <RN.Text style={styles.cardDescription}>Descripción del Libro:{description}</RN.Text>
                            <RN.TouchableOpacity style={styles.buttonModal} onPress={handleCloseDetails}>
                                <RN.Text style={styles.buttonTextModal}>Cerrar</RN.Text>
                            </RN.TouchableOpacity>
                        </RN.View>
                    </RN.Modal>
            </RN.TouchableOpacity>

            <RN.TouchableOpacity style={styles.buttonEdit} onPress={handleShowEdit}>
                <RN.Text style={styles.buttonText}>Editar Libro</RN.Text>
                    <RN.Modal
                        style={styles.card}
                        animationType="slide"
                        transparent={true}
                        visible={showEditModal}
                        onRequestClose={() => {
                            setShowEditModal(!showEditModal);
                        }}
                    >
                        <RN.View style={styles.containerUpdate}>
                            <RN.TextInput 
                                style={styles.textfield}
                                onChangeText={onChangeTextTitle}
                                value={textTitle}
                                placeholder="Titulo del Libro"/>
                            <RN.TextInput 
                                style={styles.textfield}
                                onChangeText={onChangeTextAuthor}
                                value={textAuthor}
                                placeholder="Autor del Libro"/>
                            <RN.TextInput 
                                style={styles.textfield}
                                onChangeText={onChangeTextYear}
                                value={textYear}
                                placeholder="Año de la Publicación"/>
                            <RN.TextInput 
                                style={styles.textfield}
                                onChangeText={onChangeTextDescription}
                                value={textDescription}
                                placeholder="Descripción del Libro"/>
                            <RN.Pressable style={styles.buttonUpdate} onPress={UpdateUser}>
                                <RN.Text>Actualizar Libro</RN.Text>
                            </RN.Pressable>
                        </RN.View>
                    </RN.Modal>
            </RN.TouchableOpacity>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    bookContainer: {
        padding: 16,
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 8,
    },
    emoji: {
        fontSize: 100,
        textAlign: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    author: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#808B96',
        textAlign: 'center',
    },
    button: {
        backgroundColor: "#2ECC71",
        padding: 5,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonEdit: {
        backgroundColor: "#03A9F4",
        padding: 5,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#FDFEFE",
    },
    buttonModal: {
        margin: 10,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    buttonTextModal: {
        color: '#fff',
        textAlign: 'center',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(244, 246, 247, 0.9)',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        width: '80%',
    },
    cardTitle: {
        fontSize: 24,
        backgroundColor: 'rgba(207, 216, 220, 0.5)',
        margin: 16,
        borderRadius: 8,
        marginVertical: 8,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 16,
    },
    cardDescription: {
        textAlign: 'center',
        fontSize: 16,
        margin: 10,
    },
    containerUpdate: {
        margin: 30,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(244, 246, 247, 0.9)',
    },
    textfield: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: "#000000",
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
    },
    buttonUpdate: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#0de065',
    },
})