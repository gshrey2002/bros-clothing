// class Apifeature{
//     constructor(query,querystr){
//         this.query=query;
//         this.querystr=querystr;

const { json } = require("body-parser");

//     }
//     search (){
//         const keyword=this.queryStr.keyword
//         ? {
//             name:{
//                 $regex:this.queryStr.keyword,
//                 $option:"i"
//             }
//         }:{};
//         this.query=this.query.find({...keyword})
//         return this;

//     }
// }
// module.exports=Apifeature

class Apifeature {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i" // Use "options" instead of "option"
                }
            }
            : {};
        
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter(){
        const queryCopy={...this.queryStr}
        // removing search query
        const removeQuery=["keyword","page","limit"];
        removeQuery.forEach(element => delete queryCopy[element]);
        this.query=this.query.find(queryCopy);
        // return this;

        //filtering price
      console.log(queryCopy)
        let querySt=JSON.stringify(queryCopy);
        console.log(querySt)
        querySt=querySt.replace(/\b(gt|gte|lt|lte)\b/g, (key)=>`$${key}`)
        
        // this.query=this.query.find(JSON.parse(querySt))
        const parsedQuery = JSON.parse(querySt);
this.query = this.query.find(parsedQuery);

        console.log(querySt)

        return this;
    }
// filter() {
//     const queryCopy = { ...this.queryStr };
//     //   Removing some fields for category
//     const removeFields = ["keyword", "page", "limit"];

//     removeFields.forEach((key) => delete queryCopy[key]);

//     // Filter For Price and Rating

//     let queryStr = JSON.stringify(queryCopy);
//     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

//     this.query = this.query.find(JSON.parse(queryStr));

//     return this;
//   }


}

module.exports = Apifeature;
