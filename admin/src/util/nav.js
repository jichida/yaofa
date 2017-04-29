import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'

const history = useRouterHistory(createHashHistory)({});

export default history;
