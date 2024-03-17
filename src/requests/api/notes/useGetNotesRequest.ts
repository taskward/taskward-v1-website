import { useQuery } from '@tanstack/react-query'
import { axiosService, NOTES_KEY } from '@/requests'

import { Notes } from '@/interfaces'

const useGetNotesRequest = () => {
  const { data, refetch, isLoading, isRefetching } = useQuery(
    [NOTES_KEY],
    async (): Promise<Notes> => {
      const response = await axiosService({
        method: 'GET',
        url: 'notes'
      })
      return response.data
    }
  )

  return { data, refetch, isLoading, isRefetching }
}

export default useGetNotesRequest
