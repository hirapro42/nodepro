const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
    campany: {
        type:String
    },
    website: {
        type:String
    },
    location: {
        type:String
    },
    status: {
        type: String,
        required:true
    },
    skill: {
        type: [String],
        required:true
    },
    bio: {
        type:String
    },
    githubusername: {
        type:String
    },
    experiance: [
        {
            title: {
                type: String,
                required:true
                
            },
            company: {
                type: String,
                required:true
            },
            location: {
                type: String  
            },
             company: {
                type: String,
                required:true
            },
              from: {
                type: Date,
                required:true
            },
               to: {
                type: Date
            },
              current: {
                type: Boolean,
                required:true
            },  
              description: {
                type: String,
            }
        }
    ],
    education:[
        {
            school: {
                type: String,
                required:true
            },
            degree: {
                type: String,
                required:true
            },
            fieldOfStudy: {
                type: String,
                required:true
            },
             from: {
                type: Date,
                required:true
            },
               to: {
                type: Date
            },
              current: {
                type: Boolean,
                require:true
            },  
            description: {
                type: String
            }
        }
    ],
    social: {
            youtube: {
               type:String 
            },
            twitter: {
               type:String 
            },
            facebook: {
               type:String 
            },
            linkedin: {
               type:String 
            },
            instagram: {
               type:String 
            }
           },        
});
module.exports = profile = mongoose.model('profile', profileSchema);