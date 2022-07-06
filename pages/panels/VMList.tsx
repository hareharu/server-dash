import React, { useEffect, useState } from 'react';
import { List } from 'antd';

interface DataType {
    name_label: string;
    name_description: string;
    power_state: string;
    addresses: {
        '0/ipv4/0': string;
    };
    auto_poweron: boolean;
    href: string;
}

const VMList = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    const loadData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('http://' + process.env.NEXT_PUBLIC_BACKSERVER + '/vms.php', {
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
        <List
            style={{ background: 'white' }}
            dataSource={data}
            bordered
            renderItem={item => (
                <List.Item
                    key={item.name_label}
                    style={{ background: item.power_state == 'Running' ? '' : '#f5222d' }}
                >
                    <List.Item.Meta
                        title={item.name_label}
                        description={item.name_description}
                    />
                    <div>{item.addresses['0/ipv4/0']}</div>
                </List.Item>
            )}
        />
    );
}

export default VMList;
