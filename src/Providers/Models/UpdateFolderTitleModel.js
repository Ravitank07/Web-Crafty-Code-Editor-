import { useContext } from 'react';
import './CreatePlaygroundModel.scss'
import { ModelContext } from '../ModelProvider';
import { PlaygroundContext } from '../PlaygroundProviders';
export const UpdateFolderTitleModel = () => {
    const {closeModel,modalPayload} = useContext(ModelContext)
    const {editFolderTitle} = useContext(PlaygroundContext)
    const onSubmitModel = (e) =>{
        e.preventDefault();
        const foldername = e.target.folderName.value;
        editFolderTitle(foldername,modalPayload);
        closeModel();
    }
    return (
        <>
            <div className='modl-container'>
                <form className="modl-body" onSubmit={onSubmitModel}>
                    <span onClick={closeModel} className='material-icons close'>close</span>
                    <h1>Update Folder title</h1>
                    <div style={createFolderStyles.inputContainer}>
                    <input required style={createFolderStyles.input} placeholder='Enter Folder Name' name='folderName'/>
                    <button style={createFolderStyles.btn} type='submit'>
                        Create Folder
                    </button>
                    </div>
                </form>
            </div>
        </>
    );
}
const  createFolderStyles= {
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