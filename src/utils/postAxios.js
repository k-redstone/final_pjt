import axios from 'axios'

const fetchFreeBoardList = async (token) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${token}`,
  }
  await axios({
    method: 'get',
    url: URL + 'free_board/',
    headers: headers,
  }).then((res) => {
    // postList.value = res.data
    console.log(res)
    return res.data
  })
}

export { fetchFreeBoardList }
