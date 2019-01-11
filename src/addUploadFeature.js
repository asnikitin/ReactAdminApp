const callApi = async (data) => {
  var fetchConf = { method: 'POST',
   body: data,
   cache: 'default' };
   const response = await fetch('http://localhost:3001/multimedia_uploader', fetchConf);
const body = await response;  console.log("response", response);
if (response.status !== 200) throw Error(body.message);
 return body; };

const addUploadFeature = requestHandler => (type, resource, params) => {
    if (type === 'UPDATE' || type === 'CREATE' && resource === 'posts') {


document.getElementsByTagName("form")[0].setAttribute("action", "http://localhost:3001/multimedia_uploader")
document.getElementsByTagName("form")[0].setAttribute("method", "post")
document.getElementsByTagName("form")[0].submit()

            return Promise.all(callApi(params.data).then(body  => console.log('body inpromise')))
                // .then(transformedNewPictures => requestHandler(type, resource, {
                //     ...params,
                //     data: {
                //         ...params.data,
                //         gallery: [...transformedNewPictures, ...formerPictures],
                //     },
                // }));

    }
    return requestHandler(type, resource, params);
};

export default addUploadFeature;
