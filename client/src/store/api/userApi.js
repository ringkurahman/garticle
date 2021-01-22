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
