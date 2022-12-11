import axiosClient from "./axiosClient";


const movieApi = {
    getAll(param){
        const url = '/phim-le'
        return axiosClient.get(url,param)
    },

    add(){},

    getById(){},
    
    updateById(){},

    remove(){}
}

export default movieApi