import { useParams } from "react-router-dom"
import '../PlayGroundScreen/PlayGround.scss'
import logo from '../../Images/logo.png'
import {makeSubmission} from "./service";
import { EditorContainer } from "./EditorContainer";
import { useCallback, useState } from "react";
export const PlayGround = () => {
    const params = useParams();
    const [input, setinput] = useState('')
    const [output, setoutput] = useState('')
    const [showloader,setshowLoader] = useState(true)
    const { fileId, folderId } = params;
    const importInput = (e) => {
        const file = e.target.files[0]
        const fileType = file.type.includes("text")
        if (fileType) {
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = (e) => {
                setinput(e.target.result)
                // setinput(e.target.result)
            }
        }
        else {
            alert("Please Choose a program file")
        }
    }
    const exportOutput = () => {
        // download a txt file the content for output textarea
        const outputValue = output.trim();
        if (!outputValue) {
            alert("Output is empty")
            return;
        }
        const blob = new Blob([outputValue], { type: "text/plain" })
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `output.txt`;
        link.click()
    }
    const callback = ({ apiStatus, data, message }) => {
        if(apiStatus === 'loading'){
            setshowLoader(true);
        }
        else if(apiStatus === 'error'){
            setoutput("Some Thing Went Wrong")
        }
        else {
             if(data && data.status && data.status.id === 3){
            setoutput(atob(data.stdout));
        }
        else if(data && data.stderr){
            setoutput(atob(data.stderr));
        }
        else {
            setoutput("Unknown error occurred");
        }
        }
    }
   const runCode = useCallback(({code,language})=>{
    makeSubmission({code,language,input,callback})
   },[input])
    //makeSubmission({ code, language, input, callback })
    return (
        <div className="playGround-container">
            <div className="header-container">
                <img src={logo} className="logo" />
                <h1>WebCrafty</h1>
            </div>
            <div className="content-container">
                <div className="editor-container">
                    <EditorContainer fileId={fileId} folderId={folderId} runCode={runCode} />
                </div>
                <div className="input-output-container">
                    <div className="input-header">
                        <b>Input:</b>
                        <label htmlFor="input" className="icon-container">
                            <span className="material-icons">cloud_upload</span>
                            <b className="">Import Input</b>
                        </label>
                        <input type="file" id="input" style={{ display: "none" }} onChange={importInput} />
                    </div>
                    <textarea value={input} onChange={(e) => setinput(e.target.value)}></textarea>
                </div>

                <div className="input-output-container">
                    <div className="input-header">
                        <b>Output:</b>
                        <button className="icon-container" onClick={exportOutput}>
                            <span className="material-icons">cloud_download</span>
                            <b>Export Output</b>
                        </button>
                    </div>
                    <textarea readOnly value={output} onChange={(e) => setoutput(e.target.value)}></textarea>
                </div>
            </div>
            {showloader && <div className='fullpage-loader'>
                <div className="loader">

                </div>
            </div>}
        </div>
    );
}