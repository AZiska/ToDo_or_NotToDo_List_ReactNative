import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import fetchData from "./src/fetchData"
import InputContainer from "./src/Components/InputContainer"
import ListContainer from "./src/Components/ListContainer"

class ToDoListApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      notTodoItems: [],
      inputValue: ''
    };
  }

  handleChange = (newValue) => {
    this.setState({ inputValue: newValue });
  }

  handleToDoButtonClick = async () => {
    const newTask = this.state.inputValue.trim();
    if (newTask === '') {
      return
    }

    const body = {
      newTodo: {
        index: this.state.todoItems.length,
        task: newTask,
        done: false,
        type: "todo",
      }
    }

    const bodyJson = JSON.stringify(body)
    const response = await fetchData('todo', 'POST', 'application/json', bodyJson);

    let newTodos = response.todos;
    this.setState({
      todoItems: newTodos,
      inputValue: ''
    })
  }

  handleNotToDoButtonClick = async () => {
    const newTask = this.state.inputValue.trim();
    if (newTask === '') {
      return
    }

    const body = {
      newTodo: {
        index: this.state.notTodoItems.length,
        task: newTask,
        done: false,
        type: "nottodo",
      }
    }

    const bodyJson = JSON.stringify(body)
    const response = await fetchData('nottodo', 'POST', 'application/json', bodyJson);

    let newNotTodos = response.todos;
    this.setState({
      notTodoItems: newNotTodos,
      inputValue: ''
    })
  }

  handleItemDelete = async (item) => {
    const bodyJson = JSON.stringify(item)

    if (item.type === "todo") {
      const response = await fetchData('todo', 'DELETE', 'application/json', bodyJson);

      let newTodos = response.todos;
      this.setState({
        todoItems: newTodos,
        inputValue: ''
      })
    } else {
      const response = await fetchData('nottodo', 'DELETE', 'application/json', bodyJson);

      let newTodos = response.todos;
      this.setState({
        notTodoItems: newTodos,
        inputValue: ''
      })
    }

  }

  handleItemCross = async (item) => {
    const bodyJson = JSON.stringify(item)

    if (item.type === "todo") {
      const response = await fetchData('todo', 'PUT', 'application/json', bodyJson);

      let newTodos = response.todos;
      this.setState({
        todoItems: newTodos,
        inputValue: ''
      })
    } else {
      const response = await fetchData('nottodo', 'PUT', 'application/json', bodyJson);

      let newTodos = response.todos;
      this.setState({
        notTodoItems: newTodos,
        inputValue: ''
      })
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('./src/images/background_forest.jpg')}
        style={{ width: '100%', height: '100%' }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>To Do or Not To Do List</Text>
          <InputContainer value={this.state.inputValue}
            onChange={this.handleChange}
            onToDoButtonClick={this.handleToDoButtonClick}
            onNotToDoButtonClick={this.handleNotToDoButtonClick} />
          <ListContainer todoItems={this.state.todoItems}
            notTodoItems={this.state.notTodoItems}
            handleItemDelete={this.handleItemDelete}
            handleItemCross={this.handleItemCross}
          />
        </ScrollView>
      </ImageBackground>
    );
  };

  async componentDidMount() {
    const responseTodo = await fetchData('todo', 'GET', 'application/json');
    const newTodosArray = responseTodo.todos;
    const newTodosStrings = []
    for (let i = 0; i < newTodosArray.length; i++) {
      newTodosStrings.push(newTodosArray[i]);
    }

    const responseNottodo = await fetchData('nottodo', 'GET', 'application/json');
    const newNottodosArray = responseNottodo.todos;
    const newNottodosStrings = []
    for (let i = 0; i < newNottodosArray.length; i++) {
      newNottodosStrings.push(newNottodosArray[i]);
    }

    this.setState({
      todoItems: newTodosStrings,
      notTodoItems: newNottodosStrings,
      inputValue: ''
    })
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontFamily: "Amatic SC",
    color: "#274f3a",
    fontWeight: "bold",
    fontSize: 45,
    marginTop: 65,
    marginBottom: 30,
  },
})

export default ToDoListApp;
