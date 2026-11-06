/**********************************************
 * STARTER CODE
 **********************************************/

function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

const words = [
  'javascript',
  'computer',
  'react',
  'website',
  'design',
  'student',
  'internet',
  'browser',
  'coding',
  'screen',
  'keyboard',
  'project'
]

function App () {
  const [gameWords, setGameWords] = React.useState(shuffle(words))
  const [guess, setGuess] = React.useState('')
  const [points, setPoints] = React.useState(0)
  const [strikes, setStrikes] = React.useState(0)
  const [passes, setPasses] = React.useState(3)
  const [message, setMessage] = React.useState('')

  const maxStrikes = 3

  const currentWord = gameWords[0]

  const [scrambledWord, setScrambledWord] = React.useState(
    shuffle(currentWord)
  )

  function formHandler (e) {
    e.preventDefault()

    if (guess.toLowerCase() === currentWord.toLowerCase()) {
      setPoints(prevState => prevState + 1)
      setMessage('Correct!')

      const newWords = gameWords.slice(1)

      setGameWords(newWords)

      if (newWords.length > 0) {
        setScrambledWord(shuffle(newWords[0]))
      }
    } else {
      setStrikes(prevState => prevState + 1)
      setMessage('Incorrect!')
    }

    setGuess('')
  }

  function passHandler () {
    if (passes > 0) {
      const newWords = gameWords.slice(1)

      setGameWords(newWords)
      setPasses(prevState => prevState - 1)
      setMessage('Passed!')

      if (newWords.length > 0) {
        setScrambledWord(shuffle(newWords[0]))
      }
    }
  }

  function playAgainHandler () {
    const newWords = shuffle(words)

    setGameWords(newWords)
    setGuess('')
    setPoints(0)
    setStrikes(0)
    setPasses(3)
    setMessage('')
    setScrambledWord(shuffle(newWords[0]))
  }

  const gameOver =
    gameWords.length === 0 ||
    strikes >= maxStrikes

  return (
    <div>
      <h1>Scramble</h1>

      {gameOver
        ? <div>
            <h2>Game Over</h2>
            <p>Points: {points}</p>
            <button onClick={playAgainHandler}>
              Play Again
            </button>
          </div>
        : <div>
            <h2>{scrambledWord}</h2>

            <form onSubmit={formHandler}>
              <input
                type="text"
                placeholder="Enter your guess"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
            </form>

            <p>{message}</p>
            <p>Points: {points}</p>
            <p>Strikes: {strikes}</p>
            <p>Passes: {passes}</p>

            <button onClick={passHandler}>
              Pass
            </button>
          </div>
      }
    </div>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
)

root.render(<App />)