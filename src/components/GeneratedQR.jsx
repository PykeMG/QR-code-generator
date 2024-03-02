import QRCode from "qrcode.react"
import { useEffect, useRef, useState } from "react"
import logo from '../assets/logo-qr-generator.svg'

const GeneratedQR = ({link, reset}) => {

    const qrRef = useRef(null)
    const [showMessage, setShowMessage] = useState(false)

    const downloadQR = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const url = canvas.toDataURL('image/png')
        const anchor = document.createElement('a')

        anchor.href = url;
        anchor.download = 'qrcode.png'
        anchor.click();
    }

    const CopyToClipboard = () => {
        const canvas = qrRef.current.querySelector('canvas');
        canvas.toBlob((blob) => {
            navigator.clipboard.write([
                new ClipboardItem({'image/png': blob})
            ]).then(() => {
                setShowMessage(true)
                setTimeout(() => setShowMessage(false), 3000)
            })
        })
    }


    return(
        <section ref={qrRef} className="relative flex flex-col items-center justify-center gap-y-10 h-screen w-screen">

            <div>
                <img src={logo} alt="logo" className="absolute top-0 left-0 my-6 mx-20" />
            </div>
           
            <div className="w-[220px] h-[220px] bg-[#4e80ee33] rounded-full flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl">
                    <QRCode value={link}/>
                </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 text-[#F2F5F9]">
                <button onClick={downloadQR} className="flex items-center gap-2 bg-[#3662E3] py-2 px-5 rounded-xl">Download <svg xmlns="http://www.w3.org/2000/svg" className=" size-5 icon icon-tabler icon-tabler-download" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg></button>
                <button onClick={CopyToClipboard} className="flex items-center gap-2 bg-[#3662E3] py-2 px-5 rounded-xl">Copy to Clipboard <svg xmlns="http://www.w3.org/2000/svg" className=" size-5 icon icon-tabler icon-tabler-link" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 15l6 -6" /><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" /><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" /></svg> </button>
                
                <button onClick={reset} className="flex items-center gap-2 bg-[#3662E3] py-2 px-5 rounded-xl">Home <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg></button>
            </div>
            <div className="relative w-full">
                <div className=" text-[#F2F5F9]">   
                    {showMessage && <p className="absolute top-0 left-1/2 -translate-x-1/2 ease-in-out duration-150 bg-green-500 py-2 px-4 rounded-xl animate-fadeIn w-[260px] text-center">QR code copy to the clipboard!</p> }
                </div>
            </div>
        </section>
    )
}
export default GeneratedQR