import { createContext, useState } from "react";
export const ModelContext = createContext();
export const modalConstants = {
  CREATE_PLAYGROUND:'CREATE_PLAYGROUND',
  CREATE_FOLDER:'CREATE_FOLDER',
  UPDATE_FOLDER_TITLE:'UPDATE_FOLDER_TITLE',
  UPDATE_FILE_TITLE:'UPDATE_FILE_TITLE',
  CREATE_CARD:'CREATE_CARD'
}
export const ModelProvider = ({children}) =>{
  const [modelType,setModelType] = useState(null);
  const [modalPayload,setModalPayload] = useState(null);
  const closeModel = () =>{
    setModelType(null)
  }
  const modelFeatures = {
    openModel:setModelType,
    closeModel,
    activeModel:modelType,
    modalPayload,
    setModalPayload
  }
  return(
    <ModelContext.Provider value={modelFeatures}>
    {children}  
    </ModelContext.Provider>
  );
}