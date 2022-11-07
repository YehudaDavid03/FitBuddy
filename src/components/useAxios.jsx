import { useState } from "react"
import axios from "axios"

const useAxios = ({ getUrl, getMethod, getHeaders }) => {
    // Setting variables to get experted
    const [loading, setLoading] = useState()
    const [error, setError] = useState(null)
    const [response, setResponse] = useState(null)

      // Axios functionality
    const fetchData = async () => {
      setLoading(true)

      await axios({
        url: getUrl,
        method: getMethod,
        data: getHeaders
      }).then((res) => {
        setResponse(res.data)
      }).catch((error) => {
        setError(error)
      }).finally(() => {
        setLoading(false)
      })
    }

    return { fetchData, loading, error, response }
}

export default useAxios