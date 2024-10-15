import React, { useContext } from 'react'
import './HomeScreen.scss'
import logo from '../../Images/logo.png'
import RightScreen from './RightScreen/RightScreen'
import { Model } from '../../Providers/Models/Model'
import { ModelContext, modalConstants } from '../../Providers/ModelProvider'

const HomeScreen = () => {  
    const modelFeatures = useContext(ModelContext);
    
    const openCreatePlaygroundModel = () =>{
        modelFeatures.openModel(modalConstants.CREATE_PLAYGROUND);
    }
    return (
        <>
            <div className='home-container'>
                <div className="left-container">
                    <div className="item-container">
                        <img src={logo} alt='logo' />
                        <h1>WebCrafty</h1>
                        <h2>Code.Compile.Debug</h2>
                        <button onClick={openCreatePlaygroundModel}>
                            <span className='material-icons'>add</span>
                            <span>Create Playground</span>
                        </button>
                    </div>
                </div>
                <RightScreen />
                <Model/>
            </div>
        </>
    )
}

export default HomeScreen;