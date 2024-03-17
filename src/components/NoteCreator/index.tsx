import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import clsx from 'clsx'
import styles from './styles.module.css'

import { Button, Icon, TaskCheckbox } from '@/components'
import type { CustomComponentProps, CreateNoteFormData, TaskFormData } from '@/interfaces'
import { useDetectOutsideClick } from '@/hooks'
import { useCreateNoteRequest } from '@/requests'
import { generateGUID } from '@/utils'

import { useTaskListDataManager } from '@/hooks'

export default function NoteCreator({ style, className }: CustomComponentProps): JSX.Element {
  const { t } = useTranslation(['common', 'note'])

  const { mutate: createNote, isLoading } = useCreateNoteRequest()

  const [editable, setEditable] = useState<boolean>(false)

  const {
    tasksData,
    setTasksData,
    removeCreatedTask,
    changeChecked,
    changeContent,
    changeLinkUrl
  } = useTaskListDataManager()

  const outsideClickRef = useDetectOutsideClick({
    outsideClickCallback: () => {
      setEditable(false)
    },
    insideClickCallback: () => {
      setEditable(true)
      setTasksData(getValues('tasks') ?? [])
    }
  })

  const { handleSubmit, getValues, setValue, reset } = useForm<CreateNoteFormData>({
    defaultValues: {
      name: null,
      description: null,
      tasks: []
    }
  })

  const handleCreateNote = async (formData: CreateNoteFormData) => {
    createNote(formData, {
      onSuccess: () => {
        setEditable(false)
        reset()
      }
    })
  }

  return (
    <div
      className={clsx(
        'mx-auto shrink-0 rounded-lg border border-gray-200 bg-white p-4 ring-0 drop-shadow-lg dark:border-slate-800 dark:bg-noteDark',
        className
      )}
      style={style}
      ref={outsideClickRef}
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleCreateNote)}
      >
        {editable ? (
          <>
            <div
              className={clsx(
                'w-full cursor-text select-text resize-none break-words px-0 text-lg font-medium outline-none placeholder:text-gray-500 empty:before:text-gray-500 empty:before:content-[attr(placeholder)] dark:placeholder-gray-400',
                styles.textarea
              )}
              placeholder={t('common:TITLE')}
              contentEditable
              onInput={(e) => {
                setValue('name', e.currentTarget.textContent as string, {
                  shouldValidate: true
                })
              }}
              dangerouslySetInnerHTML={{ __html: getValues('name') ?? '' }}
            />
            <div
              className={clsx(
                'min-h-[1.25rem] w-full cursor-text select-text resize-none break-words px-0 text-sm font-normal tracking-wide outline-none placeholder:text-gray-500 empty:before:text-gray-500 empty:before:content-[attr(placeholder)] dark:text-noteSecondTextDark dark:placeholder-gray-400',
                styles.textarea
              )}
              placeholder={t('note:NOTE.CREATE.PLACEHOLDER')}
              contentEditable
              onInput={(e) => {
                setValue('description', e.currentTarget.textContent as string, {
                  shouldValidate: true
                })
              }}
              dangerouslySetInnerHTML={{
                __html: getValues('description') ?? ''
              }}
            />
            {tasksData && tasksData.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {tasksData.map((task: TaskFormData) => {
                  return (
                    <TaskCheckbox
                      key={task.id}
                      task={task}
                      editable
                      removeTask={() => {
                        setValue('tasks', removeCreatedTask(getValues('tasks'), task.id as string))
                      }}
                      changeChecked={() => {
                        setValue('tasks', changeChecked(getValues('tasks'), task.id as string))
                      }}
                      changeContent={(content: string | null) => {
                        setValue(
                          'tasks',
                          changeContent(getValues('tasks'), task.id as string, content)
                        )
                      }}
                      changeLinkUrl={(linkUrl: string | null) => {
                        setValue(
                          'tasks',
                          changeLinkUrl(getValues('tasks'), task.id as string, linkUrl)
                        )
                      }}
                    />
                  )
                })}
              </div>
            )}
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="sm"
                title={t('note:TASK.CREATE')}
                onClick={() => {
                  const result = [...tasksData]
                  result.push({
                    id: generateGUID(),
                    content: null,
                    linkUrl: null,
                    finished: false
                  })
                  setValue('tasks', result)
                  setTasksData(result)
                }}
                icon={
                  <Icon.AddTask
                    width="12"
                    height="12"
                    className="flex-shrink-0 fill-white"
                  />
                }
              />
              <div className="flex items-center gap-2.5">
                <Button
                  type="submit"
                  size="sm"
                  title={t('common:CREATE')}
                  disabled={isLoading}
                  className={clsx(isLoading && 'cursor-not-allowed')}
                  icon={
                    isLoading ? (
                      <Icon.Loading
                        width="12"
                        height="12"
                      />
                    ) : (
                      <Icon.Add
                        width="12"
                        height="12"
                        className="flex-shrink-0 fill-white"
                      />
                    )
                  }
                />
                <Button
                  type="button"
                  size="sm"
                  title={t('common:CANCEL')}
                  color="danger"
                  onClick={() => {
                    setEditable(false)
                    reset()
                    setTasksData([])
                  }}
                  icon={
                    <Icon.Close
                      width="12"
                      height="12"
                      className="flex-shrink-0 fill-white"
                    />
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <input
            className="w-full font-medium placeholder:text-gray-500 focus:outline-none dark:bg-noteDark dark:placeholder-gray-400"
            placeholder={t('note:NOTE.CREATE.PLACEHOLDER')}
          />
        )}
      </form>
    </div>
  )
}
