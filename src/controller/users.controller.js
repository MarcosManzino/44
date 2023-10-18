const UserService = require('../services/users.service');
const Service = new UserService()


const getUser = async (req,res)=>{
    try{
        const users = await Service.getAll();
        return res.status(200).json({
            status: 'success',
            msg: 'Users founds',
            data: users,
        })
    }
    catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
}

const getUserById = async (req, res) => {
    try {
        const uid = req.params.uid;
        const user= await  Service.getById(uid)
        return user? 
        res.status(200).json({
            status: 'success', 
            msg: 'User Get by ID',
            data:user,
        }):
        res.status(200).json({
            status: 'error',
            msg: 'User not found',                                                             
            data: user,
        })
    } 
    catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
      });
    }
}

const postUser = (req, res) => {
    res.redirect('/session/login')
} 

const rolUserById = async (req,res)=>{
    try{
        let _id = req.params.uid
        const user = await  Service.getById(_id)
        if(!user){
            res.status(400).send(`User with id: ${_id} Not found or non-existent :(`)
        }
        else{
            let address = user.documents.some(e => e.name === 'address')
            let account= user.documents.some(e => e.name === 'accountStatus')
            let identification = user.documents.some(e => e.name === 'identification')
            if(address && account && identification){
                
                user.rol= 'Premium' 
                await user.save() 
                return res.status(201).json({
                status: 'success',
                message: 'User update rol: Premium',
                payload: user
                });
            }
            else{
                user.rol= 'User' 
                await user.save() 
                return res.status(400).send({
                    message:'You must have the following documents uploaded to be Premium: address, identification, account status', 
                    Rol: user.rol,
                    documents: user.documents,
                })
            }

        }
       
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
}


const delUserById =  async (req, res) => {
    try {
    const uid = req.params.uid;
    await Service.deletedOne(uid)
    return res.status(200).json({
        status: 'success',
        msg: 'User deleted',
        data: {},
    });
    } catch (e) {
    console.log(e);
    return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
    });
    }
}

const putUserById = async (req, res) => { 
    try {
        const uid = req.params.uid;
        const data= req.body
        await Service.updateOne(uid,data)
        return res.status(201).json({
            status: 'success',
            msg: 'User update',
            data:data,
        });
    } 
    catch (e) {
        console.log(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
}
const userDocuments = async (req,res) => {
    try{
        const uid = req.params.uid;
        const user= await  Service.getById(uid)
        if(!user){
            res.status(400).send(`User with id: ${uid} Not found or non-existent :(`)
        }
        const sentDocuments=[]
        const file =req.files
        for(const e in file){
            if(file[e][0].fieldname === 'imageProfile'){
                continue
            }
            else{
                let name=file[e][0].fieldname
                let reference=file[e][0].path
                sentDocuments.push({name:name,reference:reference})
                
                if(user.documents.some(e=>e.name === name)){
                    continue
                }
                else{
                    user.documents.push({name:name,reference:reference})
                }
            }
        }
         await user.save()
         console.log(user)
        return res.status(200).send({message:'Route :api/users/:uid/document post method', payload: user.documents})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }

}
const deleteDocuments = async (req,res) => {
    try{
        const uid = req.params.uid;
        const user= await  Service.getById(uid)
        if(!user){
            res.status(400).send(`User with id: ${uid} Not found or non-existent :(`)
        }
        
        user.documents= []
        await user.save()
         console.log(user)
        
        return res.status(200).send('Route :api/users/:uid/document delete method')
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }

}
 
module.exports = {
    getUser,
    getUserById,
    postUser,
    delUserById,
    putUserById,
    rolUserById,
    userDocuments,
    deleteDocuments 
}
