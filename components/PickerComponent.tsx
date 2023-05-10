import { Alert, Button, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Text, View } from './Themed';
import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
    ImagePickerResult,
    MediaTypeOptions,
} from 'expo-image-picker';
import ButtonSheet from './ButtonSheet';

const PickerComponent = () => {
    



    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.canceled) {
    //         setImage(result?.assets[0].uri);
    //     }
    // };
    return (
        <View>
            {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
            <ButtonSheet 
                // isOpen={true}
                // open={() => {}}
                // close={() => {}}
            />
        </View>
    )
}

export default PickerComponent

const styles = StyleSheet.create({})