import { useContext } from 'react';
import './CreatePlaygroundModel.scss'
import { ModelContext } from '../ModelProvider';
import { PlaygroundContext } from '../PlaygroundProviders';
export const CreateFolderModel = () => {
    const  modelFeatures  = useContext(ModelContext);
    const {createNewFolder} = useContext(PlaygroundContext)
       const closeModel = () =>{
        modelFeatures.closeModel();
    };
        const onSubmitModel = (e) =>{
            e.preventDefault();
            const folderName = e.target.folderName.value;
            createNewFolder(folderName)
            closeModel();
        }
    return (
        <>
            <div className='modl-container'>
                <form className='modl-body' onSubmit={onSubmitModel}>
                    <span onClick={closeModel} className='material-icons close cursorPointer'>close</span>
                    <h1>Create New Folder</h1>
                    <div style={styles.inputContainer}>
                    <input style={styles.input} placeholder='Enter Folder Name' name='folderName'/>
                    <button style={styles.btn} type='submit'>
                        Create Folder
                    </button>
                    </div>
                </form>
            </div>
        </>
    );
}

const styles = {
    inputContainer:{
        display:'flex',
        gap:3
    },
    input:{
        flexGrow:1,
        padding:10
    },
    btn:{
        backgroundColor: '#241f21',
        border:'1px solid black',
        padding:7,
        borderRadius: 4,
        backgroundColor:'black',
        color:'white'
    },
}