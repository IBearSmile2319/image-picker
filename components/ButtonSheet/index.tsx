import { Alert, FlatList, Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import ButtonCustom from '../ButtonCustom';
import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
    ImagePickerResult,
    MediaTypeOptions,
    launchImageLibraryAsync,
    CameraPermissionResponse,

} from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { colors } from '../../constants/Colors';
interface IButtonSheetProps {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    children?: React.ReactNode;
}

const ButtonSheet = () => {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    const [image, setImage] = useState<string | undefined>(undefined);
    const [photos, setPhotos] = useState<string[]>([]);
    const [permission, reqPermission] = useCameraPermissions();
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [loading, setLoading] = useState(false);

    const verifyPermissionsCamera = async () => {
        if (permission?.status === PermissionStatus.UNDETERMINED) {
            const resPer = await reqPermission();
            return resPer.granted;
        }
        if (permission?.status === PermissionStatus.GRANTED) {
            return PermissionStatus.GRANTED;
        }

        if (permission?.status === PermissionStatus.DENIED) {
            // ir a settings
            Alert.alert('Permisos denegados', 'Para continuar debe aceptar los permisos de la camara', [
                { text: 'Aceptar', onPress: () => reqPermission() }
            ])
            return false;

        }

        return true;

    };

    const verifyPermissions = async () => {
        const { status } = await MediaLibrary.getPermissionsAsync();
        if (status !== 'granted') {
            const resPer = await requestPermission();
            return resPer.granted;
        }
        return true;
    };


    useEffect(() => {
        getPhotos();
    }, [open]);

    // Camera
    const pickImageCamera = async () => {
        const hasPermission = await verifyPermissionsCamera();
        if (!hasPermission) {
            return;
        }
        let result: ImagePickerResult = await launchCameraAsync({
            mediaTypes: MediaTypeOptions.Images,
            quality: 1,
            // images


        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    // Galeria
    const pickImageGallery = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        let result: ImagePickerResult = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };



    // traer todas las imagenes de la galeria y mostrarlas en un flatlist
    const getPhotos = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const getPhotos = await MediaLibrary.getAlbumAsync('Camera');
        const { assets } = await MediaLibrary.getAssetsAsync({
            first: 20,
            sortBy: MediaLibrary.SortBy.creationTime,
            album: getPhotos,
            mediaType: MediaLibrary.MediaType.photo,
        });
        // local uri
        const photos = assets.map((asset) => asset.uri);
        setPhotos(photos);
        
    };


    return (
        <>
            <ButtonCustom
                text=''
                onPress={open}
                style={{
                    backgroundColor: colors.neutral.neutral100,
                    borderRadius: 50,
                    width: 50,
                    height: 50,
                }}
                type='tertiary'
                // icon de camara
                iconLeft={<View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Ionicons name="ios-camera" size={30} color="white" />
                </View>}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={isOpen}
                onRequestClose={close}
            >
                <View style={styles.container}>
                    <Pressable onPress={close} style={styles.touchable} />
                    <SafeAreaView style={styles.body}>
                        <View style={styles.bottomHandle}>
                            <Ionicons name="ios-remove" size={40} color="black" />
                        </View>
                        {/* <View style={styles.header}>
                        <Text style={styles.title}>Selecciona una opción</Text>
                    </View> */}
                        <View style={styles.contentActions}>
                            <ButtonCustom
                                text='ver todos'
                                onPress={pickImageGallery}

                                style={styles.button}
                                type='primary'
                                // icono de dashboad
                                iconLeft={<View style={{
                                    marginRight: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Ionicons name="ios-grid-sharp" size={15} color="white" />
                                </View>}
                            />
                            <ButtonCustom
                                text='Camara'
                                onPress={pickImageCamera}
                                style={styles.button}
                                type='primary'
                                // icono de dashboad
                                iconLeft={<View style={{
                                    marginRight: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Ionicons name="ios-camera" size={15} color="white" />
                                </View>}
                            />
                        </View>
                        {/* mostrar la galeria */}
                        <View style={styles.contentGallery}>
                            <FlatList
                                data={photos}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <View style={styles.photo}>
                                        <Image
                                            source={{ uri: item }}
                                            style={styles.image}
                                        />
                                    </View>
                                )}
                                numColumns={3}
                            />
                        </View>
                        {/* <View style={styles.footer}>
                            <ButtonCustom
                                text='Cancelar'
                                onPress={close}
                                style={styles.button}
                                type='primary'
                                // icono de dashboad
                                iconLeft={<View style={{
                                    marginRight: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Ionicons name="ios-close" size={15} color="white" />
                                </View>}
                            />
                        </View> */}

                    </SafeAreaView>
                </View >

            </Modal >
        </>
    )
}

export default ButtonSheet

const styles = StyleSheet.create({
    bottomHandle: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(20,20,20, 0.70)',
    },
    touchable: {
        flex: 1,
    },
    body: {
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    title: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contentActions: {
        gap: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    button: {
        borderRadius: 5,
        width: '40%',
        padding: 8,
    },
    // contenedor para la galeria
    contentGallery: {
        paddingVertical: 10,
        height: 300,
        backgroundColor: colors.neutral.neutral100,
    },
    // contenedor para cada imagen
    contentImage: {
        width: '30%',
        height: 100,
        margin: 5,
        borderRadius: 5,
        overflow: 'hidden',
    },
    // imagen
    image: {
        width: '100%',
        height: '100%',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    photo: {
        width: '31%',
        height: 100,
        margin: 5,
        borderRadius: 5,
        overflow: 'hidden',
    },
    contentPhotos: {
        flex: 1,
        padding: 10,
    },


})