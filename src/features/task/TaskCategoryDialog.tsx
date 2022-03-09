import React from 'react';
import CommonDialog from '../../components/CommonDialog';

type Props = {
  open: boolean;
};

// const

const TaskCategoryDialog = (props: Props) => {
  return (
    <CommonDialog
      open={props.open}
      onClose={() => {}}
      title="カテゴリを編集"
      mode="display"
    >
      <></>
    </CommonDialog>
  );
};

export default TaskCategoryDialog;
