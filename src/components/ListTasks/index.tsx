import { useState } from 'react'
import { View, Text, TouchableOpacity } from "react-native";

import Icon from "@expo/vector-icons/Feather";

import { styles } from "./styles";

interface Tasks {
    description: string,
    onRemove: () => void,
    count: (arg1: string) => void,
}

export function ListTasks({ description, onRemove, count }: Tasks) {
    const [iconTrueOrFalse, setIconTrueOrFalse] = useState(false);

    function sendState() {
        setIconTrueOrFalse(!iconTrueOrFalse);
        count(description);
    }
    return (
        <View>
            <View style={styles.card}>

                <TouchableOpacity style={styles.cardButton}
                    onPress={sendState}
                >


                    {iconTrueOrFalse === true ?
                        (<Icon name="check-circle" size={24} color="#4EA8DE" />)
                        :
                        (<Icon name="circle" size={24} color="#4EA8DE" />)}
                </TouchableOpacity>
                <Text style={styles.cardText}>
                    {description}
                </Text>

                <TouchableOpacity
                    style={styles.cardButton2}
                    onPress={onRemove}
                >
                    <Icon name="trash-2" size={24} color="#808080" />
                </TouchableOpacity>
            </View>
        </View>
    )
}