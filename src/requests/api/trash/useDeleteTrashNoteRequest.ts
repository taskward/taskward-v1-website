import { useMutation, useQueryClient } from '@tanstack/react-query'

import { axiosService, TRASH_KEY } from '@/requests'

const useDeleteTrashNoteRequest = () => {
  const queryClient = useQueryClient()
  const { mutate, mutateAsync, isLoading, isSuccess, isError } = useMutation(
    async (id: number): Promise<any> => {
      const response = await axiosService({
        method: 'DELETE',
        url: `trash/notes/${id}`
      })
      return response.data
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries([TRASH_KEY])
      }
    }
  )

  return { mutate, mutateAsync, isLoading, isSuccess, isError }
}

export default useDeleteTrashNoteRequest
