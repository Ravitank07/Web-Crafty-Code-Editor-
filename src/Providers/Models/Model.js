import { useContext } from "react"
import { CreatePlaygroundModel } from "./CreatePlaygroundModel"
import { ModelContext, modalConstants } from "../ModelProvider";
import { CreateFolderModel } from "./CreateFolderModel";
import { UpdateFolderTitleModel } from "./UpdateFolderTitleModel";
import { UpdateFileTitle } from "./UpdateFileTitle";
import { CreateCardModal } from "./CreateCardModel";

export const Model = () => {
    const modelFeatures = useContext(ModelContext)
    return (
        <>
            {modelFeatures.activeModel === modalConstants.CREATE_PLAYGROUND && <CreatePlaygroundModel />}
            {modelFeatures.activeModel === modalConstants.CREATE_FOLDER && <CreateFolderModel />}
            {modelFeatures.activeModel === modalConstants.UPDATE_FOLDER_TITLE && <UpdateFolderTitleModel />}
            {modelFeatures.activeModel === modalConstants.UPDATE_FILE_TITLE && <UpdateFileTitle />}
            {modelFeatures.activeModel === modalConstants.CREATE_CARD && <CreateCardModal />}
        </>
    );
}