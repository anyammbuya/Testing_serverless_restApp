"use strict";
const _ =require("lodash");
const Promise = this.Promise || require('promise');
const agent = require('superagent-promise')(require('superagent'), Promise);

const makeHttpRequest = async (path,method,options)=> {
let root = process.env.TEST_ROOT;
let url = options.noteId ? `${root}/${path}/${options.noteId}`:`${root}/${path}`;
let httpReq = agent(method, url);
let body = _.get(options, "body");
let idToken = _.get(options, "idToken");
console.log(`Invoking HTTP ${method} ${url}`);

try {
//set authorization header
httpReq.set("Authorization", idToken);
if(body){
    httpReq.send(body);
}
let response=await httpReq;
return {
    statusCode: response.status,
    body: response.body,
}
}catch(err){
 return {
    statusCode: err.status,
    body: null
  };
 }
};

exports.we_invoke_createNote=async(options)=> {
  
    let response = makeHttpRequest("notes", "POST", options)
    return response;
}


exports.we_invoke_updateNote=async(options)=> {
    
    let response = makeHttpRequest("notes", "PUT", options)
    return response;
}

exports.we_invoke_deleteNote=async(options)=> {
    
    let response = makeHttpRequest("notes", "DELETE", options)
    return response;
}


