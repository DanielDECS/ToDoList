import React, { useState } from "react";
import {
    View, Text, Image, TextInput, TouchableOpacity, FlatList, Alert, Keyboard
} from 'react-native'

import logo from '../../assets/Logo.png'
import { styles } from "./styles";
import Icon from '@expo/vector-icons/Feather'

import { ListTasks } from "../../components/ListTasks";

export function Home() {
    const [listFull, setListFull] = useState<string[]>([])
    const [listAll, setListAll] = useState<string[]>([])
    const [task, setTask] = useState('')
    const [count, setCount] = useState(0)
    const [countCompletedTasks, setCountCompletedTasks] = useState(0)

    function completedTasksCounter(item: string) {
        if (listAll.includes(item)) {
            setListAll(full => full.filter(task => task !== item))
            setCountCompletedTasks(listAll.length - 1)
        } else {
            setListAll(allTasks => [...allTasks, item])
            setCountCompletedTasks(listAll.length + 1)
        }
    }

    function handleAdd() {
        if (task === '') {
            return Alert.alert("O campo está vazio!", "Adicione uma tarefa")
        }
        if (listFull.includes(task)) {
            return Alert.alert("Esta tarefa já existe", "Adicione uma nova tarefa")
        }

        setListFull(allTasks => [...allTasks, task])
        setCount(listFull.length + 1)
        setTask('')
        Keyboard.dismiss()
    }

    function onRemoveItem(description: string) {
        Alert.alert("Remover", `Remover esta tarefa?`, [
            {
                text: 'Sim',
                onPress: () => {
                    setListFull(full => full.filter(task => task !== description))
                    setListAll(full => full.filter(task => task !== description))
                    setCount(listFull.length - 1)
                    setCountCompletedTasks(listAll.length)
                }
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    return (
        <>
            <View style={styles.container}>
                <Image source={logo} />
            </View>

            <View style={styles.content}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Adicione uma nova tarefa"
                        placeholderTextColor='#808080'
                        value={task}
                        onChangeText={(text) => setTask(text)}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={handleAdd}
                    >
                        <Icon name="plus-circle" size={20} color='#fff' />
                    </TouchableOpacity>
                </View>

                <View style={styles.wraper}>
                    <View style={styles.circleCount}>
                        <Text style={styles.wraperText}>Criadas</Text>
                        <View style={styles.count}>
                            <Text style={styles.countText}>{count}</Text>
                        </View>
                    </View>

                    <View style={styles.circleCount}>
                        <Text style={[styles.wraperText, { color: '#8284FA' }]}>Concluídas</Text>
                        <View style={styles.count}>
                            <Text style={styles.countText}>{countCompletedTasks}</Text>
                        </View>
                    </View>
                </View>

                <FlatList
                    data={listFull}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <ListTasks
                            description={item}
                            onRemove={() => onRemoveItem(item)}
                            count={completedTasksCounter}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <View style={{ alignItems: 'center' }}>
                            <Text
                                style={{ fontWeight: 'bold', color: '#808080' }}>
                                Você ainda não tem tarefas cadastradas</Text>
                            <Text
                                style={{ color: '#808080' }}
                            >Crie tarefas e organize seus itens a fazer</Text>
                        </View>
                    )}
                />
            </View>
        </>
    )
}