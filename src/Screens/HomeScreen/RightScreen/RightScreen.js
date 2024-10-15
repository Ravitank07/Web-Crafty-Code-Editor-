import React, { useContext } from 'react'
import logo from '../../../Images/icon.png'
import '../../HomeScreen/RightScreen/Rightscreen.scss'
import { PlaygroundContext } from '../../../Providers/PlaygroundProviders'
import {ModelContext, modalConstants} from '../../../Providers/ModelProvider'
import { useNavigate } from 'react-router-dom'
const Folder = ({ foldertitle, cards ,folderId}) => {
  const navigate = useNavigate();
  const {deleteFolder,deleteFile} = useContext(PlaygroundContext)
  const {openModel,setModalPayload} = useContext(ModelContext)
  const onDeleteFolder = () =>{
    deleteFolder(folderId)
  }
  const onEditFolderTitle = () =>{
    setModalPayload(folderId);
    openModel(modalConstants.UPDATE_FOLDER_TITLE)
  }
  const openCreateCardModal = () =>{
    setModalPayload(folderId)
    openModel(modalConstants.CREATE_CARD)
  }
  return <div className="folder-container">
    <div className="folder-header">
      <div className='folder-header-item'>
        <span className='material-icons' style={{ color: "#ffca29" }}>folder</span>
        <span>{foldertitle}</span>
      </div>
      <div className='folder-header-item'>
        <span className='material-icons delete-folder' onClick={onDeleteFolder}>delete</span>
        <span className='material-icons' onClick={onEditFolderTitle}>edit</span>
        <button onClick={openCreateCardModal}>
          <span className='material-icons'>add</span>
          <span>New Playground</span>
        </button>
      </div>
    </div>
    <div className="cards-container">
      {
        cards?.map((file, index) => {
          const oneditfile = () =>{
              setModalPayload({fileId:file.id,folderId:folderId});
              openModel(modalConstants.UPDATE_FILE_TITLE)
          };
          const onDeleteFile = () =>{
            deleteFile(folderId,file.id)
          }
          const navigateToPlayGroundScreen = () =>{
            navigate(`/playground/${file.id}/${folderId}`)
          }
          return (
            <div className="cards" key={index} onClick={navigateToPlayGroundScreen}>
              <img src={logo} alt='logo'/>
              <div className="title-container">
                <span>{file?.title}</span>
                <span>Language: {file?.language}</span>
              </div>
              <div>
              </div>
              <div style={{ 'display': 'flex', 'gap': '3px' }}>
                <span className='material-icons' onClick={onDeleteFile}>delete</span>
                <span className='material-icons' onClick={oneditfile}>edit</span>
              </div>
            </div>
          );
        })
      }
    </div>
  </div>
}
const RightScreen = () => {
  const { folders } = useContext(PlaygroundContext);
  const modelFeatures = useContext(ModelContext);

  const openCreateNewFolderModel = () => {
    modelFeatures.openModel(modalConstants.CREATE_FOLDER)
  }
  return (
    <>
    <div className="right-container">
      <div className="header">
        <div className='title'><span>My</span> playground</div>
        <div className='add-folder' onClick={openCreateNewFolderModel}>
          <span className='material-icons'>add</span>
          <span>New Folder</span>
        </div>
      </div>
      {
        folders?.map((folder, index) => {
          return <Folder foldertitle={folder?.title} cards={folder?.files} key={index} folderId={folder.id}/>
        })
      }
    </div>
  </>
  );
}

export default RightScreen;
