import conf from '../conf/conf' ; 
import { Client, Account, ID } from "appwrite";
const {appwriteurl , projectid }  = conf ; 

class Authservice {
    client = new Client () ; 
    account ; 
    constructor(){
        this.client.setEndpoint(appwriteurl).setProject(projectid) ; 
        this.account = new Account (this.client) ; 
    }
    async CreateAccount({email , password}){
        try {
            const UserAccount = await this.account.create(
                ID.unique() , 
                 email ,
                 password 
            )
            if(UserAccount){
                this.LoginAccount({email,password});
            }
            else {
                return UserAccount ;
            }
        }
        catch(error ){
            throw error ; 
        }
    }
    async LoginAccount ({email , password}){
        try{
            const Session = await this.account.createEmailPasswordSession(
                 email, 
                 password 
            )
            return Session ; 
        }
        catch(error){
            throw error ; 
        }
        return null ; 
    }

    async getCurrentUser(){
        try {
            return await  this.account.get() ;
        }
        catch(error){
            throw error ; 
        }
    }

    async LogoutAccount (){
        try{
            await this.account.deleteSessions() ;
        }
        catch(error){
            throw error ; 
        }
    }
}
const authService = new Authservice() ;
export default authService ;