import { useState } from 'react'
import GeneratedQR from './components/GeneratedQR'
import logo from './assets/logo-qr-generator.svg'
import Illustration from './assets/bg-illustration.svg'

function App() {
  const [link, setLink] = useState('')
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleInputLink = (event) => {
    setLink(event.target.value)
  }

  const generateQR =() => {
    setQrGenerated(true)
  }

  return (
    <main className='flex flex-col h-screen w-screen items-center justify-center bg-[#111729] relative'>
      <img src={Illustration} className='absolute right-0 size-46' />
      <section className='z-20'>
        {!qrGenerated &&
        <section className='flex flex-col items-center gap-8'>
          <div>
            <img src={logo} alt="logo" className='w-60' />
          </div>
          <div className='bg-[#040c1d] rounded-3xl p-2 border-2 border-[#3662E3] text-[#F2F5F9]'>
            <input type="text" placeholder='Enter an URL' value={link} className='py-3 px-2 sm:px-5 w-[220px] sm:w-[400px] bg-transparent outline-none placeholder:text-[#364153]' onChange={handleInputLink}/>
            <button className='ml-4 bg-[#3662E3] py-3 px-4 sm:px-8 rounded-2xl hover:bg-[#4e80ee33] ease-in-out duration-200' onClick={generateQR}>QR Code</button>
          </div>
        </section>
      }
      {qrGenerated &&  <GeneratedQR link={link}/>}
      </section>
    </main>
  )
}

export default App
