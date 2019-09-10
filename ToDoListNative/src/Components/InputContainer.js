import React, { Component } from 'react';
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

class InputContainer extends Component {
    constructor(props) {
        super(props);
    }

    handleInputChange = (newValue) => {
        return this.props.onChange(newValue);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Add new task..."
                    value={this.props.value}
                    onChangeText={(text) => this.handleInputChange(text)}
                />
                <TouchableOpacity style={styles.button} 
                onPress={this.props.onToDoButtonClick}>
                    <Text style={styles.buttonText}>
                        Add to To Do List
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} 
                onPress={this.props.onNotToDoButtonClick}>
                    <Text style={styles.buttonText}>
                        Add to NOT To Do List
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 30,
    },
    textInput: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 3,
        fontFamily: "Open Sans Condensed",
        color: "#142b1f",
        fontSize: 25,
        backgroundColor: "#fafbf5",
        marginBottom: 35,
        padding: 5,
        paddingLeft: 10,
    },
    button: {
        height: 36,
        backgroundColor: "#fafbf5",
        borderRadius: 4,
        marginBottom: 15,
        alignItems: "center",
    },
    buttonText: {
        fontFamily: "Open Sans Condensed",
        color: "#142b1f",
        fontSize: 20,
        padding: 5,
    }
})

export default InputContainer