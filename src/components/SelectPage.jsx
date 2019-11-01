import React from 'react'
import { Link } from 'gatsby'

const SelectPage = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Face</Link>
                    </li>
                    <li>
                        <Link to='/bar-chart'>Bar-Chart</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SelectPage