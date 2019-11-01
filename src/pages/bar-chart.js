import React,{ useEffect } from 'react'
import { requestData } from '../data-visualizations/barChart/barChart'
import './style.css'
import SelectPage from '../components/SelectPage.jsx'



const BarChart = () => {
    useEffect(()=>{
        requestData()
    })
    return (
        <div>
            <SelectPage />
            <svg></svg>
        </div>
    )
}

export default BarChart