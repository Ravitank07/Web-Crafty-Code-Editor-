import { createContext, useContext, useEffect, useState } from "react"
import { v4 } from 'uuid'
export const PlaygroundContext = createContext();
const intialData = [
    {
        id: v4(),
        title: 'DSA',
        files: [
            {
                id: v4(),
                title: 'p2',
                code: `cout<<"Hello World";`,
                language: 'cpp'
            }
        ]
    },
];
export const defaultCodes = {
    'javascript': `console.log("Hello Javascript")`,
    'python': `print("Hello World");`,
    'java': `public class Main{
        public static void main(String[] args){
            system.out.println("Hello World");
        }
    }`,
    'cpp': `#include <iostream>
    using namespace std;
    int main(){
        cout<<"Hello World";
        return 0;
    }
    `,
}
export const PlaygroundProvider = ({ children }) => {
    const [folders, setFolders] = useState(() => {
        const localData = localStorage.getItem('data');
        if (localData) {
            return JSON.parse(localData)
        }
        return intialData;
    });
    const createNewPlayground = (newPlayground) => {
        const { folderName, fileName, language } = newPlayground;
        const newfolders = [...folders];
        newfolders.push({
            id: v4(),
            title: folderName,
            files: [
                {
                    id: v4(),
                    title: fileName,
                    code: defaultCodes[language],
                    language
                }
            ]
        })
        localStorage.setItem('data', JSON.stringify(newfolders))
        setFolders(newfolders);
    }
    const createNewFolder = (folderName) => {
        const newFolder = {
            id: v4(),
            title: folderName,
            files: []
        }
        const allFolders = [...folders, newFolder]
        localStorage.setItem('data', JSON.stringify(allFolders));
        setFolders(allFolders);
    }
    const deleteFolder = (id) => {
        const updatedFoldersList = folders.filter((folderItem) => {
            return folderItem.id !== id;
        })
        localStorage.setItem('data', JSON.stringify(updatedFoldersList))
        setFolders(updatedFoldersList)
    }
    const editFolderTitle = (newFolderName, id) => {
        const updatedFoldersLists = folders.map((folderItem) => {
            if (folderItem.id === id) {
                folderItem.title = newFolderName
            }
            return folderItem;
        })
        localStorage.setItem('data', JSON.stringify(updatedFoldersLists));
        setFolders(updatedFoldersLists)
    }
    const editFileTitle = (newFileName, folderId, fileId) => {
        const copiedFolders = [...folders];
        for (let i = 0; i < copiedFolders.length; i++) {
            if (folderId === copiedFolders[i].id) {
                const files = copiedFolders[i].files
                for (let j = 0; j < files.length; j++) {
                    if (files[j].id === fileId) {
                        files[j].title = newFileName;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('data', JSON.stringify(copiedFolders));
        setFolders(copiedFolders);
    }
    const deleteFile = (folderId, fileId) => {
        const copiedFolders = [...folders];
        for (let i = 0; i < copiedFolders.length; i++) {
            if (copiedFolders[i].id === folderId) {
                const files = [...copiedFolders[i].files];
                copiedFolders[i].files = files.filter((file) => {
                    return file.id !== fileId;
                });
                break;
            }
        }
        localStorage.setItem('data', JSON.stringify(copiedFolders));
        setFolders(copiedFolders);
    }
    const createPlayground = (folderId, file) => {
        const copiedFolders = [...folders]
        for (let i = 0; i < copiedFolders.length; i++) {
            if (copiedFolders[i].id === folderId) {
                copiedFolders[i].files.push(file);
                break;
            }
        }
        localStorage.setItem('data', JSON.stringify(copiedFolders));
        setFolders(folders);
    }
    const getDefaultCode = (fileId, folderId) => {
        for (let i = 0; i < folders.length; i++) {
            if (folders[i].id === folderId) {
                for (let j = 0; j < folders[i].files.length; j++) {
                    const currentFile = folders[i].files[j];
                    if (fileId === currentFile.id) {
                        return currentFile.code;
                    }
                }
            }
        }
    }
    const getLanguage = (fileId, folderId) => {
        for (let i = 0; i < folders.length; i++) {
            if (folders[i].id === folderId) {
                for (let j = 0; j < folders[i].files.length; j++) {
                    const currentFile = folders[i].files[j];
                    if (fileId === currentFile.id) {
                        return currentFile.language;
                    }
                }
            }
        }
    }
    const updateLanguage = (fileId, folderId, language) => {
        const newFolders = [...folders];
        for (let i = 0; i < newFolders.length; i++) {
            if (newFolders[i].id === folderId) {
                for (let j = 0; j < newFolders[i].files.length; j++) {
                    const currentFile = newFolders[i].files[j];
                    if (fileId === currentFile.id) {
                        newFolders[i].files[j].code = defaultCodes[language];
                        newFolders[i].files[j].language = language;
                    }
                }
            }
        }
        localStorage.setItem('data', JSON.stringify(newFolders));
        setFolders(newFolders)
    }
    const saveCode = (fileId,folderId,newCode) =>{
        const newFolders = [...folders];
        for (let i = 0; i < newFolders.length; i++) {
            if (newFolders[i].id === folderId) {
                for (let j = 0; j < newFolders[i].files.length; j++) {
                    const currentFile = newFolders[i].files[j];
                    if (fileId === currentFile.id) {
                        newFolders[i].files[j].code = newCode;
                    }
                }
            }
        }
        localStorage.setItem('data', JSON.stringify(newFolders));
        setFolders(newFolders);
    }
    useEffect(() => {
        if (!localStorage.getItem('data')) {
            localStorage.setItem('data', JSON.stringify(folders));
        }
    }, [])
    const playgroundFeatures = {
        folders,
        createNewPlayground,
        createNewFolder,
        deleteFolder,
        editFolderTitle,
        editFileTitle,
        deleteFile,
        createPlayground,
        getDefaultCode,
        getLanguage,
        updateLanguage,
        saveCode
    }
    return (
        <PlaygroundContext.Provider value={playgroundFeatures}>
            {children}
        </PlaygroundContext.Provider>
    );
}