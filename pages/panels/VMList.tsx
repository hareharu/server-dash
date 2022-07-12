import React from 'react';
import useSWR from 'swr'
import { List } from 'antd';
import fetcher from '../utils/fetcher';

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
    const { data } = useSWR<DataType[]>('http://' + process.env.NEXT_PUBLIC_BACKSERVER + '/vms.php', fetcher);

    return (
        <List
            style={{ background: 'white' }}
            dataSource={data}
            loading={!data}
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
