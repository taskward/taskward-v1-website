import { useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import SidebarItem from './SidebarItem'
import { Icon } from '@/components'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { ActiveSidebarItem, sidebarAction } from '@/store'

export default function Sidebar(): JSX.Element {
  const { t } = useTranslation(['layout'])
  const navigate = useNavigate()
  const sidebarMode = useAppSelector((state) => state.sidebar.sidebarMode)
  const sidebarDispatch = useAppDispatch()
  const activeSidebarItem = useAppSelector((state) => state.sidebar.activeSidebarItem)

  const [shouldExpand, setShouldExpand] = useState<boolean>(false)

  function onClickSidebarItem(currentItem: ActiveSidebarItem) {
    switch (true) {
      case currentItem > 0:
        navigate(`/${ActiveSidebarItem[currentItem].toLowerCase()}`)
        sidebarDispatch(sidebarAction.changeActiveSidebarItem(currentItem))
        break
      default:
        return
    }
  }

  return (
    <div
      className={clsx(
        'relative flex shrink-0 select-none flex-col gap-3 overflow-hidden border-r p-3 transition-all dark:border-black',
        styles.sidebarWrapper,
        sidebarMode === 'collapse' && !shouldExpand ? 'w-[72px]' : 'w-[224px]'
      )}
      onMouseEnter={() => {
        sidebarMode === 'collapse' && setShouldExpand(true)
      }}
      onMouseLeave={() => {
        sidebarMode === 'collapse' && setShouldExpand(false)
      }}
    >
      <SidebarItem
        shouldExpand={sidebarMode === 'expand' || (shouldExpand && sidebarMode === 'collapse')}
        icon={<Icon.Note className="fill-black dark:fill-white" />}
        title={t('layout:SIDEBAR.TITLE.NOTE')}
        active={activeSidebarItem === ActiveSidebarItem.Note}
        onClick={() => {
          onClickSidebarItem(ActiveSidebarItem.Note)
        }}
      />
      <SidebarItem
        shouldExpand={sidebarMode === 'expand' || (shouldExpand && sidebarMode === 'collapse')}
        icon={<Icon.Archive className="fill-black dark:fill-white" />}
        title={t('layout:SIDEBAR.TITLE.ARCHIVE')}
        active={activeSidebarItem === ActiveSidebarItem.Archive}
        onClick={() => {
          onClickSidebarItem(ActiveSidebarItem.Archive)
        }}
      />
      <SidebarItem
        shouldExpand={sidebarMode === 'expand' || (shouldExpand && sidebarMode === 'collapse')}
        icon={<Icon.Trash className="fill-black dark:fill-white" />}
        title={t('layout:SIDEBAR.TITLE.TRASH')}
        active={activeSidebarItem === ActiveSidebarItem.Trash}
        onClick={() => {
          onClickSidebarItem(ActiveSidebarItem.Trash)
        }}
      />
    </div>
  )
}
