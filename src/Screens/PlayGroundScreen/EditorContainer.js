import { useContext, useRef, useState } from 'react';
import './EditorContainer.scss'
import { Editor } from '@monaco-editor/react';
import { PlaygroundContext } from '../../Providers/PlaygroundProviders';
const editorOptions = {
    fontSize:18,
    wordWrap:'18'
}
const fileExtensionMapping = {
    cpp:'cpp',
    javascript:"js",
    python:"py",
    java:'java'
}

export const EditorContainer = ({fileId,folderId,runCode}) => {
    const {getDefaultCode,getLanguage,updateLanguage,saveCode} = useContext(PlaygroundContext)
    const [code,setCode] = useState(()=>{
    return getDefaultCode(fileId,folderId);
    });
    const [language,setlanguage] = useState(()=>getLanguage(fileId,folderId));
    const [theme,settheme] = useState('vs-dark');
    const codeRef = useRef();
    const [isFullScreen,setIsFullScreen] = useState(false);
    const onChangeCode = (newCode)  => {
       codeRef.current = newCode
    }
    const onimportCode = (event) => {
        const file = event.target.files[0]
        const fileType = file.type.includes("text")
        if(fileType){
                const fileReader = new FileReader();
                fileReader.readAsText(file)
                fileReader.onload = function(value){
                    const importedCode = value.target.result;
                    setCode(importedCode);
                    codeRef.current = importedCode;
                }
        }else{
            alert("Please choose a program filee")
        }
    }
    const exportCode = () => {
        const codeValue = codeRef.current?.trim();
        if(!codeValue){
            alert('Please Type some code in the editor before exporting')
        }
        // create  a blob / instant file in the memory
        const codeBlob = new Blob([codeValue],{type:'text/plain'})
        // create the downaloadable link with blob deta
        const downloadurl = URL.createObjectURL(codeBlob);
        // create a clickabel link to download the blob/file
        const link = document.createElement("a");
        link.href = downloadurl;
        link.download = `code.${fileExtensionMapping[language]}`
        link.click();
    }
    const onChangeLanguage = (e) =>{
        updateLanguage(fileId,folderId,e.target.value)
        setCode(getDefaultCode(fileId,folderId))
        setlanguage(e.target.value)
    }
    const onChangetheme = (e) =>{
        settheme(e.target.value)
    }
    const OnsaveCode = () =>{
        saveCode(fileId,folderId,codeRef.current)
        alert("Code Save Successfully")
    }
    const FullScreen = () =>{
        setIsFullScreen(!isFullScreen)
    }
    const OnrunCode = () =>{
      runCode({
        code:codeRef.current,
        language
      })
    }
    return (
        <div className="root-editor-container" style={isFullScreen ? styles.fullScreen : {}}>
            <div className='editor-header'>
                <div className="editor-left-container">
                    <b className='title'>{"Title of the card"}</b>
                    <span className='material-icons'>edit</span>
                    <button onClick={OnsaveCode}>Save Code</button>
                </div>
                <div className="editor-right-container">
                    <select name='language' required onChange={onChangeLanguage} value={language}>
                        <option value="cpp">CPP</option>
                        <option value="java">Java</option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                    </select>
                    <select name='language' required onChange={onChangetheme} value={theme}>
                        <option value="vs-dark">vs-dark</option>
                        <option value="vs-light">vs-light</option>
                    </select>
                </div>
            </div>
            <div className='editor-body'>
                <Editor
                    height={'100%'}
                    language={language}
                    options={editorOptions}
                    theme={theme}
                    onChange={onChangeCode}
                    value={code}
                />
            </div>
            <div className='editor-footer'>
                <button className='btn-footer' onClick={FullScreen}>
                    <span className='material-icons'>fullscreen</span>
                    <span>{isFullScreen ? "Minimize": "fullScreen"}</span>
                </button>
                <label htmlFor='import-code' className='btn-footer'>
                    <span className='material-icons'>cloud_download</span>
                    <span>Import Code</span>
                </label>
                <input type='file' id='import-code' style={{ display: "none" }} onChange={onimportCode}/>
                <button className='btn-footer' onClick={exportCode}>
                    <span className='material-icons'>cloud_upload</span>
                    <span>Export Code</span>
                </button>
                <button className='btn-footer' onClick={OnrunCode}>
                    <span className='material-icons'>play_arrow</span>
                    <span>Run Code</span>
                </button>
            </div>
        </div>
    );
}
const styles = {
    fullScreen:{
        position:"absolute",
        top:0,
        left:0,
        right:0,
        bottom:0,
        zindex:10
    }
}