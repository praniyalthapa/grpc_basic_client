const grpc=require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition=protoLoader.loadSync('./todo.proto',{
    keepCase: true, 
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const protoDescriptor=grpc.loadPackageDefinition(packageDefinition);
var todoService=protoDescriptor.TodoService;
const client= new todoService('localhost:55051',grpc.credentials.createInsecure());
client.ListTodo({},(err,todos)=>{
    if(!err){
        console.log(todos);
         client.CreateteTodo({id:3,title:'first todo',content:'this is todos'});
         if(!err){
            console.log('create a new todo');
            client.ListTodo({},(err,todos)=>{
                console.log('after insertion todos',todos);
            });
         }
         else {
            console.log(err);
         }
    }
})