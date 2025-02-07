import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numallow, setNumAllow] = useState(false)
  const [charallow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")
  //useRef hook
  const passwordRef = useRef(null)
  const passwordGen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numallow) str += "0123456789"
    if (charallow) str += "/!@#$%^&*()_+"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numallow, charallow, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  useEffect(() => { passwordGen() }, [length, numallow, charallow])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-black-500 bg-gray-600">
        <h1 className='text-center py-2 text-lg text-white'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} placeholder='password' className='bg-white px-3 py-1 outline-none w-full text-black' readOnly ref={passwordRef} />
          <button onClick={copyPasswordToClipboard} className='px-3 text-white cursor-pointer bg-black pb-1'>Copy</button>
        </div>
        <div className="flex text-sm gap-x-4">
          <div className="flex items-center gap-x-3">
            <input type="range" min={8} max={100} value={length} className='cursor-pointer' onChange={(e) => setLength(e.target.value)} />
            <label className='text-white font-bold'>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">

            <input className='cursor-pointer' type="checkbox"
              defaultChecked={numallow}
              id="numberInput"
              onChange={() => setNumAllow((prev) => !prev)} />
            <label htmlFor='numberInput' className='text-white cursor-pointer font-bold '>Numbers</label>

            <input className='cursor-pointer' type="checkbox"
              defaultChecked={charallow}
              id="charInput"
              onChange={() => setCharAllow((prev) => !prev)} />
            <label htmlFor='charInput' className='text-white cursor-pointer font-bold '>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
