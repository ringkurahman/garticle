import axios from 'axios'

axios.defaults.baseURL = '/graphql'
axios.defaults.method = 'POST'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('X-AUTH')
axios.defaults.headers.post['Content-Type'] = 'application/json'


export const signupUser = async (userData) => {
    try {
        const { data } = await axios({data:{
            query: `mutation {
                signup(fields:{
                    firstname: "Ringku"
                    lastname: "Rahman"
                    email: "${userData.email}"
                    password: "${userData.password}"
                }){
                    _id
                    firstname
                    lastname
                    email
                    role
                    token
                }
            }` 
            }
        })
        return {
            auth: data.data ? data.data.signup : null,
            errors: data.errors
        }

    } catch (err) {
        console.log(err)
    }
}


export const loginUser = async (userData) => {
    try {
        const { data } = await axios({data:{
            query:`mutation{
                authUser(fields:{
                    email: "${userData.email}"
                    password: "${userData.password}"
                }
                ){
                    _id
                    firstname
                    lastname
                    email
                    role
                    token
                }
            }`
        }

        })

        return {
            auth: data.data ? data.data.authUser : null,
            errors: data.errors
        }
        
    } catch (err) {
        console.log(err)
    }
}


export const autoSign = async()=>{
    try{
        const { data } = await axios({
            data:{
                query: `query{ 
                    isAuth{ 
                        _id 
                        firstname
                        lastname
                        email
                        role 
                        token
                    }
                }`
            }
        })

        if (data.errors) localStorage.removeItem('X-AUTH')
        
        return {
            auth: data.data ? data.data.isAuth : null
        }
    } catch(err){
        console.log(err)
    }
}


export const updateUserEmailPass = async (email, password, _id) => {
    try{
        const { data } = await axios({data:{
            query:`mutation{
                updateUserEmailPass(
                    email: "${email}"
                    password: "${password}"
                    _id: "${_id}"
                ){
                    _id
                    token
                    email
                }
            }`
        }})

        if(data.errors){
            return { errors: data.errors }
        } else {
            localStorage.setItem('X-AUTH', data.data.updateUserEmailPass.token)
        }
        return  {
            auth: data.data ? data.data.updateUserEmailPass : null
        }

    } catch (err) {
        console.log(err)
    }
}


export const getUserStats = async (_id) => {
    try{
        const body = {
            query:`
                query User($id:ID!, $sort:SortInput){
                    user(id:$id){
                        firstname
                        lastname
                        email
                        role
                        posts(sort:$sort) { _id, title, excerpt }
                        categories { _id, name }
                    }
                }
            `,
            variables:{
                id: _id,
                sort: { sortBy: "_id", order: "desc",limit: 3 }
            }
        }

        const { data } = await axios({ data: JSON.stringify(body) })
        
        return {
            stats: data.data ? data.data.user :null
        }

    } catch (err) {
        console.log(err)
    }
}





export const getCategories = async (userData) => {
    try {
        const body = {
            query:`
                query{
                    categories{
                        _id
                        name
                    }
                }
            `
        }
        const { data } = await axios({ data:JSON.stringify(body) })
        return data
        
    } catch (err) {
        console.log(err)
    }
}


export const createPost = async(formData)=>{ 
    try{
        const body = {
            query:`
                mutation CreatePost($fields:PostInput!){
                    createPost(fields:$fields){
                        _id
                        title
                    }
                }
            `,
            variables:{
                fields:formData
            }
        }
        const { data } = await axios({data:JSON.stringify(body)})
        return {
            createdPost:{
                post: data.data ? data.data.createPost : null,
                error: data.errors
            }
        }
    } catch(err){
        console.log(err)
    }
}


export const getUserPosts = async (sort, prevState, _id) => { 
    try{
        const body = {
            query:`
                query GetUserPosts($sort:SortInput,$queryBy:QueryByInput){
                    posts(sort:$sort, queryBy:$queryBy ){
                        _id
                        title
                        status
                        category { name }
                    }
                }
            `,
            variables:{
                queryBy:{ key:"author", value:_id },
                sort:sort
            }
        }
        const {data} = await axios({ data:JSON.stringify(body) })
        let newState
        let newPosts = data.data ? data.data.posts : null
        if(newPosts){
            newState = [...prevState, ...newPosts]
        }
        return {
            posts: data.data ? newState : null
        }

    } catch(err){
        console.log(err)
    }
}


export const updatePostStatus = async(status, _id, prevState)=>{ 
    try{
        const body = {
            query:`
                mutation UpdatePost($fields:PostInput!, $_id:ID!){
                    updatePost(fields:$fields, _id:$_id){
                        _id
                        title
                        status
                        category { name }
                    }
                }
            `,
            variables:{
                _id: _id,
                fields: {status:status}
            }
        }
        const { data } = await axios({data:JSON.stringify(body)});
        let newState = null;
        let updPost = data.data ? data.data.updatePost:null
        if(updPost){
            newState = prevState.map(oldObj => {
                return [updPost].find( newObj => newObj._id === oldObj._id) || oldObj
            });
        }

        return {
            posts: newState ? newState : prevState
        }
    } catch(err){
        console.log(err)
    }
}


export const removePost = async(_id, prevState)=>{ 
    try{
        const body = {
            query:`
                mutation {
                    deletePost(
                        _id:"${_id}"
                    ){
                        _id
                    }
                }
            `
        }
        const { data } = await axios({ data:JSON.stringify(body) })

        let newState = null
        let delPost = data.data ? data.data.deletePost : null
        if(delPost){
            newState = prevState.filter((obj)=> {
                return obj._id !== delPost._id
            })
        }
        return {
            posts: newState ? newState : prevState
        }
    } catch(err){
        console.log(err)
    }
}


export const getPosts = async(sort, prevState)=>{ 

    try{
        const body = {
            query:`
                query GetPosts($sort:SortInput, $queryBy:QueryByInput){
                    posts(sort:$sort, queryBy:$queryBy){
                        _id
                        title
                        content
                        excerpt
                        category { name }
                        author { 
                            firstname 
                            lastname
                        }
                    }
                }
            `,
            variables:{
                queryBy:{ key:"status", value:"PUBLIC" },
                sort:sort
            }
        }
        const {data} = await axios({ data:JSON.stringify(body) })

        let newState
        let newPosts = data.data ? data.data.posts : null
        if(newPosts){
            newState = [...prevState,...newPosts]
        }
        return {
            homePosts: data.data ? newState : null
        }
    } catch(err){
        console.log(err)
    }
}


export const getPost = async(_id)=>{ 

    try{
        const body = {
            query:`
                query{
                    post(id:"${_id}" ){
                        title
                        content
                        author { firstname, lastname }
                        category { _id, name }
                        related(sort:{ limit:4 }){
                            _id
                            title
                            excerpt
                            author { firstname, lastname }
                            category { _id, name }
                        }
                    }
                }
            `
        };
        const {data} = await axios({ data:JSON.stringify(body) })
        return {
            singlePost:{
                post: data.data ? data.data.post  : null,
                error: data.errors
            }
        }
    } catch(err){
        console.log(err)
    }
}