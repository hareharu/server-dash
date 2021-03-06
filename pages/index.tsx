import type { NextPage } from 'next';
import Head from 'next/head';

import VMList from './panels/VMList';
import BackupLogs from './panels/BackupLogs';

import { Layout, Col, Row } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const Home: NextPage = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Head>
                <title>Server/Dash</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Content style={{ padding: '10px 30px' }}>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <VMList />
                    </Col>
                    <Col span={12}>
                        <BackupLogs />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default Home;
