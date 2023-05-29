import { useState, useEffect } from 'react';
import { Input, Button, Stack, Flex, Center, Image, Heading, Highlight, Text, Avatar, Container } from '@chakra-ui/react';
import { FaHeart, FaHeartBroken, FaPen, FaRedoAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ImageProps } from '@chakra-ui/react';


import caco1 from './assets/caco1.png';
import caco3 from './assets/caco3.png';
import caco4 from './assets/caco4.png';
import caco5 from './assets/caco5.png';
import caco6 from './assets/caco6.png';
import caco7 from './assets/caco7.gif';
import ingra from './assets/ingra.png'


interface HeartProps {
  color: string;
  key: string | number;
}

interface WordsToGuessProps {
  word: string;
  tip: string;
}

const numberOfAttempts = 6

const wordsToGuess = [
  {
    word: "sistema límbico",
    tip: "Sistema responsável pelas emoções humanas."
  },
  {
    word: "emoções",
    tip: "Sentimento subjetivo do ser humano."
  },
  {
    word: "papez",
    tip: "Explicou pela primeira vez as emoções em 1937."
  },
  {
    word: "comportamentais",
    tip: "As emoções podem ser fisiológicas e __________?"
  },
  {
    word: "amígdala",
    tip: "Principal componente do cérebro ligado às emoções."
  },
];

const getRandomWord = (): WordsToGuessProps => {
  const randomIndex = Math.floor(Math.random() * wordsToGuess.length);
  return wordsToGuess[randomIndex];
};

const removeDiacritics = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const Heart = ({ color, key } : HeartProps) => {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 1 }}
      animate={{ opacity: color === 'red' ? 1 : .4 }}
      transition={{ duration: 0.5 }}
    >
      {color === 'red' 
        ? <FaHeart style={{color: 'red'}}/>
        : <FaHeartBroken  style={{color: '#222222'}}/> }
    </motion.div>
  );
};

const imageProps: ImageProps = {
  mt: 4,
  objectFit: 'contain',
  bg: 'orange.200',
  borderRadius: 'full',
  boxSize: { base: '150px', sm: '300px' },
};

const App = () => {
  const [guess, setGuess] = useState('');
  const [remainingAttempts, setRemainingAttempts] = useState(numberOfAttempts);
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [wordToGuess, setWordToGuess] = useState<WordsToGuessProps>(
    getRandomWord()
  );
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setWordToGuess(getRandomWord());
  }, []);

  const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value.toLowerCase());
  };

  const handleGuessSubmit = () => {
    const newCorrectGuesses = [...correctGuesses];
    let newRemainingAttempts = remainingAttempts;
  
    const normalizedWord = removeDiacritics(wordToGuess.word);
  
    if (guess && normalizedWord.includes(guess)) {
      newCorrectGuesses.push(guess);
      const specialChars = wordToGuess.word.split('').filter((letter) => removeDiacritics(letter) === guess && !newCorrectGuesses.includes(letter));
      newCorrectGuesses.push(...specialChars);
    } else {
      newRemainingAttempts -= 1;
    }
  
    setGuess('');
    setRemainingAttempts(newRemainingAttempts);
    setCorrectGuesses(newCorrectGuesses);
  
    if (
      newRemainingAttempts === 0 ||
      wordToGuess.word
        .split('')
        .filter((letter) => letter !== ' ')
        .every((letter) => newCorrectGuesses.includes(letter))
    ) {
      setGameOver(true);
    }
    
  };
  
  const isLetterGuessed = (letter: string) => correctGuesses.map((l) => l.toLowerCase()).includes(letter.toLowerCase());

  const getHiddenWord = () =>
    wordToGuess.word
      .split('')
      .map((letter) => (letter === ' ' ? ' ' : isLetterGuessed(letter) || isLetterGuessed(removeDiacritics(letter)) ? letter : '_'))
      .join(' ');

  const restartGame = () => {
    setGuess('');
    setRemainingAttempts(numberOfAttempts);
    setCorrectGuesses([]);
    setWordToGuess(getRandomWord());
    setGameOver(false);
  };

  return (
    <Center h='100vh' bg='gray.50' background='linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(241,227,255,1) 100%)'>
    <Stack textAlign="center"  spacing={4} width={{ base: '90%', sm: '80%', md: '50%', lg: '30%', xl: '20%'}}>
      <Heading lineHeight='tall' color='gray.600'>
        <Highlight
          query='CACO'
          styles={{ px: '2', py: '1', rounded: 'full', bg: 'green.200', color: 'white' }}
        >
          PsiCACOlogia
        </Highlight>
      </Heading>

      <Center>
        {gameOver && remainingAttempts === 0 ? (
          <Image src={caco5} alt="kermit" {...imageProps} />
        ) : gameOver && remainingAttempts > 0 ? (
          <Image src={caco3} alt="kermit" {...imageProps} />
        ) : !gameOver && remainingAttempts > 2 && remainingAttempts <= 4 ? (
          <Image src={caco6} alt="kermit" {...imageProps} />
        ) : !gameOver && remainingAttempts === 2 ? (
          <Image src={caco4} alt="kermit" {...imageProps} />
        ) : !gameOver && remainingAttempts === 1 ? (
          <Image src={caco7} alt="kermit" {...imageProps} />
        ) : (
          <Image src={caco1} alt="kermit" {...imageProps} />
        )}
      </Center>

      <Flex  gap="3" alignItems='center' justify='center'>
        {[...Array(numberOfAttempts)].map((_, i) => (
          i < remainingAttempts ? 
          <Heart key={i} color="red" />
          : <Heart key={i} color="gray" />
        ))}
      </Flex>
      
      {!gameOver ? (
        <>
          <Flex align='center' justify='center' gap={1}>
            <Heading as='h5' size='xs' color='gray.500'>
              Dica da
            </Heading>
              
            <a href="https://www.instagram.com/ingraapsi/?igshid=MzRlODBiNWFlZA%3D%3D" target="_blank" rel="noopener noreferrer">
              <Container mx={0} maxW='fit-content' display='flex' alignItems='center' gap={1} paddingTop={1} paddingBottom={1} paddingLeft={2} paddingRight={2} cursor={'pointer'} borderRadius='full' bg='pink.200'  _hover={{ bg: "pink.300" }} transition={'.2s'} color='white'>
                <Avatar size='xs' name='ingra' src={ingra} />
                <Heading as='h5' size='xs' color='white'>
                  Ingra
                </Heading>
              </Container>
            </a>

          
          </Flex>
          <Text style={{marginTop: '5px', marginBottom: '14px'}} fontSize='sm' as='em' color='gray.500'>{`${wordToGuess.tip}`}</Text>
          

          <Heading lineHeight='tall' as='h4' size='md'>
            <Highlight
              query={getHiddenWord()}
              styles={{ px: '4', py: '2', rounded: 'full', bg: 'purple.300', color: 'white', textTransform: 'uppercase' }}
            >
              {`${getHiddenWord()}`}
            </Highlight>
          </Heading>

          <Input
            placeholder="Letra"
            value={guess}
            onChange={handleGuessChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleGuessSubmit();
              }
            }}
            variant='filled'
            size="md"
            marginY={2}
          />

          <Button leftIcon={<FaPen />} colorScheme='linkedin' onClick={handleGuessSubmit}>
            Preencher Letra
          </Button>
          
        </>
      ) : (
        <>

          <Heading as='h5' size='md' color={remainingAttempts === 0 ? 'red.400' : 'green.400'}>
          {remainingAttempts === 0 ? 'Vixe. Errou...' : 'Aí se garante!'}
          </Heading>
          
          <Heading as='h5' size='xs' color='gray.500' style={{marginTop: '30px'}}>
            A palavra era:
          </Heading>
          <Heading  lineHeight='tall' as='h4' size='md'>
            <Highlight
              query={wordToGuess.word}
              styles={{ px: '4', py: '2', rounded: 'full', bg: remainingAttempts === 0 ? 'red.400' : 'green.400', color: 'white', textTransform: 'uppercase' }}
            >
              {`${wordToGuess.word}`}
            </Highlight>
          </Heading>
          <Input
            placeholder="Letra"
            value={guess}
            onChange={handleGuessChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleGuessSubmit();
              }
            }}
            variant='filled'
            size="md"
            marginY={2}
            disabled
          />
          
          <Button leftIcon={<FaRedoAlt />} colorScheme='linkedin' onClick={restartGame} mt={4}>
            Jogar Novamente
          </Button>
        </>
      )}
    </Stack>
    </Center>
  );
};

export default App;
