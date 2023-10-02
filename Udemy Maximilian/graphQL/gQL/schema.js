const {buildSchema}=require('graphql');

module.exports=buildSchema(`

    type TestQuery{
        text : String!
        views : Int!
    }

    type RootQuery {
        hello :TestQuery!
    }
    schema{
        query :RootQuery
    }`)