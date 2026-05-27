import { useEffect } from "react"

import { useLocation, useNavigate } from "react-router-dom"

export default function Result() 
{

    const location = useLocation()
    const navigate = useNavigate()
    const prediction = location.state?.prediction
    const status = location.state?.status
    if (!prediction || !status) 
    {
        navigate("/")
        return null
    }
    
    useEffect(() => {

        const threeScript = document.createElement("script")

        threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"

        document.body.appendChild(threeScript)

        threeScript.onload = () => {

            const vantaScript = document.createElement("script")

            vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"

            document.body.appendChild(vantaScript)

            vantaScript.onload = () => {

                if (window.VANTA) {

                    window.VANTA.NET(
                    {
                        el: "#result-bg",
                        mouseControls: true,
                        touchControls: true,
                        color: 0x00ffff,
                        backgroundColor: 0x020617,
                        points: 12,
                        maxDistance: 22,
                        spacing: 18
                    })
                }
            }
        }

    }, [])

    return (

        <div id="result-bg" className="h-screen overflow-hidden flex items-center justify-center px-4">
            <div className="w-full max-w-xl bg-slate-900/80 border border-cyan-400/20 rounded-3xl p-10 text-center shadow-[0_0_60px_rgba(0,255,255,0.25)] backdrop-blur-xl">
                <h1 className="text-5xl font-extrabold text-cyan-400 mb-8">Prediction Result</h1>
                <div className="mb-8">
                    <div className="text-7xl font-extrabold text-white mb-4">{prediction}
                        <span className="text-3xl text-cyan-300">{" "} / 20</span>
                    </div>
                    <div className="w-full h-6 bg-slate-800 rounded-full overflow-hidden border border-cyan-400/20">

                        <div className={`h-full transition-all duration-1000 ${
                            status.includes("PASS")
                            ? "bg-green-400"
                            : "bg-red-400"
                        }`}
                        style={{

                            width: `${(prediction / 20) * 100}%`

                        }}/>
                    </div>
                </div>

                <div
                    className={`text-4xl font-bold mb-10 ${
                    status.includes("PASS")
                    ? "text-green-400"
                    : "text-red-400"
                    }`}>{status}
                </div>

                <button onClick={() => navigate("/")}
                    className="bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-4 rounded-xl text-xl font-bold transition duration-300 hover:scale-105"
                > Predict Again</button>
            </div>
        </div>
    )
}