import React from 'react';
import useSWR from 'swr'
import { Collapse, List, Empty } from 'antd';
import fetcher from '../utils/fetcher';

const { Panel } = Collapse;

interface DataType {
    start: string;
    end: string;
    errors: number;
    errored: number;
    tasks: {
        step: number;
        start: string;
        end: string;
        name: string;
        errors: number;
    }[];
}

const BuckupLogs = () => {
    const { data } = useSWR<DataType[]>('http://' + process.env.NEXT_PUBLIC_BACKSERVER + '/logs.php', fetcher);

    if (!data) return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);
    return (
        <Collapse accordion>
            {data.map(log => <Panel
                header={
                    log.start + " — " + log.end
                    + (log.errors == 0 ? '' : ' (')
                    + (log.errors == 0 ? '' : log.errors == 1 ? '1 error' : log.errors + ' errors')
                    + (log.errored == 0 ? '' : ' in ' + (log.errored == 1 ? '1 task' : log.errored + ' tasks'))
                    + (log.errors == 0 ? '' : ')')
                }
                key={log.start + "-" + log.end}
                style={{ background: log.errors == 0 ? '' : '#f5222d' }}
            >
                <List
                    style={{ background: 'white' }}
                    dataSource={log.tasks}
                    bordered
                    renderItem={task => (
                        <List.Item
                            key={task.start + "-" + task.end}
                            style={{ background: task.errors == 0 ? '' : '#f5222d' }}
                        >
                            <List.Item.Meta
                                title={task.name}
                                description={task.start + " — " + task.end}
                            />
                            <div>{task.errors == 0 ? '' : task.errors == 1 ? '1 error' : task.errors + ' errors'}</div>
                        </List.Item>
                    )}
                />
            </Panel>)}
        </Collapse>
    );

}

export default BuckupLogs;
