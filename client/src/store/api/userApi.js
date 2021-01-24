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
