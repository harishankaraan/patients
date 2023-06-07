import express from "express";
import mongoose from "mongoose";
import multer from "multer";
const router=express.Router();

const patientsSchema= mongoose.Schema({

    location:{
        type:String,
        // required:true,
    },
    department:{
        type:String,
        // required:true,
    },
    appointmentDate:{
        type:String,
    },
    patientName:{
        type:String,
    },
    email:{
        type:String,
    },
    mobileNumber:{
        type:String,
    },
    age:{
        type:String,
    },

})

const Patients=mongoose.model("Patients",patientsSchema);
patientsSchema.plugin(Patients)

const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')


const user={
    patients:[
    {
        location:"Nungambakkam",
        department:"OP",
        appointmentDate:"07/06/2023",
        patientName:"Megha",
        email:"abc@gmail.com",
        mobileNumber:"9876543210",
        age:"21",
    },
]
}

// const app=express();
// app.use(express.json());

// get
router.get('/',(req,res)=>{
    try{
        res.status(200).send(user);
    }
    catch(error){
        res.json({message:"unable to create"});
    }
});

// specificData

router.get('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Patients.findByID({_id:req.params.id},{
                location:req.body.location,
                department:req.body.department,
                appointmentDate:req.body.appointmentDate,
                patientName:req.body.patientName,
                email:req.body.email,
                mobileNumber:req.body.mobileNumber,
                age:req.body.age,
            })
                .then(result=>{
                    res.status(200).json({
                        files:result
                    })
                })
                .catch(err=>{
                    console.log(err);
                    res.status(505).json({
                        error:err
                    })
                }
    )}
    })
})

// post

router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newFile = new   Patients({
                location:req.body.location,
                department:req.body.department,
                appointmentDate:req.body.appointmentDate,
                patientName:req.body.patientName,
                email:req.body.email,
                mobileNumber:req.body.mobileNumber,
                age:req.body.age,
            })
            newFile.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

//upload post


router.put('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Patients.findOneAndUpdate({_id:req.params.id},{
                location:req.body.location,
                department:req.body.department,
                appointmentDate:req.body.appointmentDate,
                patientName:req.body.patientName,
                email:req.body.email,
                mobileNumber:req.body.mobileNumber,
                age:req.body.age,
            })
          
            .then(result=>{
                res.status(200).json({
                    updated_user:result       
                 })
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
        
        }
    })
    
})

// delete

router.delete('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Patients.deleteOne({_id:req.params.id},{
                location:req.body.location,
                department:req.body.department,
                appointmentDate:req.body.appointmentDate,
                patientName:req.body.patientName,
                email:req.body.email,
                mobileNumber:req.body.mobileNumber,
                age:req.body.age,
            })
          
            .then(result=>{
                res.status(200).json({
                   deleted_user:result       
                 })
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
        
        }
    })

    
})

//deleteAll

router.delete('/',async(req,res)=>{
    Patients.deleteMany({}).then((result) => {
             res.send(result);
         })
     });


export default router;
