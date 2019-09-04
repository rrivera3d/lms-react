// PRIVATE METHODS

const handleErrors = (response) => {
  if (!response.ok) throw response.json();
  return response.json();
};

const _getEndPoint = (uriFragment, data, action) => {
  let id = (data && data.id) ? '/' + data.id : '';
  let endPoint = uriFragment + id;
  if (action) {
    endPoint += '/' + action;
  }
  return (endPoint) ? endPoint : null;
};

const _constructProps = (method, data, contentType) => {
  let props = {};
  props.method = (method) ? method.toUpperCase() : 'GET';
  props.headers = new Headers({ 'Content-Type': (contentType) ? contentType : 'application/json' });
  if (data) {
    props.body = (typeof data !== 'string') ?
      JSON.stringify(data) : data;
  }
  return props;
};

const _request = (uri, fetchOptions) => {
  return fetch(uri, fetchOptions)
  .then(handleErrors)
  .then(response => {
    return response;
  })
  .catch(error => {
    return error.then(response => {
      throw response;
    });
  });
};

const _get = (uri, data, options) => {
  options = options ? options : {};
  let props = _constructProps('GET', data);
  let fetchOptions = Object.assign(props, options);
  return _request(uri, fetchOptions);
};

const _post = (uri, data, options) => {
  options = options ? options : {};
  let props = _constructProps('POST', data);
  let fetchOptions = Object.assign(props, options);
  return _request(uri, fetchOptions);
};

const _put = (uri, data, options) => {
  options = options ? options : {};
  let props = _constructProps('PUT', data);
  let fetchOptions = Object.assign(props, options);
  return _request(uri, fetchOptions);
};

const _delete = (uri, data, options) => {
  options = options ? options : {};
  let props = _constructProps('DELETE');
  let fetchOptions = Object.assign(props, options);
  return _request(uri, fetchOptions);
};


// PUBLIC FACADE

const restService = {
  getEndPoint:  _getEndPoint,
  request:      _request,
  get:          _get,
  post:         _post,
  put:          _put,
  delete:       _delete
};

export default restService;