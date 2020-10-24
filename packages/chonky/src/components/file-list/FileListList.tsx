/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { CSSProperties, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';

import { selectDisplayFileIds, selectFileViewConfig } from '../../redux/selectors';
import { useInstanceVariable } from '../../util/hooks-helpers';
import { fileListItemRenderer } from './FileList-hooks';

export interface FileListListProps {
    width: number;
    height: number;
}

export const FileListList: React.FC<FileListListProps> = React.memo((props) => {
    const { width, height } = props;

    const viewConfig = useSelector(selectFileViewConfig);
    const displayFileIds = useSelector(selectDisplayFileIds);

    const listRef = useRef<FixedSizeList>();

    const displayFileIdsRef = useInstanceVariable(useSelector(selectDisplayFileIds));
    const getItemKey = useCallback(
        (index: number) => displayFileIdsRef.current[index] ?? `loading-file-${index}`,
        [displayFileIdsRef]
    );

    const listComponent = useMemo(() => {
        // When entry size is null, we use List view
        const rowRenderer = (data: { index: number; style: CSSProperties }) => {
            return fileListItemRenderer(
                data.index,
                displayFileIds[data.index],
                false,
                data.style
            );
        };

        return (
            <FixedSizeList
                ref={listRef as any}
                className="chonky-file-list-list-view"
                itemSize={viewConfig.entryHeight}
                height={height}
                itemCount={displayFileIds.length}
                width={width}
                itemKey={getItemKey}
            >
                {rowRenderer}
            </FixedSizeList>
        );
    }, [width, height, viewConfig, displayFileIds, getItemKey]);

    return listComponent;
});