import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../../hooks/form';

import { v4 as uuid } from 'uuid';
import { Title, Grid, Flex, Button, TextInput, Text, Slider } from '@mantine/core';
import List from '../../../Components/List/List';
import { ListContext } from '../../../Components/Context/ListOfData/ListOfData';


const Todo = () => {
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const { data, dispatch } = useContext(ListContext)
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    dispatch({ type: 'changeList', payload: item });
  }

  function deleteItem(id) {
    const items = data.list.filter(item => item.id !== id);
    dispatch({ type: 'replaceList', payload: items });
  }

  function toggleComplete(id) {

    const items = data.list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    dispatch({ type: 'replaceList', payload: items })

  }

  useEffect(() => {
    let incompleteCount = data.list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [data.list]);

  return (
    <Flex direction='column' justify='center' align={'center'} mih='80vh'>
      <Title ta={'left'} c={'black'}  bg={'#E4F1FF'} w='80%' p={"20px"} m={'auto'} mt='20px' data-testid="todo-h1" order={1}> Incomplete Tasks : {incomplete} </Title>
      <Grid mih={'80vh'} justify='center'  direction="col"  w={'80%'} grow gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50} >
        <Grid.Col span={4}>
          <form onSubmit={handleSubmit}>

            <h2>Add A Task</h2>

            <TextInput
              onChange={handleChange}
              name="text"
              placeholder="To"
              label="Task"
            />

            <TextInput
              onChange={handleChange}
              name="assignee"
              placeholder="name"
              label="Owner"
            />

            <Text>Difficulty</Text>
            <Slider
              color='indigo'
              onChange={handleChange}
              defaultValue={defaultValues.difficulty}
              step={1}
              min={1}
              max={5}
              name="difficulty"
            />
            <Button color='indigo' bg='black' type="submit">Add Task</Button>
          </form>
        </Grid.Col>
        <Grid.Col span={8}>
          <List list={data.list} toggleComplete={toggleComplete} deleteItem={deleteItem} />
        </Grid.Col>
      </Grid>

    </Flex>
  );
};

export default Todo;
