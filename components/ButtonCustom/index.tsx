import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface IButtonCustomProps {
    style?: any;
    text: string;
    onPress?: () => void;
    disabled?: boolean;
    loading?: boolean;
    // iconLeft?: keyof typeof Ionicons.glyphMap;
    // iconRight?: keyof typeof Ionicons.glyphMap;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    type?: 'primary' | 'secondary' | 'tertiary';
}


const ButtonCustom = ({ style, text, onPress, disabled, loading, iconLeft, iconRight, type }: IButtonCustomProps) => {
    const handleOnPress = () => {
        if (!loading) {
            onPress && onPress()
        }
    }
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleOnPress}
            disabled={disabled || loading}
            style={{
                ...styles.wrapper,
                ...(type ? styles[type] : styles.default),
                ...((type && disabled) && disabledButtonStyle[type]),
                ...style,
            }}
        >
            {iconLeft}
            {loading ? (
                <ActivityIndicator size="small" color={colors.white} />
            ) : text && (
                <Text
                    style={{
                        ...styles.text,
                        ...(type && textStyles[type]),
                        ...(disabled && styles.textDisabled),
                        ...((type && disabled) && disabledTextStyle[type]),
                    }}
                >
                    {text}
                </Text>
            )}
            {iconRight}
        </TouchableOpacity>
    )
}

export default ButtonCustom

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
    },
    primary: {
        backgroundColor: colors.primary.primary100,
    },
    secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary.primary100,
    },
    tertiary: {
        backgroundColor: 'transparent',
    },
    default: {
        // neutral color
        backgroundColor: colors.neutral.neutral300,
        shadowColor: colors.neutral.neutral300,
    },
    disabled: {
        opacity: 0.5,
    },
    loading: {
        opacity: 0.5,
    },
    iconLeft: {
        marginRight: 10,
    },
    iconRight: {
        marginLeft: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textDisabled: {
        color: '#999999',
    },

})

const disabledButtonStyle = StyleSheet.create({
    primary: {
        backgroundColor: colors.neutral.neutral50,
    },
    secondary: {
        borderColor: colors.neutral.neutral200,
        backgroundColor: colors.neutral.neutral50,
    },
    tertiary: {},
    default: {
        backgroundColor: colors.neutral.neutral50,
        shadowColor: colors.neutral.neutral50,
    },
})

const disabledTextStyle = StyleSheet.create({
    primary: {
        color: colors.neutral.neutral200,
    },
    secondary: {
        color: colors.neutral.neutral200,
    },
    tertiary: {
        color: colors.neutral.neutral200,
    },
    default: {
        color: colors.white,
    },
})

const textStyles = StyleSheet.create({
    text: {
        fontSize: 16,
        letterSpacing: 0.5,
        fontWeight: 'bold',
    },
    primary: {
        color: colors.white,
    },
    secondary: {
        color: colors.primary.primary100,
    },
    tertiary: {
        color: colors.primary.primary100,
    },
    default: {
        color: colors.white,
    },
})
