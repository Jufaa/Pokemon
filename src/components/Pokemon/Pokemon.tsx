import { useState } from 'react';
import { Pokemons } from '../../data/pokemons';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Image,
  Input,
  LinkBox,
  Stack
} from '@chakra-ui/react';

const match = Math.floor(Math.random() * Pokemons.length);

export default function Pokemon() {
  const [ganaste, toggleGanaste] = useState(false);
  const [perdiste, setPerdiste] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (value.toLowerCase() === Pokemons[match]) {
      setPerdiste(false);
      toggleGanaste(true);
    } else {
      setPerdiste(true);
      setValue('');
    }
  }

  return (
    <Box
      h="100vh"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="center"
      bgImage="https://images.wikidexcdn.net/mwuploads/wikidex/e/ea/latest/20191005131536/Bosque_Lumirinto_%28c%C3%A1mara%29.png"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack alignItems="center" display="flex" alignContent="center">
        <Image
          height={512}
          width={512}
          style={{
            imageRendering: 'pixelated',
            filter: ganaste ? '' : 'brightness(0) invert(1)'
          }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            match + 1
          }.png`}
        />
        {ganaste ? (
          <Stack>
            <Alert status="success" variant="subtle" as="b">
              <AlertIcon />
              Ganaste!
            </Alert>
            <Button onClick={() => location.reload()}>Juega de nuevo!</Button>
          </Stack>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              focusBorderColor="red"
              type="text"
              w="auto"
              name="pokemon"
              value={value}
              onChange={handleChange}
            />
            <Button size="lg" w="auto" colorScheme="red" type="submit">
              Submit
            </Button>
          </form>
        )}
        {perdiste ? (
          <Stack>
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Perdiste! Intenta de nuevo</AlertTitle>
            </Alert>
          </Stack>
        ) : (
          <Stack></Stack>
        )}
      </Stack>
    </Box>
  );
}
