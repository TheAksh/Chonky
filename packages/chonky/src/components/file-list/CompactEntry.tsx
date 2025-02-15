import React, { useContext } from 'react';

import { FileEntryProps } from '../../types/file-list.types';
import { FileHelper } from '../../util/file-helper';
import { ChonkyIconContext } from '../../util/icon-helper';
import { makeLocalChonkyStyles } from '../../util/styles';
import { TextPlaceholder } from '../external/TextPlaceholder';
import { useFileEntryHtmlProps, useFileEntryState } from './FileEntry-hooks';
import { FileEntryName } from './FileEntryName';
import { FileEntryState } from './GridEntryPreview';

export const CompactEntry: React.FC<FileEntryProps> = React.memo(
    ({ file, selected, focused, dndState }) => {
        const entryState: FileEntryState = useFileEntryState(file, selected, focused);

        const fileSizeString = FileHelper.getReadableDate(file);
        const fileDateString = FileHelper.getReadableFileSize(file);

        const classes = useStyles(entryState);
        const ChonkyIcon = useContext(ChonkyIconContext);
        const fileEntryHtmlProps = useFileEntryHtmlProps(file);
        return (
            <div className={classes.listFileEntry} {...fileEntryHtmlProps}>
                <div className={classes.listFileEntryIcon}>
                    <ChonkyIcon
                        icon={entryState.icon}
                        spin={entryState.iconSpin}
                        fixedWidth={true}
                    />
                </div>
                <div className={classes.listFileEntryDescription}>
                    <div
                        className={classes.listFileEntryName}
                        title={file ? file.name : undefined}
                    >
                        <FileEntryName file={file} />
                    </div>
                    <div className={classes.listFileEntryProperties}>
                        <div className={classes.listFileEntryProperty}>
                            {file ? (
                                fileSizeString ?? <span>—</span>
                            ) : (
                                <TextPlaceholder minLength={5} maxLength={15} />
                            )}
                        </div>
                        <div className={classes.listFileEntryProperty}>
                            {file ? (
                                fileDateString ?? <span>—</span>
                            ) : (
                                <TextPlaceholder minLength={10} maxLength={20} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="chonky-file-entry-outline"></div>
                <div className="chonky-file-entry-selection"></div>
            </div>
        );
    }
);

const useStyles = makeLocalChonkyStyles((theme) => ({
    listFileEntry: {
        fontSize: theme.listFileEntry.fontSize,
        alignItems: 'center',
        position: 'relative',
        display: 'flex',
        height: '100%',
    },
    listFileEntryIcon: {
        backgroundColor: (state: FileEntryState) => state.color,
        boxShadow: 'inset rgba(255, 255, 255, 0.5) 0 0 0 999px',
        borderRadius: theme.listFileEntry.iconBorderRadius,
        fontSize: theme.listFileEntry.iconFontSize,
        color: '#fff',
        padding: 8,
    },
    listFileEntryDescription: {
        flexDirection: 'column',
        display: 'flex',
        flexGrow: 1,
    },
    listFileEntryName: {
        padding: [0, 8, 4, 8],
    },
    listFileEntryProperties: {
        fontSize: theme.listFileEntry.propertyFontSize,
        flexDirection: 'row',
        display: 'flex',
    },
    listFileEntryProperty: {
        padding: [0, 8],
        opacity: 0.4,
    },
}));
