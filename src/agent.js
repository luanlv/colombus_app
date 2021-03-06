import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

// const API_ROOT = 'http://localhost:8080';
// const API_ROOT = 'http://192.168.1.102:8080';
const API_ROOT = 'http://api.colombus.vn';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (username, password, type) =>
    requests.post(`/${type}/users/login`, { user: { username, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Tags = {
  getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })
const Articles = {
  all: page =>
    requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article =>
    requests.post('/articles', { article })
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

const LaiXe = {
  themDO: data =>
    requests.post('/laixe/do/them', {data}),
  capnhapDO: data =>
    requests.post('/laixe/do/capnhap', {data}),
  themPhuPhi: data =>
    requests.post('/laixe/phuphi/them', {data}),
  capnhapPhuPhi: data =>
    requests.post('/laixe/phuphi/capnhap', {data}),
  listDO: () =>
    requests.get(`/laixe/do/all`),
  listPhuPhi: () =>
    requests.get(`/laixe/phuphi/all`),
  DObyId: (id) =>
    requests.get(`/laixe/do/get/${id}`),
  PhuPhibyId: (id) =>
    requests.get(`/laixe/phuphi/get/${id}`),
  autofill: () =>
    requests.get(`/laixe/autofill/all`)
}

const IT = {
  themThauPhu: data =>
    requests.post('/it/users/themthauphu', {data}),
  themDieuHanh: data =>
    requests.post('/it/users/themdieuhanh', {data}),
  danhsachThauPhu: () =>
    requests.get('/it/users/danhsachthauphu'),
  themLaiXe: data =>
    requests.post('/it/users/themlaixe', {data}),
  themAutoFill: (data) =>
    requests.post(`/it/autofill/new`, data)
}

const DieuHanh = {
  listDOchuaxacnhan: () =>
    requests.get('/dieuhanh/do/chuaxacnhan'),
  duyet: (id, action) =>
    requests.post('/dieuhanh/do/duyet', {id: id, action: action})
}

const ThauPhu = {
  themLaiXe: data =>
    requests.post('/thauphu/users/themlaixe', {data}),
  danhsachLaiXe: () =>
    requests.get('/thauphu/users/laixe')
}

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  LaiXe,
  IT,
  DieuHanh,
  ThauPhu,
  setToken: _token => { token = _token; }
};
