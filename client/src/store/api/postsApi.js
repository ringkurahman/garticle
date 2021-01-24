import axios from 'axios'

axios.defaults.baseURL = '/graphql'
axios.defaults.method = 'POST'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('X-AUTH')
axios.defaults.headers.post['Content-Type'] = 'application/json'


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