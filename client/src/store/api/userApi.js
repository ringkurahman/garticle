import axios from 'axios'

axios.defaults.baseURL = '/graphql'
axios.defaults.method = 'POST'
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
            error: data.errors
        }

    } catch (err) {
        console.log(err)
    }
}