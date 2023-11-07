const service = {}

service.get = async (type) => {

    return fetch(`https://glamping.webmcdm.dk/${type}`).then((response) => response.json()).catch((error) => console.log(error));

}


service.submitMember = (postObj) => {

    return fetch(`https://glamping.webmcdm.dk/contact`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'   
        },
        body : JSON.stringify(postObj),

    }).then((response) => response.json())

};


export default service;