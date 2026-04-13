export const status = {
    active: 'ACTIVE',
    inactive: 'INACTIVE',
    error: 'ERROR'
}
export const statusMap = {
    [status.active]: {
        value: 'ACTIVE',
        label: '生效中',
        type: 'success',
    },
    [status.inactive]: {
        value: 'INACTIVE',
        label: '已停用',
        type: 'info',
    },
    [status.error]: {
        value: 'ERROR',
        label: '信息有误',
        type: 'danger',
    },
    all: {
        value: undefined,
        label: '全部'
    }
};

export const statusOptions = [
    {
        label: statusMap.all.label,
        value: statusMap.all.value
    },
    {
        label: statusMap[status.active].label,
        value: status.active
    },
    {
        label: statusMap[status.inactive].label,
        value: status.inactive
    },
    {
        label: statusMap[status.error].label,
        value: status.error
    },
];
