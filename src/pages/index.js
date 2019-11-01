import React,{useEffect} from "react"
import face from '../data-visualizations/face'
import SelectPage from '../components/SelectPage.jsx'

const HomePage = () => {
    useEffect(()=>{
        face()
    })
    return (
        <div>
            <SelectPage />
            <h1>Face Exercise</h1>
            <svg></svg>
        </div>
    )
}

export default HomePage
