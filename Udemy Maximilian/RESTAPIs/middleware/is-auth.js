const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    
    console.log("req");
    
    let token=req.headers.authorization;
    token=token.split(' ')[1];
    console.log(token);
    try{
        const decodedToken=jwt.verify(token,'mykey');
        console.log("decodedToken ",decodedToken);
        if(!decodedToken){
            const error=new Error('Not Authenticated');
            error.statusCode=401;
            throw error;
        }
        next();
    }
    catch(e){
        return res.status(500).send({"error":e})
    }
}