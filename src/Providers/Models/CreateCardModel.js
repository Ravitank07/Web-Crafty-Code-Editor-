import { useContext } from 'react'
import './CreatePlaygroundModel.scss'
import { ModelContext } from '../ModelProvider'
import { PlaygroundContext } from '../PlaygroundProviders'
import { v4 } from 'uuid'
import { defaultCodes } from '../PlaygroundProviders'
export const CreateCardModal = () => {
    const { closeModel, modalPayload } = useContext(ModelContext)
    const { createPlayground } = useContext(PlaygroundContext)

    const onSubmitModel = (e) => {
        e.preventDefault();
        const fileName = e.target.fileName.value;
        const language = e.target.language.value;
        const file = {
            id: v4(),
            title: fileName,
            language,
            code: defaultCodes[language]
        }
        createPlayground(modalPayload, file);
        closeModel();
    }
    return <div className="modl-container">
        <form className="modl-body" onSubmit={onSubmitModel}>
            <span onClick={closeModel} className='material-icons close cursorPointer'>close</span>
            <h1>Create New PlayGround</h1>
            <div className='item'>
                <input name='fileName' placeholder='Enter Card Title' required />
            </div>
            <div className='item'>
                <select name='language' required>
                    <option value="cpp">CPP</option>
                    <option value="java">Java</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                </select>
                <button type='submit'>
                    Create PlayGround
                </button>
            </div>
        </form>
    </div>
} 