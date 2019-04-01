import React from 'react';
import IconButton from '@material-ui/core/IconButton/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export const ContextMenuBtn = ({ onClick }) => (
  <IconButton
    style={{ padding: 0 }}
    aria-label="More"
    aria-haspopup="true"
    onClick={onClick}>
    <MoreHorizIcon style={{ color: '#27a6d6', fontSize: '40px' }}/>
  </IconButton>
);
