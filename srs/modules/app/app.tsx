/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDebounce} from '../../services/hooks/debounce';

import {useAppDispatch, useAppSelector} from '../../services/hooks/redux';
import {decrement, increment} from './redux/app.reducer';
import {useGetPokemonByNameQuery} from './redux/pokemon';

function App(): JSX.Element {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('pikachu');
  const debouncedValue = useDebounce<string>(value, 500);

  const {data, error, isLoading, isFetching} =
    useGetPokemonByNameQuery(debouncedValue);

  const incrementHandler = () => dispatch(increment());
  const decrementHandler = () => dispatch(decrement());

  const handleChange = (
    text: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    console.log('test', text.nativeEvent.text);
    setValue(text.nativeEvent.text.toLowerCase());
  };

  // Fetch API (optional)
  useEffect(() => {
    // Do fetch here...
    // Triggers when "debouncedValue" changes
  }, [debouncedValue]);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChange={handleChange}
        style={{borderWidth: 1, width: '60%'}}
      />
      {error ? (
        <Text>Oh no, there was an error</Text>
      ) : isLoading || isFetching ? (
        <Text>Loading...</Text>
      ) : data.name ? (
        <>
          <Text>{data.species.name}</Text>
          <Image
            style={styles.image}
            source={{uri: data.sprites.front_shiny}}
          />
        </>
      ) : null}
      <Text>{count}</Text>
      <TouchableOpacity onPress={incrementHandler}>
        <Text>{'Increase'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={decrementHandler}>
        <Text>{'Decrease'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '50%',
    height: 200,
  },
});

export default App;
