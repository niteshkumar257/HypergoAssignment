class customError extends Error{
    constructor(message,statuscode)
    {
        console.log(statuscode);
         super(message);
         this.statuscode=statuscode || 500;
         this.status = statuscode>400 && statuscode<500 ?"fail":'error' 
         this.isOperationl=true;
         Error.captureStackTrace(this,this.constructor);
    }
}
export default customError;

// const err=new customError()
// this will call the constructor 