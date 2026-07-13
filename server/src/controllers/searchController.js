const {searchMessages}=require("../services/searchService");

const search=async(req,res)=>{
    const {roomId,q}=req.query;
    
    const messages=await service.searchMessages(
        Number(req.params.roomId),
        req.query.q
    );

module.exports={
    search
}}