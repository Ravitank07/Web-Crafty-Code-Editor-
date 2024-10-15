import { useContext } from 'react';
import './CreatePlaygroundModel.scss'
import { ModelContext } from '../ModelProvider';
import { PlaygroundContext } from '../PlaygroundProviders';
export const CreatePlaygroundModel = () =>{
    const modelFeatures = useContext(ModelContext);
    const playgroundFeatures = useContext(PlaygroundContext);

    const closeModel = () =>{
        modelFeatures.closeModel()
    };
    
    const onSubmitModel = (e) =>{
        e.preventDefault();
        const folderName = e.target.folderName.value;
        const fileName = e.target.fileName.value
        const language = e.target.language.value
        playgroundFeatures.createNewPlayground({
            folderName,
            fileName,
            language
        })
        closeModel();
    }
    return(
            <div className="modl-container">
                <form className='modl-body' onSubmit={onSubmitModel}>
                    <span onClick={closeModel} className='material-icons close cursorPointer'>close</span>
                    <h1>Create New PlayGround</h1>
                    <div className='item'>
                        <p>Enter Folder Name</p>
                        <input name='folderName' required/>
                    </div>
                    <div className='item'>
                        <p>Enter Card Name</p>
                        <input name='fileName' required/>
                    </div>
                <div className='item'>
                    <select name='language' required>
                        <option value="cpp">CPP</option>
                        <option value="java">Java</option>
                        <option value="Javascript">JavaScript</option>
                        <option value="python">Python</option>
                    </select>
                    <button type='submit'>
                        Create Playground
                    </button>
                </div>
                </form>
            </div>
    );
}
