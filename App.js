import 'react-native-get-random-values';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {v4 as uuidv4} from 'uuid';

import {addTodo, removedTodo, updateTodo, findTodoItem} from './src/helper';

const STYLES = StyleSheet.create({
  container: {
    padding: 20,
  },
  flexRow: {
    flexDirection: 'row',
  },
  paddingLeft10: {
    paddingLeft: 10,
  },
  paddingTop15: {
    paddingTop: 15,
  },
  inputElement: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F89571',
    borderRadius: 5,
    fontSize: 16,
    height: 40,
    color: '#8A71F8',
    paddingLeft: 10,
  },
  btn: {
    backgroundColor: '#8A71F8',
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 5,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 16,
  },
  headingTxt: {
    color: '#71D2F8',
    fontSize: 22,
  },
  listItemContainer: {
    paddingTop: 10,
  },
  listItem: {
    backgroundColor: '#E4EAED',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  deleteTxt: {
    color: 'red',
  },
  updateTxt: {
    color: 'blue',
  },
});

const TodoApp = () => {
  const [list, setList] = useState([]);

  const [val, setVal] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [requiredID, setRequiredId] = useState('');

  const confirmDeleteItem = id => {
    let newList = removedTodo([...list], id);
    setList(newList);
  };

  const handleDeleteItem = (id, task) => () => {
    setRequiredId(id);
    Alert.alert(
      'Delete Todo',
      `Are you sure want to delete ${task}`,
      [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => confirmDeleteItem(id),
        },
      ],
      {
        cancelable: true,
        onDismiss: () => null,
      },
    );
  };

  const handleUpdateItem = id => () => {
    let item = findTodoItem([...list], id);

    setRequiredId(id);
    setVal(item.task);
    setIsUpdateMode(true);
  };

  const handleAdd = () => {
    if (val) {
      const newTodo = {id: uuidv4(), task: val};
      const updatedTodos = addTodo(list, newTodo);

      setList(updatedTodos);
      setVal('');
      return;
    }

    Alert.alert('Please write your task');
  };

  const handleUpdate = () => {
    if (val) {
      let item = findTodoItem([...list], requiredID);
      item.task = val;
      const result = updateTodo([...list], item);
      setList(result);
      setRequiredId('');
      setIsUpdateMode(false);
      setVal('');
      return;
    }

    Alert.alert('Please write your task');
  };

  const renderList = ({item}) => {
    return (
      <View style={STYLES.listItem} key={item?.id}>
        <Text>{item?.task}</Text>

        <View style={STYLES.flexRow}>
          <TouchableOpacity onPress={handleUpdateItem(item.id)}>
            <Text style={STYLES.updateTxt}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={STYLES.paddingLeft10}
            onPress={handleDeleteItem(item.id, item.task)}>
            <Text style={STYLES.deleteTxt}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleOnChangeInput = text => {
    setVal(text);
  };

  return (
    <View style={STYLES.container}>
      <Text style={STYLES.headingTxt}>
        Enter your todo and hit the Enter key
      </Text>

      <View style={StyleSheet.flatten([STYLES.flexRow, STYLES.paddingTop15])}>
        <TextInput
          onChangeText={handleOnChangeInput}
          value={val}
          placeholder="Enter new todo..."
          style={STYLES.inputElement}
        />

        <TouchableOpacity
          onPress={isUpdateMode ? handleUpdate : handleAdd}
          style={STYLES.btn}>
          <Text style={STYLES.btnTxt}>
            {isUpdateMode ? 'Update task' : 'Add task'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={STYLES.listItemContainer}
        keyExtractor={item => item.id}
        data={list}
        renderItem={renderList}
      />
    </View>
  );
};

export default TodoApp;
