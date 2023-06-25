import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import DefaultTab, { ITabOption } from "../components/tabs/defaultTab";
import { useGlobalStore } from "../store";
import { ChartPieIcon, CircleStackIcon } from "@heroicons/react/24/outline";
import { ISegmentKey } from "../interfaces";
import { useTranslation } from "react-i18next";

const SegmentNav: React.FC = (props) => {
    const { vizStore, commonStore } = useGlobalStore();
    const { segmentKey } = commonStore;
    const { t } = useTranslation();

    const tabs: ITabOption[] = [
        {
            key: ISegmentKey.data,
            label: <div className="flex">
                <CircleStackIcon className="w-4 mr-2" /> {t('App.segments.data')}
            </div>
        },
        {
            key: ISegmentKey.vis,
            label: <div className="flex">
                <ChartPieIcon className="w-4 mr-2" /> {t('App.segments.vis')}
            </div>
        }
    ]

    const editLabelHandler = useCallback((content: string, tabIndex: number) => {
        vizStore.setVisName(tabIndex, content)
    }, [])

    return (
        <DefaultTab
            selectedKey={segmentKey}
            tabs={tabs}
            onEditLabel={editLabelHandler}
            onSelected={(k) => {
                commonStore.setSegmentKey(k as ISegmentKey)
            }}
        />
    );
};

export default observer(SegmentNav);