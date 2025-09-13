import logoIcon from '@/assets/logo.png';
import chatIcon from '@/assets/menu/chat.png';
import chatIconActive from '@/assets/menu/chat_h.png';
import datasetIcon from '@/assets/menu/dataset.png';
import datasetIconActive from '@/assets/menu/dataset_h.png';
import fileIcon from '@/assets/menu/file.png';
import fileIconActive from '@/assets/menu/file_h.png';
import homeIcon from '@/assets/menu/house.png';
import homeIconActive from '@/assets/menu/house_h.png';
import searchIcon from '@/assets/menu/search.png';
import searchIconActive from '@/assets/menu/search_h.png';
import { RAGFlowAvatar } from '@/components/ragflow-avatar';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SegmentedValue } from '@/components/ui/segmented';
import { LanguageList, LanguageMap, ThemeEnum } from '@/constants/common';
import { useChangeLanguage } from '@/hooks/logic-hooks';
import { useNavigatePage } from '@/hooks/logic-hooks/navigate-hooks';
import { useNavigateWithFromState } from '@/hooks/route-hook';
import { useFetchUserInfo } from '@/hooks/user-setting-hooks';
import { Routes } from '@/routes';
import cls from 'classnames';
import { camelCase } from 'lodash';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'umi';
import { BellButton } from './bell-button';

export function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigateWithFromState();
  const { navigateToOldProfile } = useNavigatePage();

  const changeLanguage = useChangeLanguage();
  const { setTheme, theme } = useTheme();

  const {
    data: { language = 'English', avatar, nickname },
  } = useFetchUserInfo();

  const handleItemClick = (key: string) => () => {
    changeLanguage(key);
  };

  const items = LanguageList.map((x) => ({
    key: x,
    label: <span>{LanguageMap[x as keyof typeof LanguageMap]}</span>,
  }));

  const onThemeClick = React.useCallback(() => {
    setTheme(theme === ThemeEnum.Dark ? ThemeEnum.Light : ThemeEnum.Dark);
  }, [setTheme, theme]);

  const tagsData = useMemo(
    () => [
      {
        path: Routes.Root,
        name: t('header.home'),
        icon: homeIcon,
        activeIcon: homeIconActive,
      },
      {
        path: Routes.Datasets,
        name: t('header.dataset'),
        icon: datasetIcon,
        activeIcon: datasetIconActive,
      },
      {
        path: Routes.Chats,
        name: t('header.chat'),
        icon: chatIcon,
        activeIcon: chatIconActive,
      },
      {
        path: Routes.Searches,
        name: t('header.search'),
        icon: searchIcon,
        activeIcon: searchIconActive,
      },
      {
        path: Routes.Files,
        name: t('header.fileManager'),
        icon: fileIcon,
        activeIcon: fileIconActive,
      },
    ],
    [t],
  );

  // const options = useMemo(() => {
  //   return tagsData.map((tag) => {
  //     const HeaderIcon = tag.icon;

  //     return {
  //       label:
  //         tag.path === Routes.Root ? (
  //           <HeaderIcon className="size-6"></HeaderIcon>
  //         ) : (
  //           <span>{tag.name}</span>
  //         ),
  //       value: tag.path,
  //     };
  //   });
  // }, [tagsData]);

  // const currentPath = useMemo(() => {
  //   return (
  //     tagsData.find((x) => pathname.startsWith(x.path))?.path || Routes.Root
  //   );
  // }, [pathname, tagsData]);

  const handleChange = (path: SegmentedValue) => {
    navigate(path as Routes);
  };

  const handleLogoClick = useCallback(() => {
    navigate(Routes.Root);
  }, [navigate]);

  return (
    <section className="w-[80px] h-full fixed inset-y-0 left-0 py-[20px] flex justify-between items-center flex-col bg-white border-r border-[1px] border-[#E9EBF2]">
      <div className="flex items-center gap-4">
        <img
          src={logoIcon}
          alt="logo"
          className="size-10 cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>
      {/* <Segmented
        options={options}
        value={pathname}
        onChange={handleChange}
      ></Segmented> */}
      <div className="flex-1 py-[24px] flex flex-col gap-[14px]">
        {tagsData.map((x) => (
          <div
            key={x.path}
            className={cls(
              'w-[64px] flex flex-col items-center gap-[4px] cursor-pointer py-[6px] rounded-[8px]',
              {
                'text-[#358AFF]': pathname === x.path,
                'bg-[#F0F5FF]': pathname === x.path,
              },
            )}
            onClick={() => handleChange(x.path)}
          >
            <img
              src={pathname === x.path ? x.activeIcon : x.icon}
              alt={x.name}
              className="size-6"
            />
            <span className="text-[12px] mt-[4px]">{x.name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-5 flex-col text-text-badge">
        <div className="fixed top-[20px] right-[20px] bg-white">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-1">
                {t(`common.${camelCase(language)}`)}
                <ChevronDown className="size-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {items.map((x) => (
                <DropdownMenuItem key={x.key} onClick={handleItemClick(x.key)}>
                  {x.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button variant={'ghost'} onClick={onThemeClick}>
          {theme === 'light' ? <Sun /> : <Moon />}
        </Button>
        <BellButton></BellButton>
        <div className="relative">
          <RAGFlowAvatar
            name={nickname}
            avatar={avatar}
            className="size-8 cursor-pointer"
            onClick={navigateToOldProfile}
          ></RAGFlowAvatar>
          {/* Temporarily hidden */}
          {/* <Badge className="h-5 w-8 absolute font-normal p-0 justify-center -right-8 -top-2 text-bg-base bg-gradient-to-l from-[#42D7E7] to-[#478AF5]">
            Pro
          </Badge> */}
        </div>
      </div>
    </section>
  );
}
