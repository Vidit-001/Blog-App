import conf from "../conf/conf" 
import { Client ,ID , Databases , Storage , Query } from "appwrite"

export class Service {
    client = new Client() ; 
    databases ; 
    bucket ; 
    constructor(){
        this.client.setEndpoint(conf.appwriteurl).setProject(conf.projectid) ; 
        this.databases = new Databases(this.client) ; 
        this.bucket = new Storage(this.client) ; 
    }
    async createPost ({title , slug , content , featuredimage , status , userid}){
        try{
            return  await this.databases.createDocument(
                conf.databaseid , 
                conf.collectionid , 
                slug , 
                {
                    title , 
                    content , 
                    featuredimage , 
                    status , 
                    userid 
                }
            )
        }
        catch(error){
            console.log("Appwrite : Config : CreatePost") ; 
        }
    }
    async updatePost (slug , {title , content , featuredimage , status }){
        try {
            return  this.databases.updateDocument(
                conf.databaseid , 
                conf.collectionid , 
                slug , 
                {
                    title, 
                    content , 
                    featuredimage , 
                    status 
                }
            )
        }
        catch(error){
            console.log("Apprwite : Config : UpdatePost")
        }
    }
    async deletePost (slug ){
        try {
            await this.databases.deleteDocument(
                conf.databaseid , 
                conf.collectionid , 
                slug 
            )
            return true ;
        }
        catch(error){
            console.log("Appwrite : Config : DeletePost ") ; 
            return false ;
        }
    }
    async getPost (slug){
        try {
            return  await this.databases.getDocument(
                conf.databaseid , 
                conf.collectionid , 
                slug
            )
        }
        catch(error){
            console.log("Appwrite : Config : getPost ")
            return false ;
        }
    }
    async listPosts (){
        try {
            return await this.databases.listDocuments(
                conf.databaseid,
                conf.collectionid,
                [Query.equal("status" , "active")]
            )
        }
        catch(error){
            console.log("Appwrite : Config : ListFlies")
            return false ;
        }
    }
    // file functions 
    async uploadFile (file ){
        try {
            return await this.bucket.createFile(
                conf.bucketid , 
                ID.unique() , 
                file 
            )
        }
        catch(error){
            console.log("Appwrite : Config : uploadFile ")
        }
    }
    async deleteFile (fileid ){
        try {
            await this.bucket.deleteFile(
                conf.bucketid , 
                fileid
            )
            return true ;
        }   
        catch(error){
            console.log("Appwrite : Config : DeleteFile ") ; 
            return false ;
        }
    }
    getFilePreview(fileid ){
        return this.bucket.getFilePreview(
            conf.bucketid , 
            fileid 
        )
    }
}

const service = new Service() ; 
export default service ;