import React, { useEffect, useState } from 'react';
import { Collapse, List } from 'antd';

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
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    const loadData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('http://' + process.env.NEXT_PUBLIC_BACKSERVER + '/logs.php', {
            credentials: 'include',
            mode: 'cors',
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                setData([...data, ...json]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadData();
    }, []);

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
