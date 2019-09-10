import React, { Component } from 'react';
import {
    SectionList,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

class ListContainer extends Component {
    constructor(props) {
        super(props);
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item, index, section }) => {
        return (
            <View style={styles.listItem}>
                <TouchableOpacity style={styles.deleteButton}
                    onPress={() => this.handleDelete(item)}
                >
                    <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
                <Text
                    id={item.id}
                    style={this.chooseClass(item)}
                    onPress={() => this.handleCross(item)}
                >{item.task}</Text>
            </View>
        )
    }

    _renderSectionHeader = ({ section: { title } }) => {
        return <Text style={styles.sectionHeader}>{title}</Text>
    }

    handleDelete = (item) => {
        return this.props.handleItemDelete(item);
    }

    handleCross = (item) => {
        return this.props.handleItemCross(item);
    }

    chooseClass = (item) => {
        console.log(item);
        if (item.done === true) {
            return styles.taskTextCrossed;
        } else {
            return styles.taskTextNormal;
        }
    }

    render() {
        return (
            <SectionList
                style={styles.listContainer}
                scrollEnabled={false}
                renderItem={this._renderItem}
                renderSectionHeader={this._renderSectionHeader}
                sections={[
                    { title: 'To Do List', data: this.props.todoItems },
                    { title: 'NOT To Do List', data: this.props.notTodoItems }
                ]}
                keyExtractor={this._keyExtractor}
            />
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        width: 250,
        backgroundColor: "#fafbf5",
        borderRadius: 6,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    sectionHeader: {
        fontFamily: "Amatic SC",
        color: "#142b1f",
        fontWeight: "bold",
        fontSize: 30,
        paddingLeft: 10,
        paddingTop: 15,
    },
    taskTextNormal: {
        fontFamily: 'Open Sans Condensed',
        fontSize: 24,
        color: "#142b1f",
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        width: 200,
    },
    taskTextCrossed: {
        fontFamily: 'Open Sans Condensed',
        fontSize: 24,
        color: "#142b1f",
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        width: 200,
        textDecorationLine: "line-through",
    },
    deleteButton: {
        backgroundColor: "#274f3a",
        marginLeft: 10,
        borderRadius: 8,
        height: 24,
        width: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    deleteButtonText: {
        color: "#fbfbf5",
        fontFamily: 'Open Sans Condensed',
        fontSize: 14,
    }
})

export default ListContainer;