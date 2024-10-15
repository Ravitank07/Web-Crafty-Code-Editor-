import { useContext } from 'react';
import './CreatePlaygroundModel.scss'
import { ModelContext } from '../ModelProvider';
import { PlaygroundContext } from '../PlaygroundProviders';
export const UpdateFileTitle = () => {
    const {closeModel,modalPayload} = useContext(ModelContext);
    const {editFileTitle} = useContext(PlaygroundContext)
    const onSubmitModel = (e) =>{
        e.preventDefault();
        const fileName = e.target.fileName.value;
        editFileTitle(fileName,modalPayload.folderId,modalPayload.fileId);
        closeModel();
    }
    return (
        <div className='modl-container'>
            <form className="modl-body" onSubmit={onSubmitModel}>
                <span onClick={closeModel} className='material-icons close'>close</span>
                <h1>Update Card title</h1>
                <div style={styles.inputContainer}>
                    <input required style={styles.input} placeholder='Enter Folder Name' name='fileName' />
                    <button style={styles.btn} type='submit'>
                        Create Card
                    </button>
                </div>
            </form>
        </div>
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
