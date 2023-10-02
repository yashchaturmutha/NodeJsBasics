const express=require('express');
const app=express();
const cors=require('cors');
const expressGraphQL=require('express-graphql').graphqlHTTP;

const {GraphQLSchema,GraphQLString,GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInt}=require('graphql');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: "*", 
    credentials: true
}));

const authorsArray=[
    {id:1,name:'ABC'},
    {id:2,name:'DEF'},
    {id:3,name:'GHI'},
];

const booksArray=[
    {id:1,name:'Harry Potter 1',authorId:1},
    {id:2,name:'Harry Potter 2',authorId:1},
    {id:3,name:'Harry Potter 3',authorId:1},
    {id:4,name:'Harry Potter 4',authorId:2},
    {id:5,name:'Harry Potter 5',authorId:2},
    {id:6,name:'Harry Potter 6',authorId:2},
    {id:7,name:'Harry Potter 7',authorId:3},
    {id:8,name:'Harry Potter 8',authorId:3},
]

// 
const schema=new GraphQLSchema({
    query:new GraphQLObjectType({
        name:'TestSchema',
        fields:()=>({
            message:{
                type:GraphQLString,
                resolve:()=>'Yash'
            }
        })
    })
});

// app.use('/graphql',expressGraphQL({
//     graphiql:true,
//     schema
// }))
const AuthorType=new GraphQLObjectType({
    name:'Author',
    description:'Single Author',
    fields:()=>({
        id:{type:new GraphQLNonNull(GraphQLInt)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        books:{
            type:new GraphQLList(BookType),
            resolve:(author)=>{
                return booksArray.filter((book)=>book.authorId==author.id)
            }
        }
    })
});

const BookType=new GraphQLObjectType({
    name:'Book',
    description:'Single Book',
    fields:()=>({
        // 
        id:{type:new GraphQLNonNull(GraphQLInt)},
        // id:{type:GraphQLInt},
        name:{type:new GraphQLNonNull(GraphQLString)},
        authorId:{type:new GraphQLNonNull(GraphQLInt)},
        // authorId:{type:GraphQLInt},
        author:{
            type:AuthorType,
            resolve:(item1)=>{
                return authorsArray.find((item2)=>item1.authorId==item2.id)
            }
        }
    })
});

const RootQueryType=new GraphQLObjectType({
    name:'Query',
    description:'Root Query',
    fields:()=>({
        books:{
            type:new GraphQLList(BookType),//array of obj
            description:'List of Books',
            resolve:()=>booksArray
        },
        authors:{
            type:new GraphQLList(AuthorType),//array of obj
            description:'List of Authors',
            resolve:()=>authorsArray
        },
        book:{
            type:BookType,//array of obj
            description:'Single Book',
            args:{
                id:{type:GraphQLInt}
            },
            resolve:(parent,args)=>{
                return booksArray.find(book=>book.id==args.id)
            }
        },
    })
})

const RootMutationType=new GraphQLObjectType({
    name:'Mutation',
    description:'Root Mutation',
    fields:()=>({
        addBook:{
            type:BookType,//array of obj
            description:'Add Book',
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent,args)=>{
                const bookObj={
                    id:booksArray.length+1,
                    name:args.name,
                    authorId:args.authorId
                };
                booksArray.push(bookObj);
                return bookObj;
            }
        },
    })
})

const BookSchema=new GraphQLSchema({
    query:RootQueryType,
    mutation:RootMutationType
});

app.use('/graphql',expressGraphQL({
    graphiql:true,
    schema:BookSchema
}))


app.listen(4000,()=>console.log("Listening 4000"));