import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../../hooks/form';
import { v4 as uuid } from 'uuid';
import { Title, Grid, Flex, Button, TextInput, Text, Slider } from '@mantine/core';
import List from '../../../Components/List/List';
import { ListContext } from '../../../Components/Context/ListOfData/ListOfData';
import LoginForm from '../../../Components/form/login';
import Auth from '../../../Components/auth';
import { LoginContext } from '../../../Components/Context/LoginContext';
import axios from 'axios';
import SignUp from '../../../Components/form/signup';

const Todo = () => {
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const { data, dispatch } = useContext(ListContext);
  const { can } = useContext(LoginContext);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  async function addItem(item) {
    try {
      item.completed = false;
      const res = await axios.post('https://auth-api-fz5h.onrender.com/todo', item);
      console.log(res);
      dispatch({ type: 'changeList', payload: item });
    } catch (err) {
      console.log('post', err);
    }
  }

  async function deleteItem(id) {
    try {
      await axios.delete(`https://auth-api-fz5h.onrender.com/todo/${id}`);
      const items = data.list.filter((item) => item.id !== id);
      dispatch({ type: 'replaceList', payload: items });
    } catch (err) {
      console.log('delete error', err);
    }
  }

  async function toggleComplete(id) {
    if (can('update')) {
      const items = await Promise.all(
        data.list.map(async (item) => {
          if (item.id === id) {
            item.completed = !item.completed;
            try {
              item.id = id;
              const res = await axios.put(`https://auth-api-fz5h.onrender.com/todo/${id}`, item);
              console.log(res, 'ehaaaaaaaaaaaaaaaaaaaaaaaaaaaabo');
            } catch (err) {
              console.log('update error', err);
            }
          }
          return item;
        })
      );

      dispatch({ type: 'replaceList', payload: items });
    }
  }

  async function getData() {
    try {
      const res = await axios.get('https://auth-api-fz5h.onrender.com/todo');
      dispatch({ type: 'replaceList', payload: res.data.data });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let incompleteCount = data.list.filter((item) => !item.completed).length;
    setIncomplete(incompleteCount);
    document.title = `To-Do List: ${incomplete}`;
  }, [data.list]);

  return (
    <Flex direction="column" justify="center" align="center" minHeight="80vh">
      <LoginForm />
      <SignUp />
      <Auth capability="read">
        <Title
          textAlign="center"
          color="white"
          background="#343a40"
          width="80%"
          padding="20px"
          margin="auto"
          style={{ marginBottom: '20px' }}
          order={1}
        >
          To-Do List: {incomplete} items pending
        </Title>
      </Auth>
      <Grid minHeight="80vh" justify="center" width="80%" grow gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
        <Grid.Col span={4}>
          <Auth capability="create">
            <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
              <h2>Add To-Do Item</h2>
              <TextInput onChange={handleChange} name="text" placeholder="Task Details" label="To-Do Item" />
              <TextInput onChange={handleChange} name="assignee" placeholder="For who?" label="Assigned To" />
              <Text>Difficulty</Text>
              <Slider color="blue" onChange={handleChange} defaultValue={defaultValues.difficulty} step={1} min={1} max={5} name="difficulty" />
              <Button color="blue" type="submit" style={{ marginTop: '10px' }}>
                Add Task
              </Button>
            </form>
          </Auth>
        </Grid.Col>
        <Grid.Col span={8}>
          <Auth capability="read">
            <List list={data.list} toggleComplete={toggleComplete} deleteItem={deleteItem} />
          </Auth>
        </Grid.Col>
      </Grid>
    </Flex>
  );
};

export default Todo;
