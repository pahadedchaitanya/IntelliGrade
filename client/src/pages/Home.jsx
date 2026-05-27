import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Home() 
{
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [studytime, setStudytime] = useState("")
    const [absences, setAbsences] = useState("")
    const [g1, setG1] = useState("")
    const [g2, setG2] = useState("")

    useEffect(() => {
        const threeScript = document.createElement("script")
        threeScript.src =
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"

        document.body.appendChild(threeScript)
        threeScript.onload = () => {

            const vantaScript = document.createElement("script")
            vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"

            document.body.appendChild(vantaScript)

            vantaScript.onload = () => {
                if (window.VANTA) 
                {
                    window.VANTA.NET({
                    el: "#vanta-bg",
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

    const handlePredict = async () => {
        setLoading(true)

        if (studytime === "" || absences === "" || g1 === "" || g2 === "") 
            {
                alert("All fields are required")
                return
            }

        if (studytime < 0 || studytime > 24 || absences < 0 || absences > 100 || g1 < 0 || g1 > 20 || g2 < 0 || g2 > 20) 
        {

            alert("Invalid Input Values")
            setStudytime("")
            setAbsences("")
            setG1("")
            setG2("")
            return
        }
        const response = await fetch("https://intelligrade-lpnw.onrender.com/predict",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({studytime,absences,g1,g2 })
            }
        )

        const data = await response.json()
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setLoading(false)
        
        navigate("/result", {state: data})
    }

    return (
        <div
            id="vanta-bg"
            className="h-screen overflow-hidden flex items-center justify-center px-4">

            <div className="w-full max-w-2xl bg-slate-900/80 border border-cyan-400/20 rounded-3xl p-8 shadow-[0_0_60px_rgba(0,255,255,0.25)] backdrop-blur-xl">

                <h1 className="text-5xl font-extrabold text-center text-white mb-4">
                    IntelliGrade
                </h1>

                <p className="text-center text-slate-300 mb-8">

                    AI-powered final grade prediction system for student performance

                </p>

                <div className="space-y-5">
                    <input
                    type="number"
                    min="0"
                    max="24"
                    required
                    value={studytime}
                    onChange={(e) => setStudytime(e.target.value)}
                    placeholder="Study Time (0-24 hrs)"
                    className="w-full p-4 rounded-xl bg-slate-950 text-white border border-cyan-500/30 outline-none"
                    />

                    <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={absences}
                    onChange={(e) => setAbsences(e.target.value)}
                    placeholder="Absences (0-100)"
                    className="w-full p-4 rounded-xl bg-slate-950 text-white border border-cyan-500/30 outline-none"
                    />

                    <div className="grid grid-cols-2 gap-4">

                    <input
                        type="number"
                        min="0"
                        max="20"
                        required
                        value={g1}
                        onChange={(e) => setG1(e.target.value)}
                        placeholder="G1 Grade (0-20)"
                        className="w-full p-4 rounded-xl bg-slate-950 text-white border border-cyan-500/30 outline-none"
                    />

                    <input
                        type="number"
                        min="0"
                        max="20"
                        required
                        value={g2}
                        onChange={(e) => setG2(e.target.value)}
                        placeholder="G2 Grade (0-20)"
                        className="w-full p-4 rounded-xl bg-slate-950 text-white border border-cyan-500/30 outline-none"
                    />

                    </div>

                    <button
                        onClick={handlePredict}
                        disabled={loading}
                        className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-4 rounded-xl text-xl transition duration-300 hover:scale-105 disabled:opacity-70"
                        >{loading ? "Analyzing....":"Predict"}
                    </button>

                </div>
            </div>
        </div>
    )
}