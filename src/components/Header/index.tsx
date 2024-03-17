import clsx from 'clsx'
import styles from './styles.module.css'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/hooks'
import LanguageIcon from './LanguageButton'
import ThemeModeButton from './ThemeModeButton'
import MenuIcon from './MenuIcon'
import UserAvatar from './UserAvatar'
import SyncIcon from './SyncIcon'

export default function Header(): JSX.Element {
  const { t } = useTranslation(['layout'])
  const activeSidebarItem = useAppSelector((state) => state.sidebar.activeSidebarItem)

  function getActiveSidebarItemTitle(): string {
    switch (activeSidebarItem) {
      case 1:
        return t('layout:SIDEBAR.TITLE.NOTE')
      case 2:
        return t('layout:SIDEBAR.TITLE.ARCHIVE')
      case 3:
        return t('layout:SIDEBAR.TITLE.TRASH')
      case 0:
      default:
        return ''
    }
  }

  return (
    <header
      className={clsx(
        'flex h-16 w-full select-none justify-between gap-4 border-b p-3 transition-all dark:border-black',
        styles.header
      )}
    >
      <div className="flex items-center justify-start gap-1">
        <MenuIcon />
        <div className="ml-2">{getActiveSidebarItemTitle()}</div>
      </div>
      <div className="mr-2 flex items-center justify-end gap-2">
        <SyncIcon />
        <LanguageIcon />
        <ThemeModeButton />
        <UserAvatar />
      </div>
    </header>
  )
}
